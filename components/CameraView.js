import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import CameraPreview from './CameraPreview';

const CameraView = ({addImage, galleryList, setGalleryList}) => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [galleryIndex, setGalleryIndex] = React.useState(-1);
    const ref = useRef(null);
    const dimensions = useRef(Dimensions.get("window"));
    const screenWidth = dimensions.current.width;
    const height = Math.round((screenWidth * 16) / 9);

    const __savePhoto = (galleryIndex) => {
        console.log('save photo')
        addImage(capturedImage, galleryIndex)
        setPreviewVisible(false);
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

    const __flipCamera = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    //not really sure what to do about this one just commenting for now @fred
    // useEffect(() => {
    //     const backAction = () => {
    //         exit();
    //         return true;
    //     };
    
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    //     return () => backHandler.remove();
    //   }, []);


    if (previewVisible && capturedImage) {
        return <CameraPreview 
            galleryList={galleryList} 
            photo={capturedImage} 
            savePhoto={(idx) => {__savePhoto(idx);}} 
            retakePicture={__retakePicture} 
            setGalleryIndex={setGalleryIndex}
            setGalleryList={setGalleryList}
        >
        </CameraPreview>
    }

    return (
        <View style={Platform.OS === 'android'? [camStyles.container, camStyles.androidContainer] : camStyles.container}>
            <Camera 
                ratio={Platform.OS === 'android' && "16:9"}
                style={Platform.OS === 'android'? [camStyles.camera, {height: height, width: '100%'}] : camStyles.camera} 
                type={type} 
                ref={ref}>
                <View style={{flexDirection: 'row', position: 'absolute', bottom: 30}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                    </View>
                    <CameraButton onPress={__takePicture} />
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <FlipButton onPress={__flipCamera} style={{alignSelf: 'flex-start', left: 60}} />
                    </View>
                </View>
            </Camera>
        </View>
    )
}

export default CameraView;

function FlipButton(props) {
    return <TouchableOpacity
        style={props.style}
        onPress={props.onPress}>
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
        flex: 1
    },
    androidContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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