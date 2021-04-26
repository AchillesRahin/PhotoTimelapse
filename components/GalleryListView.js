import React, { useState } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import GalleryPreview from './GalleryPreview';

const GalleryListView = ({galleryList, renderSelectedGallery}) => {

  const [galleryState, setGalleryState] = useState(-1);
    console.log('gallery list view');
    console.log(galleryList);

    //also unsure what to do here just commenting for now
    // useEffect(() => {
    //   const backAction = () => {
    //       setInterface(1);
    //       return true;
    //   };
  
    //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    //   return () => backHandler.remove();
    // }, []);

    if (galleryState !== -1){
      return renderSelectedGallery(galleryList[galleryState], setGalleryState);
    }

    return (
      <SafeAreaView style={styles.backgroundView}>
        <FlatGrid
        itemDimension={130}
        data={galleryList}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) =>
          <GalleryPreview
            gallery={item}
            onPress={() => {setGalleryState(item.index);}}
          />}
      />
      </SafeAreaView>
      
    );
}

export default GalleryListView;

const styles = StyleSheet.create({
    backgroundView: {
      marginTop: 10,
      flex: 1
    },
    gridView: {
      marginTop: 20,
      flex: .8,
    },
  });