import React, { useCallback } from "react";
import { Image, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Chess, Position } from "chess.js";

import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { SIZE, toPosition, toTranslation } from "../utils/notions";

type Player = "b" | "w";
type Type = "q" | "r" | "n" | "b" | "k" | "p";
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;

export const PIECES: Pieces = {
  br: require("../../assets/figures/br.png"),
  bp: require("../../assets/figures/bp.png"),
  bn: require("../../assets/figures/bn.png"),
  bb: require("../../assets/figures/bb.png"),
  bq: require("../../assets/figures/bq.png"),
  bk: require("../../assets/figures/bk.png"),
  wr: require("../../assets/figures/wr.png"),
  wn: require("../../assets/figures/wn.png"),
  wb: require("../../assets/figures/wb.png"),
  wq: require("../../assets/figures/wq.png"),
  wk: require("../../assets/figures/wk.png"),
  wp: require("../../assets/figures/wp.png"),
};

interface PieceProps {
  id: Piece;
  position: Vector;
  chess: Chess;
}

const Piece = ({ id, position, chess }: PieceProps) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const movePiece = useCallback((to: Position) => {
    const from = toPosition({ x: offsetX.value, y: offsetY.value });
    const moves = chess.moves({ verbose: true });
    const move = moves.find((m) => m.from === from && m.to === to);

    const { x, y } = toTranslation(move ? move.to : from);
    translateX.value = withTiming(x, {}, () => (offsetX.value = translateX.value));
    translateY.value = withTiming(y, {}, () => {
      offsetY.value = translateY.value;
      isGestureActive.value = false;
    });
  }, []);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX + offsetX.value;
      translateY.value = translationY + offsetY.value;
    },
    onEnd: () => {
      const from = toPosition({ x: offsetX.value, y: offsetY.value });
      const to = toPosition({ x: translateX.value, y: translateY.value });
      runOnJS(movePiece)(from, to);
    },
  });

  const piece = useAnimatedStyle(() => ({
    position: "absolute",
    width: SIZE,
    height: SIZE,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    zIndex: 20,
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={piece}>
        <Image source={PIECES[id]} style={styles.piece} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});

export default Piece;
