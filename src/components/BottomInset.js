import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Empty spacer as tall as the system navigation bar. Put it as the last child of a bottom sheet
// so the sheet's content (and its background) clears the gesture bar / three-button bar.
export default function BottomInset() {
  const { bottom } = useSafeAreaInsets();
  return <View style={{ height: bottom }} pointerEvents="none" />;
}
