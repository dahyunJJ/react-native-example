import React from 'react';
import { View  } from 'react-native';
import { Box, Center, Flex, Text} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function BannerComponent() {
  const fadeIn = {
    from: {
      opacity: 0.5,
      left: 0,
      scale: 0.9,
    },
    to: {
      opacity: 1,
      left: 10,
      scale:1.1
    },
  };

  return (
    <Center my={8}>
      <Flex
        flexDirection={'row'}
        w={'80%'}
        p={4}
        borderRadius={10}
        backgroundColor={'indigo.700'}
      >
        <Animatable.View
          animation={fadeIn}
          easing="ease-out"
          iterationCount="infinite"
          duration={2000}
          direction="alternate"
        >
          <MaterialCommunityIcons
            name="airballoon" size={40} color="white" />
        </Animatable.View>
        <Box pl={8}>
          <Text color={'white'}>배너입니다.</Text>
          <Text color={'white'}>배너입니다.</Text>
        </Box>
      </Flex>
    </Center>
  )
 }