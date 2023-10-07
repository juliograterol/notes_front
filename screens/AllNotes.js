import React from "react";
import { View, Text, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";

const AllNotes = ({ navigation }) => {
  return (
    <View>
      <Menu />
      <ButtonComponent
        onPress={() => navigation.navigate("Nota")}
        imageSource={require("../assets/Note.png")}
        buttonText="Nota"
      />
    </View>
  );
};

export default AllNotes;
