import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function home() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-800 p-4">
      <Text className="text-white text-2xl font-bold">welcome to Home</Text>
      <View className="mt-4 p-4 bg-gray-700 rounded-lg">
        <Text className="text-white text-lg">This is a sample home screen.</Text>
      </View>
    </SafeAreaView>
  )
}