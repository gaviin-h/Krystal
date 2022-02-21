import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
    Text,
    TouchableRipple
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  Share  from 'react-native-share';

const appHolderFunction = () => { // this represents the App main function for our app

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

    return (
        /* need to add some css I beleive that is what
        the view statement is for. Refer to video
        */
        <TouchableRipple onPress = {shareButton}>
            <Icon name = "share-box" color = "#FF6347" size = {25}/>
            <Text> Share Article </Text>
        </TouchableRipple>
    )
}