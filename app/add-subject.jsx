import { Stack, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AddSubject() {

    const db = useSQLiteContext();
    const router = useRouter();

    const [nameSubject, setNameSubject] = useState("");
    const [projectGrade, setProjectGrade] = useState("");
    const [examGrade, setExamGrade] = useState("");

    async function handleSave() {

        await db.runAsync(
            `INSERT INTO grades
            (project_grade, exam_grade, name_subject)
            VALUES (?, ?, ?)`,
            [
                projectGrade,
                examGrade,
                nameSubject,
            ]
        );

        router.back();
    }

    return (
        <>
            <Stack.Screen options={{ title: "Add Subject" }} />

            <View className="flex-1 bg-gray-800 justify-center items-center">

                <TextInput
                    className="border border-gray-400 rounded-xl px-4 py-3 w-10/12 mb-3 text-white bg-gray-500"
                    placeholder="Subject Name"
                    value={nameSubject}
                    onChangeText={setNameSubject}
                />

                <TextInput
                    className="border border-gray-400 rounded-xl px-4 py-3 w-10/12 mb-3 text-white bg-gray-500"
                    placeholder="Project Grade"
                    keyboardType="numeric"
                    value={projectGrade}
                    onChangeText={setProjectGrade}
                />

                <TextInput
                    className="border border-gray-400 rounded-xl px-4 py-3 w-10/12 mb-5 text-white bg-gray-500"
                    placeholder="Exam Grade"
                    keyboardType="numeric"
                    value={examGrade}
                    onChangeText={setExamGrade}
                />

                <Pressable
                    className="bg-blue-600 px-5 py-3 rounded-xl"
                    onPress={handleSave}
                >
                    <Text className="text-white">
                        Save
                    </Text>
                </Pressable>

            </View>
        </>
    );
}