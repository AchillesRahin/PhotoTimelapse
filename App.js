import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert, SafeAreaView, useWindowDimensions, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
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

  const readData = async () => {
    try {
      const cacheItem = await AsyncStorage.getItem('cacheEvopic');
      const galleryCache = JSON.parse(cacheItem);
      if (cacheItem !== null) {
        setGalleryList(galleryCache);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('cacheEvopic', JSON.stringify(galleryList));
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  readData();

  function _addImage(img, galleryIndex) {
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
    console.log('data saved');
    saveData();
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

  const CameraTab = () => (
    <View style={{flex: 1}}>
      <CameraView
          addImage={_addImage}
          galleryList={galleryList}
          setGalleryList={setGalleryList}
      />
      <FlashMessage position={{bottom: 60, left: 80, right: 80}} icon="auto" />
    </View>
  );
  
  const ViewEditGalleriesTab = () => (
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
  );

  const TimelapseTab = () => (
    <GalleryListView
      galleryList={galleryList}
      renderSelectedGallery={(gallery, setGalleryState) => {
        return (
          <View>
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
          </View>
        );
      }}
    />
  );

  const renderScene = SceneMap({
    first: CameraTab,
    second: ViewEditGalleriesTab,
    third: TimelapseTab
  });

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
