import { Text, Image, View } from "react-native";

const Filter = () => {
  return (
    <View>
      <Text>Filtrar</Text>
      <Image
        source={require("../assets/filter.png")}
        style={{
          height: 18,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default Filter;
