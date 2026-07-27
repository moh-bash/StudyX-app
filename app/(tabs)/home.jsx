import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function home() {
  return (
    <SafeAreaView className="flex-1 items-center bg-gray-50 dark:bg-gray-800 p-4">
      {/* header */}
      <View className="mb-4 px-3 w-full mx-5">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">Home</Text>
      </View>
      {/* card */}
      <View className="rounded-3xl w-full mx-5 bg-green-700 p-5 shadow-md shadow-black">
        <Text className="text-lg font-bold text-white">Welcome to the Home Screen</Text>
        <Text className="mt-2 text-gray-300">This is a simple card component.</Text>
      </View>
    </SafeAreaView>
  )
}