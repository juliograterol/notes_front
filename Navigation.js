import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PantallaPrincipal from "./screens/PantallaPrincipal"; // Importa tus pantallas
import PantallaDetalle from "./screens/AllNotes";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaPrincipal">
        <Stack.Screen name="Menu" component={PantallaPrincipal} />
        <Stack.Screen name="Notas" component={PantallaDetalle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
