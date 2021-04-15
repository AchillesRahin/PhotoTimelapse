import React, { useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, BackHandler } from 'react-native';
import GalleryListSelect from './GalleryListSelect';

const CameraPreview = ({photo, retakePicture, savePhoto, galleryList, setGalleryIndex, setGalleryList}) => {
    console.log('camera preview', photo)
    const [selectGallery, setSelectGallery] = React.useState(false);

    useEffect(() => {
      const backAction = () => {
          setGalleryIndex(-1);
          retakePicture();
          return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove();
    }, []);

    console.log('selectGallery=' + selectGallery);
    if (selectGallery){
      return <GalleryListSelect
        galleryList={galleryList}
        setGalleryIndex={(idx) => {savePhoto(idx); setSelectGallery(false);}}
        cancel={() => setSelectGallery(false)}
        setGalleryList={setGalleryList}
      />
    }

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  width: 130,
                  height: 40,
  
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectGallery(true)}
                style={{
                  width: 130,
                  height: 40,
  
                  alignItems: 'center',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20
                  }}
                >
                  save photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  export default CameraPreview;