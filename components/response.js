import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";

const date = new Date();
const API_KEY = "AIzaSyBinrKHAY0CnITF8uJbbgYz2WtYo_8Vwd4";
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Response(props) {
	const [generatedText, setGeneratedText] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });
			const prompt = props.prompt;
			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = await response.text();
			setGeneratedText(text);
		};
		fetchData();
	}, []);

	const themeStyles = props.isDarkTheme ? darkStyles : lightStyles;

	return (
		<View style={[styles.response, themeStyles.response]}>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Image source={require("../assets/icons/robot.png")} style={styles.icon} />
					<Text style={themeStyles.text}>ChatBot</Text>
				</View>
				<Text style={[{ fontSize: 10 }, themeStyles.text]}>
					{date.getHours()}:{date.getMinutes()}
				</Text>
			</View>
			<Markdown style={themeStyles.markdown}>{generatedText}</Markdown>
		</View>
	);
}

const styles = StyleSheet.create({
	response: {
		flexDirection: "column",
		gap: 8,
		marginBottom: 8,
		padding: 16,
		borderRadius: 16,
	},
	icon: {
		width: 28,
		height: 28,
	},
});

const lightStyles = StyleSheet.create({
	response: {
		backgroundColor: "#fafafa",
	},
	text: {
		color: "#000",
	},
	markdown: {
		body: {
			color: "#000", // Text color for light mode
		},
	},
});

const darkStyles = StyleSheet.create({
	response: {
		backgroundColor: "#2c2c2c",
	},
	text: {
		color: "#fff",
	},
	markdown: {
		body: {
			color: "#fff", // Text color for dark mode
		},
	},
});
