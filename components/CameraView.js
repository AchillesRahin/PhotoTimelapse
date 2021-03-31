import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';

const CameraView = () => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    return (
        <View style={camStyles.container}>
        <Camera style={camStyles.camera} type={type}>
          <View style={camStyles.buttonContainer}>
            <TouchableOpacity
              style={camStyles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={camStyles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    ) 
}

export default CameraView;

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