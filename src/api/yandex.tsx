import axios from "axios";

import { IYandexResponse } from "../types/common";

export const getAddressWithPostalCode = async (value: string) =>
  axios
    .get("https://geocode-maps.yandex.ru/1.x", {
      params: {
        apikey: "629dd61c-9bbe-4287-ae97-b8283be11cc3",
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
