import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { tableColumns } from "./constants";
import { StyledDataGrid, useStyles } from "./styles";
import { getAddressWithPostalCode } from "../../api/yandex";
import { parseRawExcel } from "../../helpers/excel";
import {
  IExcelErrors,
  IFormCommonData,
  ITableRow,
  XLSXParseResult,
} from "../../types/common";
import FromToForm from "../FromToForm/FromToForm";
import PdfTemplate from "../PdfTemplate/PdfTemplate";
import { emptyCommonData } from "../SingleEnvelope/constants";
import UploadExcelInput from "../UploadExcelInput/UploadExcelInput";

const PdfFromExcel = () => {
  const { classes } = useStyles();

  const [step, setStep] = useState<"upload" | "validation" | "form" | "pdf">(
    "upload"
  );
  const [formFromData, setFormFromData] =
    useState<IFormCommonData>(emptyCommonData);
  const [parsedExcel, setParsedExcel] = useState<
    Array<Partial<IFormCommonData>>
  >([]);
  const [formattedExcel, setFormattedExcel] = useState<
    Array<Partial<ITableRow>>
  >([]);
  const [excelErrors, setExcelErrors] = useState<IExcelErrors>();
  const [isFileFormatValid, setIsFileFormatValid] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
    const formatExcel = async () => {
      const newExcel = await Promise.all(
        parsedExcel.map(async (item, index) => {
          const result =
            item.address !== undefined
              ? await getAddressWithPostalCode(item.address)
              : undefined;
          return {
            ...item,
            initialAddress: item.address,
            address: result?.address,
            index: result?.postalCode,
            id: index + 1,
            errors: excelErrors?.rows?.[index]?.join(", "),
          };
        })
      );

      setFormattedExcel(newExcel);
    };

    formatExcel();
  }, [parsedExcel]);

  const parseExcel = (rawData: XLSXParseResult) => {
    if (rawData !== undefined) {
      const { result, errors } = parseRawExcel(rawData);
      setParsedExcel(result);
      setExcelErrors(errors);
    }
  };

  const onExcelUpload = (rawData: XLSXParseResult) => {
    parseExcel(rawData);
    setIsInProgress(false);
  };

  const goNextStep = () => {
    if (step === "upload") {
      setStep("validation");
    }
    if (step === "validation") {
      setStep("form");
    }
    if (step === "form") {
      setStep("pdf");
    }
  };

  const goPrevStep = () => {
    if (step === "validation") {
      setStep("upload");
    }
    if (step === "form") {
      setStep("validation");
    }
    if (step === "pdf") {
      setStep("form");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.navigateButtons}>
          <Button
            variant="outlined"
            onClick={goPrevStep}
            disabled={step === "upload"}
          >
            Назад
          </Button>
          <Button
            variant="outlined"
            onClick={goNextStep}
            disabled={
              step === "pdf" || parsedExcel?.length === 0 || !isFileFormatValid
            }
            color="success"
          >
            Дальше
          </Button>
        </div>

        {step === "upload" && (
          <>
            <UploadExcelInput
              isLoading={isInProgress}
              setIsLoading={setIsInProgress}
              onExcelUpload={onExcelUpload}
              setIsFileFormatValid={setIsFileFormatValid}
            />
          </>
        )}
        {/* <div className={classes.uploadButton}> */}

        {step === "validation" && (
          <>
            <div>
              Проверьте данные, полученные из Excel. Строки с ошибками (выделены
              красным) в PDF не попадут.
            </div>
            {(excelErrors?.general.length ?? 0) > 0 && (
              <div className={classes.invalidFile}>
                {excelErrors?.general?.join(". ")}
              </div>
            )}
            {(formattedExcel?.length ?? 0) > 0 && (
              <div className={classes.table}>
                <StyledDataGrid
                  // hideFooterPagination
                  // pagination={false}
                  rows={formattedExcel}
                  columns={tableColumns}
                  // getRowHeight={() => "auto"}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 50, 100]}
                  checkboxSelection
                  getCellClassName={({ row }: { row: ITableRow }) =>
                    row.errors ? "row-with-errors" : ""
                  }
                />
              </div>
            )}
          </>
        )}

        {step === "form" && (
          <FromToForm
            formData={formFromData}
            setFormData={setFormFromData}
            header="Введите данные отправителя. Они будут использованы для каждого конверта"
          />
        )}

        {step === "pdf" && (
          <PdfTemplate
            data={formattedExcel
              .filter((_, i) => excelErrors?.rows?.[i] === undefined)
              .map((i) => ({
                from: formFromData,
                to: i as IFormCommonData,
              }))}
          />
        )}

        {/* <PdfTemplate {...formData} /> */}
      </div>
    </div>

    // </div>
  );
};

export default PdfFromExcel;
