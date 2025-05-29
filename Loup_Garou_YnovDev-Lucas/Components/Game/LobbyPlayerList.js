// components/game/LobbyPlayerList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const PlayerItem = ({ player, isHost, onKick }) => {
  return (
     
    <View style={styles.playerItem}>
      <View style={styles.playerInfo}>
        <View 
          style={[
            styles.statusIndicator, 
            player.isReady ? styles.readyStatus : styles.notReadyStatus
          ]} 
        />
        <Text style={styles.playerName}>{player.username}</Text>
        {player.isHost && <Text style={styles.hostBadge}>Hôte</Text>}
      </View>
      
      {isHost && !player.isHost && (
        <TouchableOpacity 
          style={styles.kickButton} 
          onPress={() => onKick(player.id)}
        >
          <Text style={styles.kickText}>×</Text>
        </TouchableOpacity>
      )}
      </View>
     
  );
};


const LobbyPlayerList = ({ 
  players = [], 
  currentPlayerId,
  onKickPlayer,
  style,
}) => {

  const navigation = useNavigation();
useEffect(() => {
  console.log('useEffect triggered'); 
  console.log('Navigation prop:', navigation); 

  const timer = setTimeout(() => {
    console.log('Navigating to Jeu');
    navigation.navigate('Jeu');
  }, 5000);

  return () => {
    console.log('Timer cleared');
    clearTimeout(timer);
  };
}, [navigation]);
  // Identifier si le joueur actuel est l'hôte
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const isHost = currentPlayer?.isHost || false;
  
  return (
    <View style={styles.fond}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Lobby</Text>
    </View>
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Joueurs ({players.length})</Text>
      
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerItem 
            player={item} 
            isHost={isHost}
            onKick={onKickPlayer}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>En attente de joueurs...</Text>
        }
      />
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  fond: {
    flex: 1,
    backgroundColor: '#0A0A0A'
  },
  header: {
    position: 'absolute',
    top: 50, 
    left: 0, 
    right: 0, 
    height: 60,
    backgroundColor: '#B89F65', 
    paddingVertical: 15, 
    alignItems: 'center', 
    zIndex: 1, 
  },
  headerText: {
    color: '#FFFFFF', 
    fontSize: 24, 
    fontWeight: 'bold', 
  },
  container: {
    backgroundColor: '#0A0A0A',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    maxHeight: 300,
    top: 150,
    flex: 1,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  readyStatus: {
    backgroundColor: '#B89F65',
  },
  notReadyStatus: {
    backgroundColor: '#6A1A1A',
  },
  playerName: {
    color: '#F5F5F5',
    fontSize: 16,
  },
  hostBadge: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#B89F65',
    borderRadius: 4,
    color: '#0A0A0A',
    fontSize: 10,
    fontWeight: 'bold',
  },
  kickButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kickText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#F5F5F5',
    opacity: 0.5,
    textAlign: 'center',
    padding: 16,
  }
});

export default LobbyPlayerList;