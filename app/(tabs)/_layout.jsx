import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";


export default function _layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,

      tabBarStyle: {
        position: "absolute",
        left: 30,
        right: 20,
        bottom: 50,
        width: "90%",
        borderRadius: 20,

        height: 70,

        backgroundColor: "white",

        elevation: 8,

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 5,
        },

        borderTopWidth: 0,
      },
    }}>
      <Tabs.Screen
        name="subject"
        options={{
          title: 'Subject',
          tabBarIcon: () => <MaterialIcons name="subject" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: () => <MaterialIcons name="bar-chart" size={24} color="black" />,
        }} />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <MaterialIcons name="settings" size={24} color="black" />,
        }} />
    </Tabs>
  )
}