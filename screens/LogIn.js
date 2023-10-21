import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Login = (props) => {
  const [isVisible, setVisible] = useState(false);

  function handleUserChange(text) {
    props.setUser(text);
  }

  function handlePasswordChange(text) {
    props.setPassword(text);
  }

  return (
    <View style={styles.page}>
      <Text style={styles.credits}>Highlight Notes</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.placeholder}
          placeholder="Email"
          onChangeText={handleUserChange}
        />
        <View style={styles.placeholder}>
          <TextInput
            placeholder="Contraseña"
            onChangeText={handlePasswordChange}
            secureTextEntry={!isVisible}
          />
          <TouchableOpacity
            onPress={() => setVisible(!isVisible)}
            style={styles.eye}
          >
            <Image source={require("../assets/eye.png")} style={styles.eye} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.handleClick()}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 25 }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => props.hasAccount(false)}>
            <Text style={{ textAlign: "center" }}>
              No tengo cuenta,{" "}
              <Text style={{ textDecorationLine: "underline" }}>
                Crear Cuenta
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.credits}>
        Developed by{"\n"}Julio Graterol & Victor Kneider
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#312D4E",
  },
  container: {
    padding: 25,
    width: "80%",
    borderRadius: 5,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  placeholder: {
    justifyContent: "center",
    padding: 5,
    fontSize: 15,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#c0c0c0",
  },
  button: {
    margin: 5,
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  credits: {
    margin: 50,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  eye: {
    opacity: 0.5,
    position: "absolute",
    right: 0,
    height: 20,
    resizeMode: "contain",
  },
});

export default Login;
