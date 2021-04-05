import React from 'react';
import {View, Image, Text, Button, StyleSheet} from 'react-native';

const GalleryView = ({imageList, setInterface}) => {
    return (
        <View>
          <Text style={{fontSize:30, marginTop: 5}}>gallery view</Text>
          {imageList.map(image => (
              <View key={image}>
                <Image style={{ width: 350, height: 300 }} source={{ uri: image.uri }} />
              </View>
            ))
          }
          <Button
            title='simple home button'
            onPress={()=> setInterface(1)}
          >
            <Text>home</Text>
          </Button>
        </View>
      )
}

export default GalleryView;

const styles = StyleSheet.create({

});