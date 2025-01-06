import { Button, Text, View } from "react-native";

type Player = "X" | "O" | "";
const Cell = (player: Player = "") => {
  return <Button title={player}></Button>;
};

export default Cell;
