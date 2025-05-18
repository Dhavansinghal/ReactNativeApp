
import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
// For actual animation, you might use Animated API or Reanimated
import { useTheme } from '@/context/ThemeContext';

interface SkeletonProps extends ViewProps {
    height?: number | string;
    width?: number | string;
    borderRadius?: number;
}

export const Skeleton = React.forwardRef<View, SkeletonProps>(
    ({ style, height = 20, width = '100%', borderRadius = 4, ...props }, ref) => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        skeleton: {
        backgroundColor: theme.muted, // A slightly lighter shade for skeleton
        height: height,
        width: width,
        borderRadius: borderRadius,
        // Add opacity animation here if desired
        },
    });
    return <View ref={ref} style={[styles.skeleton, style]} {...props} />;
});
