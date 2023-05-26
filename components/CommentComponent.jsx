import React from 'react'
import { StyleSheet} from 'react-native'
import { Box, Text, Flex, Button } from 'native-base'
import ImageBlurLoading from "react-native-image-blur-loading";

import my from '../assets/my.jpg'
// const my = require('../assets/my.jpg')

export default function CommentComponent() { 
  return (
    <Flex
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      px={4}
      py={2}
      borderStyle={'dotted'}
      borderBottomColor={'#9f9f9f'}
      borderBottomWidth={1}
    >
      <ImageBlurLoading source={my} style={styles.thumbnail} />
      <Box px={4} w={'70%'}>
        <Text>작성자</Text>
        <Text numberOfLines={1}>메시지 내용이 들어갑니다~~~ 한줄로만 표시되도록</Text>
      </Box>
      <Button
      backgroundColor={'transparent'}><Text>삭제</Text></Button>
    </Flex>
  )
}
const styles = StyleSheet.create({
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 50,
  }
})