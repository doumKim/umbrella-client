import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';

type Props = {
  source: { uri: string },
  closeModal(): void
}

const SocialWebview: React.FC<Props> = ({source, closeModal}: Props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={source}
        userAgent={userAgent}
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );
};
export default SocialWebview;
