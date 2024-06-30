import { tss } from "tss-react/mui";

export const useStyles = tss.create(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "stretch",
    minWidth: 600,
  },
  formHeader: {
    fontSize: 18,

    "&::after": {
      content: '""',
      height: 1,
      backgroundColor: "lightgray",
      display: "block",
      marginTop: 10,
      marginBottom: 8,
    },
  },
}));
