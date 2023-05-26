import { StyleSheet, ImageBackground } from "react-native";
import {
  Center,
  Text,
  Button,
  FormControl,
  ScrollView,
  KeyboardAvoidingView,
} from "native-base";
import React, { useState } from "react";

import ItemInput from "../components/ItemInput";
const bImage = require("../assets/bg.jpg");

// 회원인증을 통한 가입
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// firestore에 데이터 저장
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
// 사용자 정보 저장
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpPage({ navigation, route }) {
  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const goSignin = () => {
    navigation.navigate("SignInPage");
  };

  const doSignUp = () => {
    if (nickName === "") {
      setNickNameError("닉네임을 입력해주세요");
      return false;
    } else {
      setNickNameError("");
    }
    if (email === "") {
      setEmailError("이메일을 입력해주세요");
      return false;
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("비밀번호를 입력해주세요");
      return false;
    } else {
      setPasswordError("");
    }
    if (passwordConfirm === "") {
      setPasswordConfirmError("비밀번호를 입력해주세요");
      return false;
    } else {
      setPasswordConfirmError("");
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다");
      return false;
    } else {
      setPasswordConfirmError("");
    }

    // 회원가입 처리
    createUserWithEmailAndPassword(auth, email, password, nickName)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("가입성공", user);

        // 가입과 동시에 AsyncStorage에 사용자 정보 저장
        AsyncStorage.setItem("session", email);

        // 사용자 정보 firestore에 저장
        // db에 저장될 때 uid 값이 난수로 임의 생성되는 것을 막기 위해
        // 회원가입 할 때 생성되는 uid값을 저장해야 관리하기 편하다.
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, {
          uid: user.uid, //Authentication - uid
          email: user.email, //Authentication - email
          nickName: nickName, // 가입창에서 입력한 닉네임
        });

        navigation.replace("SignInPage");
        // navigation.navigate("SignInPage"); // goSignin(); 위에 만들어놓은 실행함수로도 가능
        // replace : 뒤로가기 막기
        // navigation.replace("TabNavigator");
        // navigation.push("TabNavigator");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("가입실패", errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container} pb={100}>
        {/* <Text>회원가입페이지</Text>
      <Text>{route.params.title}</Text> */}
        <ImageBackground source={bImage} style={styles.backImage}>
          <Text color="#fff" fontSize={20} fontWeight="bold" pt={2}>
            IN
            <Text color={"yellow.200"}>_STAR</Text>
          </Text>

          <FormControl w={"80%"} p={4}>
            <ItemInput
              title={"닉네임"}
              type={"nickName"}
              setFunc={setNickName}
              error={nickNameError}
            />
            <ItemInput
              title={"이메일"}
              type={"email"}
              setFunc={setEmail}
              error={emailError}
            />
            <ItemInput
              title={"비밀번호"}
              type={"password"}
              setFunc={setPassword}
              error={passwordError}
            />
            <ItemInput
              title={"비밀번호 확인"}
              type={"password"}
              setFunc={setPasswordConfirm}
              error={passwordConfirmError}
            />

            <Button mt={6}>
              <Text color={"warmGray.100"} onPress={doSignUp}>
                회원가입
              </Text>
            </Button>
            <Button mt={6} onPress={goSignin}>
              <Text color={"warmGray.100"}>로그인페이지로 이동</Text>
            </Button>
          </FormControl>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "flex-start",
  },
  backImage: {
    // flex: 1,
    width: "100%",
    objectFit: "cover",
    alignItems: "center",
  },
});
