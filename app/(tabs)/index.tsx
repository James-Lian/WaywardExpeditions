// home screen: stats + map

import { useGlobals } from "@/components/useGlobals";
import { useIsFocused } from "@react-navigation/native";
import { Stack, router, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ImageBackground, Animated, TouchableOpacity } from "react-native";

import MapUI, * as MapSettings from "@/components/MapUI";
import CustomButton from "@/components/CustomButton";
import AnimatedHeader from "@/components/AnimatedHeader";
import { SafeAreaView } from "react-native-safe-area-context";

import getWeather, { WeatherData, translateWeatherCode } from "@/components/WeatherRetrieval";
import DateTimeDisplay from "@/components/DateTime";

// height for animated header
const dynamicHeaderSetting: number = 280;
const dynamicHeaderSpacingDiff: Animated.Value = new Animated.Value(15);

export default function Home() {
    const isFocused = useIsFocused();

    const { setNewAnimatedHeaderHeight, setHeaderShown, setHeaderContent, locationPermissions, setLocationPermissions } = useGlobals();
    const [ weatherData, setWeatherData ] = useState<WeatherData | null>(null);

    useEffect(() => {
        MapSettings.requestPermissions(locationPermissions, setLocationPermissions);
        setNewAnimatedHeaderHeight(dynamicHeaderSetting);
        setHeaderShown(true);
        console.log('happened')
        setHeaderContent(
            (
                <SafeAreaView className="flex flex-1 w-full">
                    <View className="w-full px-[8px] flex flex-row py-[3px] gap-2 justify-end">
                        <TouchableOpacity>
                            <Image
                                source={ require("../../assets/images/icons/settings.png") }
                                tintColor={"black"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={ require("../../assets/images/icons/user.png") }
                                tintColor={"black"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        // body: profile and stats
                        className="flex flex-row px-[8px]"
                    >
                        <Image
                            source={ require("../../assets/images/default-pfp.png") }
                            resizeMode="contain"
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 20,
                                marginRight: 8,
                            }}
                        />
                        <View
                            className="flex flex-1 flex-row gap-[8px] pr-[3px] items-center"
                        >
                            <View className="flex flex-1 flex-column justify-center items-center">
                                <Text className="text-2xl">38</Text>
                                <Text>photos taken</Text>
                            </View>
                            <View className="flex flex-1 flex-column justify-center items-center">
                                <Text className="text-2xl">12</Text>
                                <Text>km travelled</Text>
                            </View>
                            <View className="flex flex-1 flex-column justify-center items-center">
                                <Text className="text-2xl">8</Text>
                                <Text>friends</Text>
                            </View>
                        </View>
                    </View>
                    {weatherData && 
                        <View className="flex-row px-[12px] pt-[12px] gap-[28px] justify-center items-center">
                            <DateTimeDisplay />
                            <View>
                                <Text className="text-[32px]">
                                    {Math.round(weatherData.current.temperature_2m)} °
                                </Text>
                                <Text className="text-lg">
                                    {translateWeatherCode(weatherData.current.weather_code)}
                                </Text>
                            </View>
                        </View>
                    }
                </SafeAreaView>
            )
        );

        (async () => { 
            let weather = await getWeather(); 
            setWeatherData(weather); 
        })();
    }, [isFocused]);

    return (
        <View style={{ display: "flex", flex: 1 }}>
            <Stack.Screen options={{
                header: () => {
                    return (
                        <View className="bg-gray-300 h-[38px] ">
                        </View>
                    )
                },
                headerShown: false,
                title: "Home",
            }} />
            <AnimatedHeader heightSubtraction={dynamicHeaderSpacingDiff} style={{backgroundColor: "transparent"}}/>
            <View className="flex flex-1">
                <MapUI/>
                {locationPermissions &&
                    <View className="absolute z-10 flex align-center items-center w-full bottom-12">
                        <CustomButton
                            // do more
                            onPress={(e) => {
                                router.replace("/maps");
                            }}
                        >
                            <ImageBackground 
                                source={ require("../../assets/images/mountain-top-trail.jpg") }
                                resizeMode="cover"
                                imageStyle={{
                                    borderRadius: 12,
                                }}
                            >
                                <View
                                    style={{
                                        paddingTop: 12, 
                                        paddingBottom: 12, 
                                        paddingLeft: 16, 
                                        paddingRight: 16, 
                                        display: "flex", 
                                        borderRadius: 12,
                                        shadowOffset: {
                                            width: 3,
                                            height: 3,
                                        },
                                        shadowColor: "black",
                                        shadowOpacity: 0.8,
                                        shadowRadius: 8,
                                        elevation: 5,
                                        backgroundColor: "rgba(123, 123, 123, 0.3)"
                                    }}
                                >
                                    <Text style={{fontSize: 22, color: "white", fontWeight: "bold"}}>Start an Expedition!</Text>
                                </View>
                            </ImageBackground>
                        </CustomButton>
                    </View>
                }
            </View>
        </View>
    );
}