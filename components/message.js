import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const date = new Date();

export default function Message(props) {
	const themeStyles = props.isDarkTheme ? darkStyles : lightStyles;

	return (
		<View style={[styles.message, themeStyles.message]}>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Image source={require("../assets/icons/user.png")} style={styles.icon} />
					<Text style={themeStyles.text}>User</Text>
				</View>
				<Text style={[{ fontSize: 10 }, themeStyles.text]}>
					{date.getHours()}:{date.getMinutes()}
				</Text>
			</View>
			<Text style={[{ fontSize: 14, width: "100%", flex: 1, paddingLeft: 0 }, themeStyles.text]}>
				{props.message}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	message: {
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
	message: {
		backgroundColor: "#f1f2f3",
	},
	text: {
		color: "#000",
	},
});

const darkStyles = StyleSheet.create({
	message: {
		backgroundColor: "#3c3c3c",
	},
	text: {
		color: "#fff",
	},
});
