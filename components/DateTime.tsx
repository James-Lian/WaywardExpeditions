import { useEffect, useState } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

type DateTimeDisplayProps = {
    containerStyle?: StyleProp<ViewStyle>;
    timeStyle?: StyleProp<TextStyle>;
    dateStyle?: StyleProp<TextStyle>;
}

export default function DateTimeDisplay( props?: DateTimeDisplayProps ) {
    const [currTime, setCurrTime] = useState(new Date());

    useEffect(() => {
        const interval = setTimeout(() => {
            setCurrTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    
    const formattedTime = currTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const date = currTime.toLocaleDateString();
    
    return (
        <View
            style={[{display: "flex", alignItems: "center"}, props?.containerStyle]}
        >
            <Text style={[{fontSize: 32, fontWeight: "semibold"}, props?.timeStyle]}>{formattedTime}</Text>
            <Text style={[{fontSize: 16}, props?.dateStyle]}>{date}</Text>
        </View>
    )
}