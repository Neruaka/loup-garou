// components/core/Modal.js (Fred)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal as RNModal, Image } from 'react-native';
import CustomButton from '../ui/Button/button';

const Modal = ({
  visible,
  title,
  children,
  onClose,
  showCloseButton = false,
  animationType = 'fade',
  sentence = false,
    imageSource = require('../../assets/images/denis_b.jpeg'),
}) => {
  return (
    <RNModal
      transparent
      visible={visible}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {showCloseButton && (
              <TouchableOpacity onPress={()=>console.log("Hello World !")} style={styles.closeButton}>
                <Text style={styles.closeText}>x</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.content}>
            <Text style={styles.content}>{children}</Text>
            {sentence && (
              <View style={styles.imageContainer}>
                <Image 
                  source={imageSource}
                  style={styles.sentenceImage}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
          <View style={styles.footer}>
            <CustomButton
              type="secondary"
              onClick={onClose}
            >Close</CustomButton>
          </View>
        </View>
      </View>
    </RNModal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sentenceImage: {
    width: '100%',
    height: 120,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B89F65',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0A0A0A',
  },
  title: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#F5F5F5',
    fontSize: 24,
    lineHeight: 24,
  },
  content: {
    color: '#F5F5F5',
    padding: 16,
    minHeight: 100,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#0A0A0A',
    alignItems: 'flex-end',
  }
});

export default Modal;