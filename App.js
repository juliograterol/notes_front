import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllNotes from "./screens/AllNotes";
import NotaPrueba from "./screens/NotaView";
import AllFolders from "./screens/AllFolders";
import FolderView from "./screens/FolderView";
import Login from "./screens/LogIn";
import useFetch from "./hooks/useFetch";

const Stack = createStackNavigator();

function App() {
  const [isLogged, setLog] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { data, error, fetchData } = useFetch(
    "http://192.168.0.222:3003/auth/login"
  );

  useEffect(() => {
    if (data) {
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
