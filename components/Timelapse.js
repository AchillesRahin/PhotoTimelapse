import React from 'react';
import { Image, BackHandler, Dimensions, View } from 'react-native';
import FadeCarousel from "./FadeCarousel";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

class Timelapse extends React.Component {
    
    constructor(props) {
        super(props);
        this.extraCyclesAtEnd = 5;
        this.state = {
            fadeDurationMs: props.fadeDurationMs,
            stillDurationMs: props.stillDurationMs
        };
        this.images = [];
        for(i = props.imageList.length - 1; i >= 0; --i) {
            this.images.push(this.getImage(props.imageList[i].image));
        }
    }

    getImage(uri) {
        return <Image source={{uri: uri}} style={styles.imageScroll} resizeMode="cover" />
    }

    backAction = () => {
        this.props.backAction();
        return true;
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
  
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    render() {
      return (
        <View style={styles.containerStyle}>
            <FadeCarousel
                elements={this.images}
                containerStyle={styles.carouselContainer}
                fadeDuration={this.state.fadeDurationMs}
                stillDuration={this.state.stillDurationMs}
                restartDuration={this.props.restartDurationMs}
                start={true}
            />
        </View>
      );
    }
  }

export default Timelapse

const styles = {
    containerStyle: {
        flex: 1
    },
    carouselContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    imageScroll: {
        height: screenHeight,
        width: screenWidth
    }
};