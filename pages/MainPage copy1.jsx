////////-----MainPage Original-----////////
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { useState, useEffect } from "react";

import { Center } from "native-base";
import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import BannerComponent from "../components/BannerComponent";
// const data = require("../data.json");
// console.log(data.diary);

import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);

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
    readyData();
  }, []);

  const readyData = async () => {
    const data = await getData();
    setData(data);
  };

  // firebase의 diary db에서 모든 데이터 가져온다.
  // 가져온 데이터를 data state에 저장한다.
  const getData = async () => {
    const diaryRef = collection(db, "diary");
    const diarySnapshot = await getDocs(diaryRef);
    let data = [];
    diarySnapshot.docs.map((doc) => {
      // data.push(doc.data());
      data.unshift(doc.data()); // unshift : 위쪽으로 쌓임
    });
    return data;
  };

  return (
    <ScrollView>
      <HeaderComponent />
      <BannerComponent />
      <Center>
        {data.map((content, i) => {
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
