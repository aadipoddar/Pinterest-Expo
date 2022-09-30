import { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";
import useColorScheme from "../hooks/useColorScheme";

export default function CreatePinScreen() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const colorScheme = useColorScheme();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSubmit = () => {};

  return (
    <View style={styles.root}>
      <Pressable onPress={pickImage}>
        <Text style={{ fontWeight: "bold" }}>Upload Your Pin</Text>
      </Pressable>

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TextInput
            placeholder="Title..."
            value={title}
            onChangeText={setTitle}
            style={
              (styles.input,
              { color: colorScheme === "dark" ? "white" : "black" })
            }
            placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
          />

          <Pressable onPress={onSubmit}>
            <Text style={{ fontWeight: "bold" }}>Submit Your Pin</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 5,
    width: "100%",
    borderRadius: 5,
  },
});
