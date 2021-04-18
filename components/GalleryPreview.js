import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const GalleryPreview = (props) => {
    return props.gallery.imageList.length == 0 ? <PreviewWithoutThumbnail {...props} /> : <PreviewWithThumbnail {...props} />
}

function PreviewWithThumbnail(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <Image source={{uri: props.gallery.imageList[0].image}} resizeMode='cover' style={styles.galleryThumbnail}/>
                <Text style={styles.galleryName}>{props.gallery.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

function PreviewWithoutThumbnail(props) {
    return (
        <View>
            <TouchableOpacity style={styles.galleryThumbnail} onPress={props.onPress}>
                <Text style={styles.galleryName}>{props.gallery.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default GalleryPreview;

const styles = StyleSheet.create({
    galleryThumbnail: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      height: 250,
      backgroundColor: 'black'
    },
    galleryName: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
      position: 'absolute',
      bottom: 10,
      left: 10
    },
  });