// src/app/accountSettings.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function AccountSettings() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // États locaux pour les infos utilisateur
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Placeholder pour la sauvegarde des modifications
  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    }
    // TODO: appeler ton API ici
    Alert.alert('Succès', 'Vos modifications ont été enregistrées.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push('/signIn');
  };

  // Si jamais quelqu’un tombe ici sans être loggé
  if (!isLoggedIn) {
    router.replace('/signIn');
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Paramètres du compte</Text>

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Votre nom"
        placeholderTextColor="#585858"
        autoCapitalize="words"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Votre email"
        placeholderTextColor="#585858"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        accessible
        accessibilityLabel="Enregistrer les modifications"
      >
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
        accessible
        accessibilityLabel="Se déconnecter"
      >
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    color: '#D1B46A',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    color: '#585858',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#D1B46A',
    borderRadius: 18,
    paddingVertical: 16,
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '700',
  },
});