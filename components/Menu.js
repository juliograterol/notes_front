import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import MenuOption from "./MenuOption";
import CloseButton from "./Close";

function Menu({ navigation }) {
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
        <Image
          style={styles.imagen}
          source={require("../assets/icon-menu.png")}
        ></Image>
      </TouchableOpacity>
      <View>
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <MenuOption
              onPress={() => {
                navigation.navigate("Todas las Notas");
                hideModal();
              }}
              imageSource={require("../assets/Note.png")}
              buttonText="Todas las Notas"
            />
            <MenuOption
              onPress={() => {
                navigation.navigate("Todas las Carpetas");
                hideModal();
              }}
              imageSource={require("../assets/Folder.png")}
              buttonText="Todas las Carpetas"
            />
            <MenuOption
              onPress={() => navigation.navigate("Papelera")}
              imageSource={require("../assets/Trash.png")}
              buttonText="Papelera"
            />
            <MenuOption
              onPress={() => navigation.navigate("Cuenta")}
              imageSource={require("../assets/user.png")}
              buttonText="Cuenta"
            />
            <CloseButton onPress={hideModal} />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    width: "75%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#e1e1e1",
    color: "white",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 50,
  },
  closeButton: {
    marginTop: 20,
    color: "white",
    fontSize: 18,
  },
  imagen: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});

export default Menu;
