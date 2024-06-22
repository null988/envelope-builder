import { Font, StyleSheet } from "@react-pdf/renderer";

// !!! Разобраться почему работает
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PostIndex from "./../../fonts/PostIndex.ttf";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

Font.register({
  family: "PostIndex",
  src: PostIndex,
});

export const classes = StyleSheet.create({
  page: {
    backgroundColor: "#d11fb6",
    color: "white",
  },
  text1: {
    fontSize: 11,
    fontFamily: "Roboto",
    position: "absolute",
    top: 22,
    left: 20,
    width: 310,
    height: 50,
    textIndent: 50,
    lineHeight: "2",
  },
  text2: {
    fontSize: 11,
    fontFamily: "Roboto",
    position: "absolute",
    top: 72,
    left: 20,
    width: 310,
    height: 70,
    textIndent: 50,
    lineHeight: "2",
  },
  text3: {
    fontSize: 12,
    fontFamily: "Roboto",
    position: "absolute",
    top: 142,
    left: 50,
    width: 150,
    height: 20,
    letterSpacing: "2px",
  },
  text4: {
    fontSize: 16,
    fontFamily: "Roboto",
    position: "absolute",
    top: 140,
    left: 206,
    width: 116,
    height: 25,
    letterSpacing: "5px",
    textAlign: "center",
  },
  text5: {
    fontSize: 11,
    fontFamily: "Roboto",
    position: "absolute",
    top: 182,
    left: 400,
    width: 360,
    height: 50,
    textIndent: 40,
    lineHeight: "2",
  },
  text6: {
    fontSize: 11,
    fontFamily: "Roboto",
    position: "absolute",
    top: 232,
    left: 400,
    width: 360,
    height: 90,
    textIndent: 40,
    lineHeight: "2",
  },
  text7: {
    fontSize: 12,
    fontFamily: "Roboto",
    position: "absolute",
    top: 332,
    left: 560,
    width: 150,
    height: 20,
    letterSpacing: "2px",
  },
  text8: {
    fontSize: 20,
    fontFamily: "Roboto",
    position: "absolute",
    top: 326,
    left: 398,
    width: 126,
    height: 32,
    letterSpacing: "5px",
    textAlign: "center",
  },

  index: {
    fontSize: 60,
    fontFamily: "PostIndex",
    position: "absolute",
    top: 300,
    left: 30,
    letterSpacing: "5px",
  },

  viewer: {
    width: "100%",
    height: 800,
  },
  body: {
    // paddingTop: 35,
    // paddingBottom: 65,
    // paddingHorizontal: 35,
  },
  image: {
    height: "100%",
  },
});
