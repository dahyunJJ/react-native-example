import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigations/StackNavigator";

import { NativeBaseProvider, extendTheme } from "native-base";

// expo-font 라이브러리를 사용하여 폰트를 로드합니다.
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
// extend the theme
export const theme = extendTheme({ config });
import Loading from "./pages/Loading";

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFont = () => {
    setTimeout(async () => {
      // await Font.loadAsync({
      //     'GowunBatang-Bold': require('./assets/font/GowunBatang-Bold.ttf'),
      //     ...Ionicons.font,
      //   });
      setReady(true);
    }, 1000);
  };

  useEffect(() => {
    loadFont();
  }, []);

  return ready ? (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
