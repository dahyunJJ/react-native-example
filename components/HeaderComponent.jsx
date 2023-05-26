import React from "react";
// import { View } from "react-native";
import {
  VStack, HStack, Button,
  IconButton, Icon, Text,
  NativeBaseProvider,
  Center, Box, StatusBar,
  Menu, HamburgerIcon, Pressable
} from "native-base";
import { MaterialIcons, Feather  } from "@expo/vector-icons";

export default function HeaderComponent() { 
  return (
      <HStack bg="#999" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%"  safeAreaTop>
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
            IN_STAR
          </Text>
        </HStack>
        <HStack>
          {/* <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} /> */}
          {/* <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} /> */}
          {/* <IconButton icon={<Feather name="more-horizontal" size={24} color="white" />} /> */}
          <Menu w="190" trigger={triggerProps => {
            return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              {/* <HamburgerIcon /> */}
              <Feather name="more-horizontal" size={24} color="white" />
            </Pressable>;
            }}>
                <Menu.Item>Arial</Menu.Item>
                <Menu.Item>Nunito Sans</Menu.Item>
                <Menu.Item isDisabled>Sofia</Menu.Item>
                <Menu.Item>Cookie</Menu.Item>
              </Menu>  
      </HStack>
      </HStack>
  )
}