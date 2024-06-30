import { styled } from "@mui/material/styles";
import { tss } from "tss-react/mui";

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const useStyles = tss.create(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 16,

    "& > div": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  // uploadField: {
  //   borderRadius: 6,
  //   border: [1, "dashed", "#d0d6e1"],
  //   display: "flex",
  //   padding: [20, 24],
  //   justifyContent: "center",
  //   alignItems: "center",
  //   color: "#7a869a",
  //   position: "relative",
  //   transition: "all 0.2s",

  //   "& > input": {
  //     position: "absolute",
  //     width: "100%",
  //     height: "100%",
  //     cursor: "pointer",
  //     opacity: 0,
  //   },

  //   "&:hover": {
  //     background: "#f4f9e6",
  //   },
  // },

  // active: {
  //   background: "#f4f9e6",
  //   border: [1, "dashed", "#97ba1e"],
  // },

  // greenText: {
  //   color: "#97ba1e",
  //   marginLeft: 4,
  // },

  // uploadIcon: {
  //   width: 20,
  //   height: 20,
  //   marginRight: 8,
  // },

  invalidFile: {
    fontStyle: "italic",
    color: "#f14d56",
  },

  notSelected: {
    fontStyle: "italic",
    color: "#95a0b3",
  },

  fileInfo: {
    padding: [4, 0],
    color: "#7a869a",
    fontSize: 14,
  },
}));
