import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

export default function Pin(props) {
  const { id, image, title } = props.pin;

  const [ratio, setRatio] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    if (image)
      Image.getSize(image, (width, height) => setRatio(width / height));
  }, [image]);

  const onLike = () => {};

  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <Image
          source={{
            uri: image,
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
