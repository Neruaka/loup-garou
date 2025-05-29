import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
/**
 * props:
 * - onCreate: function(playerCount: number)
 * - onBack: function()
 */
export default function CreateGameScreen({
  onCreate = () => {},
  onBack = () => {},
}) {
  const minPlayers = 4;
  const maxPlayers = 12;
  const [playerCount, setPlayerCount] = useState(minPlayers);

  const increase = () => {
    if (playerCount < maxPlayers) {
      setPlayerCount((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (playerCount > minPlayers) {
      setPlayerCount((prev) => prev - 1);
    }
  };
  // Navigation
  const router = useRouter();
  const goToLobby = () => {
    router.push("/lobbyScreen");
  };
  const backToHome = () => {
    router.push("/homeScreen");
  };
  // --------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer une partie</Text>
      <Text style={styles.subtitle}>Choisissez le nombre de joueurs</Text>

      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={[
            styles.counterButton,
            playerCount === minPlayers && styles.counterButtonDisabled,
          ]}
          onPress={decrease}
          disabled={playerCount === minPlayers}
          accessible
          accessibilityLabel="Diminuer le nombre de joueurs"
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.counterValue}>{playerCount}</Text>

        <TouchableOpacity
          style={[
            styles.counterButton,
            playerCount === maxPlayers && styles.counterButtonDisabled,
          ]}
          onPress={increase}
          disabled={playerCount === maxPlayers}
          accessible
          accessibilityLabel="Augmenter le nombre de joueurs"
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={goToLobby}
        accessible
        accessibilityLabel="Bouton créer la partie"
      >
        <Text style={styles.createButtonText}>Créer la partie</Text>
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
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: "#D1B46A",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#585858",
    fontSize: 18,
    marginBottom: 32,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  counterButton: {
    backgroundColor: "#1a1a1a",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  counterButtonDisabled: {
    opacity: 0.5,
  },
  counterButtonText: {
    color: "#D1B46A",
    fontSize: 24,
    fontWeight: "700",
  },
  counterValue: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginHorizontal: 24,
  },
  createButton: {
    width: "90%",
    backgroundColor: "#D1B46A",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  createButtonText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "700",
  },
  backLink: {
    marginTop: 8,
  },
  backLinkText: {
    color: "#585858",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
