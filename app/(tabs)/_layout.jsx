import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";


export default function _layout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: isDark ? "#93C5FD" : "#2563EB",
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",

        tabBarStyle: {
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 40,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 65,

          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",

          elevation: 8,
          borderTopWidth: 0,
          borderColor: isDark ? "#374151" : "#E5E7EB",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }} />
      <Tabs.Screen
        name="subject"
        options={{
          title: 'Subject',
          tabBarIcon: ({ color }) => <MaterialIcons name="subject" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
        }} />
    </Tabs>
  )
}