import { tss } from "tss-react/mui";

export const useStyles = tss.create(() => ({
  root: {
    marginTop: 20,
  },
  container: {
    maxWidth: 1260,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  forms: {
    display: "flex",
    gap: 40,
  },
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
  button: {},
}));
