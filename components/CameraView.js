import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import CameraPreview from './CameraPreview';

const CameraView = ({addImage}) => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const ref = useRef(null)

    const __savePhoto = () => {
        console.log('save photo')
        addImage(capturedImage)
    }



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
                <FlipButton style={{position: 'absolute', right: 30, top: 30}} />
                <CameraButton onPress={__takePicture} style={{position: 'absolute', bottom: 10, alignSelf: 'center'}} />                
            </Camera>
        </View>
    )
}

export default CameraView;

function FlipButton(props) {
    return <TouchableOpacity
        style={props.style}
        onPress={() => {
            setType(
                type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
            );
        }}>
        <Text style={camStyles.text}> Flip </Text>
    </TouchableOpacity>
}

function CameraButton(props) {
    return <TouchableOpacity
        onPress={props.onPress}
        style={[props.style, {
            width: 70,
            height: 70,
            borderRadius: 50,
            backgroundColor: '#fff',
        }]}
    />
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