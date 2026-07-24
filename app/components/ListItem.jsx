import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from "react-native";

const handleColorTotal = (g) => {
    if (Number(g) === 100) return 'text-green-500';
    if (Number(g) >= 90) return 'text-green-300';
    if (Number(g) >= 80) return 'text-yellow-500';
    if (Number(g) >= 60) return 'text-orange-500';
    return 'text-red-500';
};

export default function ListItem({ grade, onDelete }) {
    return (
        <View className="bg-gray-700 rounded-2xl mb-4 px-4 py-3 border border-blue-500 flex-row justify-between items-center">

            <View className="flex-1 me-5">

                <Text className="text-white text-xl font-black">
                    {grade.name_subject}
                </Text>

                <View className="flex-row justify-between mt-2">

                    <Text className="text-white">
                        Project: {grade.project_grade}
                    </Text>

                    <Text className="text-white">
                        Exam: {grade.exam_grade}
                    </Text>

                    <Text className={handleColorTotal(grade.total_grade)}>
                        Total: {Number(grade.total_grade).toFixed(2)}%
                    </Text>

                </View>

            </View>

            <Pressable
                className="bg-red-600 px-3 py-2 rounded-full"
                onPress={() => onDelete(grade.id)}
            >
                <MaterialIcons
                    name="delete"
                    color="white"
                    size={20}
                />
            </Pressable>

        </View>
    );
}