import React, { type PropsWithChildren } from 'react';
import { MainProvider } from '../features/providers';
import PullToRefresh from '../components';
import type { tApp } from '../features/types/t.app';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

type Props = tApp;

const App: React.FC<PropsWithChildren<Props>> = ({
  children,
  isRefreshing,
  setIsRefreshing,
  pullDistance,
  labelToAnimate,
  fontStyle,
}) => {
  // #region members
  const animatedValue = useSharedValue(0);
  const maxPullValue = useSharedValue(pullDistance);
  const clampedAnimatedValue = useDerivedValue(() => {
    return Math.min(animatedValue.value, maxPullValue.value);
  });
  // #endregion
  // #region effects
  React.useEffect(() => {
    if (!isRefreshing) animatedValue.value = withTiming(0);
  }, [animatedValue, isRefreshing]);
  // #endregion
  return (
    <MainProvider
      {...{
        isRefreshing,
        setIsRefreshing,
        pullDistance,
        labelToAnimate,
        animatedValue,
        clampedAnimatedValue,
        fontStyle,
      }}
    >
      <GestureHandlerRootView style={styles.root}>
        <PullToRefresh>{children}</PullToRefresh>
      </GestureHandlerRootView>
    </MainProvider>
  );
};

export default App;

App.displayName = 'App';

const styles = StyleSheet.create({
  root: { flex: 1 },
});
