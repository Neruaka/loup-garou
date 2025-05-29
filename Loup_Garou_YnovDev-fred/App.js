import {  Text, View, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/focus';
import { Timer } from './src/features/Timer';
import ComponentsShowcase from './src/features/componentsShowcase';
import GameScreen from './src/screens/GameScreen'; // Importez votre nouvel écran de jeu

export default function App() {
  // États pour contrôler ce qui est affiché
  const [currentSubject, setCurrentSubject] = useState(null);
  const [showComponentsShowcase, setShowComponentsShowcase] = useState(false);
  const [showGameScreen, setShowGameScreen] = useState(false); // Nouvel état pour l'écran de jeu

  // Fonction pour retourner à l'écran principal
  const backToMain = () => {
    setShowComponentsShowcase(false);
    setShowGameScreen(false);
    setCurrentSubject(null);
  };

  // Décider quel écran montrer
  const renderScreen = () => {
    if (showGameScreen) {
      return <GameScreen onBack={backToMain} />;
    } else if (showComponentsShowcase) {
      return <ComponentsShowcase onBack={backToMain} />;
    } else if (currentSubject) {
      return (
        <Timer 
          focusSubject={currentSubject}
          onTimerEnd={() => {}}
          clearSubject={() => setCurrentSubject(null)}
        />
      );
    } else {
      return (
        <>
          <Focus addSubject={setCurrentSubject} />
          
          {/* Boutons pour accéder aux différents écrans */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.showcaseButton}
              onPress={() => setShowComponentsShowcase(true)}
            >
              <Text style={styles.buttonText}>Voir Composants UI</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.gameButton}
              onPress={() => setShowGameScreen(true)}
            >
              <Text style={styles.buttonText}>Écran de Jeu</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.orange,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  showcaseButton: {
    marginBottom: 10,
    backgroundColor: '#0A0A0A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  gameButton: {
    backgroundColor: '#6A1A1A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: '#B89F65',
    fontWeight: 'bold',
  },
});