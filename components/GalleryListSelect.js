import React, { useState, useEffect } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, TextInput, Button, BackHandler, Keyboard, SafeAreaView} from 'react-native';
import { showMessage } from "react-native-flash-message";
import GalleryPreview from './GalleryPreview';

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
      <SafeAreaView style={styles.backgroundView}>
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
          console.log('galleryName=' + galleryName);
          if (galleryName.length <= 2){
            showMessage({
              message: 'gallery name length must have 3 or more characters',
              type: "danger",
              duration: 2000
            });
            return;
          }
          const galleryObject = {};
          galleryObject.imageList = [];
          galleryObject.name = galleryName;
          galleryObject.index = length;
          galleryList.push(galleryObject);
          setGalleryList(galleryList);
          setGalleryCount(galleryList.length);
          console.log(galleryObject);
          console.log(galleryList);
          setText('');
          Keyboard.dismiss();
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
            <GalleryPreview
              gallery={item}
              onPress={() => {setGalleryIndex(item.index);}}
            />
          )}
        />
      </SafeAreaView>

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
});