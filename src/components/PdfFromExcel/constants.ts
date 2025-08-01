import { GridColDef } from "@mui/x-data-grid";

// export const initialData = {
//   from: 'СНТ "Дружба"',
//   fromAddress: "Ставропольский край, г. Ессентуки, ул. Шмидта 74Б",
//   fromPhone: "+7(962)017-51-08",
//   fromIndex: "357602",

//   to: "Иванов Иван Иванович, Иванова Василиса Егоровна",
//   toAddress: "Ставропольский край, г. Ессентуки, ул. 60 лет Октября 16б кв. 37",
//   toPhone: "+7(964)017-55-36",
//   toIndex: "357600",
// };

// export const emptyData = {
//   from: "",
//   fromAddress: "",
//   fromPhone: "",
//   fromIndex: "",

//   to: "",
//   toAddress: "",
//   toPhone: "",
//   toIndex: "",
// };

export const tableColumns: GridColDef[] = [
  { field: "id", headerName: "№", width: 70 },
  { field: "fio", headerName: "ФИО", flex: 2, hideable: false },
  {
    field: "initialAddress",
    headerName: "Адрес из Excel",
    hideable: false,
    flex: 2,
  },

  // {
  //   field: "address",
  //   headerName: "Адрес определенный автоматически",
  //   hideable: false,
  //   flex: 2,
  // },
  // {
  //   field: "toPhone",
  //   headerName: "Телефон",
  //   // width: 90,
  //   hideable: false,
  //   flex: 1,
  // },
  {
    field: "index",
    headerName: "Индекс",
    description: "Индекс определяется автоматически",
    // sortable: false,
    width: 150,
    hideable: false,
    // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  { field: "errors", headerName: "Ошибки парсинга", hideable: false, flex: 1 },
];
