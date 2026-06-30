import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlatList, Pressable, Text, View } from "react-native";


export default function ListItem({ grades, onDelete }) {
    if (grades.length > 0) {
        return (
            <FlatList
            className="mt-8 w-full px-4 rounded-lg"
            data={grades}
            renderItem={({ item }) => (
                    <View className="bg-gray-700 rounded-2xl mb-4 px-4 py-3 border border-blue-500 flex-row justify-between items-center shadow-xl shadow-cyan-100/50">
                        <View className="flex-1 me-5">
                            <Text className="text-white text-xl font-black px-2 pt-2">
                                {item.name_subject}
                            </Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-white text-lg  px-2">
                                    Project: {item.project_grade}
                                </Text>
                                <Text className="text-white text-lg  px-2">
                                    Exam: {item.exam_grade}
                                </Text>
                                <Text className={`text-white text-lg  px-2 ${item.total_grade >= 100 ? 'text-green-500' : 'text-red-500'}`}>
                                    Total: {item.total_grade.toFixed(2)}%
                                </Text>
                            </View>
                        </View>
                        <Pressable
                            className="bg-red-600 px-2 py-1 rounded-full mt-2 items-center"
                            onPress={() => onDelete(item.id)}
                        ><Text className="text-white">X</Text></Pressable>
                    </View>
                )}
                keyExtractor={(item) => item?.id.toString()}
            />
        )
    } else {
        return (
            <View className="flex-1 items-center justify-center">
                <MaterialIcons name="playlist-add-circle" size={150} color="gray" className="mb-4" />
                <Text className="text-white text-lg">No grades available.</Text>
            </View>
        )
    }
}