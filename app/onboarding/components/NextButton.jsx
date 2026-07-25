import { Text, TouchableOpacity } from "react-native";

export default function NextButton({
  title,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="rounded-2xl bg-blue-600 px-7 py-4"
    >
      <Text className="text-base font-bold text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
}