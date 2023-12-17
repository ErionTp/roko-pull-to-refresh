import { Pressable, StyleSheet, Text } from 'react-native';
import React, { memo } from 'react';
import type { tBasic } from '../../domain/types/base/t.object.basic';

type Props<T extends tBasic> = {
  item: T;
};

const ListItem = <T extends tBasic>({ item }: Props<T>) => {
  return (
    <Pressable style={styles.root}>
      <Text>{item.label}</Text>
    </Pressable>
  );
};

export default memo(ListItem);

ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  root: {
    height: 64,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
