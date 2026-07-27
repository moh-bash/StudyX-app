import { router } from "expo-router";
import { useRef, useState } from "react";
import {
    FlatList, StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useColorScheme } from "nativewind";

import { slides } from "../../constants/data";
import OnboardingCard from "./components/OnboardingCard";
import Pagination from "./components/Pagination";

export default function OnboardingScreen() {
const flatListRef = useRef(null);
const [currentIndex, setCurrentIndex] = useState(0);
const { colorScheme } = useColorScheme();
const isDark = colorScheme === "dark";

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    } else {
      router.replace("../(tabs)/home");
    }
  };

  const skip = () => {
    router.replace("../(tabs)/home");
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OnboardingCard item={item} />}
        />

        <View className="absolute bottom-12 left-0 right-0 px-6">
          <Pagination
            total={slides.length}
            currentIndex={currentIndex}
          />

          <View className="mt-8 flex-row items-center justify-between">
            {currentIndex !== slides.length - 1 ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={skip}
              >
                <Text className="text-base font-semibold text-gray-600 dark:text-gray-400">
                  Skip
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={nextSlide}
              className="rounded-2xl bg-blue-600 px-7 py-4"
            >
              <Text className="text-base font-bold text-white">
                {currentIndex === slides.length - 1
                  ? "Get Started"
                  : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}