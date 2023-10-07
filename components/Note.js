import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Note = () => {
  return (
    <View style={styles.noteContainer}>
      <TextInput style={styles.noteTitle} placeholder="Título"></TextInput>
      <TextInput multiline={true}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    height: "100%",
    backgroundColor: "#fff",
    padding: 5,
  },
  noteTitle: {
    fontSize: 25,
    borderBottomColor: "#a0a0a0",
  },
  note: {},
});

export default Note;
