import React from "react";
import { View, Text, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

const FolderView = ({ navigation }) => {
  return (
    <View>
      <ButtonComponent
        onPress={() => navigation.navigate("Nota")}
        imageSource={require("../assets/Note.png")}
        buttonText="Nota"
      />
    </View>
  );
};

export default FolderView;
