/**
*
* sound.js
* Declare all application utils
*
* @author - Ahamed
* @date   - 26 August 2020
*
***/
// REACT NATIVE IMPORT
import React, {useEffect, useState} from 'react';
import { Alert, View, Text } from 'react-native';
import Sound from 'react-native-sound';

// ALL SHARED FILES
import * as Constant from './constant';
import * as Utils from './utils';

/**
* PLAY AUDIO WHEN CLICK PLAY BUTTON
*
* @input  NA
* @return NA
*/
export const playAudio = (path, volume = 1) => {
  // LOAD AUDIO BY URL
  let soundActive = new Sound(path,
    (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      // WHEN LOADED FULLY, PLAY THE AUDIO
      soundActive.setVolume(volume).play(() => {
        soundActive.release();
      });
    });
  return true;
}