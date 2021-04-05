import React from 'react';
import {View, Image, Text, Button, StyleSheet} from 'react-native';
import Gallery from 'react-native-image-gallery';

const GalleryView = ({imageList, setInterface}) => {
    return (
        <Gallery
          style={{ flex: 1, backgroundColor: 'black' }}
          images={imageList}
        />
      );
}

export default GalleryView;

const styles = StyleSheet.create({

});