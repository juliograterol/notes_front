import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";
import AddButton from "../components/Add";

const AllNotes = ({ navigation }) => {
  const [notes, setNotes] = useState([]); // Estado para mantener los elementos

  // Función para agregar un elemento a la vista
  const addNote = () => {
    const i = notes.length + 1;
    const newNote = (
      <ButtonComponent
        color={"#ffffff25"}
        onPress={() => navigation.navigate(`Nota`)}
        imageSource={require("../assets/Note.png")}
        buttonText={`Nota ${i}`}
      />
    );
    setNotes([...notes, newNote]);
  };

  return (
    <>
      <Menu navigation={navigation} />
      <View
        style={{
          alignItems: "center",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          {notes.map((note, index) => (
            <View key={index} style={{ margin: 5, width: "30%" }}>
              {note}
            </View>
          ))}
        </View>
      </View>
      <AddButton onPress={addNote} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    borderRadius: 5,
    alignItems: "flex-start",
    backgroundColor: "green",
  },
});

export default AllNotes;
