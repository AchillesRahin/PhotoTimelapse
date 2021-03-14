import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MenuOptions = () => {
    return (
        <View>
        <Image
          source={require('../assets/blue_eyes_ygo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        >
        </Image>
        <Text style={styles.text}> Anime is life</Text>

        <TouchableOpacity>
         <Text style={styles.takepic}>Take Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity>
         <Text style={styles.signup}>View/Edit Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.login}>View Timeline</Text>
        </TouchableOpacity>
      </View>
    )
}

export default MenuOptions;

const styles = StyleSheet.create({
    logo:{
      width: 100,
      height: 100,
      marginLeft: '40%',
      marginTop: '10%',
    },
    text: {
      marginTop: '15%',
      marginLeft: '40%',
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black'
    },
    takepic: {
      backgroundColor: 'orange',
      color: '#3A59FF',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: '40%'
    },
    signup: {
      backgroundColor: 'orange',
      color: '#3A59FF',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: '10%'
    },
    login: {
      backgroundColor: 'orange',
      color: '#3A59FF',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: '10%'
    }
  });
  