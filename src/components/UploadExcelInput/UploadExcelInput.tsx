import { Button } from "@mui/material";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { read, utils } from "xlsx";

import { EXCEL_FILE_FORMATS } from "./constants";
import { VisuallyHiddenInput, useStyles } from "./styles";
import { getFileExtension } from "../../helpers/common";
import { XLSXParseResult } from "../../types/common";

export interface IUploadExcelInputProps {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  onExcelUpload: (rawData: XLSXParseResult) => void;
  setIsFileFormatValid: (isValid: boolean) => void;
}

const UploadExcelInput: FC<IUploadExcelInputProps> = ({
  isLoading,
  setIsLoading,
  onExcelUpload,
  setIsFileFormatValid,
}) => {
  const { classes } = useStyles();

  const [selectedFile, setSelectedFile] = useState<File>();

  const isFileFormatValid = useMemo(
    () => EXCEL_FILE_FORMATS.includes(getFileExtension(selectedFile?.name)),
    [selectedFile]
  );

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    const isCurrentFileFormatValid = EXCEL_FILE_FORMATS.includes(
      getFileExtension(selectedFile?.name)
    );
    setIsFileFormatValid(isCurrentFileFormatValid);

    if (isCurrentFileFormatValid && selectedFile) {
      setIsLoading(true);
      // xlsx library boilerplate
      const reader = new FileReader();
      reader.onload = function (e) {
        const result = e.target?.result;
        if (result) {
          const data = new Uint8Array(result as ArrayBufferLike);
          // ВНИМАТЕЛЬНО! ячейки с датой парсятся в Excel формате
          const workbook = read(data, {
            type: "array",
          });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const info = utils.sheet_to_json(sheet, {
            header: 1,
          }) as XLSXParseResult;

          onExcelUpload(info);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  }, [selectedFile]);

  return (
    <div className={classes.root}>
      <div className={classes.fileInfo}>
        <div>
          <b>Поддерживаемые форматы файлов:</b>&nbsp;
          {EXCEL_FILE_FORMATS.map((i) => `.${i}; `)}
        </div>
      </div>

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        // startIcon={<CloudUploadIcon />}
      >
        Выбрать файл
        <VisuallyHiddenInput
          type="file"
          disabled={isLoading}
          accept={"." + EXCEL_FILE_FORMATS.join(",.")}
          onChange={handleUpload}
          // Нужно для возможности загружать один и тот же файл несколько раз
          onClick={(event) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            event.target.value = null;
          }}
        />
      </Button>

      <div className={classes.fileInfo}>
        <div>
          <b>Выбранный файл:</b>&nbsp;
          {selectedFile?.name || (
            <span className={classes.notSelected}>файл не выбран</span>
          )}
          {selectedFile?.name && !isFileFormatValid && (
            <div className={classes.invalidFile}>неверный формат</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadExcelInput;
