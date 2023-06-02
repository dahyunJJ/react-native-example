/////-------좋아요 기능 데이터베이스에 저장하기-------/////
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  IconButton,
  Icon,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import ImageBlurLoading from "react-native-image-blur-loading";

import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";

export default function CardComponent({ content, navigation }) {
  const goDetail = () => {
    navigation.navigate("DetailPage", { content: content });
  };
  // 좋아요 기능 함수
  const likeFunc = async () => {
    const uid = auth.currentUser.uid;
    const did = content.date + "D";
    let result = await doLike(uid, did);
    if (result) {
      console.log("좋아요 입력");
    }
  };

  const doLike = async (uid, did) => {
    try {
      const date = new Date();
      const getTime = date.getTime();
      await setDoc(doc(db, "diary", did, "likes", uid), {
        date: getTime,
      });
      return true;
    } catch (err) {
      console.log("좋아요 입력 에러", err);
      return false;
    }
  };
  // console.log("로그인 된 uid ------ ", auth.currentUser.uid);
  // console.log("받아온 content 정보 ------ ", content);
  return (
    <Box
      mb={8}
      mx={8}
      maxW="80"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <TouchableOpacity onPress={goDetail}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <ImageBlurLoading
              withIndicator
              thumbnailSource={{ uri: content.image }}
              source={{ uri: content.image }}
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            {content.id}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {content.title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {content.author}
            </Text>
          </Stack>
          <Text fontWeight="400" numberOfLines={2}>
            {content.desc}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
            >
              6 mins ago
            </Text>
            <HStack>
              <IconButton
                onPress={() => {
                  likeFunc();
                }}
                // icon={<Icon color={"indigo.800"} as={Entypo} name="heart" />}
                icon={
                  <Icon
                    color={"indigo.800"}
                    as={Entypo}
                    name="heart-outlined"
                  />
                }
              ></IconButton>
              <IconButton
                color={"indigo.400"}
                icon={<Icon color={"indigo.800"} as={Entypo} name="message" />}
              ></IconButton>
            </HStack>
          </HStack>
        </Stack>
      </TouchableOpacity>
    </Box>
  );
}
