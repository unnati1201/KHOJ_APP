import {View, StyleSheet, Platform, StatusBar, NativeModules, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

export default function FontContainer({children}) {
    const [loaded] = useFonts({
        'NunitoBlack': require('../assets/fonts/Nunito-Black.ttf'),
        'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
        'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
        'Nunito-XBold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
        'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
        'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
      });

      if (!loaded) {
        return null;
      }
      
    return (
        <View style={{flex:1}}>
          {children}
        </View>
    );
  }