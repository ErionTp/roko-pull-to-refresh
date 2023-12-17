import type { StyleProp, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type tContext = {
  isRefreshing: boolean;
  setIsRefreshing: (_args: boolean) => void;
  pullDistance: number;
  labelToAnimate: string;
  animatedValue: SharedValue<number>;
  clampedAnimatedValue: SharedValue<number>;
  fontStyle?: StyleProp<TextStyle>;
};
