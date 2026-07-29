import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteSubject, getSubjects } from "../../database/repositories/subjects.repository";
import ListItem from "../components/ListItem";


export default function Subject() {
    const db = useSQLiteContext();
    const router = useRouter();

    const [subjects, setSubjects] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadSubjects();
        }, [])
    );

    async function loadSubjects() {
        const result = await getSubjects(db);
        setSubjects(result);
    }

    async function deleteGrade(id) {
        await deleteSubject(db, id);
        loadSubjects();
    }

    return (
        <>
            <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-800 p-4">
                <View className="flex-row justify-between items-center px-3 mb-5">
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                        Subjects
                    </Text>
                    <Pressable
                        className="bg-blue-600 rounded-full w-14 h-14 justify-center items-center"
                        onPress={() => router.push("/add-subject")}
                    >
                        <Text>
                            <Entypo name="plus" size={29} color="white" />
                        </Text>
                    </Pressable>
                </View>

                <FlatList
                    data={subjects}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.push(`/detailsSubject/${item.id}`)}
                        >
                            <ListItem
                                subject={item}
                                onDelete={deleteGrade}
                            />
                        </Pressable>
                    )}
                />

            </SafeAreaView>
        </>
    );
}