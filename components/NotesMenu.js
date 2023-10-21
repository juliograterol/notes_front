import { Text, TouchableOpacity } from "react-native";
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";
import { API_URL } from "../config";
import { useState } from "react";

const NotesMenu = ({ noteId, trashed, starred }) => {
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
        <TouchableOpacity onPress={TrashNote}>
          <Text>Delete Forever</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={TrashNote}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={StarNote}>
            {starred ? <Text>Remove Star</Text> : <Text>Star</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={DeleteNote}>
            <Text>Move to...</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default NotesMenu;
