////////-----더보기 기능 추가-----////////
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { Center, FlatList } from "native-base";
import { useState, useEffect } from "react";

import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import BannerComponent from "../components/BannerComponent";
// const data = require("../data.json");
// console.log(data.diary);

import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
} from "firebase/firestore";

export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);

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
    setTimeout(() => {
      readyData();
    }, 500);

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

  const readyData = async () => {
    const data = await getData(setNext);
    setData(data);
  };

  console.log("다음" + next);

  async function getData(setNext) {
    try {
      let data = [];
      const first = query(
        collection(db, "diary"),
        orderBy("date", "desc"), // js 문법 : 최근 날짜 기준으로 나열
        limit(2)
      );
      const snapshot = await getDocs(first);
      snapshot.docs.map((doc) => {
        console.log("[페이지네이션 01]");
        data.push(doc.data());
      });
      let last;
      if (snapshot.docs.length !== 0) {
        last = snapshot.docs[snapshot.docs.length - 1];
      }
      setNext(last.data().date);
      console.log(last.data().date);
      return data;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function getNextData(nextDate, setNext) {
    try {
      console.log("불러올 다음 date: " + nextDate);
      let data = [];
      const next = query(
        collection(db, "diary"),
        orderBy("date", "desc"),
        startAfter(nextDate), // startAfter : 최종 불러 온 위의 내용들의 다음 내용들
        limit(2)
      );
      const snapshot = await getDocs(next);
      snapshot.docs.map((doc) => {
        console.log("[페이지네이션 Next]");
        doc.data();
        data.push(doc.data());
      });
      console.log(snapshot.docs.length);
      let last;
      if (snapshot.docs.length !== 0) {
        last = snapshot.docs[snapshot.docs.length - 1];
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

  // firebase의 diary db에서 모든 데이터 가져온다.
  // 가져온 데이터를 data state에 저장한다.
  // const getData = async () => {
  //   const diaryRef = collection(db, "diary");
  //   const diarySnapshot = await getDocs(diaryRef);
  //   let data = [];
  //   diarySnapshot.docs.map((doc) => {
  //     // data.push(doc.data());
  //     data.unshift(doc.data()); // unshift : 위쪽으로 쌓임
  //   });
  //   return data;
  // };

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
