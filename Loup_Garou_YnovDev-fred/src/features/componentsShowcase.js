// ComponentsShowcase.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

// Importer tous les composants
import CustomButton from '../components/CustomButton';
import RoleCard from '../components/RoleCard';
import Modal from '../components/modal';
import LoadingSpinner from '../components/LoadingSpinner';
import LobbyPlayerList from '../components/game/LobbyPlayerList';
import CountdownTimer from '../components/game/CountdownTimer';

// Données mockées pour les démos
const mockRoles = [
  {
    id: 1,
    name: 'Loup-Garou',
    description: 'Dévore un villageois chaque nuit',
    // Pas d'image requise
  },
  {
    id: 2,
    name: 'Voyante',
    description: 'Peut voir le rôle d\'un joueur chaque nuit',
    // Pas d'image requise
  }
];

const mockPlayers = [
  { id: '1', username: 'Lucas', isReady: true, isHost: true },
  { id: '2', username: 'Yanis', isReady: false, isHost: false },
  { id: '3', username: 'Joueur3', isReady: true, isHost: false },
  { id: '4', username: 'Joueur4', isReady: false, isHost: false },
];

// Composant principal
const ComponentsShowcase = () => {
  // États pour contrôler les démos interactives
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simuler le chargement pour le bouton
  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Section Header Component
  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Composants Loup-Garou</Text>
      

        {/* CustomButton Demo */}
        <SectionHeader title="1. CustomButton" />
        <View style={styles.componentDemo}>
          <CustomButton 
            title="Bouton Primaire" 
            type="primary" 
            onPress={() => alert('Bouton primaire pressé')}
            style={styles.demoMargin}
          />
          
          <CustomButton 
            title="Bouton Secondaire" 
            type="secondary" 
            onPress={() => alert('Bouton secondaire pressé')}
            style={styles.demoMargin}
          />
          
          <CustomButton 
            title="Avec Chargement" 
            type="primary" 
            isLoading={isLoading}
            onPress={handleLoadingDemo}
          />
        </View>

        {/* RoleCard Demo */}
        <SectionHeader title="2. RoleCard" />
        <View style={styles.roleCardsContainer}>
          {mockRoles.map(role => (
            <RoleCard
              key={role.id}
              role={role}
              isSelected={selectedRole === role.id}
              onPress={() => setSelectedRole(role.id)}
              style={styles.roleCard}
            />
          ))}
        </View>

        {/* Modal Demo */}
        <SectionHeader title="3. Modal" />
        <View style={styles.componentDemo}>
          <CustomButton
            title="Ouvrir Modal"
            type="primary"
            onPress={() => setIsModalVisible(true)}
          />
          
          <Modal
            visible={isModalVisible}
            title="Règles du Jeu"
            onClose={() => setIsModalVisible(false)}
          >
            <Text style={styles.modalText}>
              Le but des Villageois est de démasquer et éliminer tous les Loups-Garous par vote durant la journée.
              {'\n\n'}
              Les Loups-Garous doivent dévorer tous les Villageois, un par un durant la nuit.
            </Text>
          </Modal>
        </View>

        {/* LoadingSpinner Demo */}
        <SectionHeader title="4. LoadingSpinner" />
        <View style={styles.spinnerContainer}>
          <View style={styles.spinnerGroup}>
            <LoadingSpinner size="small" />
            <Text style={styles.spinnerLabel}>Small</Text>
          </View>
          
          <View style={styles.spinnerGroup}>
            <LoadingSpinner size="medium" />
            <Text style={styles.spinnerLabel}>Medium</Text>
          </View>
          
          <View style={styles.spinnerGroup}>
            <LoadingSpinner size="large" />
            <Text style={styles.spinnerLabel}>Large</Text>
          </View>
        </View>

        {/* LobbyPlayerList Demo */}
        <SectionHeader title="5. LobbyPlayerList" />
        <View style={styles.componentDemo}>
          <LobbyPlayerList
            players={mockPlayers}
            currentPlayerId="1"
            onKickPlayer={(id) => alert(`Kick player ${id}`)}
          />
        </View>

        {/* CountdownTimer Demo */}
        <SectionHeader title="6. CountdownTimer" />
        <View style={styles.componentDemo}>
          <CountdownTimer
            duration={30}
            label="Vote se termine dans"
            onComplete={() => alert('Temps écoulé!')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B89F65',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 12,
    opacity: 0.8,
  },
  note: {
    fontSize: 14,
    color: '#B89F65',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  sectionHeader: {
    backgroundColor: '#2D2D2D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#B89F65',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  componentDemo: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  demoMargin: {
    marginBottom: 12,
  },
  roleCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
  },
  roleCard: {
    margin: 8,
  },
  modalText: {
    color: '#F5F5F5',
    lineHeight: 20,
  },
  spinnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
  },
  spinnerGroup: {
    alignItems: 'center',
  },
  spinnerLabel: {
    color: '#F5F5F5',
    marginTop: 8,
  },
});

export default ComponentsShowcase;