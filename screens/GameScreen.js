import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const [rounds, setRounds] = useState(0);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess == userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, onGameOver, userChoice]);

  const nextGuessHandler = (direction) => {
    if (
      (direction == "lower" && currentGuess < props.userChoice) ||
      (direction == "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie", "You know this is not true...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction == "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(rounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Robot's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
        <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
});

export default GameScreen;
