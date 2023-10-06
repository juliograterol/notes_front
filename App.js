import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PantallaPrincipal from "./screens/PantallaPrincipal"; // Importa tus pantallas
import AllNotes from "./screens/AllNotes";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaPrincipal">
        <Stack.Screen name=" " component={PantallaPrincipal} />
        <Stack.Screen name="Todas las Notas" component={AllNotes} />
        {/* <Stack.Screen name="Todas las Carpetas" component={PantallaCarpetas} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
