import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image, SafeAreaView, useWindowDimensions, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import CameraView from './components/CameraView';
import GalleryListView from './components/GalleryListView';
import FlashMessage from "react-native-flash-message";
import GalleryView from './components/GalleryView';
import Timelapse from './components/Timelapse';
import { TabView, SceneMap } from 'react-native-tab-view';

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


  const _getCameraPermissions = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setHasPermission(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  if (!hasPermission){
    _getCameraPermissions();
  }

  /*

  tab view layout (maybe can push this to a new component?)
  */

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third'},
  ]);

  const renderScene = ({ route }) => {
  switch (route.key) {
    case 'first':
      return (
        <View style={{flex: 1}}>
          <CameraView
              addImage={_addImage}
              galleryList={galleryList}
              setGalleryList={setGalleryList}
          />
          <FlashMessage position={{bottom: 60, left: 80, right: 80}} icon="auto" />
        </View>
      );
    case 'second':
      return (
        <GalleryListView
          galleryList={galleryList}
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
    case 'third':
      return (
        <GalleryListView
          galleryList={galleryList}
          renderSelectedGallery={(gallery, setGalleryState) => {
            return (
              <SafeAreaView style={styles.backgroundView}>
                <Button
                  title='back'
                  onPress={() => setGalleryState(-1)}
                />
                <Timelapse 
                  imageList={gallery.imageList}
                  fadeDurationMs={300}
                  stillDurationMs={500}
                  restartDurationMs={5000}
                  backAction={() => setGalleryState(-1)}
                />
              </SafeAreaView>
            );
          }}
        />
      );
    default:
      return null;
  }

};

  return (
    <SafeAreaView style={styles.backgroundView}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  backgroundView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
