import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text, Flex, Button } from "native-base";
import ImageBlurLoading from "react-native-image-blur-loading";

import my from "../assets/my.jpg";
// const my = require('../assets/my.jpg')

export default function CommentComponent({ comment }) {
  function dateFormat(d) {
    // d : 시간정보가 모두 담겨있는 매개변수. 연월일시분초
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    return year + "/" + month + "/" + day;
  }
  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={4}
      py={2}
      borderStyle={"dotted"}
      borderBottomColor={"#9f9f9f"}
      borderBottomWidth={1}
    >
      <ImageBlurLoading source={my} style={styles.thumbnail} />
      <Box px={4} w={"60%"}>
        <Text>{comment.author}</Text>
        <Text numberOfLines={1}>{comment.comment}</Text>
      </Box>
      <Button backgroundColor={"transparent"}>
        <Text>{dateFormat(comment.date)}</Text>
      </Button>
    </Flex>
  );
}
const styles = StyleSheet.create({
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
