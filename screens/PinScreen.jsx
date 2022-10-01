import { Ionicons } from "@expo/vector-icons";
import { useNhostClient } from "@nhost/react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";

const GET_PIN_QUERY = `
    query MyQuery ($id: uuid!) {
      pins_by_pk(id: $id) {
        created_at
        id
        image
        title
        user {
          avatarUrl
          displayName
        }
      }
    }
    `;

export default function PinScreen() {
  const [ratio, setRatio] = useState(1);
  const [pin, setPin] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const nhost = useNhostClient();

  const pinId = route.params?.id;

  const fetchPin = async (pinId) => {
    const response = await nhost.graphql.request(GET_PIN_QUERY, { id: pinId });

    if (response.error) Alert.alert("Error Fetching Pins");
    else setPin(response.data.pins_by_pk);
  };

  useEffect(() => {
    fetchPin(pinId);
  }, [pinId]);

  useEffect(() => {
    if (pin?.image)
      Image.getSize(pin.image, (width, height) => setRatio(width / height));
  }, [pin]);

  const goBack = () => {
    navigation.goBack();
  };

  if (!pin) return <Text>Pin Not Found</Text>;

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ratio }]}
        />

        <Text style={styles.title}>{pin.title}</Text>
      </View>

      <Pressable
        onPress={goBack}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name={"chevron-back"} size={35} color={"white"} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 35,
  },
  backBtn: {
    position: "absolute",
    left: 10,
  },
});
