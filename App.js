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
import Loading from "./components/Loading";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <>
        <View style={{ height: 25 }} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Todas las Notas" component={AllNotes} />
            <Stack.Screen name="Todas las Carpetas" component={AllFolders} />
            <Stack.Screen name="Papelera" component={Trash} />
            <Stack.Screen name="Cuenta" component={User} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </>
  );
}

export default App;
