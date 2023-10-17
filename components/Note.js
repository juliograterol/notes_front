import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import SaveButton from "./Save";

const Note = ({ noteTitle = "", noteDescription = "", toClose }) => {
  return (
    <View style={styles.noteContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => toClose(false)}>
          <Image
            style={{ marginRight: 10 }}
            source={require("../assets/left-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <TextInput style={styles.title} placeholder="Título">
          {noteTitle}
        </TextInput>
      </View>
      <TextInput style={styles.note} multiline>
        {noteDescription}
      </TextInput>
      <SaveButton />
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    height: "100%",
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    padding: 5,
    borderBottomColor: "#a0a0a050",
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

export default Note;
