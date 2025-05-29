import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
// Assurez-vous d'avoir un fichier 'wolf-logo.png' dans votre dossier 'assets'
const logoSource = require('../assets/images/wolf-logo.png');

const HomeScreen = ({ onHostPress, onJoinPress, onTutorialPress }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [menuVisible, setMenuVisible] = React.useState(false);
  
  const router = useRouter();
  const goToSignIn = () => {
    router.push('/signIn');
  }
  const goToLobby = () => {
    router.push('/joinScreen');
  }
  const goToCreateGame = () => {
    router.push('/createGameScreen');
  }
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const handleLogout = () => {
    setMenuVisible(false);
    setIsLoggedIn(false);
    goToSignIn();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={isLoggedIn ? styles.menuButton : styles.noButton}
        onPress={openMenu}
        accessible
        accessibilityLabel="Ouvrir le menu"
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Image
        source={logoSource}
        style={styles.logo}
        accessible
        accessibilityLabel="Logo loup-garou"
      />
      <Text style={styles.title}>LOUP-GAROU</Text>
      <Text style={styles.subtitle}>
        Jouez au jeu populaire de{`\n`}rôle caché en ligne
      </Text>
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={isLoggedIn ? styles.button : styles.noButton}
          activeOpacity={0.8}
          onPress={goToCreateGame}
          disabled={!isLoggedIn}
          accessible
          accessibilityLabel="Héberger une partie"
        >
          <Text style={styles.buttonText}>Héberger une partie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={goToLobby}
          accessible
          accessibilityLabel="Rejoindre une partie"
        >
          <Text style={styles.buttonText}>Rejoindre une partie</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={isLoggedIn ? styles.noButton : styles.button}
          activeOpacity={0.8}
          onPress={goToSignIn}
          accessible
          accessibilityLabel="Login"
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onTutorialPress}
          accessible
          accessibilityLabel="Tutoriel"
        >
          <Text style={styles.buttonText}>Tutoriel</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => { closeMenu(); router.push('/accountSettings'); }}
              accessible
              accessibilityLabel="Paramètres du compte"
            >
              <Text style={styles.menuItemText}>Paramètres du compte</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
              accessible
              accessibilityLabel="Se déconnecter"
            >
              <Text style={styles.menuItemText}>Se déconnecter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={closeMenu}
              accessible
              accessibilityLabel="Fermer le menu"
            >
              <Text style={styles.menuItemText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginTop: 60,
  },
  title: {
    color: '#D1B46A',
    fontSize: 48,
    fontWeight: '700',
    marginVertical: 24,
  },
  subtitle: {
    color: '#585858',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 48,
  },
  buttonContainer: {
    width: '85%',
    alignItems: 'center',
  },
  noButton: {
    display: 'none',
  },
  button: {
    backgroundColor: '#D1B46A',
    borderRadius: 18,
    paddingVertical: 16,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  menuIcon: {
    fontSize: 32,
    color: '#D1B46A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: 250,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemText: {
    color: '#D1B46A',
    fontSize: 18,
  },
});