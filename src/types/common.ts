export interface IFormCommonData {
  fio: string;
  address: string;
  phone: string;
  index: string;
}

export interface TEnvelopeData {
  from: IFormCommonData;
  to: IFormCommonData;
}

export interface ITableRow extends Partial<IFormCommonData> {
  id: number;
  initialAddress: string;
  errors?: string;
}

export interface IYandexResponse {
  data:
    | {
        results: Array<{
          title: {
            text: string; // "улица 60 лет Октября",
          };
          subtitle: {
            text: string; // "Ессентуки, Ставропольский край",
          };
          tags: ["street"];
        }>;
      }
    | undefined;
}

export interface IExcelErrors {
  general: string[];
  rows: Record<number, string[]>;
}

export type XLSXParseResult = Array<Array<string | number | undefined | null>>;
export type XLSXParseResultCell = XLSXParseResult[number][number];
