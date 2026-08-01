import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getEnrolledSemesters } from '../../database/repositories/Semesters.repository';
import { getSubjectsForSemester } from '../../database/repositories/subjects.repository';
import ListItem from "../components/ListItem";


export default function Subject() {
    const db = useSQLiteContext();
    const router = useRouter();

    const [subjects, setSubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");

    useFocusEffect(
        useCallback(() => {
            loadSubjects();
        }, [selectedSemester])
    );

    async function loadSubjects() {
        const semestersData = await getEnrolledSemesters(db);
        setSemesters(semestersData);

        let targetSemester = selectedSemester;

        if (!selectedSemester && semestersData.length > 0) {
            const latestSemester = semestersData[0]; 
            targetSemester = latestSemester.id;
            setSelectedSemester(targetSemester);
        }

        const result = await getSubjectsForSemester(db, selectedSemester );
        setSubjects(result);

    };

    const handleSemesterSelect = (semesterId) => {
        if (selectedSemester === semesterId) {
            setSelectedSemester("");
        } else {
            setSelectedSemester(semesterId);
        }
    };

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

                {
                    <View className="px-3 w-full">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">Semesters</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                semesters.length > 0 && (
                                    semesters.map((semester) => {
                                        const isSelected = selectedSemester === semester.id;

                                        return (
                                            <Pressable
                                                onPress={() => handleSemesterSelect(semester.id)}
                                                key={semester.id}
                                                className={`mb-4 mr-3 px-5 py-2 rounded-xl border ${isSelected ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40' : 'bg-gray-200 dark:bg-gray-700 border-transparent'}`}
                                            >
                                                <Text
                                                    className={`text-xl font-bold ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}
                                                >
                                                    {semester.name}
                                                </Text>
                                            </Pressable>
                                        )
                                    })
                                )
                            }
                        </ScrollView>
                    </View>
                }

                <FlatList
                    data={subjects}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.push(`/detailsSubject/${item.id}`)}
                        >
                            <ListItem
                                subject={item}
                            />
                        </Pressable>
                    )}
                />

            </SafeAreaView>
        </>
    );
}