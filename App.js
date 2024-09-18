import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity,SafeAreaView } from "react-native";
import Response from "./components/response";
import Message from "./components/message";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';







export default function App() {
	const [inputText, setInputText] = useState("");
	const [listData, setListData] = useState([]);
	const SearchInput = () => {
		setListData((prevList) => [...prevList, inputText]);
		setInputText("");
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			
			{/* Header */}
			<View style={styles.header}>
				<Image source={require("./assets/icons/robot.png") } style={styles.icon} />
				<Text style={{ fontSize: 25 , fontWeight: "800", color: "white" }}>Chat with Gemini </Text>
				
			</View>
			{/* <View><ChatAi/></View> */}

			{/* Content */}
			<FlatList
				style={{ paddingHorizontal: 16, marginBottom: 80 }}
				data={listData}
				renderItem={({ item }) => (
					<View>
						<Message message={item} />
						<Response prompt={item} />
					</View>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>

			{/* Search-Bar */}
			<View style={styles.searchBar}>
				<TextInput placeholder="Ask to PitCrew AI" style={styles.input} value={inputText} onChangeText={(text) => setInputText(text)} selectionColor={"#323232"}></TextInput>
				<TouchableOpacity onPress={SearchInput}>
					<Image source={require("./assets/icons/right-arrow.png")} style={styles.icon} />
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
		backgroundColor:'#291D7D',
		paddingTop:20,
		paddingLeft:60
	},
	icon: {
		width: 35,
		height: 35,
		marginRight:30
	},
	searchBar: {
		backgroundColor: "#ffffff",
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
		backgroundColor: "#fff",
		width: "100%",
		fontSize: 16,
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 32,
		borderWidth: 0.1,
	},
});
