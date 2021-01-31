import { auth, db } from "../firebase";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Icon, Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRIMARY_COLOR } from "../constants";

const AddChatScreen = ({ navigation }) => {
	const [input, setInput] = useState("");
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Start a chat",
			// headerStyle: { backgroundColor: "white" },
			headerTitleStyle: { color: "white" },
			headerBackTitle: "Chats",
			// headerRight: () => (
			// 	<View
			// 		style={{
			// 			flexDirection: "row",
			// 			justifyContent: "space-between",
			// 			width: 80,
			// 			marginRight: 20,
			// 		}}
			// 	>
			// 		<TouchableOpacity activeOpacity={0.5}>
			// 			<AntDesign name='camerao' size={24} color='black' />
			// 		</TouchableOpacity>
			// 		<TouchableOpacity
			// 			onPress={() => navigation.navigate("AddChat")}
			// 			activeOpacity={0.5}
			// 		>
			// 			<SimpleLineIcons name='pencil' size={24} color='black' />
			// 		</TouchableOpacity>
			// 	</View>
			// ),
		});
	}, [navigation]);

	const createChat = async () => {
		await db
			.collection("chats")
			.add({
				chatName: input,
			})
			.then(() => {
				navigation.goBack();
			})
			.catch(() => alert("There was an unexpected error"));
	};

	return (
		<View style={styles.container}>
			<Input
				placeholder='Enter a chat name'
				value={input}
				onChangeText={setInput}
				leftIcon={
					<Icon name='wechat' type='antdesign' size={24} color='grey' />
				}
			/>
			<Button
				buttonStyle={{ backgroundColor: PRIMARY_COLOR }}
				onSubmitEditing={createChat}
				onPress={createChat}
				title='Create new chat'
				disabled={!input}
			/>
		</View>
	);
};

export default AddChatScreen;

const styles = StyleSheet.create({
	container: {
		padding: 30,
		height: "100%",
	},
});
