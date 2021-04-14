import React, { useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, View, TextInput, Text, Button, TouchableOpacity } from 'react-native';

const GalleryListSelect = ({galleryList, setGalleryIndex, setSelectGallery}) => {
  const [text, setText] = useState('');
  console.log('gallerylist=');
  if (galleryList.length > 0){
    console.log(galleryList);
  }
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
          setGalleryIndex(length);
          setSelectGallery(false);
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
                    setSelectGallery(false);
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