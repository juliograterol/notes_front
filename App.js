import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllNotes from "./screens/AllNotes";
import NotaPrueba from "./screens/NotaView";
import AllFolders from "./screens/AllFolders";
import FolderView from "./screens/FolderView";
import Login from "./screens/LogIn";
import useFetch from "./hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config"; // Importa la variable de entorno

const Stack = createStackNavigator();

function App() {
  const [isLogged, setLog] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { data, error, loading, fetchData } = useFetch(`${API_URL}/auth/login`);

  async function UserLog(data) {
    await AsyncStorage.setItem("jwt", data.token);
  }

  useEffect(() => {
    if (data) {
      UserLog(data);
      console.log(data);
      setLog(true);
      if (isLogged) {
        navigation.navigate("Todas las Notas");
      }
    }
    if (error) {
      console.log(error);
    }
  }, [data]);

  async function handleClick() {
    await fetchData("POST", {
      email: user,
      password: password,
    });
  }

  return (
    <>
      {!isLogged ? (
        <Login
          handleClick={handleClick}
          setUser={setUser}
          setPassword={setPassword}
        />
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Todas las Notas">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Todas las Notas" component={AllNotes} />
            <Stack.Screen name="Nota" component={NotaPrueba} />
            <Stack.Screen name="Carpeta1" component={FolderView} />
            <Stack.Screen name="Todas las Carpetas" component={AllFolders} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
