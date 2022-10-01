import { Entypo, Feather } from "@expo/vector-icons";
import { useNhostClient, useSignOut, useUserId } from "@nhost/react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import MasonryList from "../components/MasonryList";

import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";

const GET_USER_QUERY = `
query MyQuery($id: uuid!) {
  user(id: $id) {
    id
    avatarUrl
    displayName
    pins {
      id
      image
      title
    }
  }
}
`;

export default function ProfileScreen() {
  const [user, setUser] = useState();
  const colorScheme = useColorScheme();
  const { signOut } = useSignOut();
  const userId = useUserId();
  const nhost = useNhostClient();

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
    if (result.error) Alert.alert("Error Fetching User");
    else setUser(result.data.user);
  };

  useEffect(() => {
    fetchUserData();
  });

  if (!user) return <ActivityIndicator />;

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
            uri: "https://cdn-icons-png.flaticon.com/512/145/145808.png",
          }}
          style={styles.image}
        />

        {/* @ts-ignore */}
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subtitle}>123 Followers | 534 Following</Text>
      </View>

      {/* @ts-ignore */}
      <MasonryList pins={user.pins} onRefresh={fetchUserData} />
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
