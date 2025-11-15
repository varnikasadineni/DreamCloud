import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155' },
        tabBarInactiveTintColor: '#94a3b8',
        tabBarActiveTintColor: '#7dd3fc',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Live Monitor',
          tabBarIcon: ({ color }) => <Ionicons name="camera-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
