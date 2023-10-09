import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const AddButton = ({ onPress }) => {
  const styles = StyleSheet.create({
    button: {
      position: "absolute",
      right: 15,
      bottom: 15,
    },
    imagen: {
      opacity: 0.9,
      width: 75,
      height: 75,
      resizeMode: "contain",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={require("../assets/add.png")} style={styles.imagen} />
    </TouchableOpacity>
  );
};

export default AddButton;
