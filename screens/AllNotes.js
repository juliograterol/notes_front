import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";
import AddButton from "../components/Add";
import Note from "../components/Note";
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";
import { API_URL } from "../config"; // Importa la variable de entorno
import NotesMenu from "../components/NotesMenu";

const AllNotes = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [currentDisplay, setDisplay] = useState("Grid");
  const [openNote, setOpenNote] = useState(false);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    color: "white", // Valor predeterminado para el color
    id: "",
  });

  const { data, error, loading, fetchData } = useFetch(
    `${API_URL}/note/getAll`
  );

  async function fetchNotes() {
    const idData = await useId();
    if (idData && idData.token) {
      const { userId, token } = idData;
      // Ahora puedes utilizar userId y token para hacer la solicitud
      await fetchData("POST", { userId: userId }, token);
    }
  }
  useEffect(() => {
    if (!loading) {
      fetchNotes();
    }
  }, []);

  useEffect(() => {
    if (data) {
      const filteredNotes = data.notes.filter((note) => !note.trashed);
      const newNotes = filteredNotes.map((note) => (
        <ButtonComponent
          starredNote={note.starred}
          key={note.id} // Agrega una clave única
          color={note.color}
          buttonDescription={note.description}
          onPress={() => {
            setNoteData({
              title: note.title,
              description: note.description,
              color: note.color,
              id: note._id,
            });
            setOpenNote(true);
          }}
          imageSource={require("../assets/Note.png")}
          buttonText={note.title}
          componentMenu={
            <NotesMenu
              trashed={note.trashed}
              starred={note.starred}
              noteId={note._id}
            />
          }
        />
      ));

      // Actualiza el estado de 'notes' con el nuevo array de notas
      setNotes(newNotes);
    }
    if (error) {
      console.log(`Error: ${error}`);
    }
  }, [data, error]);

  // Función para agregar un elemento a la vista
  const addNote = () => {
    setNoteData({
      title: "",
      description: "",
      color: "white",
      id: undefined,
    });
    setOpenNote(true);
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
          noteTitle={noteData.title}
          noteDescription={noteData.description}
          noteColor={noteData.color}
          noteId={noteData.id}
          toClose={() => {
            setOpenNote(false);
            fetchNotes();
          }}
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
                    width: currentDisplay === "List" ? "98%" : "30%",
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
  },
});

export default AllNotes;
