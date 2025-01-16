import { useColorScheme } from 'react-native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '../src/navigation/AppNavigator';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const customLightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#000',  // iOS blue
      secondary: '#5856D6',
    },
  };

  const customDarkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#fff',  // iOS blue for dark mode
      secondary: '#5E5CE6',
    },
  };

  const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
