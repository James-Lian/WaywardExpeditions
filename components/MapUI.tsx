import React, { useState, useEffect, SetStateAction, ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, Animated } from "react-native";
import Mapbox, { MapView, Camera, Images, Image, LocationPuck, UserTrackingMode, MarkerView } from "@rnmapbox/maps"; // import default export
import * as Location from "expo-location";
import { useGlobals } from "./useGlobals";
import * as Linking from 'expo-linking';

import CustomButton from "./CustomButton";

import Errors from "./Context";


class LocationAccessPermissionsError extends Errors.PermissionsError {
    constructor(message: string) {
        super(message);
        this.name = "LocationAccessPermissionsError";
    }
}

Mapbox.setAccessToken("pk.eyJ1IjoiamFtZXMtbGlhbiIsImEiOiJjbWR4azhsaTcwNHUwMmpxN3hybjI2aHNiIn0.33zeGfb12zMby5ZZSVin9Q");

type MapUIProps = {
    compassEnabled?: boolean;
    styleURL?: string;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    mapRef?: React.RefObject<Mapbox.MapView | null> | undefined,
}

export function requestPermissions(locationPermissions: null | boolean, setLocationPermissions: React.Dispatch<React.SetStateAction<boolean | null>>) {
    // immediately executed async function
    (async () => {
        if (locationPermissions != false) {
            let { granted, canAskAgain } = await Location.requestForegroundPermissionsAsync();
            if (granted === false) {
                console.log("Permission to access location was denied");
                if (canAskAgain === false) {
                    setLocationPermissions(false);
                } else {
                    setLocationPermissions(null);
                }
                return { granted, canAskAgain };
            }
            setLocationPermissions(true);
            return { granted, canAskAgain };
        }
        return { granted: true, canAskAgain: true };
    })();
}

export async function updateLocationData(setLocationData: React.Dispatch<Location.LocationObject | null>) {
    let location = await Location.getCurrentPositionAsync({});
    setLocationData(location);
}

export default function MapUI( props: MapUIProps ) {
    const [isMounted, setIsMounted] = useState<SetStateAction<boolean>>(false);
    const { locationData } = useGlobals();

    const { CameraRef, locationPermissions } = useGlobals();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (locationPermissions === true) {
        return (
            <View className="flex-1">
                <Images>
                </Images>
                <MapView 
                    style={[{ flex: 1 }, props.style]}
                    styleURL={Mapbox.StyleURL.Outdoors}
                    compassEnabled={true}
                    compassPosition={{right: 8, bottom: 8}}
                    scaleBarPosition={{ top: 20, left: 5 }}
                    ref={props.mapRef}
                    {...props}
                >
                    {props?.children ? props.children : <>
                        <Camera 
                            defaultSettings={{
                                centerCoordinate: locationData == null ? [0, 0] : [locationData?.coords.longitude, locationData?.coords.latitude] ,
                                zoomLevel: 14,
                            }}
                            ref={CameraRef}
                            // centerCoordinate={[-79.703, 43.559 ]}
                            followUserLocation={true}
                            // followUserMode={UserTrackingMode.Follow}
                            // followZoomLevel={15}
                        />
                        <LocationPuck
                            visible={true}
                            puckBearing="course"
                            puckBearingEnabled={true}
                            pulsing={{
                                isEnabled: true,
                                color: "black",
                            }}
                        />
                    </>}
                    {isMounted && locationData && (
                        <>
                            <MarkerView
                                id="userLocation"
                                coordinate={[locationData.coords.longitude, locationData.coords.latitude]}
                            >
                                <TouchableOpacity>
                                </TouchableOpacity>
                            </MarkerView>
                        </>
                    )}
                </MapView>
            </View>
        )
    } else {
        return (
            <View className="flex-1">
                <CustomButton onPress={() => {
                    Linking.openSettings();
                }}>
                    <Text style={{color: "white",}}>Location permission denied.</Text>
                    <Text style={{color: "white",}}>Open settings.</Text>
                </CustomButton>
            </View>
        )
    }

}
