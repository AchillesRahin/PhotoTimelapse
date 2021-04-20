import React, { useEffect } from 'react';
import {View, Image, Text, Button, StyleSheet, BackHandler, TouchableOpacity, TextInput} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';

const GalleryView = ({gallery, setGalleryState}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [selected, setSelected] = React.useState(new Set());
  const [newGalleryName, setNewGalleryName] = React.useState("");
  const [editingName, setEditingName] = React.useState(false);

  console.log(gallery.imageList);

  const goBack = () => {
    setGalleryState(-1);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelected([]);
    setNewGalleryName(gallery.name);
    setEditingName(false);
  }

  useEffect(() => {
    setNewGalleryName(gallery.name);

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
    setSelected([]);
  }

  return (
    <View style={styles.background}>
        {!editMode && <Text style={styles.headline_text}>{gallery.name}</Text>}
        {editMode && <TextInput
          style={styles.headline_text}
          onChangeText={setNewGalleryName}
          defaultValue={gallery.name}
          onBlur={() => {gallery.name = newGalleryName; setEditMode(selected.length > 0); setEditingName(false);}}
          onFocus={() => {setEditingName(true);}}
        />}
        <Button title='simple back button' onPress={goBack}/>
        <Button title={editMode? 'Cancel' : 'Edit'} onPress={toggleEditMode}/>
        <GridImageView data={gallery.imageList} renderGridImage={renderGridImage}/>
        {editMode && selected.length > 0 && !editingName && <Text style={styles.selected_text}>{'Selected: ' + selected.length}</Text>}
        {editMode
          && selected.length > 0
          && !editingName
          && <Button title='Delete' onPress={() => {gallery.name = newGalleryName; deleteSelected(); setEditMode(false);}}/>}
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