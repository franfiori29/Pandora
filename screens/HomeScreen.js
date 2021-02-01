import { auth, db } from "../firebase";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	Alert,
	Platform,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import CustomListItem from "../components/CustomListItem";
import { PRIMARY_COLOR } from "../constants";

const HomeScreen = ({ navigation }) => {
	const [chats, setChats] = useState("");

	const signOutUser = () => {
		if (Platform.OS === "web") {
			if (window.confirm("Are you sure?")) {
				return auth.signOut().then(() => navigation.replace("Login"));
			}
		} else {
			Alert.alert("You are about to logout", "Are you sure?", [
				{
					text: "YES",
					onPress: () => auth.signOut().then(() => navigation.replace("Login")),
				},
				{ text: "Cancel", style: "cancel" },
			]);
		}
	};

	useEffect(() => {
		const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
		return unsubscribe;
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Pandora",
			headerStyle: { backgroundColor: PRIMARY_COLOR },
			headerTitleStyle: { color: "white" },
			headerLeft: () => (
				<TouchableOpacity style={{ marginLeft: 20 }} activeOpacity={0.5}>
					<Ionicons
						name='log-out-outline'
						size={24}
						color='white'
						onPress={signOutUser}
					/>
				</TouchableOpacity>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						width: 80,
						marginRight: 20,
					}}
				>
					<View>
						<TouchableOpacity activeOpacity={0.5}>
							<Avatar
								rounded
								containerStyle={{
									borderWidth: 1,
									borderColor: "rgb(214, 213, 209)",
								}}
								source={{ uri: auth?.currentUser?.photoURL }}
								onPress={() => alert("Feature not implemented yet")}
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("AddChat")}
						activeOpacity={0.5}
					>
						<SimpleLineIcons name='pencil' size={24} color='white' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const enterChat = (id, chatName) => {
		navigation.navigate("Chat", {
			id,
			chatName,
		});
	};

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				{!!chats.length &&
					chats.map(({ id, data: { chatName } }) => (
						<CustomListItem
							key={id}
							id={id}
							chatName={chatName}
							enterChat={enterChat}
						/>
					))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
