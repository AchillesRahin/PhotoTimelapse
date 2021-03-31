import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import BackgroundPT from './components/BackgroundPT';
import CameraView from './components/CameraView';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
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
      />
    );
  }
  else if (interfaceT == 2){
    _getCameraPermissions();
  }

  if (interfaceT === 3){
    return (
      <View>
        <Text style={{fontSize:100}}>gallery view</Text>
        <Button
          title='simple home button'
          onPress={()=> setInterface(1)}
        >
          <Text>home</Text>
        </Button>
      </View>
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
