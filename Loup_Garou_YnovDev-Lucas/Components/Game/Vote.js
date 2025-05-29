import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Vote = ({ players = [] }) => {
  const [votes, setVotes] = useState({});
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [randomId, setRandomId] = useState(null);
  const ids = [1, 2, 3, 4, 5];

  const buttonNames = ['Luca', 'Paul', 'Chloé', 'Estelle', 'Jean'];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * ids.length);
      setRandomId(ids[randomIndex]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = (playerId) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [playerId]: (prevVotes[playerId] || 0) + 1,
    }));
    setSelectedPlayerId(playerId);
  };

  const calculateWinner = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const winner = Object.keys(votes).find((key) => votes[key] === maxVotes);
    setSelectedPlayerId(null);
    alert(
      `Le joueur sélectionné est : ${
        players.find((player) => player.id.toString() === winner)?.username || 'Aucun'
      }`
    );
  };

  const getSelectedPlayer = () => {
    return players.find((player) => player.id === selectedPlayerId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votez pour un joueur</Text>
      <TouchableOpacity
        style={styles.calculateButton}
        onPress={() => setShowTable(!showTable)}
      >
        <Text style={styles.calculateText}>Qui meurt ?</Text>
      </TouchableOpacity>
      {showTable && (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.voteButton,
                selectedPlayerId === item.id && styles.selectedButton, // Applique le style rouge si sélectionné
              ]}
              onPress={() => handleVote(item.id)}
            >
              <Text style={styles.playerName}>{item.username}</Text>
              <Text style={styles.voteCount}>
                Votes : {votes[item.id] || 0}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      {showTable && (
        <View>
          {buttonNames.map((name, index) => (
            <TouchableOpacity
              key={index}
              style={styles.calculateButton}
              onPress={() => alert(`Vous avez tué ${name}`)}
            >
              <Text style={styles.calculateText}>{name}</Text>
            </TouchableOpacity>
          ))}
          {getSelectedPlayer() && (
            <Text style={styles.winnerText}>
              Le joueur sélectionné est : {getSelectedPlayer()?.username}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: '#FF0000',
  },
  voteButton: {
    backgroundColor: '#B89F65',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  voteCount: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#6A1A1A',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  calculateText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  winnerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Vote;