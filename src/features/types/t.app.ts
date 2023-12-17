import type { tContext } from './t.context';

export type tApp = Pick<
  tContext,
  | 'isRefreshing'
  | 'setIsRefreshing'
  | 'pullDistance'
  | 'labelToAnimate'
  | 'fontStyle'
>;
