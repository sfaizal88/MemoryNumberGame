/**
*
* SETTING.js
* Declare all main setting variable declare
* @author - Ahamed
* @date   - 26 August 2020
*
***/
// REACT NATIVE IMPORT
import { Dimensions, StatusBar, Platform, NativeModules } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {fontStyles} from './fonts';

// DECALRE SETTING VARIABLE
const { StatusBarManager } = NativeModules;
export const Setting = {
  usTextSize: RFValue(10),
  xxxsTextSize: RFValue(11),
  xxsTextSize: RFValue(12),
  sxTextSize: RFValue(13),
  sTextSize: RFValue(14),
  nTextSize: RFValue(15),
  nlTextSize: RFValue(16),
  xlTextSize: RFValue(40),
  vlTextSize: RFValue(80),
  lTextSize: RFValue(30),
  h1TextSize: RFValue(26),
  h2TextSize: RFValue(24),
  h3TextSize: RFValue(22),
  h4TextSize: RFValue(20),
  h5TextSize: RFValue(18),
  h6TextSize: RFValue(17),
  DEVICE_WIDTH: Dimensions.get('window').width,
  DEVICE_HEIGHT: Dimensions.get('window').height,
  fontWeight100: fontStyles.fontWeight100,
  fontWeight200: fontStyles.fontWeight200,
  fontWeight300: fontStyles.fontWeight300,
  fontWeight400: fontStyles.fontWeight400,
  fontWeight500: fontStyles.fontWeight500,
  fontWeight600: fontStyles.fontWeight600,
  fontWeight700: fontStyles.fontWeight700,
  fontWeightBold: fontStyles.fontWeightBold,
  fontWeightBolder: fontStyles.fontWeighBolder
};
