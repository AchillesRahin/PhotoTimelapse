import React from 'react';
import { Image, BackHandler, ImageBackground } from 'react-native';

class Timelapse extends React.Component {

    constructor(props) {
        super(props);
        this.extraCyclesAtEnd = 5;
        this.state = {
            bgImgIdx: 0,
            fgImgIdx: 0,
            fgImgOpacity: 0,
            fgImgTimer: Math.max(props.delay, 5),
            fgImgTimerMax: Math.max(props.delay, 5),
            imgSwitchTimer: -1,
            imgSwitchTimerMax: 5,
            fadeTimer: -2,
            fadeTimerMax: 15,
            restartTimer: -1,
            restartTimerMax: 150
        };
    }

    backAction = () => {
        this.props.backAction();
        return true;
    };

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1);
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
  
    componentWillUnmount() {
        clearInterval(this.timer);
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    calcBgImgIdx(prevState, props) {
        if(prevState.imgSwitchTimer == 0 || prevState.restartTimer == 10) {
            return prevState.bgImgIdx < props.imageList.length - 1 ? prevState.bgImgIdx + 1 : 0;
        }
        return prevState.bgImgIdx;
    }

    calcFgImgIdx(prevState, props) {
        if(prevState.fgImgTimer == 0 || prevState.restartTimer == 30) {
            return prevState.bgImgIdx < props.imageList.length - 1 ? prevState.bgImgIdx : 0;
        }
        return prevState.fgImgIdx;
    }

    calcFgImgOpacity(prevState, props) {
        if(prevState.restartTimer == 0) {
            return 0;
        }
        if(prevState.fgImgTimer == 0 || prevState.restartTimer == 20) {
            return 1;
        }
        if(prevState.fadeTimer == -1 && prevState.fgImgOpacity > 0) {
            return Math.max(0, prevState.fgImgOpacity - props.fadeSpeed);
        }
        return prevState.fgImgOpacity;
    }

    calcFgImgTimer(prevState, props) {
        if((prevState.fadeTimer == -1 && prevState.fgImgOpacity == 0 && prevState.bgImgIdx < props.imageList.length - 1) || prevState.restartTimer == 0) {
            return prevState.fgImgTimerMax;
        }
        return this.countDown(prevState.fgImgTimer);
    }

    calcImgSwitchTimer(prevState, props) {
        if(prevState.fgImgTimer == 0) {
            return prevState.imgSwitchTimerMax;
        }
        return this.countDown(prevState.imgSwitchTimer);
    }

    calcFadeTimer(prevState, props) {
        if(prevState.fadeTimer == -1 && prevState.fgImgOpacity == 0) {
            return -2;
        }
        if(prevState.imgSwitchTimer == 0) {
            return prevState.fadeTimerMax;
        }
        return this.countDown(prevState.fadeTimer);
    }

    calcRestartTimer(prevState, props) {
        if(prevState.fadeTimer == -1 && prevState.fgImgOpacity == 0 && prevState.bgImgIdx == props.imageList.length - 1) {
            return prevState.restartTimerMax;
        }
        return this.countDown(prevState.restartTimer);
    }

    countDown(timer) {
        if(timer >= 0) {
            return timer - 1;
        }
        return timer;
    }
  
    tick() {
        this.setState((prevState, props) => ({
            bgImgIdx: this.calcBgImgIdx(prevState, props),
            fgImgIdx: this.calcFgImgIdx(prevState, props),
            fgImgOpacity: this.calcFgImgOpacity(prevState, props),
            fgImgTimer: this.calcFgImgTimer(prevState, props),
            imgSwitchTimer: this.calcImgSwitchTimer(prevState, props),
            fadeTimer: this.calcFadeTimer(prevState, props),
            restartTimer: this.calcRestartTimer(prevState, props)
        }));
    }

    render() {
      return (
        <ImageBackground 
            source={{uri: this.props.imageList[this.state.bgImgIdx].image}}
            resizeMode='contain'
            fadeDuration={0}
            style={{flex: 1}}
        >
            <Image
                source={{uri: this.props.imageList[this.state.fgImgIdx].image}}
                resizeMode='contain'
                fadeDuration={0}
                style={{flex: 1, opacity: this.state.fgImgOpacity}}
            />
        </ImageBackground>
      );
    }
  }

export default Timelapse