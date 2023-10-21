import { Text, TouchableOpacity, Alert } from "react-native";
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";
import { API_URL } from "../config";
import { useEffect, useState } from "react";

const NotesMenu = ({ noteId, trashed, starred, updateNotes }) => {
  const { data, error, loading, fetchData } = useFetch(`${API_URL}/note`);
  const [noteState, setNoteState] = useState({
    starred: "true",
    trashed: "true",
  });

  async function TrashNote() {
    trashed
      ? setNoteState({ ...noteState, trashed: "false" })
      : setNoteState({ ...noteState, trashed: "true" });
    const idData = await useId();
    if (!loading) {
      if (idData && idData.token) {
        await fetchData(
          "PUT",
          {
            noteId: noteId,
            trashed: noteState.trashed,
            userId: idData.userId,
          },
          idData.token
        );
      }
    }
  }
  async function StarNote() {
    starred
      ? setNoteState({ ...noteState, starred: "false" })
      : setNoteState({ ...noteState, starred: "true" });
    const idData = await useId();
    if (!loading) {
      if (idData && idData.token) {
        await fetchData(
          "PUT",
          {
            noteId: noteId,
            starred: noteState.starred,
            userId: idData.userId,
          },
          idData.token
        );
      }
    }
  }
  async function DeleteNote() {
    const idData = await useId();
    if (!loading) {
      if (idData && idData.token) {
        await fetchData(
          "DELETE",
          {
            noteId: noteId,
            userId: idData.userId,
          },
          idData.token
        );
      }
    }
  }

  return (
    <>
      {trashed ? (
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "¿Deseas eliminar definitivamente esta nota?",
              "Esta nota no podra recuperarse.",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Eliminar",
                  onPress: () => {
                    DeleteNote();
                    Alert.alert("Nota eliminada definitivamente!", "", [
                      {
                        text: "OK",
                        onPress: updateNotes,
                      },
                    ]);
                  },
                },
              ]
            )
          }
        >
          <Text>Delete Forever</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "¿Deseas borrar esta nota?",
                "Esta nota se ira a la papelera por si quieres recuperarla.",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Borrar",
                    onPress: () => {
                      TrashNote();
                      Alert.alert("Nota eliminada con exito!", "", [
                        {
                          text: "OK",
                          onPress: updateNotes,
                        },
                      ]);
                    },
                  },
                ]
              )
            }
          >
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("¿Deseas poner en favoritos esta nota?", "", [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Aceptar",
                  onPress: () => {
                    StarNote();
                    Alert.alert("Nota Favorita!", "", [
                      {
                        text: "OK",
                        onPress: updateNotes,
                      },
                    ]);
                  },
                },
              ]);
            }}
          >
            {starred ? <Text>Remove Star</Text> : <Text>Star</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log("hola move to...")}>
            <Text>Move to...</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default NotesMenu;
