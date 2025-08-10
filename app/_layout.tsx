import "../global.css";

import { SplashScreen, Stack } from "expo-router";
import { ContextProvider } from "@/components/Context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, LogBox } from "react-native";

import { useEffect } from "react";

import ErrorBoundary from 'react-native-error-boundary'

import AnimatedHeader from "@/components/AnimatedHeader";
import { LinearGradient } from "expo-linear-gradient";

LogBox.ignoreLogs(['ViewTagResolver']);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  
  return (
    <ErrorBoundary
      FallbackComponent={() => {
       return (
        <View><Text></Text></View>
       ) 
      }}
      onError={(error: Error, stackTrace: string) => {
        console.log(error, stackTrace);
      }}
    >
      <SafeAreaProvider>
        <ContextProvider>
          <AnimatedHeader title="Home" style={{
            backgroundColor: "white", 
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowColor: "black",
            shadowOpacity: 0.8,
            shadowRadius: 8,
            elevation: 5, 
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            position: "absolute", 
            left: 0, 
            right: 0, 
            top: 0, 
            zIndex:10,
          }} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
          </Stack>
        </ContextProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
