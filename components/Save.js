import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const SaveButton = ({ onPress, left, right }) => {
  const styles = StyleSheet.create({
    button: {
      position: "absolute",
      right: right,
      left: left,
      bottom: 15,
    },
    imagen: {
      width: 75,
      height: 75,
      resizeMode: "contain",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={require("../assets/save.png")} style={styles.imagen} />
    </TouchableOpacity>
  );
};

export default SaveButton;
