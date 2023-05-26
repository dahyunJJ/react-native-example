import { StyleSheet, View, ScrollView } from 'react-native';
import {Flex, Text, Input, IconButton, Icon, Box} from 'native-base';
import ImageBlurLoading from "react-native-image-blur-loading";
import { useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import CommentComponent from '../components/CommentComponent';

export default function DetailPage({ navigation, route }) {
  const content = route.params.content;
  useEffect(() => {
    navigation.setOptions({
      title: content.title,
      headerStyle: {
        backgroundColor: 'transparent',
        height: 80,
        // shadowColor: '#fff',
        shadowColor: 'transparent',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
      // headerBackTitleVisible: false,
    });
   })

  return (
    <ScrollView style={styles.container}>
      <Flex p={30} >
        {/* <Text borderWidth={1} py={2}>{content.title}</Text> */}
        <ImageBlurLoading
          withIndicator
          thumbnailSource={{ uri: content.image }}
          source={{ uri: content.image }}
          style={{ width:'100%', height: 200, borderRadius: 10 }}
        />
        <Text py={4}>{content.desc}</Text>
      </Flex>
      <Flex
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={3}
        pr={6}
      >
        <Input
          placeholder="한마디 부탁합니다~"
          w={'85%'}
        />
        <IconButton
          colorScheme='indigo'
          icon={<Entypo name="message" size={24} color="#999" />}
          // icon={<Icon as={Entypo} name="message" size={24} color="#999" />}
        />
      </Flex>
      <Box>
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
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
