import React from 'react'
import { Dimensions } from 'react-native';
import ImageBlurLoading from "react-native-image-blur-loading";

const imgWidth = Dimensions.get('window').width/3;

export default function ImageComponent({image}) { 
  return (
    <ImageBlurLoading
      source={{ uri: image }}
      thumbnailSource={{ uri: image }}
      style={{width:imgWidth, height: imgWidth}} />
  )
}
