import React, { useState, useEffect } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, View, TextInput, Text, Button, TouchableOpacity, BackHandler } from 'react-native';

const GalleryListSelect = ({galleryList, setGalleryIndex, cancel, setGalleryList}) => {
  const [text, setText] = useState('');
  const [galleryCount, setGalleryCount] = useState(0);
  console.log('gallerylist=');
  if (galleryList.length > 0){
    console.log(galleryList);
  }

  useEffect(() => {
    const backAction = () => {
        cancel();
        return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

    return (
      <View style={styles.backgroundView}>
        <TextInput
        style={{height: 40}}
        placeholder="gallery name here"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Button
        title='add gallery'
        onPress={() => {
          console.log('add gallery from gallerylistselect');
          const length = galleryList.length;
          const galleryName = text;
          const galleryObject = {};
          galleryObject.imageList = [];
          galleryObject.name = galleryName;
          galleryObject.index = length;
          galleryList.push(galleryObject);
          setGalleryList(galleryList);
          setGalleryCount(galleryList.length);
          console.log(galleryObject);
          console.log(galleryList);
        }}
      >
        add new gallery 
      </Button>
        <FlatGrid
          itemDimension={130}
          data={galleryList}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: 'red'}]}
                onPress={() => {
                    console.log('creating gallery view');
                    console.log(item);
                    setGalleryIndex(item.index);
                }} >
              <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

      </View>

      );
}

export default GalleryListSelect;

const styles = StyleSheet.create({
  backgroundView: {
    marginTop: 10,
    flex: 1,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
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