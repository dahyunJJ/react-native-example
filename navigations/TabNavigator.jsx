import React, { useEffect } from "react";

import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage";
import AddPage from "../pages/AddPage";

// expo 에서 제공하는 아이콘
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      // route에서 screen name 을 가져와서 해당하는 아이콘을 띄워줌

      screenOptions={({ route }) => ({
        // tabnavigator 에서 제공하는 tabBarIcon 기능
        // 모든 페이지에 동시에 적용되는 기능
        tabBarIcon: ({ focused }) => {
          //현재 이 앱을 구동하고 있는 디바이스가 뭔지 Platform.OS 을 통해 확인 할 수 있음
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (route.name === "MainPage") {
            iconName += "list";
          } else if (route.name === "AddPage") {
            iconName += "apps-outline";
          } else if (route.name === "MyPage") {
            iconName += "person";
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? "tomato" : "grey"}
              size={26}
            />
          );
        },
        // tabBarActiveTintColor: "tomato",
        // tabBarInactiveTintColor: "gray",
        // Screen name 텍스트 안보이게 하기
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: 
          {
            height: 100,
            display: "flex",
          },
      })}
    >
      <Tabs.Screen name="MainPage" component={MainPage} />
      <Tabs.Screen name="AddPage" component={AddPage} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
};
export default TabNavigator;