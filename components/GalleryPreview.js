import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const GalleryPreview = (props) => {
    return props.thumbnailUri == null ? <PreviewWithoutThumbnail {...props} /> : <PreviewWithThumbnail {...props} />
}

function PreviewWithThumbnail(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <Image source={{uri: props.thumbnailUri}} resizeMode='cover' style={props.thumbnailContainerStyle}/>
                <Text style={props.galleryNameStyle}>{props.galleryName}</Text>
            </TouchableOpacity>
        </View>
    );
}

function PreviewWithoutThumbnail(props) {
    return (
        <View>
            <TouchableOpacity style={props.thumbnailContainerStyle} onPress={props.onPress}>
                <Text style={props.galleryNameStyle}>{props.galleryName}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default GalleryPreview;