import { Text, View } from 'react-native';

export default function index() {
  return (
    <View>
      <Text className='text-white text-2xl font-bold text-center mt-10'>Welcome to the Grade Tracker App!</Text>
      <Text className='text-white text-lg text-center mt-4'>This app helps you keep track of your grades for different subjects. You can add your project and exam grades, and the app will calculate your total grade for each subject.</Text>
    </View>
  )
}