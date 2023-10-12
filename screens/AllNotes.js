import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";
import AddButton from "../components/Add";

const AllNotes = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [currentDisplay, setDisplay] = useState("Grid");

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

  const changeDisplay = () => {
    currentDisplay === "Grid"
      ? setDisplay("List")
      : currentDisplay === "List"
      ? setDisplay("Grid")
      : null;
  };

  return (
    <>
      <Menu navigation={navigation} />
      <TouchableOpacity
        style={{ position: "absolute", right: 5 }}
        onPress={changeDisplay}
      >
        <Text style={{ fontSize: 30 }}>View {currentDisplay}</Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          {notes.map((note, index) => (
            <View
              key={index}
              style={{
                margin: 5,
                width: currentDisplay === "List" ? "90%" : "30%",
              }}
            >
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
    backgroundColor: "#c0c0c0",
  },
});

export default AllNotes;
