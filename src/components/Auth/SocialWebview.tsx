import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { getUserTokenAsync } from '../../modules/auth';
import { getUserScheduleAsync } from '../../modules/schedule';

const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';

type Props = {
  source: { uri: string };
  closeModal(): void;
};

const SocialWebview: React.FC<Props> = ({ source, closeModal }: Props) => {
  const webViewRef = useRef(null);
  const dispatch = useDispatch();

  const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.document.getElementsByTagName("pre")[0].style.opacity=0;window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML))}})();';

  const _handleMessage = async (event: WebViewMessageEvent) => {
    const result = JSON.parse(event.nativeEvent.data);
    const success = result.success;
    if (success) {
      const userToken = result.userToken;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.error(e);
      }
    }
    dispatch(getUserTokenAsync.request());
    dispatch(getUserScheduleAsync.request());
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
