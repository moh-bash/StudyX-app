import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import ListItem from '../components/ListItem';

export default function Subject() {
    const db = useSQLiteContext();
    const [grades, setGrades] = useState([]);
    const [projectGrade, setProjectGrade] = useState('');
    const [examGrade, setExamGrade] = useState('');
    const [nameSubject, setNameSubject] = useState('');
    const [percentage, setPercentage] = useState('');

    useEffect(() => {
        loadGrades();
    }, []);

    async function loadGrades() {
        try {
            const result = await db.getAllAsync(
                'SELECT * FROM grades ORDER BY id DESC'
            );
            const perGrade = await db.getAllAsync(
                'SELECT SUM(total_grade) AS per, COUNT(*) AS count FROM grades'
            );
            setGrades(result);
            if (perGrade.length > 0) {
                setPercentage(perGrade[0].per / perGrade[0].count);
            }

        } catch (error) {
            console.error('Error loading grades:1111', error);
        }
    }

    async function handleAdded() {
        if (0 <= projectGrade && projectGrade <= 100 && 0 <= examGrade && examGrade <= 100 && nameSubject) {
            await addGrades(db, projectGrade, examGrade, nameSubject);
            setProjectGrade('');
            setExamGrade('');
            setNameSubject('');
            loadGrades();
        }
    }

    async function addGrades(db, projectGrade, examGrade, nameSubject) {
        const result = await db.runAsync(
            'INSERT INTO grades (project_grade, exam_grade, name_subject) VALUES (?, ?, ?)',
            [projectGrade, examGrade, nameSubject]
        );
        return result.lastInsertRowId;
    }

    async function DeleteGrade(id) {
        await db.runAsync('DELETE FROM grades WHERE id = ?', [id]);
        loadGrades();
    }

    return (
        <View className="flex-1 items-center justify-center bg-gray-800">
            <Text className="text-2xl font-bold text-white mt-12 mb-4">
                Percentage: {percentage ? percentage.toFixed(2) : 0}%
            </Text>
            <TextInput
                className="border border-gray-400 rounded-xl px-4 py-3 w-10/12 mb-3 text-white bg-gray-500"
                placeholder="Subject Name"
                value={nameSubject}
                onChangeText={setNameSubject}
                keyboardType="default"
            />
            <View className="flex flex-row justify-between items-center w-10/12 gap-5 mb-3">

                <TextInput
                    className="flex-1 border border-gray-400 rounded-xl px-4 py-3 text-white bg-gray-500"
                    placeholder="Project Grade"
                    value={projectGrade}
                    onChangeText={setProjectGrade}
                    keyboardType="numeric"
                />
                <TextInput
                    className="flex-1 border border-gray-400 rounded-xl px-4 py-3 text-white bg-gray-500"
                    placeholder="Exam Grade"
                    value={examGrade}
                    onChangeText={setExamGrade}
                    keyboardType="numeric"
                />
            </View>
            <Pressable
                className="bg-blue-600 px-4 py-2 rounded-full mt-2 items-center"
                onPress={handleAdded}
            >
                <Text className="text-white">Add Grade</Text>
            </Pressable>
            <ListItem grades={grades} onDelete={DeleteGrade} />
        </View>
    );
}

