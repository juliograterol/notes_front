import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useState } from "react";

async function useId() {
  const secret = "esunsecretooo";

  const savedToken = await AsyncStorage.getItem("jwt");
  if (savedToken) {
    try {
      const decodedToken = jwtDecode(savedToken);
      const userId = decodedToken.id;
      return { savedToken, userId };
    } catch (error) {
      console.log(error);
    }
  }
}

export default useId;
