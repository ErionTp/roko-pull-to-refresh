import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Item from './item';
import useMainProvider from '../../features/hooks/useMainProvider';

type Props = {};
const Indicator: React.FC<Props> = ({}) => {
  // #region members
  const { animatedValue, pullDistance, labelToAnimate } = useMainProvider();
  const array = Array.from(labelToAnimate);
  // #endregion
  // #region styles
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, pullDistance], [0, 1]);
    const display = animatedValue.value > 0 ? 'flex' : 'none';
    return { display, opacity };
  });

  const customStyles = useMemo(() => styles(pullDistance), [pullDistance]);
  // #endregion
  return (
    <Animated.View style={[customStyles.root, animatedStyle]}>
      {array.map((item, index) => (
        <Item {...{ item, index }} key={index} />
      ))}
    </Animated.View>
  );
};

export default Indicator;

Indicator.displayName = 'Indicator';

const styles = (refreshContainerHeight: number) =>
  StyleSheet.create({
    root: {
      zIndex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      justifyContent: 'center',
      top: -refreshContainerHeight,
      height: refreshContainerHeight,
    },
  });
