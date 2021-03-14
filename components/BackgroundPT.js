import React from 'react';
import {ImageBackground, StyleSheet } from 'react-native';
import MenuOptions from './MenuOptions';

const BackgroundPT = () => {
    return (
        <ImageBackground
      source={require('../assets/temppic.jpg')}
      style={styles.background}
    >
      <MenuOptions></MenuOptions>
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
  