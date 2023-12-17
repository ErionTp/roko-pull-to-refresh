import React, { createContext, useMemo, type PropsWithChildren } from 'react';
import type { tContext } from '../types/t.context';
import type { tApp } from '../types/t.app';
import type { SharedValue } from 'react-native-reanimated';

export const MainContext = createContext<tContext>({
  isRefreshing: false,
  setIsRefreshing: function (_args: boolean): void {
    throw new Error('Function not implemented.');
  },
  pullDistance: 140,
  labelToAnimate: '',
  animatedValue: {
    value: 0,
  },
  clampedAnimatedValue: {
    value: 0,
  },
  fontStyle: undefined,
});

export type Props = tApp & {
  animatedValue: SharedValue<number>;
  clampedAnimatedValue: SharedValue<number>;
};

export const MainProvider = ({
  children,
  isRefreshing,
  setIsRefreshing,
  pullDistance,
  labelToAnimate,
  animatedValue,
  clampedAnimatedValue,
  fontStyle,
}: PropsWithChildren<Props>) => {
  // #region variables
  const memoValue = useMemo(
    () => ({
      isRefreshing,
      setIsRefreshing,
      pullDistance,
      labelToAnimate,
      animatedValue,
      clampedAnimatedValue,
      fontStyle,
    }),
    [
      isRefreshing,
      setIsRefreshing,
      pullDistance,
      labelToAnimate,
      animatedValue,
      clampedAnimatedValue,
      fontStyle,
    ]
  );
  // #endregion
  return (
    <MainContext.Provider value={memoValue}>{children}</MainContext.Provider>
  );
};
