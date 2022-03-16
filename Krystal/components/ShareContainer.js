import React from 'react';

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

    return (
        <Icon name = "share" color = "#000000" size = {35} onPress = {shareButton}/> 
    )
}

export default ShareContainer;