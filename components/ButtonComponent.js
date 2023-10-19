import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ButtonComponent = ({
  onPress,
  imageSource,
  buttonText,
  color,
  noteDisplay,
  buttonDescription,
}) => {
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
    },
    imagen: {
      width: 75,
      height: 75,
      resizeMode: "contain",
    },
    title: {
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={imageSource} style={styles.imagen} />
      <Text style={styles.title} numberOfLines={2}>
        {buttonText}
      </Text>
      <Text numberOfLines={1}>{buttonDescription}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
