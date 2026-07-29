import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";



export default function settings() {
  const { setColorScheme } = useColorScheme();
  const [colorButtons, setColorButtons] = useState();
  const changeTheme = async (theme) => {
    setColorScheme(theme);
    await AsyncStorage.setItem("theme-user", theme);
    setColorButtons(theme);
    await AsyncStorage.setItem("theme-buttons", theme);
  };

  useEffect(() => {
    const getTheme = async () => {
      const themeq = await AsyncStorage.getItem("theme-buttons");
      if (themeq) {
        setColorButtons(themeq);
      }else{
        setColorButtons("system");
      }
    };
    getTheme();
  },[colorButtons]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-800 p-4">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white">Settings</Text>
      <View className=" mt-4 rounded-3xl bg-gray-300 dark:bg-gray-700 p-2 shadow-md shadow-black">
        <Text className="text-gray-900 dark:text-white text-xl font-bold m-2">Theme</Text>
        <View className="flex flex-row gap-2 items-center justify-around">
          <Pressable
            onPress={() => {
              changeTheme('dark');
            }}
            className={`flex-1 px-5 py-3 rounded-l-3xl w-full shadow-lg shadow-black ${colorButtons === "dark" ? "bg-primary" : "bg-gray-600"
              }`}
          >
            <Text className="text-white font-bold mx-auto">
              Dark 🌙
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              changeTheme('light');
            }}
            className={`flex-1 px-5 py-3 w-full shadow-lg shadow-black ${colorButtons === "light" ? "bg-blue-600" : "bg-gray-600"
              }`}
          >
            <Text className="text-white font-bold mx-auto">
              Light 🌞
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              changeTheme('system');
            }}
            className={`flex-1 px-5 py-3 rounded-r-3xl w-full shadow-lg shadow-black ${colorButtons === "system" ? "bg-blue-600" : "bg-gray-600"
              }`}
          >
            <Text className="text-white font-bold mx-auto">
              system 📱
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}