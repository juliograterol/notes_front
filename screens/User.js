import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Menu from "../components/Menu";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { API_URL } from "../config";
import SaveButton from "../components/Save";
import useId from "../hooks/useId";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = ({ navigation }) => {
  const { data, error, loading, fetchData } = useFetch(
    `${API_URL}/user/getById`
  );
  const {
    data: dataUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
    fetchData: fetchDataUpdate,
  } = useFetch(`${API_URL}/user`);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  async function fetchUserData() {
    const idData = await useId();
    if (idData && idData.token) {
      await fetchData("POST", { userId: idData.userId }, idData.token);
    }
  }

  async function LogOut() {
    await AsyncStorage.removeItem("jwt");
  }

  async function updateUserData() {
    //
  }

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      // Cuando llega data, actualiza los estados email y username con los valores correspondientes.
      setEmail(data.user.email);
      setUsername(data.user.username);
    }
  }, [data]);

  return (
    <View style={styles.page}>
      <View style={{ position: "absolute", top: 0, left: 0 }}>
        <Menu navigation={navigation} />
      </View>
      <View style={styles.container}>
        <Image source={require("../assets/user.png")} style={styles.imagen} />
        <Text style={styles.title}>Mi Cuenta</Text>
        <TextInput
          style={styles.placeholder}
          placeholder="Nombre y Apellido"
          value={username}
          onChangeText={(newUsername) => {
            setUsername(newUsername);
          }}
        />
        <TextInput
          style={styles.placeholder}
          placeholder="Correo"
          value={email}
          onChangeText={(newEmail) => {
            setEmail(newEmail);
          }}
        />
        <TextInput style={styles.placeholder} placeholder="Contraseña" />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            LogOut();
            navigation.navigate("Login");
            console.log("log out");
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 25 }}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
      <SaveButton onPress={updateUserData}></SaveButton>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  imagen: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  page: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    padding: 25,
    width: "80%",
    borderRadius: 5,
    justifyContent: "space-between",
    backgroundColor: "#fff",
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
});

export default User;
