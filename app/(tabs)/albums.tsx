import { useEffect } from "react";
import { useGlobals } from "@/components/useGlobals";
import { useIsFocused } from "@react-navigation/native";
import { View, Text } from "react-native";

import * as MediaLibrary from "expo-media-library";
import * as MediaSettings from "@/components/MediaLibraryManager";

const dynamicHeaderSetting: number = 80

// this is an media library manager
export default function Albums () {
    const isFocused = useIsFocused();
    const { setHeaderContent, setNewAnimatedHeaderHeight, photoPermissions, setPhotoPermissions, albumList, setAlbumList } = useGlobals();

    useEffect(() => {
        setNewAnimatedHeaderHeight(dynamicHeaderSetting);
        MediaSettings.requestPermissions(photoPermissions, setPhotoPermissions);
        (async () => {
            const albums = await MediaSettings.fetchAlbums();
            setAlbumList(albums);
        })()

        // search?
        setHeaderContent((
            <View></View>
        ));
    }, [isFocused, photoPermissions])

    return (
        <View className="flex flex-1 flex-row flex-wrap">
            {albumList && albumList.length != 0 &&
                <View>
                </View>
            }
            {albumList && albumList.length == 0 &&
                <View></View>
                // no albums
            }
        </View>
    )
}
