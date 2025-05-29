import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
    source={require('../../assets/LoupFond.webp')} 
      resizeMode="cover"
      style={styles.container}
    >

      <View style={styles.header}>
        <Text style={styles.headerText}>Accueil</Text>
</View>

      <Text style={styles.title}>Loup-Garou</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LobbyPlayerList')}>
        <Text style={styles.buttonText}>Lancer le jeu</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 30,
    flex: 1,
    left: 0,
    right: 0,
    adding: 20,
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#B89F65',
    padding: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    width: '100%',
    height : '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#B89F65',
    textShadowColor: '#6A1A1A',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 250,
  },
  subtitle: {
    fontSize: 18,
    color: '#F5F5F5',
    marginBottom: 30,
  },
  button: {
    marginBottom: 100,
    backgroundColor: '#B89F65',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#0A0A0A',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
