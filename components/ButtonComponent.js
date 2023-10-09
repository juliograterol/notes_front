import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ButtonComponent = ({ onPress, imageSource, buttonText, color }) => {
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
    },
    imagen: {
      opacity: 0.9,
      width: 75,
      height: 75,
      resizeMode: "contain",
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={imageSource} style={styles.imagen} />
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
