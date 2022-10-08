import { StyleSheet, Text, View } from "react-native";
import Background from "./src/components/Background";
import Board from "./src/components/Game/Board";

export default function App() {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#221f1e",
    justifyContent: "center",
  },
});
