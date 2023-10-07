import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff25",
  },
  imagen: {
    opacity: 0.9,
    width: 75,
    height: 75,
    resizeMode: "contain",
  },
});

export default FolderView;
