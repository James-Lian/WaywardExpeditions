import { ReactNode } from "react";
import { Pressable, View, Text, StyleProp, ViewStyle, ColorValue, DimensionValue, GestureResponderEvent } from "react-native";

interface UIProps {
    text?: string,
    style?: StyleProp<ViewStyle>,
    onPress?: (((event: GestureResponderEvent) => void) | null | undefined)
    children?: ReactNode,
}

export default function CustomButton(UIProps?: UIProps) {
    return (
        <Pressable
            onPress={UIProps?.onPress}
            style={{
                display: "flex",
            }}
        >
            {UIProps?.children ? UIProps.children :  
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        backgroundColor: "#EF6B0A",
                        borderRadius: 12,
                    }}
                    {...UIProps}
                >
                    <Text style={{color: "white",}}>{UIProps?.text}</Text>
                </View>
            }
        </Pressable>
    )
}