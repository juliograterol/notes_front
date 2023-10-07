import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";
import AddButton from "../components/Add";

const AllFolders = ({ navigation }) => {
  const [Folders, setFolders] = useState([]); // Estado para mantener los elementos

  // Función para agregar un elemento a la vista
  const addFolder = () => {
    const newFolder = (
      <ButtonComponent
        onPress={() => navigation.navigate("Carpeta1")}
        imageSource={require("../assets/Folder.png")}
        buttonText="Carpeta"
      />
    );
    setFolders([...Folders, newFolder]);
  };

  return (
    <View>
      <Menu navigation={navigation} />
      <View style={styles.container}>
        {Folders.map((Folder, index) => (
          <View key={index}>{Folder}</View>
        ))}
      </View>
      <AddButton onPress={addFolder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    backgroundColor: "#ffffff25",
  },
});

export default AllFolders;
