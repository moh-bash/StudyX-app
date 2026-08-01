import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addNewSemester, getSemesters } from '../database/repositories/Semesters.repository';
import { enrollStudentInSubjects, getAvailableSubjects } from '../database/repositories/subjects.repository';

export default function addSubject() {
    const db = useSQLiteContext();
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [newSemesterName, setNewSemesterName] = useState("");

    const router = useRouter();

    const toggleSelectSubject = (subjectId) => {
        if (selectedSubjects.includes(subjectId)) {
            setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
        } else {
            setSelectedSubjects([...selectedSubjects, subjectId]);
        }
    };

    const handleSemesterSelect = (semesterId) => {
        if (selectedSemester === semesterId) {
            setSelectedSemester("");
        } else {
            setSelectedSemester(semesterId);
        }
    };

    const handleModalOpen = () => {
        setModalVisible(true);
    };


    const handleSaveSemester = async () => {
        if (newSemesterName && newSemesterName.trim() !== "") {
            await addNewSemester(db, newSemesterName.trim());
            const semestersData = await getSemesters(db);
            setSemesters(semestersData);
            setSelectedSemester(semestersData[0].id); // Automatically select the newly added semester
            setModalVisible(false);
            setNewSemesterName("");
        }
    };

    const saveSelectedSubjectsAndSemester = async () => {
        if (selectedSubjects.length > 0 && selectedSemester) {
            await enrollStudentInSubjects(db, selectedSemester, selectedSubjects);
            setSelectedSubjects([]);
            setSelectedSemester("");
            router.push('/(tabs)/subject');
        }
    };

    
    async function loadAvailableSubjects() {
        const subjectsData = await getAvailableSubjects(db);
        setAvailableSubjects(subjectsData);
        
        const semestersData = await getSemesters(db);
        setSemesters(semestersData);
    };
    
    useEffect(() => {
        loadAvailableSubjects();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-800 p-4">
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50 p-4">
                    <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm">
                        <Text className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add Semester</Text>

                        <TextInput
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl mb-6 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                            placeholder="Enter the name of the new semester:"
                            placeholderTextColor="#9ca3af"
                            value={newSemesterName}
                            onChangeText={setNewSemesterName}
                        />

                        <View className="flex-row justify-end space-x-3">
                            <Pressable
                                className="px-4 py-2"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-gray-500 font-bold">Cancel</Text>
                            </Pressable>

                            <Pressable
                                className="px-4 py-2 bg-blue-600 rounded-lg ml-2"
                                onPress={handleSaveSemester}
                            >
                                <Text className="text-white font-bold">Add</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
                        <Pressable onPress={() => handleModalOpen()} className="mb-4 mr-3 px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">
                                +
                            </Text>
                        </Pressable>
                    </ScrollView>
                </View>
            }
            <FlatList
                data={availableSubjects}
                keyExtractor={(item) => item.id.toString()}
                contentContainerClassName="pb-5 px-3"
                renderItem={({ item }) => {
                    const isSelected = selectedSubjects.includes(item.id);
                    return (
                        <Pressable
                            className={`flex-row items-center justify-between bg-white dark:bg-gray-700 rounded-2xl p-4 mb-3 border ${isSelected ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600'}`}
                            onPress={() => toggleSelectSubject(item.id)}
                        >
                            <View className={`w-6 h-6 rounded-lg border items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-500'}`}>
                                {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
                            </View>

                            <View className="flex-1 items-end ml-4">
                                <View className="flex-row-reverse items-center mb-1">
                                    <Text className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-md ml-2">
                                        {item.code}
                                    </Text>
                                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                                        {item.credit_hours} ساعات
                                    </Text>
                                </View>
                                <Text className="text-base font-bold text-gray-900 dark:text-white text-right">
                                    {item.name_ar}
                                </Text>
                                <Text className="text-xs text-gray-500 dark:text-gray-400 text-right">
                                    {item.name_en}
                                </Text>
                            </View>
                        </Pressable>
                    );
                }}
            />
            <View className="px-3 pt-2">
                <Pressable
                    className={`w-full py-3 rounded-xl ${selectedSubjects.length > 0 && selectedSemester ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    disabled={selectedSubjects.length === 0 || !selectedSemester}
                    onPress={() => saveSelectedSubjectsAndSemester()}
                >
                    <Text className="text-center text-white font-bold">
                        save
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}