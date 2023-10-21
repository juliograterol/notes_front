import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import SaveButton from "./Save";
import { API_URL } from "../config"; // Importa la variable de entorno
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";
import Color from "./Color";

const Note = ({
  noteTitle = "",
  noteDescription = "",
  noteColor = "white",
  noteId,
  folderId,
  toClose,
}) => {
  const { data, error, loading, fetchData } = useFetch(`${API_URL}/note`);
  const [palleteVisible, setPalleteVisible] = useState(false);
  const [currentNoteData, setCurrentData] = useState({
    title: noteTitle,
    description: noteDescription,
    color: noteColor,
    folderId: folderId,
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
    button: {
      position: "absolute",
      right: 10,
      borderRadius: 360,
      height: 40,
      width: 40,
      borderColor: "black",
      borderWidth: 3,
      backgroundColor: currentNoteData.color,
    },
    pallete: {
      flex: 1,
      position: "absolute",
      display: palleteVisible ? "flex" : "none",
      top: 40,
      right: 0,
      flexWrap: "wrap",
      borderRadius: 360,
      borderColor: "lightgrey",
      borderWidth: 3,
      backgroundColor: "#fff",
      padding: 10,
    },
  });

  async function saveNote() {
    if (!loading) {
      Alert.alert("Cambios guardados", "", [
        {
          text: "Aceptar",
        },
      ]);
      const idData = await useId();
      if (!currentNoteData.title || !currentNoteData.description) {
        Alert.alert(
          "Datos incompletos",
          "Las notas deben tener titulo y descripcion para guardarse",
          [
            {
              text: "Aceptar",
            },
          ]
        );
        return;
      } else {
        if (idData && idData.token) {
          noteId === undefined
            ? await fetchData(
                "POST",
                {
                  title: currentNoteData.title,
                  description: currentNoteData.description,
                  userId: idData.userId,
                  folderId: currentNoteData.folderId,
                  color: currentNoteData.color,
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
                  folderId: currentNoteData.folderId,
                  color: currentNoteData.color,
                },
                idData.token
              );
        }
      }
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

  function Alerta() {
    noteId === undefined
      ? Alert.alert("¿Desea crear esta nota?", "", [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Crear",
            onPress: () => {
              saveNote();
              Alert.alert("Nota Creada!", "", [
                {
                  text: "OK",
                  onPress: toClose,
                },
              ]);
            },
          },
        ])
      : Alert.alert("¿Desea guardar los cambios esta nota?", "", [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Guardar",
            onPress: () => {
              saveNote();
            },
          },
        ]);
  }

  return (
    <View style={styles.noteContainer}>
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
          onChangeText={(text) =>
            setCurrentData({ ...currentNoteData, title: text })
          }
        >
          {currentNoteData.title}
        </TextInput>
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPalleteVisible(!palleteVisible)}
          />
          <View style={styles.pallete}>
            <Color
              color={"#B2A4FF"}
              setColor={() => {
                setCurrentData({ ...currentNoteData, color: "#B2A4FF" });
                setPalleteVisible(false);
              }}
            />
            <Color
              color={"#FFB4B4"}
              setColor={() => {
                setCurrentData({ ...currentNoteData, color: "#FFB4B4" });
                setPalleteVisible(false);
              }}
            />
            <Color
              color={"#FFDEB4"}
              setColor={() => {
                setCurrentData({ ...currentNoteData, color: "#FFDEB4" });
                setPalleteVisible(false);
              }}
            />
            <Color
              color={"#FDF7C3"}
              setColor={() => {
                setCurrentData({ ...currentNoteData, color: "#FDF7C3" });
                setPalleteVisible(false);
              }}
            />
          </View>
        </>
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
      <SaveButton onPress={Alerta} right={15} />
    </View>
  );
};

export default Note;
