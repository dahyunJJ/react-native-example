import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { Center, FlatList } from "native-base";
import { useState, useEffect } from "react";

import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import BannerComponent from "../components/BannerComponent";
// const data = require("../data.json");
// console.log(data.diary);

import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";

export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);

  const currentUser = auth.currentUser;

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

    getData(setNext, setData);

    // 실시간 데이터 가져오기
    const mainDataList = onSnapshot(
      query(collection(db, "diary"), orderBy("date", "desc"), limit(2)),
      (snapshot) => {
        setData(snapshot.docs.map((doc) => doc.data()));
        if (snapshot.docs.length !== 0) {
          const last = snapshot.docs[snapshot.docs.length - 1];
          setNext(last.data().date);
        }
      }
    );
    return () => {
      mainDataList();
    };
  }, []);

  // const readyData = async () => {
  //   const data = await getData(setNext);
  //   setData(data);
  // };

  console.log("다음" + next);

  async function getData(setNext, setData) {
    try {
      const data = [];
      const first = query(
        collection(db, "diary"),
        orderBy("date", "desc"),
        limit(2)
      );
      const snapshot = await getDocs(first);
      const last = snapshot.docs[snapshot.docs.length - 1];
      setNext(last.data().date);
      for (const docList of snapshot.docs) {
        console.log("[페이지네이션 01]");
        const list = docList.data();
        const likesRef = doc(
          db,
          "diary",
          `${list.date}D`,
          "likes",
          currentUser.uid
        );
        const like = await getDoc(likesRef);
        console.log("좋아요정보 -----------------------", like.data());
        // list.like = !!like.data();
        // !! : 현재 가지고 있는 값을 true와 false로 반환하라는 의미. 아래는 풀어쓴 버전
        if (like.data() == undefined) {
          list.like = false;
        } else {
          list.like = true;
        }
        data.push(list);
      }
      setData(data);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function getNextData(nextDate, setNext) {
    try {
      const data = [];
      const next = query(
        collection(db, "diary"),
        orderBy("date", "desc"),
        startAfter(nextDate),
        limit(2)
      );
      const snapshot = await getDocs(next);
      for (const docList of snapshot.docs) {
        const list = docList.data();
        const likesRef = doc(
          db,
          "diary",
          `${list.date}D`,
          "likes",
          currentUser.uid
        );
        const like = await getDoc(likesRef);
        list.like = !!like.data();
        data.push(list);
      }
      if (snapshot.docs.length !== 0) {
        const last = snapshot.docs[snapshot.docs.length - 1];
        setNext(last.data().date);
        return data;
      } else {
        return 0;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return (
    <View>
      {data.length == 0 ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          w={"100%"}
          data={data}
          // 2개 이상의 컴포넌트 넣을 때는 {} 안쪽에 return문 작성해야 한다.
          ListHeaderComponent={() => {
            return (
              <>
                <HeaderComponent />
                <BannerComponent />
              </>
            );
          }}
          onEndReachedThreshold={0}
          onEndReached={async () => {
            console.log("바닥접근 : 리프레시");
            let nextData = await getNextData(next, setNext);
            console.log("다음 데이터 ---- ", nextData);
            if (nextData == 0) {
              Alert.alert("더이상 글이 없어요!");
            } else {
              let newData = [...data, ...nextData];
              console.log(newData);
              setData(newData);
            }
          }}
          renderItem={(data) => {
            return (
              <CardComponent content={data.item} navigation={navigation} />
            );
          }}
          numColumns={1}
          keyExtractor={(item) => item.date.toString()}
        />
      )}
    </View>
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
