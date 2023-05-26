import { StyleSheet, ImageBackground, Alert } from "react-native";
import { Text, FormControl, Button, Center } from "native-base";
import React, { useState, useEffect } from "react";

import ItemInput from "../components/ItemInput";
const bImage = require("../assets/bg.jpg");

// 로그인하기
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// 사용자 정보 저장
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // 로딩 완료 여부
  const [ready, setReady] = useState(true);

  // beforeRemove : 뒤로가기 방지 기능
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert("경고", "로그인페이지에서는 뒤로 갈 수 없습니다");
    });

    // 로딩화면 보여줄 때 session 값 확인해서 메인페이지로 이동
    setTimeout(() => {
      AsyncStorage.getItem("session", (err, result) => {
        console.log("로그인페이지 session ------", result);
        if (result) {
          // 가입정보가 있다면 바로 메인페이지로 이동
          navigation.navigate("TabNavigator");
        } else {
          // 가입정보가 없다면 로그인 페이지를 보여줌
          setReady(false);
        }
      });
      setReady(false);
    }, 1000);
  }, []);

  const goSignup = () => {
    navigation.push("SignUpPage", { title: "로그인 페이지에서 옴" });
  };
  const doSignIn = () => {
    // 로그인 버튼을 클릭했을 때 실행되는 함수
    if (email === "") {
      setEmailError("이메일을 입력해주세요");
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("비밀번호를 입력해주세요");
    } else {
      setPasswordError("");
    }

    // Authentication 로그인 처리
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("로그인 성공", user.email);

        // AsyncStorage에 로그인 성공한 이메일을 저장
        AsyncStorage.setItem("session", email);

        // navigation.navigate("TabNavigator");
        //  push: 새로운 페이지 히스토리를 남기라는 의미
        navigation.push("TabNavigator");
        // replace : 뒤로가기 막기
        // navigation.replace("TabNavigator");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("로그인 실패", errorCode, errorMessage);
      });
  };

  // Input 상태관리 함수 생성하기
  const setEmailFunc = (itemInputEmail) => {
    // 이메일 상태값을 관리하는 함수
    setEmail(itemInputEmail);
  };
  const setPasswordFunc = (itemInputPassword) => {
    // 비밀번호 상태값을 관리하는 함수
    setPassword(itemInputPassword);
  };

  return (
    <Center style={styles.container} pt={10}>
      <ImageBackground ImageBackground source={bImage} style={styles.backImage}>
        <Text color="#fff" fontSize={20} fontWeight="bold" pt={2}>
          IN
          <Text color={"yellow.200"}>_STAR</Text>
        </Text>

        <FormControl w={"80%"} p={4}>
          {/* title, type (text, password, email), error, function */}
          <ItemInput
            title={"이메일"}
            type={"email"}
            setFunc={setEmailFunc}
            error={emailError}
          />
          <ItemInput
            title={"비밀번호"}
            type={"password"}
            setFunc={setPasswordFunc}
            error={passwordError}
          />

          <Button mt={6} onPress={doSignIn}>
            <Text color={"warmGray.100"}>로그인</Text>
          </Button>
          <Button mt={6} onPress={goSignup}>
            <Text color={"warmGray.100"}>회원가입</Text>
          </Button>
        </FormControl>
      </ImageBackground>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backImage: {
    flex: 1,
    width: "100%",
    objectFit: "cover",
    alignItems: "center",
  },
});
