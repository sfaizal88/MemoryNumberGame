/**
*
* utils.js
* Declare all application utils
*
* @author - Ahamed
* @date   - 26 August 2020
*
***/
// REACT NATIVE IMPORT
import React from 'react';
import { Alert, View, Text, Platform } from 'react-native';
import Device from 'react-native-device-detection';

// ALL SHARED FILES
import * as Constant from './constant';

/**
* Feature used to generate numbers for array
*
* @input  NA
* @return NA
*/
export const createRandNumber = () => {
  // DECLARE LOCAL VARIABLE
  let output = [];
  let max    = Constant.GENERIC.TOTAL_CARD / 2;
  // GENERATING RANDOM NUMBER
  while (output.length !== max) {
    let num = Math.floor(Math.random() * 50) + 1;
    if (output.indexOf(num) === -1) {
        output.push(num);
    }
  }
  // MEGERING DUPLICATE NUMBERS
  output = output.concat(output);
  // SHUFFLE NUMBER
  for(let i = output.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * i)
    let temp = output[i]
    output[i] = output[j]
    output[j] = temp
  }
  return output;
}

/**
* Feature used to generate numbers for array
*
* @input  NA
* @return NA
*/
export const createStaticRandNumber = (nums) => {
  // DECLARE LOCAL VARIABLE
  let output = [...nums];
  // SHUFFLE NUMBER
  for(let i = output.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * i)
    let temp = output[i]
    output[i] = output[j]
    output[j] = temp
  }
  return output;
}


/**
* Feature used to find wheather its ipad or not
*
* @return Array   
*/
export const isIpad = () => {
  let isPad = false;
  if (Platform.OS === 'ios' && Device.isTablet) {
    isPad = true;
  }
  return isPad
}