import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import { PRIMARY_COLOR } from "../constants";

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Back to Login",
		});
	}, [navigation]);

	const register = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: name,
					photoURL:
						imageUrl ||
						"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
				});
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<StatusBar style='light' />
			<Text h3 style={{ marginBottom: 50 }}>
				Create an account
			</Text>
			<View style={styles.inputContainer}>
				<Input
					placeholder='Full name'
					autoFocus
					tye='text'
					value={name}
					onChangeText={setName}
				/>
				<Input
					placeholder='Email'
					tye='email'
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					placeholder='Password'
					tye='password'
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<Input
					placeholder='Profile Pic Url (optional)'
					tye='text'
					value={imageUrl}
					onChangeText={setImageUrl}
					onSubmitEditing={register}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				title='Register'
				onPress={register}
				buttonStyle={{ backgroundColor: PRIMARY_COLOR }}
			/>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
	},
	button: {
		width: 200,
		marginTop: 10,
	},
	inputContainer: {
		width: 300,
	},
});
