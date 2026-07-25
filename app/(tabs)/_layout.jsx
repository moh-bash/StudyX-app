import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";


export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#63A8D5",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 40,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 58,

          backgroundColor: "#1F2937",

          elevation: 8,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: () => <MaterialIcons name="home" size={24} color="white" />,
        }} />
      <Tabs.Screen
        name="subject"
        options={{
          title: 'Subject',
          tabBarIcon: () => <MaterialIcons name="subject" size={24} color="white" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <MaterialIcons name="settings" size={24} color="white" />,
        }} />
    </Tabs>
  )
}