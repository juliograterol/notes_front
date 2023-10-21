import { TouchableOpacity, View } from "react-native";

const PopUpMenu = ({ children, isVisible }) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#fff",
        width: "90%",
        position: "absolute",
        top: 40,
        right: 0,
        display: isVisible ? "flex" : "none",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {children}
    </View>
  );
};

export default PopUpMenu;
