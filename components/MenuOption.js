import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ButtonComponent = ({ onPress, imageSource, buttonText }) => {
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff25",
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
