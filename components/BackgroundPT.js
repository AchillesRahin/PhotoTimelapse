import React from 'react';
import {ImageBackground, StyleSheet } from 'react-native';
import MenuOptions from './MenuOptions';

const BackgroundPT = ({setInterface}) => {
    return (
        <ImageBackground
      source={require('../assets/space.jpg')}
      style={styles.background}
    >
      <MenuOptions setInterface={setInterface}></MenuOptions>
    </ImageBackground>
  )
    
}
export default BackgroundPT;

const styles = StyleSheet.create({
    background: {
      width: '100%',
      height: '100%'
    },
  });
  