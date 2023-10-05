import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.logContainer}>
        <Text>Iniciar Sesión</Text>
        <View>
          <TextInput style={styles.placeHold} placeholder="Usuario"></TextInput>
          <TextInput
            style={styles.placeHold}
            placeholder="Contraseña"
          ></TextInput>
          <Button title="Iniciar Sesión" style={styles.button}></Button>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#312D4E",
    alignItems: "center",
    justifyContent: "center",
  },
  logContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  placeHold: {
    marginBottom: 5,
    backgroundColor: "#DADADA",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#000",
  },
});
