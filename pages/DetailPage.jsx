import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Flex, Text, Input, IconButton, Icon, Box } from "native-base";
import { useEffect, useState } from "react";

import ImageBlurLoading from "react-native-image-blur-loading";
import { Entypo } from "@expo/vector-icons";

import CommentComponent from "../components/CommentComponent";

import { db, auth } from "../config/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function DetailPage({ navigation, route }) {
  const content = route.params.content;
  // console.log("--------> content : ", content);

  const [commentInput, setCommentInput] = useState(""); // 댓글 입력창 상태관리
  const [comment, setComment] = useState([]); // 작성된 댓글 상태관리

  useEffect(() => {
    navigation.setOptions({
      title: content.title,
      headerStyle: {
        backgroundColor: "transparent",
        height: 80,
        // shadowColor: '#fff',
        shadowColor: "transparent",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerShown: true,
    });

    // 댓글 로드
    commentLoad(content.date);
  }, []);

  const commentLoad = async (did) => {
    console.log("댓글 로드 시작");
    console.log(did + "D");
    let c = await getComment(did + "D");
    if (c == 0) {
      console.log("댓글이 없습니다");
      return;
    } else {
      setComment(c);
    }
  };

  const getComment = async (did) => {
    let data = [];
    const q = query(collection(db, "comment"), where("did", "==", did));
    const snapShot = await getDocs(q);
    if (snapShot.empty) {
      console.log("댓글이 없습니다");
      return 0;
    } else {
      snapShot.forEach((doc) => {
        // data.push(doc.data());
        data.unshift(doc.data());
      });
      return data;
    }
  };

  // 댓글 달면 화면에 바로 적용되도록 수정
  async function commentFunc() {
    // try-catch 에러를 쉽게 확인하기 위함. 사용자에게 경고창으로 알려줄 수 있음
    try {
      // 날짜, 사용자 정보, 댓글내용
      let date = new Date();
      let getTime = date.getTime();
      const currentUser = auth.currentUser;
      let newComment = {
        date: getTime,
        comment: commentInput,
        did: content.date + "D", // did: 댓글의 문서 정보
        uid: currentUser.uid,
      };
      let result = await addComment(newComment);
      if (result) {
        Alert.alert("댓글 저장 완료");
        setCommentInput(""); // 댓글창 초기화
        setComment([newComment, ...comment]);
      }
    } catch (err) {
      Alert.alert("댓글이 저장되지 않습니다", err.message);
    }
  }

  async function addComment(comment) {
    try {
      const userRef = doc(db, "users", comment.uid); // 현재 접속중인 유저 정보
      const userSnapshot = await getDoc(userRef); // 유저 정보 가져오기
      const userData = userSnapshot.data();
      comment.author = userData.nickName;
      setDoc(doc(db, "comment", `${comment.date}D`), comment);
      console.log("댓글 저장 완료!!");
      return true;
    } catch (err) {
      Alert.alert("댓글 저장에 문제가 있습니다.", err.message);
      return false;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Flex p={30}>
        {/* <Text borderWidth={1} py={2}>{content.title}</Text> */}
        <ImageBlurLoading
          withIndicator
          thumbnailSource={{ uri: content.image }}
          source={{ uri: content.image }}
          style={{ width: "100%", height: 200, borderRadius: 10 }}
        />
        <Text py={4}>{content.desc}</Text>
      </Flex>
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={3}
        pr={6}
      >
        <Input
          placeholder="한마디 부탁합니다~"
          w={"85%"}
          value={commentInput}
          onChangeText={(text) => {
            setCommentInput(text);
          }}
        />
        <IconButton
          onPress={() => {
            console.log("댓글달기");
            commentFunc();
          }}
          colorScheme="indigo"
          icon={<Entypo name="message" size={24} color="#999" />}
          // icon={<Icon as={Entypo} name="message" size={24} color="#999" />}
        />
      </Flex>
      <Box>
        {comment.map((item, index) => {
          return <CommentComponent comment={item} key={index} />;
        })}
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff'
  // },
});
