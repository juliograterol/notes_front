import { Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";
import { API_URL } from "../config";
import { useEffect, useState } from "react";
import FolderModal from "./FolderModal";

const NotesMenu = ({ noteId, trashed, updateNotes }) => {
  const { data, error, loading, fetchData } = useFetch(`${API_URL}/note`);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteIdState, setNodeIdState] = useState(noteId);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const [noteState, setNoteState] = useState({
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
          <Text style={styles.text}>Delete Forever</Text>
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
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showModal}>
            <Text style={styles.text}>Move to...</Text>
          </TouchableOpacity>
        </>
      )}
      <FolderModal
        modalVisible={modalVisible}
        noteId={noteIdState}
        toClose={hideModal}
        updateNotes={updateNotes}
      />
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default NotesMenu;
