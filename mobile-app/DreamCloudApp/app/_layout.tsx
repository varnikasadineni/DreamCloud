import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { registerForPushNotificationsAsync } from '../services/notificationService';

export default function RootLayout() {

  useEffect(() => {
    // Ask for notification permissions when the app starts
    registerForPushNotificationsAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#0f172a' },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
