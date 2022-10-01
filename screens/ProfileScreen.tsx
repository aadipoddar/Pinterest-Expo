import { Entypo, Feather } from "@expo/vector-icons";
import { useSignOut } from "@nhost/react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";

import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { signOut } = useSignOut();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>
            <Feather
              name="share"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              style={styles.icon}
            />
          </Pressable>

          <Entypo
            name="dots-three-horizontal"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
            style={styles.icon}
          />
        </View>

        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/83405769?s=400&u=515f7889a3ddb7b9ba526babd23d28db28bdd8f2&v=4",
          }}
          style={styles.image}
        />

        <Text style={styles.title}>Aadi Poddar</Text>
        <Text style={styles.subtitle}>123 Followers | 534 Following</Text>
      </View>

      <MasonryList pins={pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    fontWeight: "600",
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
