// components/core/RoleCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RoleCard = ({ 
  role, 
  isSelected = false, 
  onPress,
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Text style={{color: '#B89F65', fontSize: 18, fontWeight: 'bold'}}>
    {role.name.substring(0, 2).toUpperCase()}
  </Text>
      </View>
      <Text style={styles.title}>{role.name}</Text>
      <Text style={styles.description}>{role.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 180,
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#B89F65',
    backgroundColor: '#0A0A0A',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#F5F5F5',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    color: '#F5F5F5',
    textAlign: 'center',
    opacity: 0.8,
  }
});

export default RoleCard;