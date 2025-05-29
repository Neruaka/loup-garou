// components/core/LoadingSpinner.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = '#B89F65',
  style 
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  
  // Tailles disponibles
  const sizes = {
    small: 20,
    medium: 40,
    large: 60
  };
  
  const actualSize = sizes[size] || sizes.medium;
  
  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    
    spinAnimation.start();
    
    return () => {
      spinAnimation.stop();
    };
  }, []);
  
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View 
        style={[
          styles.spinner,
          {
            width: actualSize,
            height: actualSize,
            borderWidth: actualSize / 10,
            borderColor: color,
            transform: [{ rotate: spin }]
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    borderRadius: 100,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  }
});

export default LoadingSpinner;