import React from "react";
import { FormControl, Input, Text, Box } from "native-base";

export default function ItemInput({ title, type, setFunc, error }) {
  return (
    <Box>
      <FormControl.Label py={2}>
        {/* <Text color={'#fff'} style={{fontFamily:'GowunBatang-Bold'}}>{title }</Text> */}
        <Text color={"#fff"}>{title}</Text>
      </FormControl.Label>
      <Input
        placeholder={type}
        // secureTextEntry={true} : 비밀번호 안보이는 기능
        secureTextEntry={type === "password" ? true : false}
        onChangeText={(text) => {
          text = text.trim(); // 입력값에 공백이 있을 경우 알아서 공백을 없애준다.
          setFunc(text);
        }} // 입력된 값을 바로 뱉는 속성함수
      />
      <Text style={{ color: "yellow" }}>{error}</Text>
    </Box>
  );
}
