import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Center, Pressable, Text, Input, TextArea, Button } from "native-base";
import ImageBlurLoading from "react-native-image-blur-loading";

import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { storage } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import HeaderComponent from "../components/HeaderComponent";
const bg2 = require("../assets/bg.jpg");
// 등록을 위한 임시 이미지
const tempImage =
  "https://firebasestorage.googleapis.com/v0/b/instar-b7972.appspot.com/o/london.png?alt=media&token=a85bfaae-fde8-4c72-826b-790004b1ff7d";

// 이미지-피커 라이브러리
import * as ImagePicker from "expo-image-picker";

export default function AddPage() {
  // 게시글 등록 상태관리
  const [image, setImage] = useState(tempImage); // 게시글 이미지
  const [imageUri, setImageUri] = useState(""); // 업로드할 이미지 uri
  const [title, setTitle] = useState(""); // 게시글 제목
  const [titleError, setTitleError] = useState(""); // 게시글 제목 에러
  const [content, setContent] = useState(""); // 게시글 내용
  const [contentError, setContentError] = useState(""); // 게시글 내용 에러

  //현재 유저 정보 가져오기
  const user = auth.currentUser;
  if (user) {
    console.log("현재 유저 정보", user.uid);
  } else {
    console.log("현재 유저 정보 없음");
  }

  // 등록버튼 클릭 시 실행 함수
  const upload = () => {
    console.log("업로드 준비중!!");
    console.log("제목", title);
    console.log("제목", content);
    console.log("내용", image);

    let date = new Date(); // 현재 시간 저장
    let data = {
      // 게시글 정보
      title: title,
      author: user.email,
      desc: content,
      date: date.getTime(),
      uid: user.uid,
      image: image,
    };

    let result = addDiary(data); // 게시글 등록 함수 실행
    if (result) {
      // Alert('게시글 등록 완료');
      console.log("게시글 등록 완료");
    }
  };

  // firebase collection 에 등록하는 함수. setDoc과 doc 사용됨
  async function addDiary(data) {
    console.log("addDiary 함수 실행");
    console.log("data", data);
    try {
      const docRef = await setDoc(doc(db, "diary", `${data.date}D`), data);
      console.log("작성자정보: ", docRef);
      return true;
    } catch (e) {
      console.log("addDiary 함수 에러", e);
      return false;
    }
  }

  // 이미지-피커 함수
  useEffect(() => {
    getPermission();
  }, []);
  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("카메라 권한을 허용해주세요!");
      }
    }
  };

  // + 버튼 클릭 시 이미지-피커 실행
  const pickImage = async () => {
    console.log("이미지 선택 함수 실행");
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // 이미지 타입
      allowsEditing: true, // 편집 여부
      aspect: [16, 9], //이미지 비율
      quality: 0, //이미지 퀄리티(0: 퀄리티 낮춰줌, 1: 이미지 퀄리티 그대로 유지)
    });
    console.log(imageData.assets[0].uri); // 선택한 이미지 경로
    // setImageUri(imageData.assets[0].uri); // 미리보기 이미지 경로
    if (!imageData.assets[0].uri.cancelled) {
      // 이미지 선택 취소가 아닐 경우
      setImage(imageData.assets[0].uri);
      setImageUri(imageData.assets[0].uri);
    } else {
      // 이미지 선택 취소일 경우
      setImage(tempImage);
      setImageUri("");
    }
  };

  return (
    <ScrollView>
      <HeaderComponent />
      <Center p={4}>
        <ImageBlurLoading
          withIndicator
          source={bg2}
          thumbnailSource={bg2}
          style={{ width: "100%", height: 80, borderRadius: 10 }}
        />

        {imageUri == "" ? (
          <Pressable
            borderWidth={2}
            borderColor={"#999"}
            borderStyle={"dotted"}
            w={"100%"}
            h={150}
            borderRadius={10}
            mt={4}
            mb={4}
            justifyContent={"center"}
            onPress={pickImage}
          >
            <Text fontSize={50} textAlign={"center"}>
              +
            </Text>
          </Pressable>
        ) : (
          <ImageBlurLoading
            withIndicator
            thumbnailSource={{ uri: imageUri }}
            source={{ uri: imageUri }}
            style={{
              width: "100%",
              height: 150,
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 20,
              alignSelf: "center",
            }}
          />
        )}

        <Input
          placeholder="제목을 입력하세요"
          fontSize={14}
          borderRadius={10}
          mb={4}
          onChangeText={(text) => setTitle(text)}
        />
        <TextArea
          placeholder="내용을 입력하세요"
          borderRadius={10}
          h={150}
          onChangeText={(text) => setContent(text)}
        />
        <Button onPress={upload} w={"100%"} mt={4}>
          <Text>등록</Text>
        </Button>
      </Center>
    </ScrollView>
  );
}
