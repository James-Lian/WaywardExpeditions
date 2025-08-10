import React, {
    createContext, 
    Dispatch, 
    ReactNode, 
    SetStateAction, 
    useState,
    useRef,
} from "react";
import { Animated, View, Text } from "react-native";
import { Camera, MapView } from "@rnmapbox/maps";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export const defaults = {
    // permission data: (null = deciding, false = can't ask again, true = granted)
    locationPermissions: null,
    setLocationPermissions: (_: SetStateAction<boolean | null>) => {},
    locationData: null,
    setLocationData: (_: Location.LocationObject | null) => {},
    photoPermissions: null,
    setPhotoPermissions: (_: SetStateAction<boolean | null>) => {},
    albumList: null,
    setAlbumList: (_: MediaLibrary.Album[] | null) => {},
    cameraPermissions: null,
    setCameraPermissions: (_: SetStateAction<boolean | null>) => {},
    recording: false,
    setRecording: (_: SetStateAction<boolean>) => {},
    animatedHeaderHeight: { current: new Animated.Value(38) },
    newAnimatedHeaderHeight: 38,
    setNewAnimatedHeaderHeight: (_: number) => {},
    CameraRef: undefined,
    headerShown: false,
    setHeaderShown: (_: SetStateAction<boolean>) => {},
    headerContent: (<View className="flex flex-1 justify-center"><Text className='text-white text-xl'>Loading...</Text></View>),
    setHeaderContent: (_: React.JSX.Element) => {},
}

export interface GlobalContextType {
    locationPermissions: boolean | null,
    setLocationPermissions: Dispatch<SetStateAction<boolean | null>>,
    locationData: Location.LocationObject | null,
    setLocationData: Dispatch<Location.LocationObject | null>,
    photoPermissions: boolean | null,
    setPhotoPermissions: Dispatch<SetStateAction<boolean | null>>,
    albumList: MediaLibrary.Album[] | null,
    setAlbumList: Dispatch<MediaLibrary.Album[] | null>,
    cameraPermissions: boolean | null,
    setCameraPermissions: Dispatch<SetStateAction<boolean | null>>,
    recording: boolean;
    setRecording: Dispatch<SetStateAction<boolean>>;
    animatedHeaderHeight: React.RefObject<Animated.Value | Animated.ValueXY>;
    newAnimatedHeaderHeight: number;
    setNewAnimatedHeaderHeight: Dispatch<number>;
    CameraRef: React.RefObject<Camera | null> | undefined;
    headerShown: boolean,
    setHeaderShown: Dispatch<SetStateAction<boolean>>,
    headerContent: React.JSX.Element,
    setHeaderContent: Dispatch<React.JSX.Element>,
}

// creating a default value for createContext()
export const GlobalContext = createContext<GlobalContextType>(defaults);

interface ComponentProps {
    children: ReactNode;
}

// Equivalent:
// ContextProvider = ({ children } : { children: ReactNode })

export const ContextProvider = ({ children } : ComponentProps) => {
    const [locationPermissions, setLocationPermissions] = useState<boolean| null>(defaults.locationPermissions);
    const [locationData, setLocationData] = useState<Location.LocationObject | null>(defaults.locationData)

    const [photoPermissions, setPhotoPermissions] = useState<boolean | null>(defaults.photoPermissions);
    const [albumList, setAlbumList] = useState<MediaLibrary.Album[] | null>(defaults.albumList);
    const [cameraPermissions, setCameraPermissions] = useState<boolean | null>(defaults.cameraPermissions);

    const [recording, setRecording] = useState<boolean>(defaults.recording);
    const animatedHeaderHeight = defaults.animatedHeaderHeight;
    const [newAnimatedHeaderHeight, setNewAnimatedHeaderHeight] = useState(defaults.newAnimatedHeaderHeight);
    const CameraRef = useRef<Camera>(null);
    const [headerShown, setHeaderShown] = useState(defaults.headerShown);
    const [headerContent, setHeaderContent] = useState(defaults.headerContent);

    return (
        <GlobalContext.Provider value={{ 
            locationPermissions,
            setLocationPermissions,
            locationData,
            setLocationData,

            photoPermissions,
            setPhotoPermissions,
            albumList,
            setAlbumList,
            cameraPermissions,
            setCameraPermissions,
            
            recording, // recording a route
            setRecording, 
            animatedHeaderHeight, 
            newAnimatedHeaderHeight,
            setNewAnimatedHeaderHeight,
            CameraRef,
            headerShown,
            setHeaderShown,
            headerContent,
            setHeaderContent,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


class PermissionsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SettingsError";
    }
}


const Errors = {
    PermissionsError
}

export default Errors;