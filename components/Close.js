import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const CloseButton = ({ onPress }) => {
  const styles = StyleSheet.create({
    button: {
      position: "absolute",
      right: 15,
      top: 15,
    },
    imagen: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={require("../assets/close.png")} style={styles.imagen} />
    </TouchableOpacity>
  );
};

export default CloseButton;
