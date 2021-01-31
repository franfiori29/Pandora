import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { PRIMARY_COLOR } from "../constants";
import logo from "../assets/untitled.png";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigation.replace("Home");
			}
		});
		return unsub;
	}, []);

	const signIn = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.catch(() => alert("Wrong credentials"));
	};

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<StatusBar style='light' />
			<Image
				source={logo}
				style={{ width: 180, height: 180, marginBottom: 20 }}
			/>
			<View style={styles.inputContainer}>
				<Input
					placeholder='Email'
					autoFocus
					type='email'
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					placeholder='Password'
					type='password'
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					onSubmitEditing={signIn}
				/>
			</View>
			<Button
				title='Login'
				buttonStyle={styles.login}
				// containerStyle={styles.login}
				onPress={signIn}
			/>
			<Button
				titleStyle={{ color: PRIMARY_COLOR }}
				title='Register'
				containerStyle={styles.register}
				// buttonStyle={styles.register}
				type='outline'
				onPress={() => navigation.navigate("Register")}
			/>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
	},
	inputContainer: {
		width: 300,
	},
	login: {
		width: 200,
		marginTop: 10,
		backgroundColor: PRIMARY_COLOR,
	},
	register: {
		width: 200,
		marginTop: 10,
	},
});
