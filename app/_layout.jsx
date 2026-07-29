import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { initializeDatabase } from "../database";
import "../global.css";



export default function RootLayout() {
    const {  setColorScheme } = useColorScheme();

    useEffect(() =>{
      const loadTheme = async () => {
        const theme = await AsyncStorage.getItem("theme-user");
        if (theme) {
          setColorScheme(theme);
        }
      }
      loadTheme();
    },[])

  return (
    <SQLiteProvider
    databaseName="app.db"
    onInit={initializeDatabase}
    >
      <Stack screenOptions={{
        headerShown: false,
        animated: true,
        animation: "slide_from_bottom"
      }} />
    </SQLiteProvider>
  );
}