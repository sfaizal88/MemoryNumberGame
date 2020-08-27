/**
*
* App-test.js
* App test cases
*
* @author - Ahamed
* @date   - 26 August 2020
*
***/
// REACT NATIVE IMPORT
import 'react-native';
import React, {useEffect} from 'react';
import CardFlip from 'react-native-card-flip';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react-native'
import App from '../App';

// ALL SHARED FILES
import * as Utils from '../src/shared/utils';
import * as Constant from '../src/shared/constant';

// LOCAL VARIABLE
const {act} = renderer;
const delay = ms => new Promise(res => setTimeout(res, ms));
afterEach(cleanup);

/**
* FEATURE USED TO RENDER THE APP
*
* @input  NA
* @return Component
*/
const appRender = () => {
  const appComponent = render(<App />);
  return appComponent;
};

// TEST CASE 1:
// CHECKING WHETHER APP RENDERING PROPERLY
it('Test 1: Renders correctly', () => {
  renderer.create(<App />);
});