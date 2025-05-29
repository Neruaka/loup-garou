// Imports
// Modules Imports
import { Image, StyleSheet, Platform, View, SafeAreaView } from "react-native";

import React from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
// Components Imports
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomBtn from "@/components/ui/Button/button";

export default function EndGameScreen() {
  
  const backgroundColor = "#151718";
  const router = useRouter();
  const navigateToHome = () => {
    router.push("/(tabs)");
  };
  /* -------------------------------------------------------------------------------- */
  // Fonction utilisée pour une preview rapide
  const [result, setResult] = React.useState<string | undefined>("");
  const [role, setRole] = React.useState<string | undefined>("");
  const [textFinal, setTextFinal] = React.useState<string | undefined>("");
  const [imgUrl, setImgUrl] = React.useState();
  useFocusEffect(
    React.useCallback(() => {
      // Définir le résultat aléatoire
      const randomResult = Math.random() < 0.5 ? "Win" : "Lose"; // 50% de chance pour chaque
      const randomRole = Math.random() < 0.5 ? "Wolf" : "Villager"; // 50% de chance pour chaque
      setResult(randomResult);
      setRole(randomRole === "Wolf" ? "Loup-garou" : "Villageois");
      if (randomResult === "Win" && randomRole === "Wolf") {
        setTextFinal("Les loups-garous ont dévoré tous les villageois !");
        setImgUrl(1);
      } else if (randomResult === "Win" && randomRole === "Villager") {
        setTextFinal("Les villageois ont éliminé tous les Loups-garous !");
        setImgUrl(2);
      } else if (randomResult === "Lose" && randomRole === "Wolf") {
        setTextFinal("Les loups-garous ont été éliminés par les villageois !");
        setImgUrl(3);
      } else if (randomResult === "Lose" && randomRole === "Villager") {
        setTextFinal("Les villageois ont été dévoré par les loups-garous!");
        setImgUrl(4);
      }
    }, [])
  );
  /* ---------------------------------------------------------------------------------- */
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 20, backgroundColor: backgroundColor }}
    >
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
          source={
            imgUrl === 1
              ? require("@/assets/images/loup_win.jpg")
              : imgUrl === 2
              ? require("@/assets/images/villageois_win.jpeg")
              : imgUrl === 3
              ? require("@/assets/images/loup_lose.jpeg")
              : require("@/assets/images/villageois_lose.jpeg")
          }
          style={styles.resultImage}
          resizeMode="contain"
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <CustomBtn onClick={navigateToHome} variant="primary">
          Return to Home
        </CustomBtn>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  resultImage: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    marginVertical: 15,
  },
});
