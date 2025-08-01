import axios from "axios";

import { IYandexResponse } from "../types/common";

export const getAddressWithPostalCode = async (value: string) =>
  axios
    .get("https://geocode-maps.yandex.ru/1.x", {
      params: {
        apikey: "66f0fde9-eacc-40d2-b94a-38c2e130b7e0",
        geocode: value,
        format: "json",
      },
    })
    .then((response: IYandexResponse) => {
      console.log("response", response?.data);
      if (response?.data) {
        const addressObj = (response as any)?.data.response.GeoObjectCollection
          .featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData
          .Address as {
          formatted?: string;
          postal_code?: string;
        };
        return {
          address: addressObj.formatted?.replace("Россия, ", "") ?? undefined,
          postalCode: addressObj.postal_code ?? undefined,
        };
      } else {
        return undefined;
      }
    })
    .catch(() => undefined);
