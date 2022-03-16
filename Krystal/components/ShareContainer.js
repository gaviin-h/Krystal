import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
    Text,
    TouchableRipple
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  Share  from 'react-native-share';

const ShareContainer = () => { // this represents the App main function for our app

    const shareButton = async () => {
        const shareOptions = {
            message: 'Share this news article',
            /* right here I believe I need to put the URL
            so that the user can share the news article
            */
        }
        try {
            const shareResponses = await Share.open(shareOptions);
        }
        catch (error) {
            console.log('Error => ', error);
        }
    };

    const Style = StyleSheet.create({
        shareIcon: {
            bottom: -600,
            right: -20
        }
    })

    return (
       <View style = {Style.shareIcon}>
            <TouchableRipple onPress = {shareButton}>
            <Icon name = "share" color = "#000000" size = {35}/> 
            </TouchableRipple>
        </View>
    )
}

export default ShareContainer;