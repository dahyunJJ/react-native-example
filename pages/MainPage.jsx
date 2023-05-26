import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { useEffect } from "react";

import { Center } from "native-base";
import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import BannerComponent from "../components/BannerComponent";
const data = require("../data.json");
console.log(data.diary);

export default function MainPage({ navigation }) {
  // useEffect(() => {
  //   const textalret = navigation.addListener('focus', (e) => {
  //     Alert.alert('메인페이지 입니다.');
  //   })
  //   return textalret;
  // }, [navigation])

  // beforeRemove : 뒤로가기 방지 기능
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert("경고", "로그인페이지로 갈 수 없습니다");
    });
  }, []);

  return (
    <ScrollView>
      <HeaderComponent />
      <BannerComponent />
      <Center>
        {data.diary.map((content, i) => {
          return (
            <CardComponent content={content} key={i} navigation={navigation} />
          );
        })}
      </Center>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  // },
});
