// components/core/Modal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal as RNModal } from 'react-native';
import CustomButton from './CustomButton';

const Modal = ({
  visible,
  title,
  children,
  onClose,
  showCloseButton = true,
  animationType = 'fade',
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
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.content}>
            {children}
          </View>
          <View style={styles.footer}>
            <CustomButton
              title="Fermer"
              type="secondary"
              onPress={onClose}
            />
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