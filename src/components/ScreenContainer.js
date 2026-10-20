import React, { createContext, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';

// Shared screen shell: cream background plus safe-area padding on every side.
//
// Insets come from react-native-safe-area-context, which reports the real status bar, display
// cutout and system navigation bar on Android (gesture bar or three buttons) and the notch /
// home indicator on iOS. Left and right matter in landscape, where the navigation bar can sit
// on the side of the screen.
//
// Bottom: when the app's own tab bar is showing, the tab bar absorbs the bottom inset itself,
// so screens above it must not add it twice. RootNavigator provides 0 through this context
// while the tab bar is visible. Everywhere else (sign-in, immersive pages) the default applies:
// keep content clear of the system navigation bar.
export const BottomInsetContext = createContext(null);

export default function ScreenContainer({ children, style }) {
  const insets = useSafeAreaInsets();
  const bottomOverride = useContext(BottomInsetContext);
  const bottom = bottomOverride === null ? insets.bottom : bottomOverride;
  return (
    <View
      style={[
        styles.base,
        { paddingTop: insets.top, paddingBottom: bottom, paddingLeft: insets.left, paddingRight: insets.right },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.cream100 },
});
