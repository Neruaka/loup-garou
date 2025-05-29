// Imports
import React from "react";
import { View, Text, Button, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Config Notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationManager() {
  const [expoPushToken, setExpoPushToken] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<any>(null);

  // Demander la permission de notification
  React.useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // Demander la permission si pas encore accordée
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        // Erreur si pas de permission
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        // Obtenir le token
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.projectId,
        });
        console.log(token);
        setExpoPushToken(token.data);
      } else {
        alert("Must use physical device for Push Notifications");
      }
      // Config spécifique à la plateforme
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
        });
      } else if (Platform.OS === "ios") {
        await Notifications.setNotificationChannelGroupAsync("default", {
          name: "default",
        });
        await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            provideAppNotificationSettings: true,
          },
        });
        //Config avancée pour iOS
        Notifications.setNotificationCategoryAsync("nouvelle-categorie", [
          {
            identifier: "ouvrir-app",
            buttonTitle: "Ouvrir",
            options: {
              opensAppToForeground: true,
            },
          },
          {
            identifier: "ignorer",
            buttonTitle: "Ignorer",
            options: {
              isDestructive: true,
            },
          },
        ]);
      }
    };
  }, []);
}
