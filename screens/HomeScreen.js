import { auth } from "../firebase";
import React, { useLayoutEffect } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";

const HomeScreen = ({ navigation }) => {
	const signOutUser = () => {
		auth.signOut().then(() => navigation.replace("Login"));
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal",
			headerStyle: { backgroundColor: "white" },
			headerTitleStyle: { color: "black" },
			headerLeft: () => (
				<View style={{ marginLeft: 20 }}>
					<TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
						<Avatar
							rounded
							containerStyle={{
								borderWidth: 1,
								borderColor: "rgb(214, 213, 209)",
							}}
							source={{ uri: auth?.currentUser?.photoURL }}
						/>
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<SafeAreaView>
			<ScrollView>
				<CustomListItem />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
