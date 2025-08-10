import MapUI, * as MapSettings from "@/components/MapUI";
import { View, Text, TextInput } from "react-native";

import React from "react";
import { useGlobals } from "@/components/useGlobals";
import * as Location from 'expo-location';
import { useFocusEffect } from "expo-router";

const dynamicHeaderSetting: number = 80;

export default function Maps() {
    const { 
        CameraRef, 
        setNewAnimatedHeaderHeight, 
        locationPermissions, 
        setLocationPermissions, 
        setHeaderShown, 
        setHeaderContent,
    } = useGlobals();

    useFocusEffect(React.useCallback(() => {
        setNewAnimatedHeaderHeight(dynamicHeaderSetting);
        setHeaderShown(true);
        setHeaderContent((
            <View>
                <TextInput
                    placeholder="Search for a route... "
                />
            </View>
        ))
        MapSettings.requestPermissions(locationPermissions, setLocationPermissions);
    }, []));

    const moveCameraTo = (coords: Location.LocationObjectCoords, zoom?: number) => {
        CameraRef?.current?.setCamera({
            centerCoordinate: [coords.longitude, coords.latitude],
            zoomLevel: zoom,
            animationDuration: 1200,
        });
    };

    return (
        <MapUI />
    )
}