import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const MenuOption = ({ onPress, imageSource, buttonText }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 10,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    imagen: {
      width: 25,
      height: 25,
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

export default MenuOption;
