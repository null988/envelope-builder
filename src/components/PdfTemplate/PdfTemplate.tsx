import { Document, Page, Image, PDFViewer, Text } from "@react-pdf/renderer";
import { FC } from "react";

import Template from "./../../images/template.png";
import { classes } from "./styles";
import { IFormData } from "../../types/types";

export const PdfTemplate: FC<IFormData> = ({
  from,
  fromAddress,
  fromPhone,
  fromIndex,
  to,
  toAddress,
  toPhone,
  toIndex,
}) => (
  <PDFViewer style={classes.viewer}>
    <Document>
      <Page style={classes.body} size={[836, 418]}>
        <Image style={classes.image} src={Template} />
        <Text style={classes.text1}>{from}</Text>
        <Text style={classes.text2}>{fromAddress}</Text>
        <Text style={classes.text3}>{fromPhone}</Text>
        <Text style={classes.text4}>{fromIndex}</Text>
        <Text style={classes.text5}>{to}</Text>
        <Text style={classes.text6}>{toAddress}</Text>
        <Text style={classes.text7}>{toPhone}</Text>
        <Text style={classes.text8}>{toIndex}</Text>
        <Text style={classes.index}>${toIndex}</Text>
      </Page>
    </Document>
  </PDFViewer>
);

export default PdfTemplate;
