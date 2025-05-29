import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const defaultPlayers = [
  { id: '1', name: 'Lucas', isHost: false },
  { id: '2', name: 'Yanis', isHost: true },
  { id: '3', name: 'Fred', isHost: false },
  { id: '4', name: 'Joueur4', isHost: false },
  { id: '5', name: 'Joueur5', isHost: false },
];

const LobbyScreen = ({
  players = defaultPlayers,
  currentUserId = '2',
  gameCode = 'XXXXX',
  onStartGame = () => {},
}) => {
  const [playersList] = useState(players);

  // Déterminer si l'utilisateur courant est l'hôte
  const hostPlayer = playersList.find(p => p.isHost);
  const isCurrentUserHost = hostPlayer
    ? hostPlayer.id === currentUserId
    : false;

  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <View
        style={[
          styles.statusDot,
          item.isHost ? styles.dotHost : styles.dotNotHost,
        ]}
      />
      <Text style={styles.playerName}>{item.name}</Text>
      {item.isHost && (
        <View style={styles.hostBadge}>
          <Text style={styles.hostBadgeText}>Hôte</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LOBBY</Text>
        <Text style={styles.subtitle}>
          {isCurrentUserHost
            ? "Prêt à lancer la partie"
            : "En attente de l’hôte…"}
        </Text>
      </View>

      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Code de la partie</Text>
        <Text style={styles.codeValue}>{gameCode}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Joueurs</Text>
        <FlatList
          data={playersList}
          keyExtractor={item => item.id}
          renderItem={renderPlayer}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {isCurrentUserHost && (
        <TouchableOpacity
          style={[
            styles.startButton,
            playersList.length === 5 ? {} : styles.buttonDisabled,
          ]}
          activeOpacity={0.8}
          onPress={onStartGame}
          accessible
          accessibilityLabel="Bouton lancer la partie"
        >
          <Text style={styles.startButtonText}>Lancer la partie</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LobbyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    color: '#D1B46A',
    fontSize: 48,
    fontWeight: '700',
  },
  subtitle: {
    color: '#585858',
    fontSize: 18,
    marginTop: 12,
  },
  codeContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  codeLabel: {
    color: '#585858',
    fontSize: 16,
  },
  codeValue: {
    color: '#D1B46A',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  card: {
    width: '90%',
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 0,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  dotHost: {
    backgroundColor: '#D1B46A',
  },
  dotNotHost: {
    backgroundColor: '#C42B2B',
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 20,
    flex: 1,
  },
  hostBadge: {
    backgroundColor: '#D1B46A',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  hostBadgeText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  startButton: {
    width: '90%',
    backgroundColor: '#D1B46A',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  startButtonText: {
    color: '#000000',
    fontSize: 26,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
