/**
*
* home.js
* Game start screen
*
* @author - Ahamed
* @date   - 26 August 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CardFlip from 'react-native-card-flip';

// ICONS
import MemoryIcon from '../../assets/img/card-game.png';

// ALL SHARED FILES
import * as Utils from '../shared/utils';
import * as Constant from '../shared/constant';
import { styles } from '../shared/stylesheet';
import * as Sound from '../shared/sound';
import { Colors } from '../shared/colors';

export const HomeScreen = ({ navigation }) => {


  /**
  * START GAME WHEN USER CLICKED THE START BUTTON
  *
  * @input  NA
  * @return NA
  */
  const startGame = () => {
    // PLAY CLICK SOUND
    Sound.playAudio(Constant.GENERIC.CLICK_AUDIO);
    // NAVIGATING TO PLAY GAME SCREEN
    navigation.navigate("PlayGame");
  }

  // RENDER HTML
  return (
    <>
      <SafeAreaView style={[styles.safeViewContainer]}>
        <View style={[styles.body, styles.centerView]}>
          <TouchableOpacity onPress={() => startGame()} style={[styles.gameStartPageContainer]}>
            <Text style={[styles.gameTitle]}>Magical Flip</Text>
            <Image source={MemoryIcon} style={[styles.img200, styles.gameTitleImg]}/>
            <Button title="Start Game" titleStyle={[styles.btnLabel]} buttonStyle={[styles.btn]}
            icon={<Icon name={'play'} size={RFValue(15)} color={Colors.white} type='font-awesome'/>} 
            onPress={startGame}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
