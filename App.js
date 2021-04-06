import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import BackgroundPT from './components/BackgroundPT';
import CameraView from './components/CameraView';
import GalleryView from './components/GalleryView';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [imageList, setImageList] = useState([]);

  const _addImage = (img) => {
    imageObject = {};
    imageObject.source = {};
    imageObject.source.uri = img.uri;
    timeEpoch = Date.now();
    imageObject.time = timeEpoch;
    console.log(imageObject);
    imageList.push(imageObject);
    setInterface(1);
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
      <CameraView
        addImage={_addImage}
      />
    );
  }
  else if (interfaceT == 2){
    _getCameraPermissions();
  }

  if (interfaceT === 3){
    return (
      <GalleryView
        imageList={imageList}
        setInterface={setInterface}
      />
    )
  }
  if (interfaceT === 4){
    return <Text>timeline view</Text>
  }
  console.log(interfaceT);
  return (<Text>got here somehow</Text>);

}

const camStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
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
