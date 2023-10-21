import { View, TouchableOpacity, StyleSheet } from "react-native";

const Color = ({ color, setColor }) => {
  return (
    <TouchableOpacity
      onPress={setColor}
      style={{
        right: 10,
        borderRadius: 360,
        height: 40,
        width: 40,
        borderColor: "lightgrey",
        borderWidth: 3,
        backgroundColor: color,
      }}
    ></TouchableOpacity>
  );
};

export default Color;
