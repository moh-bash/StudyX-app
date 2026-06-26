import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function Index() {
  const [num, setNum] = useState(0);
  const router = useRouter();
  return (
    <View className="flex-1 items-center  bg-gray-800">
      <View className="w-full h-1/2 px-1">
        <Image className="w-full h-full rounded-3xl" source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/background/20260422/pngtree-creative-study-desk-with-floating-education-icons-and-soft-pastel-theme-image_21747202.webp' }} />

      </View>
      <Text className="text-2xl font-bold text-white mt-36">
        Welcome to StudyX {num}
      </Text>
      <Text className="text-xl font-thin text-gray-400 mt-4 text-center w-screen px-8">
        Your ultimate study companion for effective learning and productivity.
      </Text>
      <Pressable onPress={() => router.push("/subject")} className="bg-blue-600 px-6 py-4 rounded-full absolute bottom-12 w-10/12 items-center">
        <Text className="text-white">
          I,m pressable
        </Text>
      </Pressable>
    </View>
  );
}
