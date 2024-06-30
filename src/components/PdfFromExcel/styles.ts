import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { tss } from "tss-react/mui";

export const useStyles = tss.create(() => ({
  root: {
    // marginTop: 20,
  },
  container: {
    maxWidth: 1260,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
  },
  navigateButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  uploadButton: {},
  invalidFile: {
    fontStyle: "italic",
    color: "#f14d56",
  },
  table: {
    width: "100%",
    minHeight: 500,
    display: "grid",
  },
}));

export const StyledDataGrid = styled(DataGrid)(() => ({
  "& .MuiDataGrid-row": {
    // backgroundColor: "red",
  },

  "& .MuiDataGrid-cell": {
    height: "auto",
    whiteSpace: "normal",
    lineHeight: "normal",
    display: "flex",
    alignItems: "center",
  },

  "& .row-with-errors": {
    backgroundColor: "#ff8887",
  },
}));
