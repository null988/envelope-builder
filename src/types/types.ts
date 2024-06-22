export interface IFormData {
  from: string;
  fromAddress: string;
  fromPhone: string;
  fromIndex: string;
  to: string;
  toAddress: string;
  toPhone: string;
  toIndex: string;
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
