import { View } from "react-native";

export default function Pagination({
  total,
  currentIndex,
}) {
  return (
    <View className="flex-row items-center justify-center">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`mx-1 rounded-full ${
            currentIndex === index
              ? "h-2.5 w-8 bg-blue-500"
              : "h-2.5 w-2.5 bg-gray-600"
          }`}
        />
      ))}
    </View>
  );
}