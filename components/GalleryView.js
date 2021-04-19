import React, { useEffect } from 'react';
import {View, Image, Text, Button, StyleSheet, BackHandler, TouchableOpacity} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';

const GalleryView = ({gallery, setGalleryState}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [selected, setSelected] = React.useState(new Set());

  console.log(gallery.imageList);

  const goBack = () => {
    setGalleryState(-1);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelected([]);
  }

  useEffect(() => {
    const backAction = () => {
        goBack();
        return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const imageIsSelected = (image) => {
    return selected.includes(image);
  }

  const selectImage = (image) => {
    setSelected(selected.concat(image));
  }

  const unselectImage = (image) => {
    setSelected(selected.filter((selectedItem) => selectedItem !== image));
  }

  const toggleImageSelection = (image) => {
    if(imageIsSelected(image)) {
      unselectImage(image);
    }
    else {
      selectImage(image);
    }
  }

  const isImageSelected = (image) => {
    return selected.includes(image);
  }

  const renderGridImage = (item, defaultStyle) => {
    return (
      editMode ?
      <TouchableOpacity style={defaultStyle} onPress={() => {toggleImageSelection(item.image)}}>
        <Image style={isImageSelected(item.image) ? [defaultStyle, styles.selected_image] : defaultStyle} source={{uri: item.image}} />
      </TouchableOpacity>
      : <Image style={defaultStyle} source={{uri: item.image}} /> 
    );
  }

  const deleteSelected = () => {
    for(var i = gallery.imageList.length -1; i >= 0 ; i--) {
      if(selected.includes(gallery.imageList[i].image)) {
        gallery.imageList.splice(i, 1);
      }
    }
    setEditMode(false);
    setSelected([]);
  }

  return (
    <View style={styles.background}>
        <Text style={styles.headline_text}>{gallery.name}</Text>
        <Button title='simple back button' onPress={goBack}/>
        <Button title={editMode? 'Cancel' : 'Edit'} onPress={toggleEditMode}/>
        <GridImageView data={gallery.imageList} renderGridImage={renderGridImage}/>
        {editMode && <Text style={styles.selected_text}>{'Selected: ' + selected.length}</Text>}
        {editMode && selected.length > 0 && <Button title='Delete' onPress={deleteSelected}/>}
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
    selected_text: {
      color: 'white',
      fontSize: 15,
      marginBottom: 10,
      marginLeft: 10,
    },
    selected_image: {
      borderColor: 'red',
      borderWidth: 5
    }
  });