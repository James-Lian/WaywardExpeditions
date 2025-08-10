import { useGlobals } from "@/components/useGlobals";
import { View, Text } from "react-native";
import { useEffect } from "react";

import { useIsFocused } from "@react-navigation/native";

const dynamicHeaderSetting: number = 80;

export default function Friends () {

    const { setNewAnimatedHeaderHeight, setHeaderContent} = useGlobals();

    useEffect(() => {
        
    }, [])

    return (
        <View>

        </View>
    )
}