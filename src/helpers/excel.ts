import {
  IExcelErrors,
  IFormCommonData,
  XLSXParseResult,
  XLSXParseResultCell,
} from "../types/common";

interface IParsedExcel {
  result: Array<Partial<IFormCommonData>>;
  errors: IExcelErrors;
}

export const ExcelColumns = ["fio", "address"] as const;
export type TExcelColumn = (typeof ExcelColumns)[number];

// Названия столбцов не должны содержаться в других названиях,
// иначе у нас будут проблемы с includes (см checkIsEqualColumn)
export const excelColumnsConfig: Record<
  TExcelColumn,
  {
    name: string;
  }
> = {
  fio: { name: "фио" },
  address: { name: "адрес" },
};
const excelColumnsNames = Object.keys(excelColumnsConfig) as TExcelColumn[];

export const checkIsEqualColumn = (
  rawHeaderCell: XLSXParseResultCell,
  columnName: string
): boolean =>
  rawHeaderCell?.toString().toLowerCase().includes(columnName) ?? false;

const validateParsedRows = (
  parsedRow: Array<Partial<IFormCommonData>>
): IExcelErrors["rows"] => {
  const result: IExcelErrors["rows"] = {};
  parsedRow.forEach((row, index) => {
    if (
      Object.entries(row).some(
        ([column, value]) =>
          excelColumnsNames.includes(column as TExcelColumn) && !value
      )
    ) {
      result[index] = ["Не все поля заполнены"];
    }
  });
  return result;
};

export const parseRawExcel = (rawData: XLSXParseResult): IParsedExcel => {
  const result: Array<Partial<IFormCommonData>> = [];
  const errors: IExcelErrors = {
    general: [],
    rows: {},
  };

  const excelColumnIndexesMap: Record<
    TExcelColumn,
    { rowIndex: number; columnIndex: number }
  > = {
    address: {
      rowIndex: -1,
      columnIndex: -1,
    },
    fio: {
      rowIndex: -1,
      columnIndex: -1,
    },
  };
  let isFileCorrect = false;

  // Ищем нужные заголовки
  try {
    rawData.forEach((_, rowIndex) => {
      Object.entries(excelColumnsConfig).forEach(([column, { name }]) => {
        const columnIndex = rawData[rowIndex].findIndex((v) =>
          checkIsEqualColumn(v, name)
        );
        if (columnIndex >= 0) {
          excelColumnIndexesMap[column as TExcelColumn] = {
            columnIndex,
            rowIndex,
          };
        }
        if (
          Object.values(excelColumnIndexesMap)
            .map((i) => Object.values(i))
            .flat()
            .every((i) => i !== undefined && i >= 0)
        ) {
          throw new Error();
        }
      });
    });
  } catch {
    isFileCorrect = true;
    console.log("Все ок. Индексы нужных столбцов найдены");
  }

  if (isFileCorrect) {
    // имея индексы заголовков парсим строки с данными
    rawData.forEach((rawRow, currentRowIndex) => {
      const parsedRow: Partial<IFormCommonData> = {};
      Object.entries(excelColumnIndexesMap).forEach(
        ([column, { rowIndex, columnIndex }]) => {
          if (currentRowIndex > rowIndex) {
            parsedRow[column as TExcelColumn] =
              rawRow[columnIndex]?.toString() ?? undefined;
          }
        }
      );

      // пустые строки в результат не записываем
      if (Object.values(parsedRow).filter((i) => i).length > 0) {
        result.push(parsedRow);
      }
    });
    errors.rows = validateParsedRows(result);
  } else {
    // файл заполненный по некорректному шаблону не рассматриваем
    errors.general.push(
      'Файл имеет некорректный формат. Столбцы "ФИО" и "Адрес" не найдены'
    );
  }

  return {
    result,
    errors,
  };
};
