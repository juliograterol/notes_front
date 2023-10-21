import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import AddButton from "../components/Add";
import Note from "../components/Note";
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";
import { API_URL } from "../config"; // Importa la variable de entorno
import NotesMenu from "../components/NotesMenu";
import Loading from "../components/Loading";
import MenuOption from "./MenuOption";

const Folder = ({ folderId, folderName, toClose }) => {
  const [notes, setNotes] = useState([]);
  const [currentDisplay, setDisplay] = useState("Grid");
  const [openNote, setOpenNote] = useState(false);
  const [currentName, setCurrentName] = useState(folderName);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    color: "white", // Valor predeterminado para el color
    folderId: "",
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
      const filteredNotes = data.notes.filter(
        (note) => note.folderId === folderId
      );
      const newNotes = filteredNotes.map((note) => (
        <ButtonComponent
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
              updateNotes={fetchNotes}
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
      folderId: folderId,
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
      {loading && (
        <View style={styles.loading}>
          <Loading />
        </View>
      )}
      {openNote ? (
        <Note
          noteTitle={noteData.title}
          noteDescription={noteData.description}
          noteColor={noteData.color}
          noteId={noteData.id}
          folderId={folderId}
          toClose={() => {
            setOpenNote(false);
            fetchNotes();
          }}
        ></Note>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={toClose}>
              <Image
                style={{ marginRight: 10 }}
                source={require("../assets/left-arrow.png")}
              ></Image>
            </TouchableOpacity>
            <TextInput
              style={styles.title}
              placeholder="Título"
              onChangeText={(text) => setCurrentName(text)}
            >
              {currentName}
            </TextInput>
          </View>
          <View style={styles.barMenu}>
            <MenuOption
              onPress={changeDisplay}
              imageSource={
                currentDisplay === "List"
                  ? require("../assets/List.png")
                  : require("../assets/Grid.png")
              }
              buttonText={`View ${currentDisplay}`}
            />
            <MenuOption
              imageSource={require("../assets/filter.png")}
              buttonText={"Filtro"}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <ScrollView>
              <View style={styles.container}>
                {notes.map((note, index) => (
                  <View
                    key={index}
                    style={{
                      margin: currentDisplay === "List" ? 0 : 5,
                      marginTop: currentDisplay === "List" ? 5 : 5,
                      marginBottom: currentDisplay === "List" ? 5 : 5,
                      width: currentDisplay === "List" ? "100%" : "47%",
                    }}
                  >
                    {note}
                  </View>
                ))}
              </View>
              <View style={{ height: 500 }}></View>
            </ScrollView>
          </View>
          <AddButton onPress={addNote} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 5,
    borderBottomColor: "#00000025",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 25,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    alignItems: "flex-start",
  },
  barMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    color: "white",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro con un poco de transparencia
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});

export default Folder;
