import { Document, Page, Image, PDFViewer, Text } from "@react-pdf/renderer";
import { FC } from "react";

import Template from "./../../images/template.png";
import { classes } from "./styles";
import { TEnvelopeData } from "../../types/common";

export const PdfTemplate: FC<{ data: TEnvelopeData[] }> = ({ data }) => (
  <PDFViewer style={classes.viewer}>
    <Document>
      {data.map(({ from, to }, index) => (
        <Page style={classes.body} size={[836, 418]} key={index}>
          <Image style={classes.image} src={Template} />
          <Text style={classes.text1}>{from.fio}</Text>
          <Text style={classes.text2}>{from.address}</Text>
          <Text style={classes.text3}>{from.phone}</Text>
          <Text style={classes.text4}>{from.index}</Text>
          <Text style={classes.text5}>{to.fio}</Text>
          <Text style={classes.text6}>{to.address}</Text>
          <Text style={classes.text7}>{to.phone}</Text>
          <Text style={classes.text8}>{to.index}</Text>
          <Text style={classes.index}>${to.index}</Text>
        </Page>
      ))}
    </Document>
  </PDFViewer>
);

export default PdfTemplate;
