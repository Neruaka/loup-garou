// components/core/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

const CustomButton = ({ 
  title, 
  onPress, 
  type = 'primary', 
  isLoading = false,
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.baseButton,
        type === 'primary' ? styles.primaryButton : styles.secondaryButton,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={type === 'primary' ? '#0A0A0A' : '#B89F65'} 
          size="small"
        />
      ) : (
        <Text style={type === 'primary' ? styles.primaryText : styles.secondaryText}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#B89F65',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2D2D2D',
  },
  primaryText: {
    fontSize: 16,
    color: '#0A0A0A',
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 16,
    color: '#F5F5F5',
    fontWeight: 'normal',
  }
});

export default CustomButton;