import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const GalleryPreview = ({thumbnailUri, thumbnailContainerStyle, galleryName, galleryNameStyle, onPress}) => {
    return thumbnailUri == null ? 
    (
        <View>
            <TouchableOpacity
            style={thumbnailContainerStyle} 
            onPress={onPress}
            >
                <Text style={galleryNameStyle}>{galleryName}</Text>
            </TouchableOpacity>
        </View>
    ) :
    (
        <View>
            <TouchableOpacity
            style={thumbnailContainerStyle} 
            onPress={onPress}
            >
                <Image source={{uri: thumbnailUri}} resizeMode='cover' style={thumbnailContainerStyle}/>
                <Text style={galleryNameStyle}>{galleryName}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GalleryPreview;