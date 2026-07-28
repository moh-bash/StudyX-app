import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { avgGrade } from '../../database/repositories/grades.repository';

export default function home() {
  const db = useSQLiteContext();
  const [percentage, setPercentage] = useState(0);
  const themes = AsyncStorage.getItem("theme");

   useFocusEffect(
        useCallback(() => {
            loadGrades();
        }, [])
    );

  async function loadGrades() {
        const perGrade = await avgGrade(db);


        if (perGrade.length > 0) {
            setPercentage(perGrade[0].avg ?? 0);
        }
    }

  return (
    <SafeAreaView className="flex-1 items-center bg-gray-100 dark:bg-gray-800 p-4">
      {/* header */}
      <View className="mb-4 px-3 w-full mx-5">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">Home</Text>
      </View>
      {/* card */}
      <View className="rounded-3xl w-full mx-5 bg-green-700 p-5 shadow-md shadow-black">
        <Text className="text-lg font-bold text-white">{percentage.toFixed(2)}%</Text>
        <Text className="mt-2 text-gray-300">This is a simple card component.</Text>
        <Text>{themes}</Text>
      </View>
    </SafeAreaView>
  )
}