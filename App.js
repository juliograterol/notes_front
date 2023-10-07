import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllNotes from "./screens/AllNotes";
import NotaPrueba from "./screens/NotaView";
import AllFolders from "./screens/AllFolders";
import FolderView from "./screens/FolderView";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Todas las Notas">
        <Stack.Screen name="Todas las Notas" component={AllNotes} />
        <Stack.Screen name="Nota" component={NotaPrueba} />
        <Stack.Screen name="Carpeta1" component={FolderView} />
        <Stack.Screen name="Todas las Carpetas" component={AllFolders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
