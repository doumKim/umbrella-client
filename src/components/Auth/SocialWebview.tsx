import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { getUserTokenAsync } from '../../modules/auth';
import { getUserScheduleAsync } from '../../modules/schedule';
import { useNavigation } from '@react-navigation/native';

const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';

type Props = {
  source: { uri: string };
  closeModal(): void;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const SocialWebview: React.FC<Props> = ({ source, closeModal }: Props) => {
  const webViewRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      () => {
        navigation.navigate('Friend');
      }
    );
    return () => subscription.remove();
  }, []);

  const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.document.getElementsByTagName("pre")[0].style.opacity=0;window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML))}})();';

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      //토큰 받아옴
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //서버에 토큰저장 요청
      await fetch('http://bringumb.tk/pushToken', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: {
            value: token,
          },
          user: {
            username: 'warly', //임의값
            name: 'Dan Ward', //임의값
          },
        }),
      });

      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const _handleMessage = async (event: WebViewMessageEvent) => {
    const result = JSON.parse(event.nativeEvent.data);
    const success = result.success;
    if (success) {
      const userToken = result.userToken;
      try {
        //서버에 토큰저장 요청.
        await registerForPushNotificationsAsync();
        /* if (pushToken) {
          await AsyncStorage.setItem('pushToken', pushToken);
        } */
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.error(e);
      }
    }
    dispatch(getUserTokenAsync.request());
    dispatch(getUserScheduleAsync.request());
    //dispatch(getPushTokenAsync.request());
    closeModal();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={source}
        userAgent={userAgent}
        javaScriptEnabled={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={_handleMessage}
      />
    </SafeAreaView>
  );
};
export default SocialWebview;
