import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

async function useId() {
  const secret = "esunsecretooo";
  try {
    const savedToken = await AsyncStorage.getItem("jwt");
    if (savedToken) {
      const decodedToken = jwtDecode(savedToken);
      const userId = decodedToken.id;
      console.log(savedToken);
      return { token: savedToken, userId: userId };
    }
  } catch (error) {
    console.log(error);
  }
  // Si no se puede obtener el token, devolvemos un objeto con token null
  return { token: null, userId: null };
}

export default useId;
