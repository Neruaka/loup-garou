// components/game/CountdownTimer.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CountdownTimer = ({
  duration = 30,
  label = "Temps restant",
  onComplete,
  style
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const animatedValue = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const countdownId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownId);
          onComplete && onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start();
    
    return () => clearInterval(countdownId);
  }, []);
  
  const width = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#6A1A1A', '#B89F65', '#B89F65'],
  });

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.timerContainer}>
        <Animated.View style={[styles.progress, { width, backgroundColor }]} />
        <Text style={styles.time}>
          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    color: '#F5F5F5',
    fontSize: 16,
    marginBottom: 8,
  },
  timerContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 20,
  },
  time: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
  }
});

export default CountdownTimer;