import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import BackgroundPT from './components/BackgroundPT';
import CameraView from './components/CameraView';
import GalleryListView from './components/GalleryListView';
import FlashMessage from "react-native-flash-message";
import GalleryView from './components/GalleryView';
import Timelapse from './components/Timelapse';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [galleryList, setGalleryList] = useState([]);

  const _addImage = (img, galleryIndex) => {
    console.log('adding image from appjs');
    console.log(galleryList);
    imageObject = {};
    imageObject.image = img.uri;
    timeEpoch = Date.now();
    imageObject.time = timeEpoch;
    console.log(imageObject);
    galleryList[galleryIndex].imageList.push(imageObject);
    console.log(galleryList);
    console.log('image added from appjs');
  }
  
  /*
  interfaceT ids
  1= home page
  2= camera
  3 = gallery
  4 = timelapse video
  */
  const [interfaceT, setInterface] = useState(1);


  const _getCameraPermissions = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setHasPermission(true)
    } else {
      Alert.alert('Access denied')
      setInterface(1)
    }
  }


  console.log(interfaceT);
  if (interfaceT === 1){
    return (
      <BackgroundPT setInterface={setInterface}/>
    )
  }
  if (interfaceT === 2 && hasPermission){
    return (
      <View style={{flex: 1}}>
        <CameraView
            addImage={_addImage}
            exit={() => {setInterface(1)}}
            galleryList={galleryList}
            setGalleryList={setGalleryList}
        />
        <FlashMessage position={{bottom: 60, left: 80, right: 80}} icon="auto" />
      </View>
    );
  }
  else if (interfaceT == 2){
    _getCameraPermissions();
  }

  if (interfaceT === 3){
    return (
      <GalleryListView
        galleryList={galleryList}
        setInterface={setInterface}
        renderSelectedGallery={(gallery, setGalleryState) => {
          return (
            <GalleryView
              gallery={gallery}
              setGalleryState={setGalleryState}
            />
          );
        }}
      />
    )
  }
  if (interfaceT === 4){
    return (
      <GalleryListView
        galleryList={galleryList}
        setInterface={setInterface}
        renderSelectedGallery={(gallery, setGalleryState) => {
          return (
            <SafeAreaView style={styles.backgroundView}>
              <Button
                title='back'
                onPress={() => setGalleryState(-1)}
              />
              <Timelapse imageList={gallery.imageList} delay={10} fadeSpeed={0.15} backAction={() => setGalleryState(-1)}/>
            </SafeAreaView>
          );
        }}
      />
    );
  }
  console.log(interfaceT);
  return (<Text>got here somehow</Text>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  backgroundView: {
    marginTop: 10,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
