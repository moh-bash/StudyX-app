import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { avgGrade, getNumSubjects } from '../../database/repositories/subjects.repository';

export default function home() {
  const db = useSQLiteContext();
  const [percentage, setPercentage] = useState(0);
  const [numSubjects, setNumSubjects] = useState(0);

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

    const numSub = await getNumSubjects(db);
    if (numSub.length > 0) {
      setNumSubjects(numSub[0].num_subjects ?? 0);
    }
  }

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
              {percentage.toFixed(2)}%
            </Text>
          </View>

          {/* progress bar */}
          <View className="h-4 w-full bg-white dark:bg-gray-500 rounded-full my-2">
            <View
              className="h-4 bg-teal-400 rounded-full shadow-lg shadow-green-200"
              style={{ width: `${percentage}%` }}
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
            {numSubjects}
          </Text>
        </View>
        <View className="flex-1 rounded-3xl bg-amber-600 p-5 shadow-xl shadow-amber-600/55">
          <Text className="text-xl text-white font-bold">
            Semesters
          </Text>
          <Text className="text-3xl text-white font-bold">
            {percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}