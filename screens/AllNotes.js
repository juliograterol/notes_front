import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";
import AddButton from "../components/Add";
import Note from "../components/Note";
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";
import { API_URL } from "../config"; // Importa la variable de entorno

const AllNotes = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [currentDisplay, setDisplay] = useState("Grid");
  const [openNote, setOpenNote] = useState(false);

  const [noteTitle, setTitle] = useState("");
  const [noteDescription, setDescription] = useState("");

  const { data, error, loading, fetchData } = useFetch(`${API_URL}/notes/`);

  useEffect(() => {
    async function fetchNotes() {
      const { token, userId } = await useId();
      console.log(token);
      console.log(userId);
      await fetchData("GET", { id: userId, token: token });
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const testFunction = () => {
    setTitle("Hola");
    setDescription("Esta es la nota");
    setOpenNote(true);
  };

  // Función para agregar un elemento a la vista
  const addNote = () => {
    setTitle("");
    setDescription("");
    setOpenNote(true);
    const i = notes.length + 1;
    const newNote = (
      <ButtonComponent
        color={"#ffffff25"}
        onPress={() => testFunction()}
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
      {openNote ? (
        <Note
          noteTitle={noteTitle}
          noteDescription={noteDescription}
          toClose={setOpenNote}
        ></Note>
      ) : (
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
      )}
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
    backgroundColor: "#cfcfcf",
  },
});

export default AllNotes;
