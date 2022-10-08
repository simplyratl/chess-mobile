import React, { useState } from "react";
import { Chess } from "chess.js";
import { useConst } from "../utils/customHooks";
import { Dimensions, StyleSheet, View } from "react-native";
import Background from "../Background";
import Piece from "./Piece";
import { SIZE } from "../utils/notions";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });
  return (
    <View style={styles.container}>
      <Background />
      {state.board.map((row, i) =>
        row.map((square, j) => {
          if (square !== null) {
            return (
              <Piece
                key={`${i}-${j}`}
                id={`${square.color}${square.type}` as const}
                position={{ x: j * SIZE, y: i * SIZE } as const}
              />
            );
          }
          return null;
        })
      )}
    </View>
  );
};

export default Board;
