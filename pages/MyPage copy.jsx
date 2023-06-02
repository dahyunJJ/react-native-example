import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Center, HStack, Text, VStack, Flex } from "native-base";
import HeaderComponent from "../components/HeaderComponent";
import ImageComponent from "../components/ImageComponent";
import ImageBlurLoading from "react-native-image-blur-loading";

import my from "../assets/my.jpg";
const data = require("../data.json");

// firebase 로그아웃 기능
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// 사용자 정보 저장
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPage({ navigation }) {
  const logoutFunc = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃");

        // AsyncStorage에서 session 삭제
        AsyncStorage.removeItem("session", (err, result) => {
          console.log("저장통", result);
        });

        navigation.push("SignInPage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderComponent />
      <Center py={6}>
        <ImageBlurLoading source={my} style={styles.thumbnail} />
        <Text>아이디</Text>
        <Text>이메일</Text>
        <TouchableOpacity style={styles.logout} onPress={logoutFunc}>
          <Text color={"white"}>로그아웃</Text>
        </TouchableOpacity>
      </Center>
      <Flex flexDirection={"row"} justifyContent={"center"}>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>작성한 글</Text>
          <Text fontWeight={700} color={"orange.800"} fontSize={20}>
            30
          </Text>
        </VStack>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>작성한 댓글</Text>
          <Text fontWeight={700} color={"orange.800"} fontSize={20}>
            30
          </Text>
        </VStack>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>방문 횟수</Text>
          <Text fontWeight={700} color={"orange.800"} fontSize={20}>
            30
          </Text>
        </VStack>
      </Flex>
      <Flex mt={6} flexDirection={"row"} flexWrap={"wrap"} borderColor={"red"}>
        {data.diary.map((content, i) => (
          <ImageComponent image={content.image} key={content.id} />
        ))}
      </Flex>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logout: {
    backgroundColor: "#999",
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
