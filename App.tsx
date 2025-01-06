import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handlePress = (index: number) => {
    if (board[index] || checkWinner()) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      Alert.alert("Game Over", `${winner} wins!`, [
        { text: "Restart", onPress: resetGame },
      ]);
    } else if (!newBoard.includes(null)) {
      Alert.alert("Game Over", "It's a draw!", [
        { text: "Restart", onPress: resetGame },
      ]);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (boardToCheck = board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
      <Text
        style={[
          styles.squareText,
          board[index] === "X" ? styles.textX : styles.textO,
        ]}
      >
        {board[index]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((_, index) => renderSquare(index))}
      </View>
      <Text style={styles.playerText}>Current Player: {currentPlayer}</Text>
      <TouchableOpacity style={styles.resetGame} onPress={resetGame}>
        <Text>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F6F2",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4A4E69",
  },
  board: {
    width: 320,
    height: 320,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 16,
    backgroundColor: "#E8E8E8",
    borderWidth: 1,
    borderColor: "#C9ADA7",
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9A8C98",
    backgroundColor: "#FFF1E6",
  },
  squareText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  textX: {
    color: "#F4A261",
  },
  textO: {
    color: "#2A9D8F",
  },
  playerText: {
    fontSize: 18,
    marginTop: 20,
    color: "#4A4E69",
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetGame: {
    marginTop: 12,
  },
});
