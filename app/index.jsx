import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    async function checkOnboarding() {
      const isOnboardingCompleted = await AsyncStorage.getItem("isOnboarding");

      if (isOnboardingCompleted) {
        router.replace("/onboarding");
        return;
      }

      router.replace("/(tabs)/home");
    }

    void checkOnboarding();
  }, [router]);

  return <></>;
}
