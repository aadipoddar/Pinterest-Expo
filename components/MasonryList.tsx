import { ScrollView, StyleSheet } from "react-native";
import Pin from "./Pin";
import { View } from "./Themed";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

export default function MasonryList({ pins }: IMasonryList) {
  return (
    <ScrollView contentContainerStyle={{ width: "100%" }}>
      <View style={styles.container}>
        {/* 1st Column */}
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 0)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>

        {/* 2nd Column */}
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 1)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
});
