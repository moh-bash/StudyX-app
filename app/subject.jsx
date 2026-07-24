import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "./components/ListItem";

export default function Subject() {
    const db = useSQLiteContext();
    const router = useRouter();

    const [grades, setGrades] = useState([]);
    const [percentage, setPercentage] = useState(0);

    useFocusEffect(
        useCallback(() => {
            loadGrades();
        }, [])
    );

    async function loadGrades() {
        const result = await db.getAllAsync(
            "SELECT * FROM grades ORDER BY id DESC"
        );

        const perGrade = await db.getAllAsync(
            "SELECT AVG(total_grade) as avg FROM grades"
        );

        setGrades(result);

        if (perGrade.length > 0) {
            setPercentage(perGrade[0].avg ?? 0);
        }
    }

    async function deleteGrade(id) {
        await db.runAsync(
            "DELETE FROM grades WHERE id = ?",
            [id]
        );

        loadGrades();
    }

    return (
        <>
            <SafeAreaView className="flex-1 bg-gray-800 p-4">
                <View className="flex-row justify-between items-center px-3 mb-5">
                    <View>
                        <Text className="text-2xl text-white text-center">
                            Percentage : {percentage.toFixed(2)}%
                        </Text>

                        {/* progress bar */}
                        <View className="h-4 w-full bg-gray-600 rounded-full my-2">
                            <View
                                className="h-4 bg-blue-600 rounded-full shadow-lg shadow-blue-200"
                                style={{ width: `${percentage}%` }}
                            />
                        </View>
                    </View>
                    <Pressable
                        className="bg-blue-600 rounded-full w-16 h-16 justify-center items-center"
                        onPress={() => router.push("/add-subject")}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                color: "#fff",
                                fontWeight: "bold",
                                margin: 0,
                                padding: 0,
                            }}
                        >
                            +
                        </Text>
                    </Pressable>
                </View>

                <FlatList
                    data={grades}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            grade={item}
                            onDelete={deleteGrade}
                        />
                    )}
                />

            </SafeAreaView>
        </>
    );
}