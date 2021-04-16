import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, BackHandler, Image, Dimensions} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import GalleryPreview from './GalleryPreview';
import GalleryView from './GalleryView';

const GalleryListView = ({galleryList, setInterface}) => {

  const [galleryState, setGalleryState] = useState(-1);
    console.log('gallery list view');
    console.log(galleryList);

    useEffect(() => {
      const backAction = () => {
          setInterface(1);
          return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove();
    }, []);

    if (galleryState !== -1){
        return (
            <GalleryView
              imageList={galleryList[galleryState].imageList}
              setGalleryState={setGalleryState}
            />
          )
    }

    return (
      <View style={styles.backgroundView}>
        <Button
          title='home'
          onPress={() => setInterface(1)}
        >

        </Button>
        <FlatGrid
        itemDimension={130}
        data={galleryList}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) =>
          <GalleryPreview
            thumbnailUri={item.imageList.length > 0 ? item.imageList[0].image : null}
            galleryName={item.name}
            onPress={() => {setGalleryState(item.index);}}
          />}
      />
      </View>
      
    );
}

export default GalleryListView;

const styles = StyleSheet.create({
    backgroundView: {
      marginTop: 10,
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 35 : 0
    },
    gridView: {
      marginTop: 20,
      flex: .8,
    },
  });