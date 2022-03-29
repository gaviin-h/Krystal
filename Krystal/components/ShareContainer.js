import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  Share  from 'react-native-share';

const ShareContainer = (articleUrl) => { // this represents the App main function for our app

    const shareButton = async () => {
        
        const shareOptions = {
             message: String(articleUrl['articleUrl']),
            /* shares article url
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