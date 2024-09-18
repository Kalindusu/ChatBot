import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import Response from "./components/response";
import Message from "./components/message";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function App() {
  const [inputText, setInputText] = useState("");
  const [listData, setListData] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State to manage theme
  
  const SearchInput = () => {
    setListData((prevList) => [...prevList, inputText]);
    setInputText("");
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeStyles = isDarkTheme ? darkStyles : lightStyles; // Choose theme based on state

  return (
    <View style={[styles.container, themeStyles.container]}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={[styles.header, themeStyles.header]}>
        <Image source={require("./assets/icons/robot.png")} style={styles.icon} />
        <Text style={[{ fontSize: 25, fontWeight: "800" }, themeStyles.headerText]}>Chat with Gemini</Text>
      </View>

      {/* Theme Toggle Button */}
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
        <Text style={themeStyles.themeButtonText}>
          {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
        </Text>
      </TouchableOpacity>

      {/* Content */}
      <FlatList
        style={{ paddingHorizontal: 16, marginBottom: 80 }}
        data={listData}
        renderItem={({ item }) => (
          <View>
            <Message message={item} isDarkTheme={isDarkTheme} />
			<Response prompt={item} isDarkTheme={isDarkTheme} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Search-Bar */}
      <View style={[styles.searchBar, themeStyles.searchBar]}>
        <TextInput
          placeholder="Message Gemini"
          style={[styles.input, themeStyles.input]}
          placeholderTextColor={isDarkTheme ? "#ccc" : "#323232"}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          selectionColor={isDarkTheme ? "#ccc" : "#323232"}
        />
        <TouchableOpacity onPress={SearchInput}>
          <Image  source={require("./assets/icons/right-arrow.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    width: '100%',
    height: 70,
    marginTop: 0,
    paddingTop: 20,
    paddingLeft: 60,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 30,
  },
  themeToggleButton: {
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  searchBar: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 8,
  },
  input: {
    width: "100%",
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    borderWidth: 0.1,
  },
});

// Light Theme Styles
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#291D7D",
  },
  headerText: {
    color: "white",
  },
  searchBar: {
    backgroundColor: "#f5f5f5",
  },
  input: {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  themeButtonText: {
    color: "#000",
  },
});

// Dark Theme Styles
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  header: {
    backgroundColor: "#000000",
  },
  headerText: {
    color: "#ffffff",
  },
  searchBar: {
    backgroundColor: "#2c2c2c",
  },
  input: {
    backgroundColor: "#333333",
    color: "#ffffff",
  },
  themeButtonText: {
    color: "#fff",
  },
});
