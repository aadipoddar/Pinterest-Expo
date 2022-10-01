import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text, View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";
import useColorScheme from "../hooks/useColorScheme";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";

const CREATE_PIN_MUTATION = `
mutation MyMutation ($image: String!, $title: String) {
  insert_pins(objects: {image: $image, title: $title}) {
    returning {
      created_at
      id
      image
      title
      user_id
    }
  }
}
`;

export default function CreatePinScreen() {
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [title, setTitle] = useState("");
  const colorScheme = useColorScheme();
  const nhost = useNhostClient();
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) setImageUri(result.uri);
  };

  const uploadFile = async () => {
    if (!imageUri) return { error: { message: "No image selected" } };

    const parts = imageUri.split("/");
    const name = parts[parts.length - 1];
    const nameParts = name.split(".");
    const extension = nameParts[nameParts.length - 1];

    const uri =
      Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;

    //@ts-ignore
    const result = await nhost.storage.upload({
      file: {
        name,
        type: `image/${extension}`,
        uri,
      },
    });

    return result;
  };

  const onSubmit = async () => {
    const uploadResult = await uploadFile();

    if (uploadResult.error) {
      Alert.alert("Error uploading the Image");
      return;
    }

    const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
      title,
      image: uploadResult.fileMetadata.id,
    });

    if (result.error) Alert.alert("Error creating the Post");
    else navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={pickImage}>
        <Text style={{ fontWeight: "bold", color: "#2f95dc" }}>
          Upload Your Pin
        </Text>
      </Pressable>

      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
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
            <Text style={{ fontWeight: "bold", color: "#2f95dc" }}>
              Submit Your Pin
            </Text>
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
