import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function home() {
  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
    }, [])
  );


  

  return (
    <SafeAreaView className="flex-1 items-center bg-gray-100 dark:bg-gray-800 p-4">
      {/* header */}
      <View className="mb-4 px-3 w-full mx-5">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">Home</Text>
      </View>
      {/* card */}
      <View className="rounded-3xl w-full mx-5 bg-green-600 p-5 shadow-xl shadow-green-600/55">
        <View>
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl text-white font-bold">
              Percentage
            </Text>
            <Text className="text-2xl text-white font-bold">
              22%
            </Text>
          </View>

          {/* progress bar */}
          <View className="h-4 w-full bg-white dark:bg-gray-500 rounded-full my-2">
            <View
              className="h-4 bg-teal-400 rounded-full shadow-lg shadow-green-200"
              style={{ width: `${22}%` }}
            />
          </View>
        </View>
      </View>
      <View className="mt-4 w-full mx-5 flex-2 flex-row gap-4">
        <View className="flex-1 rounded-3xl bg-violet-600 p-5 shadow-xl shadow-violet-600/55">
          <Text className="text-xl text-white font-bold">
            Subjects
          </Text>
          <Text className="text-3xl text-white font-bold">
            15
          </Text>
        </View>
        <View className="flex-1 rounded-3xl bg-amber-600 p-5 shadow-xl shadow-amber-600/55">
          <Text className="text-xl text-white font-bold">
            Semesters
          </Text>
          <Text className="text-3xl text-white font-bold">
            22%
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}