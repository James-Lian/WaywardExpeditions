import React, { useEffect } from "react";
import { Animated, LayoutChangeEvent, StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { useGlobals } from "./useGlobals";

interface AnimatedHeaderTypes {
    title?: string,
    style?: StyleProp<ViewStyle>,
    // height?: Animated.Value | number,
    heightSubtraction?: Animated.Value,
}

export default function AnimatedHeader(props : AnimatedHeaderTypes) {
    
    let globals = useGlobals();
    const { animatedHeaderHeight, newAnimatedHeaderHeight, headerContent, headerShown } = globals;

    useEffect(() => {
        Animated.timing(animatedHeaderHeight.current, {
            toValue: newAnimatedHeaderHeight,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }, [newAnimatedHeaderHeight]);

    return (
        <>
            {/* newArch styleprops --> filter: 'brightness(0.8) opacity(0.2)' */}
            
            {headerShown == true && 
                <Animated.View 
                    style={[
                        {
                            height: props?.heightSubtraction ? Animated.subtract(animatedHeaderHeight.current, props.heightSubtraction) : animatedHeaderHeight.current, 
                            alignItems: "center",
                            display: "flex",
                        }, 
                    props?.style]}
                >
                    {/* <LinearGradient
                        colors={["black", "transparent"]}
                        locations={[0, animatedHeaderHeight.current.toFixed(0) * 0.8]}
                    /> */}
                    {headerContent}
                </Animated.View>
            }
        </>
    )
}