import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
/**
 * props:
 * - onJoin: function(code: string, name: string)
 * - onBack: function()
 */
export default function JoinGameScreen({ onJoin = () => {}, onBack = () => {} }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [name, setName] = useState('');
  const router = useRouter();
  const goToLobby = () => {
    router.push('/lobbyScreen');
  }
  const backToHome = () => {
    router.push('/homeScreen');
  }

  const validateCode = (value) => {
    // Autorise exactement 5 caractères alphanumériques
    const regex = /^[A-Za-z0-9]{0,5}$/;
    if (!regex.test(value)) return;
    setCode(value.toUpperCase());
  };
  const handleJoin = () => {
    if (name.trim() === '' && isLoggedIn === false) {
      setError("Le nom est requis pour rejoindre en tant qu'invité.");
      return;
    }
    if (code.length !== 5) {
      setError("Le code doit contenir 5 caractères alphanumériques.");
      return;
    }
    setError('');
    onJoin(code, name);
    goToLobby();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejoindre une partie</Text>
      <Text style={styles.subtitle}>Entrez le code à 5 caractères</Text>

      {isLoggedIn === false && (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#585858"
          autoCapitalize="none"
          accessible
          accessibilityLabel="Champ nom d'utilisateur"
        />
      )}
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={validateCode}
        placeholder="ABCDE"
        placeholderTextColor="#585858"
        maxLength={5}
        autoCapitalize="characters"
        keyboardType="default"
        accessible
        accessibilityLabel="Champ code partie"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[
          styles.button,
          code.length === 5 ? {} : styles.buttonDisabled,
        ]}
        activeOpacity={0.8}
        onPress={handleJoin}
        disabled={code.length !== 5 && name.length === 0}
        accessible
        accessibilityLabel="Bouton rejoindre la partie"
      >
        <Text style={styles.buttonText}>Rejoindre la partie</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={backToHome}
        style={styles.backLink}
        accessible
        accessibilityLabel="Retour"
      >
        <Text style={styles.backLinkText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    color: '#D1B46A',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#585858',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 24,
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 12,
  },
  errorText: {
    color: '#C42B2B',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#D1B46A',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  backLink: {
    alignSelf: 'center',
    marginTop: 8,
  },
  backLinkText: {
    color: '#585858',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
