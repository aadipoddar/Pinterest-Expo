import { StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import Colors from "../../../constants/Colors";
import { Text, View } from "../../../components/Themed";
import { useNhostClient } from "@nhost/react";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const nhost = useNhostClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterPressed = async () => {
    const result = await nhost.auth.signUp({
      email,
      password,
      options: {
        displayName: name,
      },
    });

    if (result.error) Alert.alert("Error Signing Up", result.error.message);
    else navigation.navigate("SignIn");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          style={styles.input}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <CustomButton text="Register" onPress={onRegisterPressed} />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: Colors.light.tint,
  },
  input: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
  },
});

export default SignUpScreen;
