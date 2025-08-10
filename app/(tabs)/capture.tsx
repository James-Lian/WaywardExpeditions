import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import React from "react";
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { useGlobals } from "@/components/useGlobals";
import { useFocusEffect } from "expo-router";
import CustomButton from "@/components/CustomButton";

import * as Linking from 'expo-linking'
import MapUI from "@/components/MapUI";

const dynamicHeaderSetting: number = 80;

export function requestPermissions(cameraPermissions: boolean | null, setCameraPermissions: React.Dispatch<React.SetStateAction<boolean | null>>) {
    
    // immediately executed async function
    (async () => {
        if (cameraPermissions != false) {
            let { granted, canAskAgain } = await Camera.requestCameraPermissionsAsync();
            if (granted === false) {
                console.log("Permission to access location was denied");
                if (canAskAgain === false) {
                    setCameraPermissions(false);
                } else {
                    setCameraPermissions(null);
                }
                return { granted, canAskAgain };
            }
            setCameraPermissions(true);
            return { granted, canAskAgain };
        }
        return { granted: true, canAskAgain: true };
    })();
}

export default function Capture() {
    const [facing, setFacing] = useState<CameraType>("back");
    const isFocused = useIsFocused();

    const { 
        setNewAnimatedHeaderHeight, 
        setHeaderShown, 
        setHeaderContent,
        cameraPermissions,
        setCameraPermissions,
    } = useGlobals();
    
    useFocusEffect(React.useCallback(() => {
        setNewAnimatedHeaderHeight(dynamicHeaderSetting);
        setHeaderShown(false);
        requestPermissions(cameraPermissions, setCameraPermissions);
    }, []));

    useEffect(() => {
        if (isFocused) {
        }
    }, [isFocused]);

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={{
            display: "flex",
            flex: 1,
        }}>
            {cameraPermissions 

                ? <View style={{flex: 1}}>
                    <CameraView
                        facing={facing}
                        style={{
                            display: "flex",
                            flex: 1,
                        }}
                    />
                    {/* Buttons/Menu */}
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            position: "absolute",
                            zIndex: 0
                        }}
                    >
                        <View
                            // bottom row of buttons
                            style={{
                                display: "flex",
                                alignSelf: "flex-end",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                        >
                            <TouchableOpacity>
                                <View
                                    className="h-max-[48px] w-max-[38px]"
                                >
                                    <MapUI style={{ borderRadius: 12, borderColor: "white", borderWidth: 2, }}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    source={ require("../../assets/images/icons/camera-button.png") }
                                    style={{
                                        width: 48,
                                        height: 48,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    source={ require("../../assets/images/icons/refresh-cw.png") }
                                    style={{
                                        width: 38,
                                        height: 38,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View> 
                </View>
                : <CustomButton
                    onPress={() => {
                        Linking.openSettings();
                    }}
                >
                    <Text>Camera permissions denied.</Text>
                    <Text>Open Settings.</Text>                    
                </CustomButton>
            }

        </View>
    )
}