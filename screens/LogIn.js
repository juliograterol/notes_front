import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput style={styles.placeholder} placeholder="Usuario"></TextInput>
        <TextInput
          style={styles.placeholder}
          placeholder="Contraseña"
        ></TextInput>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <View>
          <Text>No tengo cuenta,</Text>
          <TouchableOpacity>
            <Text> Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312D4E",
  },
  box: {
    borderRadius: 5,
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  placeholder: {
    fontSize: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#a0a0a0",
  },
  button: {
    margin: 5,
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default Login;
