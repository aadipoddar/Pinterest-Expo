import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
//@ts-ignore
import Logo from "../../../assets/images/logo.png";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useNhostClient } from "@nhost/react";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nhost = useNhostClient();

  const onSignInPressed = async () => {
    const result = await nhost.auth.signIn({ email, password });

    if (result.error) Alert.alert("Error Signing in", result.error.message);
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
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

        <CustomButton text="Sign In" onPress={onSignInPressed} />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
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
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
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

export default SignInScreen;
