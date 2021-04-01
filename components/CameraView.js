import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import CameraPreview from './CameraPreview';

const CameraView = () => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const ref = useRef(null)

    const __savePhoto = () => {}



    const __takePicture = async () => {
        const photo = await ref.current.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true);
        setCapturedImage(photo)
    }

    const __retakePicture = () => {
        console.log('retake picture')
        setCapturedImage(null)
        setPreviewVisible(false)
      }


    if (previewVisible && capturedImage) {
        return <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
    }

    return (
        <View style={camStyles.container}>
            <Camera 
                style={camStyles.camera} 
                type={type} 
                ref={ref}>
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
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            alignSelf: 'center',
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={__takePicture}
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 0,
                                borderRadius: 50,
                                backgroundColor: '#fff'
                            }}
                        />
                    </View>
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
        flexDirection: 'column',
        margin: 30,
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