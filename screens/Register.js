import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../config";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

const Register = (props) => {
  const [isVisible, setVisible] = useState(false);

  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  function handleNamesChange(text) {
    setUserName(text);
  }
  function handleUserChange(text) {
    setUser(text);
  }

  function handlePasswordChange(text) {
    setPassword(text);
  }

  const { data, error, loading, fetchData } = useFetch(
    `${API_URL}/auth/register`
  );

  useEffect(() => {
    if (data) {
      Alert.alert("Cuenta Creada", "Ahora inicia sesión", [
        {
          text: "Ok",
          onPress: () => props.hasAccount(true),
        },
      ]);
    }
    if (error) {
      console.log(error);
    }
  }, [data]);

  async function handleClick() {
    await fetchData("POST", {
      email: user.trim(),
      username: userName.trim(),
      password: password.trim(),
    });
  }

  return (
    <View style={styles.page}>
      <Text style={styles.credits}>Highlight Notes</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <TextInput
          style={styles.placeholder}
          placeholder="Nombre y Apellido"
          onChangeText={handleNamesChange}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 25 }}>
            Crear Cuenta
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => props.hasAccount(true)}>
            <Text style={{ textAlign: "center" }}>
              Tengo cuenta,{" "}
              <Text style={{ textDecorationLine: "underline" }}>
                Iniciar Sesión
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

export default Register;
