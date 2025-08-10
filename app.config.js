require('dotenv').config();

export default {
  "expo": {
    "owner": "jameslian",
    "name": "WaywardExpeditions",
    "slug": "WaywardExpeditions",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "WaywardExpeditions",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.anonymous.WaywardExpeditions"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      [
        "expo-media-library",
        {
          "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
          "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
          "isAccessMediaLocationEnabled": true
        }
      ],
      [
        "@rnmapbox/maps", {
          "RNMapboxMapsDownloadToken": process.env.MAPBOX_DOWNLOADSDK
        }
      ],
      [
        "expo-location",
        {
          "locationWhenInUsePermission": "Show current location on map."
        }
      ],
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "4d9474c3-2614-45fd-bbb5-efd035e604bd"
      }
    },
    "experiments": {
      "typedRoutes": true
    }
  }
}