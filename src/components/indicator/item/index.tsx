import { StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  makeMutable,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import useMainProvider from '../../../features/hooks/useMainProvider';

type Props = { item: string; index: number };
const Item: React.FC<Props> = ({ item, index }) => {
  // #region Members
  const { animatedValue, labelToAnimate, isRefreshing, fontStyle } =
    useMainProvider();
  // A new animated value for controlling the letter animation
  const letterAnimatedValue = makeMutable(animatedValue.value);
  // #endregion
  // #region Styles
  const animatedStyle = useAnimatedStyle(() => {
    // Define the phase shift for each letter
    const phaseShift = (Math.PI / labelToAnimate.length) * index;
    const slowDownFactor = 30;
    const minScale = 0.5;
    const maxScale = 1.2;
    const scaleRange = maxScale - minScale;

    // Select the appropriate animated value based on isRefreshing
    const activeAnimatedValue = isRefreshing
      ? letterAnimatedValue.value
      : animatedValue.value;

    // Calculate the scale using the sine wave
    const scale =
      minScale +
      (scaleRange *
        (Math.sin(activeAnimatedValue / slowDownFactor + phaseShift) + 1)) /
        2;

    return { transform: [{ scale }] };
  });
  // #endregion

  useEffect(() => {
    if (isRefreshing) {
      // Start the letter animation
      letterAnimatedValue.value = withRepeat(
        withTiming(2 * Math.PI, { duration: 500 }),
        -1,
        true
      );
    }
  }, [isRefreshing, letterAnimatedValue]);

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <Text style={[fontStyle, styles.label]}>{item}</Text>
    </Animated.View>
  );
};

export default Item;

Item.displayName = 'Item';

const styles = StyleSheet.create({ root: {}, label: { fontSize: 32 } });
