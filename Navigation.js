import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PantallaPrincipal from "./screens/PantallaPrincipal"; // Importa tus pantallas
import PantallaDetalle from "./screens/AllNotes";
import NotaPrueba from "./screens/NotaView";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaPrincipal">
        <Stack.Screen name="Menu" component={PantallaPrincipal} />
        <Stack.Screen name="Todas las Notas" component={PantallaDetalle} />
        <Stack.Screen name="Papelera" component={Trash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
