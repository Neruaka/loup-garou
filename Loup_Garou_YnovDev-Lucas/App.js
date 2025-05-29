import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/Game/Home';
import JeuScreen from './Components/Game/Jeu';
import LobbyPlayerList from './Components/Game/LobbyPlayerList';
import Vote from './Components/Game/Vote';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'Accueil',
          headerShown: false
         }} />
        <Stack.Screen name="Jeu" component={JeuScreen} options={{ title: 'Jeu',
          headerShown: false}} />
        <Stack.Screen name="LobbyPlayerList" component={LobbyPlayerList} options={{ title: 'Lobby',
          headerShown: false
        }} />
        <Stack.Screen name="Vote" component={Vote} options={{
          title: 'Vote',
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
