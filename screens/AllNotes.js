import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";
import AddButton from "../components/Add";

const AllNotes = ({ navigation }) => {
  const [notes, setNotes] = useState([]); // Estado para mantener los elementos

  // Función para agregar un elemento a la vista
  const addNote = () => {
    const newNote = (
      <ButtonComponent
        onPress={() => navigation.navigate("Nota")}
        imageSource={require("../assets/Note.png")}
        buttonText="Nota"
      />
    );
    setNotes([...notes, newNote]);
  };

  return (
    <View>
      <Menu navigation={navigation} />
      <View style={styles.container}>
        {notes.map((note, index) => (
          <View key={index}>{note}</View>
        ))}
      </View>
      <AddButton onPress={addNote} />
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

export default AllNotes;
