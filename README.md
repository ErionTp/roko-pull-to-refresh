# roko-pull-to-refresh

A custom pull to refresh component

## Installation

```sh
npm install roko-pull-to-refresh
```

## Usage

```js
import * as React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { PullToRefresh } from 'roko-pull-to-refresh';
import type { tSample } from './domain/types/t.sample';
import Divider from './components/divider';
import ItemList from './components/item.list';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function _SAMPLE_ITEMS(): tSample[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    label: `Label ${i + 1}`,
  }));
}

const renderDivider = () => {
  return <Divider />;
};

export default function App() {
  // #region states
  const [isRefreshing, setIsRefreshing] = React.useState < boolean > false;
  // #endregion
  // #region effects
  React.useEffect(() => {
    // Simulate Loading

    if (isRefreshing) {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 5000);
    }
  }, [isRefreshing]);
  // #endregion
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <PullToRefresh
            {...{
              isRefreshing,
              setIsRefreshing,
              pullDistance: 80,
              labelToAnimate: 'Loading...',
              fontStyle: { color: 'black' },
            }}
          >
            <FlatList
              bounces={false}
              data={_SAMPLE_ITEMS()}
              renderItem={({ item }) => <ItemList {...{ item }} />}
              initialNumToRender={30}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderDivider}
              keyExtractor={(item) => item.id.toString()}
            />
          </PullToRefresh>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'grey',
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
