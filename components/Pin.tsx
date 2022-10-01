import { AntDesign } from "@expo/vector-icons";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

export default function Pin(props: any) {
  const { id, image, title } = props.pin;
  const [imageUri, setImageUri] = useState("");
  const [ratio, setRatio] = useState(1);
  const navigation = useNavigation();
  const nhost = useNhostClient();

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({
      fileId: image,
    });

    if (result.presignedUrl?.url) setImageUri(result.presignedUrl.url);
  };

  useEffect(() => {
    fetchImage();
  }, [image]);

  useEffect(() => {
    if (imageUri)
      Image.getSize(imageUri, (width, height) => setRatio(width / height));
  }, [imageUri]);

  const onLike = () => {};

  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <Image
          source={{
            uri: imageUri,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />

        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    padding: 4,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    margin: 5,
  },
  image: {
    width: "100%",
    borderRadius: 15,
  },
  heartBtn: {
    backgroundColor: "#D3CFC4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});
