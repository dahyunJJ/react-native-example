import React from "react";
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import { createStackNavigator } from "@react-navigation/stack";

//페이지로 만든 컴포넌트들을 불러옵니다
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import DetailPage from "../pages/DetailPage";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 50,
        },
        // 헤더 숨기기
        // headerShown: false,
      }}
    >
      <Stack.Screen name="SignInPage" component={SignInPage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
