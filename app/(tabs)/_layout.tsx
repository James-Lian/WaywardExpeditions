import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({source, color} : {source: ImageSourcePropType, color: string}) => {
    return (
        <View className="pt-[12px] p-[3px] h-[38px]">
            <Image
                className="flex flex-1"
                source={source}
                tintColor={color}
                resizeMode="contain"
            />
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: 'purple', 
                    tabBarInactiveTintColor: "#808080", 
                    tabBarLabelStyle: {
                        fontSize: 16,
                    },
                    tabBarStyle: {
                        height: 80,
                        alignItems: "center",
                        display: "flex",
                        backgroundColor: "white", // make a darker colour
                    }
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        // tabBarLabel: () => null,
                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <TabIcon
                                    source={ require("../../assets/images/icons/home.png")}
                                    color={color}
                                />
                            )
                        },
                    }}
                />
                <Tabs.Screen
                    name="capture"
                    options={{
                        title: "Capture",
                        headerShown: false,
                        // tabBarLabel: () => null,
                        tabBarIcon: ({focused, color}) => {
                            return (
                                <TabIcon
                                    source={ require("../../assets/images/icons/camera.png")}
                                    color={color}
                                />
                            )
                        }

                    }}
                />
                <Tabs.Screen 
                    name="maps"
                    options={{
                        title: "Maps",
                        headerShown: false,
                        tabBarIcon: ({focused, color}) => {
                            return (
                                <TabIcon
                                    source={ require("../../assets/images/icons/map-pin.png") }
                                    color={color}
                                />
                            )
                        }
                    }}
                />
                <Tabs.Screen 
                    name="albums"
                    options={{
                        title: "Albums",
                        headerShown: false,
                        tabBarIcon: ({focused, color}) => {
                            return (
                                <TabIcon
                                    source={ require("../../assets/images/icons/image.png") }
                                    color={color}
                                />
                            )
                        }
                    }}
                />
                <Tabs.Screen 
                    name="friends"
                    options={{
                        title: "Friends",
                        headerShown: false,
                        tabBarIcon: ({focused, color}) => {
                            return (
                                <TabIcon
                                    source={ require("../../assets/images/icons/users.png") }
                                    color={color}
                                />
                            )
                        }
                    }}
                />
            </Tabs>
        </>
    )
}
export default TabsLayout