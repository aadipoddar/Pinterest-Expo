import { ScrollView, StyleSheet } from "react-native";
import Pin from "../components/Pin";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Pin
          pin={{
            title: "1st Title",
            image:
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg",
          }}
        />
        <Pin
          pin={{
            title: "2nd Title",
            image:
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/1.jpeg",
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
