export const getFileExtension = (filename: string | undefined): string =>
  filename?.split(".").pop() || "";
