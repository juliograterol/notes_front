import React from "react";
import { View, Text, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";

const AllFolders = ({ navigation }) => {
  return (
    <View>
      <Menu />
      <ButtonComponent
        onPress={() => navigation.navigate("Carpeta1")}
        imageSource={require("../assets/Folder.png")}
        buttonText="Carpeta 1"
      />
    </View>
  );
};

export default AllFolders;
