import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Menu from "../components/Menu";
import AddButton from "../components/Add";
import useFetch from "../hooks/useFetch";
import useId from "../hooks/useId";
import { API_URL } from "../config"; // Importa la variable de entorno
import MenuOption from "../components/MenuOption";
import Loading from "../components/Loading";
import Folder from "../components/Folder";
import SaveButton from "../components/Save";

const AllFolders = ({ navigation }) => {
  const [folders, setFolders] = useState([]);
  const [currentDisplay, setDisplay] = useState("Grid");
  const [openFolder, setOpenFolder] = useState(false);
  const [folderData, setFolderData] = useState({
    name: "",
    id: "",
  });

  const { data, error, loading, fetchData } = useFetch(
    `${API_URL}/folder/getAll`
  );

  async function fetchFolders() {
    const idData = await useId();
    if (idData && idData.token) {
      const { userId, token } = idData;
      // Ahora puedes utilizar userId y token para hacer la solicitud
      await fetchData("POST", { userId: userId }, token);
    }
  }
  useEffect(() => {
    if (!loading) {
      fetchFolders();
    }
  }, []);

  useEffect(() => {
    if (data) {
      const newFolders = data.folders.map((folder) => (
        <ButtonComponent
          key={folder._id} // Agrega una clave única
          color={"#ffffff75"}
          onPress={() => {
            setFolderData({
              name: folder.name,
              id: folder._id,
            });
            setOpenFolder(true);
          }}
          imageSource={require("../assets/Folder.png")}
          buttonText={folder.name}
        />
      ));
      setFolders(newFolders);
    }
    if (error) {
      console.log(`Error: ${error}`);
    }
  }, [data, error]);

  const addFolder = () => {
    setFolderData({
      name: "",
      id: undefined,
    });
    setOpenFolder(true);
  };

  const changeDisplay = () => {
    currentDisplay === "Grid"
      ? setDisplay("List")
      : currentDisplay === "List"
      ? setDisplay("Grid")
      : null;
  };

  return (
    <>
      {loading && (
        <View style={styles.loading}>
          <Loading />
        </View>
      )}
      {openFolder ? (
        <>
          <Folder
            folderName={folderData.name}
            folderId={folderData.id}
            toClose={() => {
              setOpenFolder(false);
              fetchFolders();
            }}
          />
        </>
      ) : (
        <>
          <View style={styles.barMenu}>
            <Menu navigation={navigation} />
            <MenuOption
              onPress={changeDisplay}
              imageSource={
                currentDisplay === "List"
                  ? require("../assets/List.png")
                  : require("../assets/Grid.png")
              }
              buttonText={`View ${currentDisplay}`}
            />
            <MenuOption
              imageSource={require("../assets/filter.png")}
              buttonText={"Filtro"}
            />
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <ScrollView>
              <View style={styles.container}>
                {folders.map((folder, index) => (
                  <View
                    key={index}
                    style={{
                      margin:
                        currentDisplay === "List"
                          ? 0
                          : folder.length > 1
                          ? 5
                          : 0,
                      marginTop: currentDisplay === "List" ? 5 : 5,
                      marginBottom: currentDisplay === "List" ? 5 : 5,
                      width:
                        folder.length > 1
                          ? currentDisplay === "List"
                            ? "100%"
                            : "47%"
                          : "100%",
                    }}
                  >
                    {folder}
                  </View>
                ))}
              </View>
              <View style={{ height: 500 }}></View>
            </ScrollView>
          </View>
          <AddButton onPress={addFolder} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    alignItems: "flex-start",
  },
  barMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    color: "white",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro con un poco de transparencia
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});

export default AllFolders;
