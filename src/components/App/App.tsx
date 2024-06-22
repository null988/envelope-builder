import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { useStyles } from "./styles";
import { IFormData, IYandexResponse } from "../../types/types";
import { PdfTemplate } from "../PdfTemplate/PdfTemplate";

// {
//   from: 'СНТ "Дружба"',
//   fromAddress: "Ставропольский край, г. Ессентуки, ул. Шмидта 74Б",
//   fromPhone: "+7(962)017-51-08",
//   fromIndex: "357602",

//   to: "Иванов Иван Иванович, Иванова Василиса Егоровна",
//   toAddress:
//     "Ставропольский край, г. Ессентуки, ул. 60 лет Октября 16б кв. 37",
//   toPhone: "+7(964)017-55-36",
//   toIndex: "357600",
// }

function App() {
  const { classes } = useStyles();

  const [formData, setFormData] = useState<IFormData>({
    from: 'СНТ "Дружба" длинная строка длинная строка длинная строка длинная строка длинная строка длинная строка',
    fromAddress:
      "Ставропольский край, г. Ессентуки, ул. Шмидта 74Б длинная строка длинная строка длинная строка длинная строка",
    fromPhone: "+7(962)017-51-08",
    fromIndex: "357602",

    to: "Иванов Иван Иванович, Иванова Василиса Егоровна длинная строка длинная строка длинная строка длинная строка длинная строка",
    toAddress:
      "Ставропольский край, г. Ессентуки, ул. 60 лет Октября 16б кв. 37 длинная строка длинная строка длинная строка длинная строка длинная строка длинная строка длинная строка длинная строка длинная строка длинная строка длинная строка",
    toPhone: "+7(964)017-55-36",
    toIndex: "357600",
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchValue] = useDebounce(formData.toAddress, 1000);

  useEffect(() => {
    if ((false as any) && searchValue) {
      axios
        .get("https://suggest-maps.yandex.ru/v1/suggest", {
          params: {
            apikey: "b33f0106-5e39-477e-b31d-967d23db3584",
            text: searchValue,
            results: 10,
          },
        })
        .then((response: IYandexResponse) => {
          console.log(suggestions, response?.data);
          if (response?.data) {
            setSuggestions(
              response?.data.results.map(
                (i) => `${i.subtitle.text},${i.title.text}`
              )
            );
          } else {
            setSuggestions([]);
          }
        })
        .catch(() => {
          setSuggestions([]);
        })
        .finally(function () {
          // always executed
        });
    }
  }, [searchValue]);

  const onChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof formData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.forms}>
          <div className={classes.form}>
            <div className={classes.formHeader}>Данные отправителя</div>
            <TextField
              label="От кого"
              variant="outlined"
              value={formData.from}
              onChange={(e) => onChangeFormData(e, "from")}
            />
            <TextField
              label="Откуда"
              variant="outlined"
              value={formData.fromAddress}
              onChange={(e) => onChangeFormData(e, "fromAddress")}
            />
            <TextField
              label="Телефон"
              variant="outlined"
              value={formData.fromPhone}
              onChange={(e) => onChangeFormData(e, "fromPhone")}
            />
            <TextField
              label="Индекс места отправления"
              variant="outlined"
              value={formData.fromIndex}
              onChange={(e) => onChangeFormData(e, "fromIndex")}
            />
          </div>
          <div className={classes.form}>
            <div className={classes.formHeader}>Данные получателя</div>
            <TextField
              label="Кому"
              variant="outlined"
              value={formData.to}
              onChange={(e) => onChangeFormData(e, "to")}
            />
            <TextField
              label="Куда"
              variant="outlined"
              value={formData.toAddress}
              onChange={(e) => onChangeFormData(e, "toAddress")}
            />
            <TextField
              label="Телефон"
              variant="outlined"
              value={formData.toPhone}
              onChange={(e) => onChangeFormData(e, "toPhone")}
            />
            <TextField
              label="Индекс места назначения"
              variant="outlined"
              value={formData.toIndex}
              onChange={(e) => onChangeFormData(e, "toIndex")}
            />
          </div>
        </div>

        <div className={classes.button}>
          <Button variant="contained">Сформировать конверт</Button>
        </div>
        <PdfTemplate {...formData} />
      </div>
    </div>
  );
}

export default App;
