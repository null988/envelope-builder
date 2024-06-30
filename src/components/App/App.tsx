import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";

import { useStyles } from "./styles";
import PdfFromExcel from "../PdfFromExcel/PdfFromExcel";
import SingleEnvelope from "../SingleEnvelope/SingleEnvelope";

function CustomTabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const { classes } = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <Tab label="Сформировать один конверт" {...a11yProps(0)} />
          <Tab label="Сформировать из Excel" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SingleEnvelope />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PdfFromExcel />
      </CustomTabPanel>
    </div>
  );
}

export default App;
