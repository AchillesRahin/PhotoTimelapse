import React from 'react';
import { View, Image, StyleSheet, Button, BackHandler } from 'react-native';

class Timelapse extends React.Component {

    constructor(props) {
      super(props);
      this.state = {imageIdx: 0, timer: 5, delay: 5};
      this.extraCyclesAtEnd = 5;
    }

    backAction = () => {
        this.props.backAction();
        return true;
    };

    componentDidMount() {
        this.timer = setInterval(
            () => this.tick(),
            100
        );
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
  
    componentWillUnmount() {
        clearInterval(this.timer);
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
  
    tick() {
        this.setState((prevState, props) => ({
            timer: prevState.timer > 0 ? prevState.timer - 1 : prevState.delay,
            imageIdx: prevState.timer == 0 ? 
                (prevState.imageIdx < (props.imageList.length - 1) + this.extraCyclesAtEnd ? prevState.imageIdx + 1 : 0)
                : prevState.imageIdx
        }));
    }
  
    render() {
      return (
        <View style={styles.backgroundView}>
            <Button
                title='back'
                onPress={this.backAction}
            />
            <Image 
                source={{uri: this.props.imageList[Math.min(this.props.imageList.length - 1, this.state.imageIdx)].image}}
                resizeMode='contain'
                fadeDuration={0}
                style={{flex: 1}}
            />
        </View>
      );
    }
  }

export default Timelapse

const styles = StyleSheet.create({
    backgroundView: {
        marginTop: 10,
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 35 : 0
    },
});