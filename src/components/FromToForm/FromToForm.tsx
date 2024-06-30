import { TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { useStyles } from "./styles";
import { getAddressWithPostalCode } from "../../api/yandex";
import { IFormCommonData } from "../../types/common";

const FromToForm: FC<{
  header?: string;
  formData: IFormCommonData;
  setFormData: (newFormData: IFormCommonData) => void;
}> = ({ formData, header, setFormData }) => {
  const { classes } = useStyles();

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchValue] = useDebounce(formData.address, 1000);

  useEffect(() => {
    const search = async () => {
      if (searchValue) {
        const result = await getAddressWithPostalCode(searchValue);
        console.log("use effect", suggestions, setSuggestions, result);
        // axios
        //   .get("https://suggest-maps.yandex.ru/v1/suggest", {
        //     params: {
        //       apikey: "b33f0106-5e39-477e-b31d-967d23db3584",
        //       text: searchValue,
        //       results: 10,
        //     },
        //   })
        //   .then((response: IYandexResponse) => {
        //     console.log(suggestions, response?.data);
        //     if (response?.data) {
        //       setSuggestions(
        //         response?.data.results.map(
        //           (i) => `${i.subtitle.text}, ${i.title.text}`
        //         )
        //       );
        //     } else {
        //       setSuggestions([]);
        //     }
        //   })
        //   .catch(() => {
        //     setSuggestions([]);
        //   })
        //   .finally(function () {
        //     // always executed
        //   });
        // axios
        //   .get("https://geocode-maps.yandex.ru/1.x", {
        //     params: {
        //       apikey: "629dd61c-9bbe-4287-ae97-b8283be11cc3",
        //       geocode: searchValue,
        //       format: "json",
        //       // results: 10,
        //     },
        //   })
        //   .then((response: IYandexResponse) => {
        //     console.log(suggestions, response?.data);
        //     if (response?.data) {
        //       setSuggestions(
        //         (response as any)?.data.response.GeoObjectCollection
        //           .featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData
        //           .Address.formatted
        //       );
        //     } else {
        //       setSuggestions([]);
        //     }
        //   })
        //   .catch(() => {
        //     setSuggestions([]);
        //   })
        //   .finally(function () {
        //     // always executed
        //   });
        // fetch("https://otpravka-api.pochta.ru/2.0", {
        //   headers: {
        //     accept: "application/json, text/plain, */*",
        //     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        //     "content-type": "application/json",
        //     "sec-ch-ua":
        //       '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        //     "sec-ch-ua-mobile": "?0",
        //     "sec-ch-ua-platform": '"Linux"',
        //     "sec-fetch-dest": "empty",
        //     "sec-fetch-mode": "cors",
        //     "sec-fetch-site": "same-origin",
        //     "x-xsrf-token": "be272d41-f57d-4ae7-8b64-a43f42edf80d",
        //     "X-User-Authorization": "Basic ODk2MjAxNzUxMDg6Ynd3P0gyKkxfKExmak1M",
        //   },
        //   referrer: "https://dogovor.pochta.ru/v2/",
        //   referrerPolicy: "strict-origin-when-cross-origin",
        //   body: JSON.stringify({
        //     appName: "suggestions-russianpost",
        //     reqId: 1719769269646,
        //     rmFedCities: true,
        //     addr: searchValue,
        //     searchLevelRange: [1, 3, 4, 5, 6, 65],
        //     missLevels: [0],
        //   }),
        //   method: "POST",
        //   mode: "cors",
        //   credentials: "include",
        // });
      }
    };

    search();
  }, [searchValue]);

  const onChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof formData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className={classes.form}>
      {header && <div className={classes.formHeader}>{header}</div>}
      <TextField
        label="От кого"
        variant="outlined"
        value={formData.fio}
        onChange={(e) => onChangeFormData(e, "fio")}
      />
      <TextField
        label="Откуда"
        variant="outlined"
        value={formData.address}
        onChange={(e) => onChangeFormData(e, "address")}
      />
      <TextField
        label="Телефон"
        variant="outlined"
        value={formData.phone}
        onChange={(e) => onChangeFormData(e, "phone")}
      />
      <TextField
        label="Индекс места отправления"
        variant="outlined"
        value={formData.index}
        onChange={(e) => onChangeFormData(e, "index")}
      />
    </div>
  );
};

export default FromToForm;
