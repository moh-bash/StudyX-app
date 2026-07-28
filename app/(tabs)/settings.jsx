import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from 'nativewind';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";



export default function settings() {
  const {colorScheme, setColorScheme} = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-800 p-4">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white">Settings</Text>
      <View className=" mt-4 rounded-3xl bg-gray-300 dark:bg-gray-700 p-2 shadow-md shadow-black">
        <Text className="text-gray-900 dark:text-white text-xl font-bold m-2">Theme</Text>
        <View className="flex flex-row gap-2 items-center justify-around">
        <Pressable
          onPress={() => {
            setColorScheme("dark");
            AsyncStorage.setItem("theme", "dark")
          }}
          className={`flex-1 px-6 py-3 rounded-l-3xl w-full shadow-lg shadow-black ${colorScheme === "dark" ? "bg-blue-600" : "bg-gray-600"
            }`}
        >
          <Text className="text-white font-bold mx-auto">
            Dark 🌙
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setColorScheme("light");
            AsyncStorage.setItem("theme", "light")
          }}
          className={`flex-1 px-6 py-3 rounded-r-3xl w-full shadow-lg shadow-black ${colorScheme === "light" ? "bg-blue-600" : "bg-gray-600"
            }`}
        >
          <Text className="text-white font-bold mx-auto">
            Light 🌞
          </Text>
        </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}