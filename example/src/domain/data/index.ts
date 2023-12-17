import type { tBasic } from '../types/base/t.object.basic';

export type tSample = tBasic;

export function _SAMPLE_ITEMS(): tSample[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    label: `Label ${i + 1}`,
  }));
}
