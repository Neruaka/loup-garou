import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import CountdownTimer from "@/components/ui/CountdownTimer";
import Modal from "@/components/core/Modal";

const players = ["Lucas", "Yanis", "Fred", "Joueur4"];

const RadioButton = ({ selected }) => (
  <View
    style={[
      styles.radioOuter,
      selected ? styles.radioSelected : styles.radioUnselected,
    ]}
  >
    {selected && <Feather name="check" size={16} color="#000" />}
  </View>
);

const PlayerRow = ({ name, selected, onPress }) => (
  <TouchableOpacity
    style={styles.playerRow}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.playerName}>{name}</Text>
    <RadioButton selected={selected} />
  </TouchableOpacity>
);

const VoteScreen = () => {
  const [selectedPlayer, setSelectedPlayer] = useState("Yanis");
  const [seconds, setSeconds] = useState(25);
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>VOTE</Text>
        <Text style={styles.subtitle}>Voter pour un joueur à éliminer</Text>
      </View>
      <View style={styles.list}>
        {players.map((name) => (
          <PlayerRow
            key={name}
            name={name}
            selected={selectedPlayer === name}
            onPress={() => setSelectedPlayer(name)}
          />
        ))}
      </View>
      <View style={styles.timerContainer}>
        <CountdownTimer
          onComplete={() => {
            setShowModal(true);
          }}
          duration={5}
          style={styles.timerText}
        />
      </View>

      <Modal
        visible={showModal}
        title="Vote Result"
        onClose={() => {setShowModal(false)}}
        sentence={true}
      >
        {selectedPlayer} le conseil a décidé de vous éliminer et leur sentence est irrévocable
      </Modal>
    </View>
  );
};

export default VoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
  },
  title: {
    color: "#D1B46A",
    fontSize: 48,
    fontWeight: "700",
  },
  subtitle: {
    color: "#575757",
    fontSize: 18,
    marginTop: 8,
  },
  list: {
    marginTop: 20,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121212",
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 24,
    marginVertical: 6,
  },
  playerName: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  radioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  radioUnselected: {
    borderWidth: 2,
    borderColor: "#5A5A5A",
  },
  radioSelected: {
    backgroundColor: "#D1B46A",
    borderColor: "#D1B46A",
  },
  timerContainer: {
    /* alignSelf: 'center',
    backgroundColor: '#D1B46A',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 40,
    */
    marginBottom: 20,
  },
  timerText: {
    color: "#000000",
    fontSize: 28,
    fontFamily: "monospace",
  },
});
