import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSubjectById } from '../../database/repositories/subjects.repository';

export default function detailsSubject() {
    const { id } = useLocalSearchParams();
    const subjectId = Number(id);
    const db = useSQLiteContext();

    const [subject, setSubject] = useState(null);

    useEffect(() => {
        async function fetchSubject() {
            const subjectData = await getSubjectById(db, subjectId);
            setSubject(subjectData);
        }
        fetchSubject();
    }, [subjectId]);

    return (
        <SafeAreaView className="flex-1 items-center  bg-white dark:bg-gray-900">
            {subject && (
                <>
                    <Text className="text-lg text-gray-950 dark:text-white">
                        <Text className="font-bold text-gray-950 dark:text-white">Name: </Text>
                        {subject.name_subject}
                    </Text>
                    <Text className="text-lg text-gray-950 dark:text-white">
                        <Text className="font-bold text-gray-950 dark:text-white">Description: </Text>
                        {subject.description_subject}l
                    </Text>
                </>
            )}
        </SafeAreaView>
    )
}