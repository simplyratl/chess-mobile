import { StyleSheet, Text, View } from "react-native";

const WHITE = "rgb(100, 133, 69)";
const BLACK = "rgb(230, 223, 196)";

interface RowProps {
  row: number;
}

interface SquareProps extends RowProps {
  col: number;
}

const Square = ({ row, col }: SquareProps) => {
  const offset = row % 2 === 0 ? 1 : 0;
  const backgroundColor = (col + offset) % 2 === 0 ? WHITE : BLACK;
  const color = (col + offset) % 2 === 0 ? BLACK : WHITE;

  return (
    <View style={{ flex: 1, backgroundColor, padding: 4 }}>
      <Text style={{ color, fontWeight: "600", opacity: col === 0 ? 1 : 0 }}>{8 - row}</Text>
      <Text style={{ color, fontWeight: "600", alignSelf: "flex-end", opacity: row === 7 ? 1 : 0 }}>
        {String.fromCharCode("a".charCodeAt(0) + col)}
      </Text>
    </View>
  );
};

const Row = ({ row }: RowProps) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {new Array(8).fill(0).map((_, col) => (
        <Square key={col} row={row} col={col} />
      ))}
    </View>
  );
};

const Background = () => {
  return (
    <View style={styles.container}>
      {new Array(8).fill(0).map((_, row) => (
        <Row key={row} row={row} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    zIndex: 10,
  },
});

export default Background;
