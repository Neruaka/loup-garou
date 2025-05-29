import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

// Logo partagé avec HomeScreen
const logoSource = require('../assets/images/wolf-logo.png');

const SignInScreen = ({ onSignInPress, onSignUpLinkPress }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useAuth();

  const goToSignUp = () => {
    router.push('/signUp');
  }

  const handleSignInTestLog = async () => {
    console.log('Test log');
    console.log("email", email);
    console.log("password", password);
    if (!email || !password) {
      return alert("Veuillez remplir tous les champs.");
    } else {
      setIsLoggedIn(true);
      router.push('/homeScreen');
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={logoSource}
        style={styles.logo}
        accessible
        accessibilityLabel="Logo loup-garou"
      />
      <Text style={styles.title}>Se connecter</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#585858"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        accessible
        accessibilityLabel="Champ email"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        placeholderTextColor="#585858"
        style={styles.input}
        secureTextEntry
        accessible
        accessibilityLabel="Champ mot de passe"
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleSignInTestLog}
        accessible
        accessibilityLabel="Bouton se connecter"
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Pas encore de compte ?</Text>
        <TouchableOpacity
          onPress={goToSignUp}
          accessible
          accessibilityLabel="Lien s'inscrire"
        >
          <Text style={styles.footerLink}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default SignInScreen;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    color: '#D1B46A',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 32,
  },
  input: {
    width: '85%',
    backgroundColor: '#1a1a1a',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D1B46A',
    borderRadius: 18,
    paddingVertical: 16,
    width: '85%',
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  footerText: {
    color: '#585858',
    fontSize: 16,
    marginRight: 8,
  },
  footerLink: {
    color: '#D1B46A',
    fontSize: 16,
    fontWeight: '700',
  },
});
