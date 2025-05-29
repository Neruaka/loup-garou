import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import CountdownTimer from '../components/game/CountdownTimer';
import CustomButton from '../components/CustomButton';

// Composant principal de l'écran de jeu
const GameScreen = () => {
  // États
  const [isNight, setIsNight] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [sunPosition] = useState(new Animated.Value(0));
  const [moonPosition] = useState(new Animated.Value(-1));
  const [skyOpacity] = useState(new Animated.Value(1));
  const [nightOpacity] = useState(new Animated.Value(0));

  // Rôle du joueur (simulé)
  const playerRole = {
    name: "Loup-Garou",
    description: "Dévorez un villageois chaque nuit",
    isEvil: true
  };

  // Joueurs dans la partie (simulés)
  const players = [
    { id: '1', name: 'Lucas', isAlive: true, role: 'Villageois' },
    { id: '2', name: 'Yanis', isAlive: true, role: 'Loup-Garou' },
    { id: '3', name: 'Emma', isAlive: false, role: 'Voyante' },
    { id: '4', name: 'Thomas', isAlive: true, role: 'Villageois' },
    { id: '5', name: 'Léa', isAlive: true, role: 'Sorcière' },
    { id: '6', name: 'Maxime', isAlive: true, role: 'Villageois' },
  ];

  // Animation jour/nuit
  useEffect(() => {
    if (isNight) {
      // Animation passage au jour -> nuit
      Animated.parallel([
        Animated.timing(sunPosition, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false
        }),
        Animated.timing(moonPosition, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false
        }),
        Animated.timing(skyOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false
        }),
        Animated.timing(nightOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false
        })
      ]).start();
    } else {
      // Animation passage nuit -> jour
      Animated.parallel([
        Animated.timing(sunPosition, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false
        }),
        Animated.timing(moonPosition, {
          toValue: -1,
          duration: 3000,
          useNativeDriver: false
        }),
        Animated.timing(skyOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false
        }),
        Animated.timing(nightOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false
        })
      ]).start();
    }
  }, [isNight]);

  // Position interpolée du soleil et de la lune
  const sunLeft = sunPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['20%', '120%']
  });
  const sunTop = sunPosition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['20%', '5%', '20%']
  });
  
  const moonLeft = moonPosition.interpolate({
    inputRange: [-1, 0],
    outputRange: ['-20%', '70%']
  });
  const moonTop = moonPosition.interpolate({
    inputRange: [-1, -0.5, 0],
    outputRange: ['20%', '5%', '20%']
  });

  // Rendu d'un joueur dans la liste
  const renderPlayer = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.playerItem, 
        !item.isAlive && styles.deadPlayer,
        selectedPlayer === item.id && styles.selectedPlayer
      ]}
      onPress={() => setSelectedPlayer(item.id)}
      disabled={!item.isAlive}
    >
      <View style={styles.playerAvatarContainer}>
        <View style={[
          styles.playerAvatar,
          !item.isAlive && styles.deadAvatar,
        ]}>
          <Text style={styles.playerInitials}>
            {item.name.charAt(0)}
          </Text>
        </View>
        {!item.isAlive && (
          <View style={styles.deadCross}>
            <Text style={styles.deadCrossText}>✕</Text>
          </View>
        )}
      </View>
      <Text style={[styles.playerName, !item.isAlive && styles.deadText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Ciel et animation jour/nuit */}
      <View style={styles.skyContainer}>
        <Animated.View 
          style={[
            styles.daySky, 
            { opacity: skyOpacity }
          ]} 
        />
        <Animated.View 
          style={[
            styles.nightSky, 
            { opacity: nightOpacity }
          ]} 
        />
        
        {/* Silhouette du village */}
        <View style={styles.village}>
          <View style={styles.house1} />
          <View style={styles.house2} />
          <View style={styles.house3} />
          <View style={styles.tree1} />
          <View style={styles.tree2} />
        </View>
        
        {/* Soleil et lune */}
        <Animated.View 
          style={[
            styles.sun, 
            {
              left: sunLeft,
              top: sunTop,
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.moon, 
            {
              left: moonLeft,
              top: moonTop,
            }
          ]}
        />
      </View>
      
      {/* Section titre et minuteur */}
      <View style={styles.headerSection}>
        <Text style={styles.phaseTitle}>
          {isNight ? 'La Nuit tombe sur le Village' : 'Le Village se réveille'}
        </Text>
        <CountdownTimer
          duration={isNight ? 30 : 180}
          label={isNight ? "Fin de la nuit dans" : "Délibération du village"}
          onComplete={() => setIsNight(!isNight)}
        />
      </View>
      
      {/* Rôle du joueur */}
      <View style={styles.roleContainer}>
        <View style={styles.roleCard}>
          <View style={styles.roleIconContainer}>
            <Text style={styles.roleIcon}>
              {playerRole.isEvil ? '🐺' : '👁️'}
            </Text>
          </View>
          <View style={styles.roleInfo}>
            <Text style={styles.roleName}>{playerRole.name}</Text>
            <Text style={styles.roleDescription}>{playerRole.description}</Text>
          </View>
        </View>
        
        {/* Bouton d'action (visible selon le rôle et phase) */}
        {(isNight && playerRole.isEvil) && (
          <CustomButton
            title="Choisir une victime"
            type="primary"
            onPress={() => setShowActionModal(true)}
          />
        )}
      </View>
      
      {/* Liste des joueurs */}
      <View style={styles.playersContainer}>
        <Text style={styles.sectionTitle}>Joueurs</Text>
        <FlatList
          data={players}
          renderItem={renderPlayer}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.playersList}
        />
      </View>
      
      {/* Chat des loups (visible seulement la nuit pour les loups) */}
      {(isNight && playerRole.isEvil) && (
        <View style={styles.wolfChatContainer}>
          <Text style={styles.wolfChatTitle}>Chat des Loups</Text>
          <View style={styles.wolfChatContent}>
            <Text style={styles.chatMessage}>Yanis: On attaque qui cette nuit ?</Text>
            <Text style={styles.chatMessage}>Vous: Je propose Thomas, il est suspect.</Text>
          </View>
        </View>
      )}
      
      {/* Menu de navigation */}
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Règles</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => setIsNight(!isNight)}
        >
          <Text style={styles.navButtonText}>
            {isNight ? "⇾ Jour (démo)" : "⇾ Nuit (démo)"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Quitter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  skyContainer: {
    height: 180,
    position: 'relative',
    overflow: 'hidden',
  },
  daySky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#87CEEB',
  },
  nightSky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A0A2A',
  },
  sun: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FDB813',
  },
  moon: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
  },
  village: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  house1: {
    width: 50,
    height: 70,
    backgroundColor: '#8B4513',
    borderTopWidth: 20,
    borderTopColor: '#A52A2A',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
  house2: {
    width: 60,
    height: 60,
    backgroundColor: '#8B4513',
    borderTopWidth: 25,
    borderTopColor: '#A52A2A',
    borderLeftWidth: 12,
    borderLeftColor: 'transparent',
    borderRightWidth: 12,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
  house3: {
    width: 40,
    height: 50,
    backgroundColor: '#8B4513',
    borderTopWidth: 15,
    borderTopColor: '#A52A2A',
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
  tree1: {
    width: 20,
    height: 60,
    backgroundColor: '#8B4513',
    borderRadius: 10,
    position: 'relative',
  },
  tree2: {
    width: 20,
    height: 40,
    backgroundColor: '#8B4513',
    borderRadius: 10,
    position: 'relative',
  },
  headerSection: {
    padding: 16,
    alignItems: 'center',
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B89F65',
    marginBottom: 16,
    textAlign: 'center',
  },
  roleContainer: {
    padding: 16,
    alignItems: 'center',
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    padding: 12,
    width: '90%',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roleIcon: {
    fontSize: 24,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#F5F5F5',
    opacity: 0.8,
  },
  playersContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 12,
  },
  playersList: {
    alignItems: 'center',
  },
  playerItem: {
    margin: 8,
    alignItems: 'center',
    width: 90,
  },
  playerAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  playerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B89F65',
  },
  playerInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  playerName: {
    fontSize: 14,
    color: '#F5F5F5',
    textAlign: 'center',
  },
  deadPlayer: {
    opacity: 0.6,
  },
  deadAvatar: {
    backgroundColor: '#1A1A1A',
    borderColor: '#6A1A1A',
  },
  deadCross: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deadCrossText: {
    fontSize: 36,
    color: '#6A1A1A',
    fontWeight: 'bold',
  },
  deadText: {
    color: '#6A1A1A',
    textDecorationLine: 'line-through',
  },
  selectedPlayer: {
    transform: [{scale: 1.05}],
  },
  wolfChatContainer: {
    margin: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6A1A1A',
  },
  wolfChatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B89F65',
    marginBottom: 8,
  },
  wolfChatContent: {
    maxHeight: 80,
  },
  chatMessage: {
    color: '#F5F5F5',
    fontSize: 14,
    marginBottom: 4,
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButtonText: {
    color: '#F5F5F5',
    fontSize: 14,
  }
  });

export default GameScreen;