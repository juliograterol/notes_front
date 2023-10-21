import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import MenuOption from "./MenuOption";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../config";
import { useEffect, useState } from "react";
import useId from "../hooks/useId";

const ChangeFolderOption = ({
  name,
  folderId,
  noteId,
  toClose,
  updateNotes,
}) => {
  const { data, error, loading, fetchData } = useFetch(`${API_URL}/note`);

  async function changeNoteFolder() {
    Alert.alert("Nota movida", "", [
      {
        text: "OK",
        onPress: toClose,
      },
    ]);
    const idData = await useId();
    if (!loading) {
      if (idData && idData.token) {
        await fetchData(
          "PUT",
          {
            noteId: noteId,
            userId: idData.userId,
            folderId: folderId,
          },
          idData.token
        );
      }
    }
  }

  return (
    <MenuOption
      imageSource={require("../assets/Folder.png")}
      buttonText={name}
      onPress={() => {
        Alert.alert("¿Estas seguro de mover esta nota?", "", [
          {
            text: "Cancelar",
            onPress: () => {
              return;
            },
          },
          {
            text: "Mover",
            onPress: () => changeNoteFolder(),
          },
        ]);
      }}
    />
  );
};

const FolderModal = ({ modalVisible, noteId, toClose }) => {
  const { data, error, loading, fetchData } = useFetch(
    `${API_URL}/folder/getAll`
  );

  const [allFoldersOptions, setFolderOptions] = useState([]);

  async function fetchFolders() {
    const idData = await useId();
    if (idData && idData.token) {
      const { userId, token } = idData;
      // Ahora puedes utilizar userId y token para hacer la solicitud
      await fetchData("POST", { userId: userId }, token);
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchFolders();
    }
  }, []);

  useEffect(() => {
    if (data) {
      const allFoldersOptions = data.folders.map((folder) => (
        <ChangeFolderOption
          name={folder.name}
          folderId={folder._id}
          noteId={noteId}
        />
      ));
      setFolderOptions(allFoldersOptions);
    }
    if (error) {
      console.log(`Error: ${error}`);
    }
  }, [data, error]);

  return (
    <View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modal}>
          {allFoldersOptions.map((folder) => (
            <>{folder}</>
          ))}
          <TouchableOpacity onPress={toClose}>
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#f1f1f1",
    height: "100%",
  },
});

export default FolderModal;
