import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Dimensions, Text, View } from "react-native";

const { width } = Dimensions.get("window");
export default function OnboardingCard({ item }) {
  const renderIcon = () => {
    switch (item.icon) {
      case "book-open":
        return <MaterialIcons name="book" size={24} color="black" />;

      case "calculator":
        return <MaterialIcons name="calculate" size={24} color="black" />;

      case "chart-column":
        return <MaterialIcons name="add-chart" size={24} color="black" />;

      case "graduation-cap":
        return <MaterialIcons name="gradient" size={24} color="black" />;

      default:
        return <MaterialIcons name="bookmarks" size={24} color="black" />;
    }
  };

  return (
    <View
      style={{ width }}
      className="items-center justify-center px-8"
    >
      <View
        style={{ backgroundColor: item.color }}
        className="h-64 w-64 items-center justify-center rounded-[40px]"
      >
        {renderIcon()}
      </View>

      <Text className="mt-12 text-center text-3xl font-bold text-white">
        {item.title}
      </Text>

      <Text className="mt-5 text-center text-base leading-7 text-gray-400">
        {item.description}
      </Text>
    </View>
  );
}