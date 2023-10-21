import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import useId from "../hooks/useId";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const Login = ({ navigation }) => {
  const [isVisible, setVisible] = useState(false);
  const [isLogged, setLog] = useState(false);
  const [user, setUser] = useState("");
  const [flag, setFlag] = useState(false);
  const [password, setPassword] = useState("");
  const { data, error, loading, fetchData } = useFetch(`${API_URL}/auth/login`);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "Ok" }]);
  };

  async function UserLog(data) {
    await AsyncStorage.setItem("jwt", data.token);
  }

  async function checkToken() {
    try {
      const token = await AsyncStorage.getItem("jwt");
      if (token) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } catch (error) {
      console.error("Error al verificar el token:", error);
    }
  }
  /*
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if(flag){
      navigation.navigate("Todas las Notas");
    }
  }, [flag]);
*/
  useEffect(() => {
    if (data) {
      if (data.token) {
        console.log(data);
        UserLog(data);
        setLog(true);
        navigation.navigate("Todas las Notas");
        showAlert("¡Bienvenido a Highlights!", "Inicio de Sesión Completo");
      } else {
        showAlert("¡Error!", "Datos incorrectos...");
      }
    }
    if (error) {
      console.log(error);
      showAlert("¡Error!", "Datos incorrectos...");
    }
  }, [data, error]);

  async function handleClick() {
    if (!user || !password) {
      showAlert("Advertencia", "Por favor, complete todos los campos.");
      return;
    }

    await fetchData("POST", {
      email: user,
      password: password,
    });
  }

  function handleUserChange(text) {
    setUser(text);
  }

  function handlePasswordChange(text) {
    setPassword(text);
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
        <TouchableOpacity style={styles.button} onPress={() => handleClick()}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 25 }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
