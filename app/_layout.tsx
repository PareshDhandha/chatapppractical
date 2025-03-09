import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="screen/AddRoom" options={{ presentation: 'fullScreenModal', headerShown: true }} />
    <StatusBar style="auto" />
  </Stack>;
}
