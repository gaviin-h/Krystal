import React, {Component} from 'react';
import { WebView } from 'react-native-webview'

class MyWeb extends Component{
    render() {
      return (
        <WebView
          source={{uri: this.props.url }}
          onError={console.error.bind(console, 'error')}
          javaScriptEnabled={true}
          originWhitelist={['*']}/> 
    )}
}
export default MyWeb