// Imports
import { Image, StyleSheet, SafeAreaView } from "react-native";
import { useColorScheme } from "react-native";
import React, { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
// Components Imports
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomBtn from "@/components/ui/Button/button";

// Préchargement des images
const IMAGES = {
  LOUP_WIN: require("@/assets/images/loup_win.jpg"),
  VILLAGEOIS_WIN: require("@/assets/images/villageois_win.jpeg"),
  LOUP_LOSE: require("@/assets/images/loup_lose.jpeg"),
  VILLAGEOIS_LOSE: require("@/assets/images/villageois_lose.jpeg")
};

// Types pour la cohérence
type GameRole = "Loup-garou" | "Villageois";
type GameResult = "Win" | "Lose";

export default function EndGameScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = "#151718";
  const router = useRouter();
  
  // États avec typage strict
  const [result, setResult] = useState<GameResult>("Win");
  const [role, setRole] = useState<GameRole>("Villageois");
  const [textFinal, setTextFinal] = useState("");
  const [imgSource, setImgSource] = useState(IMAGES.VILLAGEOIS_WIN);

  const navigateToHome = useCallback(() => {
    router.push("/(tabs)");
  }, [router]);
  
  useFocusEffect(
    useCallback(() => {
      // Définir le résultat aléatoire avec typage fort
      const randomResult: GameResult = Math.random() < 0.5 ? "Win" : "Lose";
      const randomRole: GameRole = Math.random() < 0.5 ? "Loup-garou" : "Villageois";
      
      setResult(randomResult);
      setRole(randomRole);
      
      // Détermination des résultats avec structure simplifiée
      if (randomResult === "Win") {
        if (randomRole === "Loup-garou") {
          setTextFinal("Les loups-garous ont dévoré tous les villageois !");
          setImgSource(IMAGES.LOUP_WIN);
        } else {
          setTextFinal("Les villageois ont éliminé tous les Loups-garous !");
          setImgSource(IMAGES.VILLAGEOIS_WIN);
        }
      } else {
        if (randomRole === "Loup-garou") {
          setTextFinal("Les loups-garous ont été éliminés par les villageois !");
          setImgSource(IMAGES.LOUP_LOSE);
        } else {
          setTextFinal("Les villageois ont été dévorés par les loups-garous !");
          setImgSource(IMAGES.VILLAGEOIS_LOSE);
        }
      }
    }, [])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{result}</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Rôle</ThemedText>
        <ThemedText type="default">Vous étiez un {role}</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Résultat</ThemedText>
        <ThemedText type="default">{textFinal}</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <Image
          source={imgSource}
          style={styles.resultImage}
          resizeMode="contain"
        />
      </ThemedView>
      
      <ThemedView style={styles.buttonContainer}>

        <CustomBtn onClick={navigateToHome} variant="primary">
          Retour à l'accueil
        </CustomBtn>
      
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
  },
  resultImage: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    marginVertical: 15,
  },
});