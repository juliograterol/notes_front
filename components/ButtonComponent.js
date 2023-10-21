import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import PopUpMenu from "./PopUpMenu";

const ButtonComponent = ({
  onPress,
  imageSource,
  buttonText,
  color,
  buttonDescription,
  componentMenu,
}) => {
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color === "white" ? "#f1f1f1" : color,
    },
    imagen: {
      width: 75,
      height: 75,
      resizeMode: "contain",
    },
    options: {
      height: 25,
      resizeMode: "contain",
    },
    title: {
      fontWeight: "bold",
    },
  });

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 0 }}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Image
            source={require("../assets/options.png")}
            style={styles.options}
          />
        </TouchableOpacity>
        <Image source={imageSource} style={styles.imagen} />
        <Text style={styles.title} numberOfLines={2}>
          {buttonText}
        </Text>
        <Text numberOfLines={1}>{buttonDescription}</Text>
      </TouchableOpacity>
      <PopUpMenu isVisible={showMenu}>{componentMenu}</PopUpMenu>
    </>
  );
};

export default ButtonComponent;
