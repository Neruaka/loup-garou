import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";


// Interface
interface customBtnProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;

  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

const CustomBtn = ({
  onClick = () => {alert("Button clicked");},
  children,
  variant = "primary",
}: customBtnProps) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: variant === "primary" ? "#B89F65" : "#2D2D2D",
      borderRadius: 5,
      height: 30,
    },
    text: {
      color: variant === "primary" ? "#0A0A0A" : "#F5F5F5",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  return (
    <TouchableOpacity style={[styles.container]} onPress={onClick}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;
