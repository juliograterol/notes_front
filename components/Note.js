import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import SaveButton from "./Save";
import { API_URL } from "../config"; // Importa la variable de entorno
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";

const Note = ({
  noteTitle = "",
  noteDescription = "",
  noteColor = "white",
  noteId,
  toClose,
}) => {
  const { data, error, loading, fetchData } = useFetch(`${API_URL}/note`);

  const [currentNoteData, setCurrentData] = useState({
    title: noteTitle,
    description: noteDescription,
    color: noteColor,
    id: noteId,
  });

  const styles = StyleSheet.create({
    noteContainer: {
      height: "100%",
      backgroundColor: currentNoteData.color,
      padding: 10,
    },
    header: {
      flexDirection: "row",
      padding: 5,
      borderBottomColor: "#00000025",
      borderBottomWidth: 1,
    },
    title: {
      fontSize: 25,
    },
    note: {
      fontSize: 16,
      width: "100%",
    },
  });

  async function saveNote() {
    const idData = await useId();
    if (idData && idData.token) {
      noteId === undefined
        ? await fetchData(
            "POST",
            {
              title: currentNoteData.title,
              description: currentNoteData.description,
              userId: idData.userId,
            },
            idData.token
          )
        : await fetchData(
            "PUT",
            {
              noteId: noteId,
              title: currentNoteData.title,
              description: currentNoteData.description,
              userId: idData.userId,
            },
            idData.token
          );
    }
  }

  useEffect(() => {
    if (data) {
      // console.log(data);
    }
    if (error) {
      console.log(`Error: ${error}`);
    }
  }, [data, error]);

  return (
    <View style={styles.noteContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => toClose(false)}>
          <Image
            style={{ marginRight: 10 }}
            source={require("../assets/left-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <TextInput
          style={styles.title}
          placeholder="Título"
          onChangeText={(text) =>
            setCurrentData({ ...currentNoteData, title: text })
          }
        >
          {currentNoteData.title}
        </TextInput>
      </View>
      <TextInput
        style={styles.note}
        multiline
        onChangeText={(text) =>
          setCurrentData({ ...currentNoteData, description: text })
        }
      >
        {currentNoteData.description}
      </TextInput>
      <SaveButton onPress={saveNote} />
    </View>
  );
};

export default Note;
