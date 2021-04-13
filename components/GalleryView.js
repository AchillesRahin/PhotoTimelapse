import React, { useEffect } from 'react';
import {View, Image, Text, Button, StyleSheet, BackHandler} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';

const GalleryView = ({imageList, setInterface}) => {
    console.log(imageList);

    useEffect(() => {
      const backAction = () => {
          setInterface(1);
          return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.background}>
            <Text style={styles.headline_text}>Grid View Images</Text>
            <Button 
                title='simple home button'
                onPress={()=> setInterface(1)}
            >
          <Text>home</Text>
        </Button>
        <GridImageView data={imageList} />
        </View> 
     );
}

export default GalleryView;

const styles = StyleSheet.create({
    background: {
      backgroundColor: 'black',
      flex: 1
    },
    headline_text: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 50,
      marginLeft: 20
    },
  });