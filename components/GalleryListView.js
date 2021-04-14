import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, BackHandler } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
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
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.itemContainer, {backgroundColor: 'blue'}]} 
              onPress={() => {
                setGalleryState(item.index);
              }}
            >
              <Text style={styles.itemCode}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        </View>
        
      );

}

export default GalleryListView;

const styles = StyleSheet.create({
    backgroundView: {
      marginTop: 10,
      flex: 1,
    },
    gridView: {
      marginTop: 20,
      flex: .8,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });