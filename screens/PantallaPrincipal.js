import React, { useState } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

const PantallaPrincipal = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showModal}>
        <Text>Menu</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <ButtonComponent
            onPress={() => {
              navigation.navigate("Todas las Notas");
              hideModal();
            }}
            imageSource={require("../assets/Note.png")}
            buttonText="Todas las Notas"
          />
          <ButtonComponent
            onPress={() => {
              navigation.navigate("Todas las Carpetas");
              hideModal();
            }}
            imageSource={require("../assets/Folder.png")}
            buttonText="Todas las Carpetas"
          />
          <ButtonComponent
            // onPress={() => navigation.navigate("Todas las Notas")}
            imageSource={require("../assets/Trash.png")}
            buttonText="Papelera"
          />
          <TouchableOpacity onPress={hideModal}>
            <Text style={styles.closeButton}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312D4E",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312D4E",
    color: "white",
  },
  closeButton: {
    marginTop: 20,
    color: "white",
    fontSize: 18,
  },
});

export default PantallaPrincipal;
