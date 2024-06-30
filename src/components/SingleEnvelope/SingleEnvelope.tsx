import { Button } from "@mui/material";
import { useState } from "react";

import { emptyCommonData } from "./constants";
import { useStyles } from "./styles";
import { IFormCommonData } from "../../types/common";
import FromToForm from "../FromToForm/FromToForm";
import { PdfTemplate } from "../PdfTemplate/PdfTemplate";

const SingleEnvelope = () => {
  const { classes } = useStyles();

  const [formFromData, setFormFromData] =
    useState<IFormCommonData>(emptyCommonData);
  const [formToData, setFormToData] =
    useState<IFormCommonData>(emptyCommonData);

  const onClear = () => {
    setFormFromData(emptyCommonData);
    setFormToData(emptyCommonData);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.forms}>
          <FromToForm
            formData={formFromData}
            setFormData={setFormFromData}
            header="Данные отправителя"
          />
          <FromToForm
            formData={formToData}
            setFormData={setFormToData}
            header="Данные получателя"
          />
        </div>

        <div className={classes.button}>
          <Button variant="contained" color="error" onClick={onClear}>
            Очистить форму
          </Button>
        </div>
        <PdfTemplate
          data={[
            {
              from: formFromData,
              to: formToData,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SingleEnvelope;
