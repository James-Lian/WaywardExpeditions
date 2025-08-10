import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, Button } from "react-native";

import * as MediaLibrary from "expo-media-library";
import { writeAsync, readAsync, ExifTags } from '@lodev09/react-native-exify';
import { useGlobals } from "./useGlobals";

import * as Linking from 'expo-linking';
import Errors from "./Context";

class SettingsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SettingsError";
    }
}

class MediaAccessPermissionsError extends Errors.PermissionsError {
    constructor(message: string) {
        super(message);
        this.name="MediaAccessPermissionsError"
    }
}

function button() {
    return (
        <></>
    )
}

export function DropboxPhotosPermissionButton() {

}

export function OneDrivePhotosPermissionButton() {

}

export function iCloudPhotosPermissionButton() {

}

export function GooglePhotosPermissionButton() {

}

export function FilePermissionButton() {

}

export async function requestPermissions( photoPermissions: boolean | null, setPhotoPermissions: React.Dispatch<React.SetStateAction<boolean | null>> ) {
    (async () => {
        if (photoPermissions != false) {
            let { granted, canAskAgain } = await MediaLibrary.getPermissionsAsync();
            if (granted === false) {
                console.log("Permission to access location was denied");
                if (canAskAgain === false) {
                    setPhotoPermissions(false);
                } else {
                    setPhotoPermissions(null);
                }
                return { granted, canAskAgain };
            }
            setPhotoPermissions(true);
            return { granted, canAskAgain };
        }
        return { granted: true, canAskAgain: true };
    })();
}


export function SettingsLinkingButton() {
    return (
        <Button
            title="Open Settings"
            onPress={async() => {
                try {
                    await Linking.openSettings();
                } catch (error) {
                    throw new SettingsError(String(error));
                }
            }}
        />
    )
}

export default function PhotoPermissionButton() {

}

export async function savePhoto(uri: string) {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === 'granted') {
    await MediaLibrary.saveToLibraryAsync(uri);
    return {success: true, status};
  } else {
    return {success: false, status};
  }
};

export async function embedLocationMetadata(uri: string, newTags: ExifTags) {
    const result = await writeAsync(uri, newTags);
    console.log(result);
    return result;
}

export async function fetchAlbums() {
    try {
        const albums = await MediaLibrary.getAlbumsAsync();
        return albums;
    } catch (error) {
        if (error instanceof Error) {
            throw new MediaAccessPermissionsError(error.message);
        } else {
            throw new MediaAccessPermissionsError('Unknown error occurred');
        }
  }
}

export async function fetchAlbumContent(albumId: string) {
    try{
        const assets = await MediaLibrary.getAssetsAsync({
            album: albumId,
            // mediaType: 'photo',
        });
        return assets.assets;
    } catch (error) {
        if (error instanceof Error) {
            throw new MediaAccessPermissionsError(error.message);
        } else {
            throw new MediaAccessPermissionsError('Unknown error occurred');
        }
    }
}

export async function fetchAllPhotos() {
  try {
    const albums = await MediaLibrary.getAlbumsAsync();

    if (albums.length === 0) {
      // No albums — fetch all photos
      const photos = await MediaLibrary.getAssetsAsync({
        mediaType: 'photo',
        first: 100, // adjust as needed
        sortBy: MediaLibrary.SortBy.creationTime,
      });

      return photos.assets;
    } else {
      // You can handle albums here if needed
      return [];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new MediaAccessPermissionsError(error.message);
    } else {
      throw new MediaAccessPermissionsError('Unknown error occurred');
    }
  }
}