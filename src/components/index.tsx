import { ScrollView, StyleSheet, type NativeScrollEvent } from 'react-native';
import React, { useRef } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import type { NativeSyntheticEvent } from 'react-native';
import Indicator from './indicator';
import useMainProvider from '../features/hooks/useMainProvider';

type Props = {};
const PullToRefresh: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  // #region members
  const {
    animatedValue,
    clampedAnimatedValue,
    isRefreshing,
    setIsRefreshing,
    pullDistance,
  } = useMainProvider();
  // #endregion
  // #region references
  const scrollRef = useRef<ScrollView | null>(null);
  const gestureRef = useRef<PanGestureHandler>(null);
  // #endregion
  // #region animations
  const scrollY = useSharedValue(0);
  // #endregion
  // #region styles
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: clampedAnimatedValue.value }] };
  });
  // #endregion
  // #region functions
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nativeEvent = event.nativeEvent;
    scrollY.value = nativeEvent.contentOffset.y;
  };

  const handleOnScrollEndDrag = () => {
    'worklet';
    if (clampedAnimatedValue.value === pullDistance && !isRefreshing) {
      setIsRefreshing(true);
    }
  };
  // #endregion
  // #region events
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_, context) => {
      context.y = clampedAnimatedValue.value;
    },
    onActive: (event, context) => {
      if (Math.abs(scrollY.value) <= 1 && !isRefreshing) {
        // Adjust the translation based on the gesture velocity
        const velocityAdjustment = 0.4; // Smaller values will slow down the animation more
        const translation =
          (event.translationY + context.y) * velocityAdjustment;
        animatedValue.value = translation;
      }
    },
    onEnd: () => {
      if (clampedAnimatedValue.value < pullDistance && !isRefreshing)
        animatedValue.value = withTiming(0);
    },
  });
  // #endregion
  return (
    <PanGestureHandler
      ref={gestureRef}
      simultaneousHandlers={scrollRef}
      onGestureEvent={gestureHandler}
    >
      <Animated.View style={[styles.root, animatedStyle]}>
        <Indicator />
        <NativeViewGestureHandler
          ref={scrollRef}
          simultaneousHandlers={gestureRef}
        >
          {React.cloneElement(children as React.ReactElement, {
            scrollEnabled: true,
            ref: scrollRef,
            onScroll: handleScroll,
            scrollEventThrottle: 16,
            onScrollEndDrag: handleOnScrollEndDrag,
          })}
        </NativeViewGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default PullToRefresh;

PullToRefresh.displayName = 'PullToRefresh';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
