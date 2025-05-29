import { Image, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CountdownTimer from "@/components/ui/CountdownTimer";
import CustomBtn from "@/components/ui/Button/button";

export default function HomeScreen() {
  const router = useRouter();
  const navigateTo = (page: number) => {
    switch (page) {
      case 1:
        router.push("/(tabs)/EndGame");
        break;
      case 2:
        router.push("/votingPage");
        break;
      case 3:
        router.push("/lobbyScreen");
        break;
      case 4:
        router.push("/homeScreen"); 
        break;
      case 5:
        router.push("/signUp"); 
        break;
      case 6:
        router.push("/signIn"); 
        break;
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      {/* <ThemedView style={styles.titleContainer}>
        <CountdownTimer label="Temps restant" onComplete={() => alert('Temps écoulé!')} duration={10} style={styles}/>
      </ThemedView> */}
      <ThemedView style={styles.titleContainer}>
        <CustomBtn onClick={() => navigateTo(1)} variant="secondary">
          Go to EndGame Page
        </CustomBtn>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <CustomBtn onClick={() => navigateTo(2)} variant="primary">
          Go to VotingPage
        </CustomBtn>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <CustomBtn onClick={() => navigateTo(3)} variant="secondary">
          Go to LobbyScreen Page
        </CustomBtn>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <CustomBtn onClick={() => navigateTo(4)} variant="primary">
          Go to Home Page
        </CustomBtn>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <CustomBtn onClick={() => navigateTo(5)} variant="secondary">
          Go to AuthScreen Sign Up Page
        </CustomBtn>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <CustomBtn onClick={() => navigateTo(6)} variant="primary">
          Go to AuthScreen Sign In Page
        </CustomBtn>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try this app</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
