import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      animated: true,
      animation: "slide_from_bottom"
    }} >
      <Stack.Screen name="index" />
      <Stack.Screen name="subject" />
    </Stack>
  );
}
