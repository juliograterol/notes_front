import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllNotes from "./screens/AllNotes";
import AllFolders from "./screens/AllFolders";
import Login from "./screens/LogIn";
import useFetch from "./hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config"; // Importa la variable de entorno
import { Alert, View } from "react-native";
import Trash from "./screens/Trash";
import Register from "./screens/Register";
import User from "./screens/User";

const Stack = createStackNavigator();

function App() {
  const [isLogged, setLog] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [account, hasAccount] = useState(true);

  const { data, error, loading, fetchData } = useFetch(`${API_URL}/auth/login`);

  async function UserLog(data) {
    await AsyncStorage.setItem("jwt", data.token);
  }

  useEffect(() => {
    if (data) {
      UserLog(data);
      setLog(true);
      if (isLogged) {
        Alert.alert("Inicio de Sesión Completo", "Bienvenido a Highlights!", [
          {
            text: "Ok",
            onPress: navigation.navigate("Todas las Notas"),
          },
        ]);
      }
    }
    if (error) {
      console.log(error);
      Alert.alert("Error!", "Datos incorrectos...", [
        {
          text: "Ok",
        },
      ]);
    }
  }, [data, error]);

  async function handleClick() {
    await fetchData("POST", {
      email: user,
      password: password,
    });
  }

  return (
    <>
      {!isLogged ? (
        account ? (
          <Login
            handleClick={handleClick}
            setUser={setUser}
            setPassword={setPassword}
            hasAccount={hasAccount}
          />
        ) : (
          <Register hasAccount={hasAccount} />
        )
      ) : (
        <>
          <View style={{ height: 25 }} />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Todas las Notas"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Todas las Notas" component={AllNotes} />
              <Stack.Screen name="Todas las Carpetas" component={AllFolders} />
              <Stack.Screen name="Papelera" component={Trash} />
              <Stack.Screen name="Cuenta" component={User} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}

export default App;
