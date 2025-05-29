import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const GameScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayText, setDisplayText] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const images = [
    {
      src: require('../../assets/6b6ead8e-32b3-4b52-9863-dc45cb1987b0.webp'),
      text: 'Figure solitaire et méfiante, il est toujours armé et prêt à tirer. S’il meurt, il emporte quelqu’un avec lui dans un dernier acte de vengeance. Il veut protéger le village… ou du moins, ne pas partir seul.',
    },
    {
      src: require('../../assets/d8ee9d8e-f4d0-451a-afb7-7546e4b4d9c8.webp'), text: 'Simple habitant sans pouvoir, il observe, réfléchit, accuse. Son objectif : identifier les Loups et survivre. Il incarne la majorité silencieuse, mais décisive.',

    },
    {
      src: require('../../assets/LoupGarou.webp'),
      text: 'Créature nocturne, il se fond parmi les villageois le jour, mais tue sans pitié la nuit. Son but : éliminer tous les humains pour régner sur le village avec ses semblables.',
    },
    {
      src: require('../../assets/e41c18e4-ebbd-4abf-aab2-7c99684c09b3.webp'),
      text: 'Gardienne de puissantes potions, elle connaît les secrets des plantes et de la vie. Elle peut sauver un joueur… ou en faire disparaître un. Elle agit seule, selon ses intérêts, mais elle veut avant tout la survie du village.',
    },
  ];

  const handleButtonPress = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
    setDisplayText('');
  };
  const handleImagePress = () => {
    if (selectedImage) {
      setDisplayText(selectedImage.text);
      setIsPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    
  };

  const navigation = useNavigation();
  useEffect(() => {
    console.log('useEffect triggered');
    console.log('Navigation prop:', navigation);
  
    const timer = setTimeout(() => {
      console.log('Navigating to Jeu');
      navigation.navigate('Vote');
    }, 5000);
  
    return () => {
      console.log('Timer cleared');
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Jeu</Text>
      </View>

      <ScrollView style={styles.fond}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button title="Vous êtes :" onPress={handleButtonPress} />
          </View>
          {selectedImage && (
            <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
              <Image source={selectedImage.src} style={styles.image} />
            </TouchableOpacity>
          )}    
        </View>
      </ScrollView>
      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClosePopup}
      >
        <TouchableWithoutFeedback onPress={handleClosePopup}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{displayText}</Text>
          </View>
          </View>
          </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  fond :{
  backgroundColor: '#0A0A0A',
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    paddingTop: 60,
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 200,
  },

  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 150, 
    height: 150, 
    marginHorizontal: 10,
  },
  displayText: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFFFFF', 
    textAlign: 'center', 
    fontWeight: 'bold',
    textShadowColor: '#6A1A1A', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#B89F65',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    top:150
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default GameScreen;