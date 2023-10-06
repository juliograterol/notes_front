import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PantallaPrincipal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Todas las Notas")}
      >
        <Image
          source={require("../assets/Note.png")} // Ruta de la imagen
          style={styles.imagen}
        />
        <Text>Todas las Notas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagen: {
    width: 75, // Ancho de la imagen
    height: 75, // Altura de la imagen
    resizeMode: "contain", // Ajuste de la imagen (puedes usar 'cover', 'contain', etc.)
  },
  button: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PantallaPrincipal;
