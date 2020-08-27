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
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent, cleanup, waitFor, within } from '@testing-library/react-native'
import App from '../App';

// ALL SHARED FILES
import * as Utils from '../src/shared/utils';
import * as Constant from '../src/shared/constant';
import * as SoundUtils from '../src/shared/sound';

// MOCKING FOR REACT-NATIVE SOUND
jest.mock('react-native-sound', () => {
  var _filename = null;
  var _basePath = null;

  var SoundMocked = (filename, basePath, onError, options) => {
    _filename = filename;
    _basePath = basePath;
  }

  SoundMocked.prototype.filename = () => _filename;
  SoundMocked.prototype.basePath = () => _basePath;
  SoundMocked.prototype.play = function (onEnd) { };
  SoundMocked.prototype.pause = function (callback) { };
  SoundMocked.prototype.stop = function (callback) { };
  SoundMocked.prototype.reset = function () { };
  SoundMocked.prototype.release = function () { };
  SoundMocked.prototype.getDuration = function () { };

  SoundMocked.LIBRARY = 2;

  return SoundMocked;
});
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// LOCAL VARIABLE
const {act} = renderer;
let container;
const delay = ms => new Promise(res => setTimeout(res, ms));
afterEach(cleanup);



/**
* FEATURE USED TO RENDER THE APP
*
* @input  NA
* @return Component
*/
const appRender = () => {
  const appComponent = render(<App />, container);
  return appComponent;
};

// TEST CASE 1
// CHECKING WHETHER APP RENDERING PROPERLY
it('Test 1: Renders correctly', async () => {
	// Test first render and componentDidMount
  	await act(async () => {
  		renderer.create(<App />);
  	});
});

// TEST CASE 2
// GENERATING RANDOM 12 DIGIT NUMBER DYNAMIC
test('Test 2: Generate random number of 12 card', () => {
	// FETCHING DEFAULT CARD PAIR NUMBERS
	let output = Utils.createRandNumber();
	// MUST 12 CARDS
  	expect(output.length).toBe(12);
});

// TEST CASE 3
// GENERATING RANDOM 12 DIGIT NUMBER STATIC
test('Test 3: Generate static number of 12 card', () => {
	// FETCHING DEFAULT CARD PAIR NUMBERS
	let output = Utils.createStaticRandNumber(Constant.GENERIC.CARD_PAIRS_VALUE);
	// MUST 12 CARDS
  	expect(output.length).toBe(12);
});

// TEST CASE 4
// CHECKING WHETHER HOME PAGE IS SHOWN FIRST OR LOADED PROPERLY
it('Test 4: Check whether home page shown first or home page loaded properly', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR HOME PAGE
	let isHomePage  = await waitFor(() => getByTestId('HOME_PAGE_TESTID'));
	await act(async () => {
		// CHECKING USER IS IN HOME PAGE
		expect(isHomePage).not.toBe(null);
	});
});

// TEST CASE 5
// CHECKING WHETHER PLAY GAME PAGE IS SHOWN AFTER CLICKING START GAME BUTTON IN HOME PAGE 
it('Test 5: Check whether play game page is shown after clicking start game button in home page', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act( async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});
	// FETCHING TEST ID FOR PLAY GAME PAGE
	let isPlayGame  = getByTestId('PLAY_GAME_PAGE_TESTID');
	// CHECKING USER IS IN PLAY GAME PAGE
	expect(isPlayGame).not.toBe(null);
});

// TEST CASE 6
// CHECKING WHETHER RESET BUTTON WORK PROPERLY
test('Test 6: Checking reset game works properly', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act(async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});	
	// FAKE TIMER WHEN WE USE SETIMEOUT FEATURE
	jest.useFakeTimers()
	// RESET BTN
	let resetBtn = getByTestId('RESET_GAME_TESTID');
	await act(async () => {
		// CLICKING THE RESET BUTTON
		fireEvent.press(resetBtn);
	});
	expect(getByTestId('RESET_GAME_TESTID')).toBeTruthy();
});

// TEST CASE 7
// FLIP ONE CARD
test('Test 7: Flip one card', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act(async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});	
	// FLIP ONE CARD
	let card0_element  = getByTestId('CARD_FRONT_0');
	await act(async () => {
		fireEvent.press(card0_element);
	});
	expect(getByTestId('CARD_FRONT_0')).toBeTruthy();
});

// TEST CASE 8
// FLIP TWO CARD
test('Test 8: Flip two unmatched card', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act(async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});	
	// FAKE TIMER WHEN WE USE SETIMEOUT FEATURE
	jest.useFakeTimers()
	// FLIP TWO UNMATCHED CARD
	const card0_element = getByTestId('CARD_FRONT_0');
	const card1_element = getByTestId('CARD_FRONT_1');
	await act(async () => {
		fireEvent.press(card0_element);
	 	fireEvent.press(card1_element);
	});	
	expect(getByTestId('CARD_FRONT_0')).toBeTruthy();
});

// TEST CASE 9
// FLIP TWO CARD
test('Test 9: Flip two matched card', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act(async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});	
	// FAKE TIMER WHEN WE USE SETIMEOUT FEATURE
	jest.useFakeTimers()
	// FLIP TWO MATCHED CARD
	const card0_element = getByTestId('CARD_FRONT_0');
	const card6_element = getByTestId('CARD_FRONT_6');
	await act(async () => {
		fireEvent.press(card0_element);
 		fireEvent.press(card6_element);
 	});
	expect(getByTestId('CARD_FRONT_0')).toBeTruthy();
});

// TEST CASE 10
// FLIP ALL CARD TO WIN - CARDS ARE STATIC IN ORDER
test('Test 10: Flip all card to win', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act(async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});	
	// FLIP TWO MATCHED CARD
	const card0_element = getByTestId('CARD_FRONT_0');
	const card6_element = getByTestId('CARD_FRONT_6');
	fireEvent.press(card0_element);
	fireEvent.press(card6_element);

	// FLIP TWO MATCHED CARD
	const card1_element = getByTestId('CARD_FRONT_1');
	const card7_element = getByTestId('CARD_FRONT_7');
	fireEvent.press(card1_element);
	fireEvent.press(card7_element);

	// FLIP TWO MATCHED CARD
	const card2_element = getByTestId('CARD_FRONT_2');
	const card8_element = getByTestId('CARD_FRONT_8');
	fireEvent.press(card2_element);
	fireEvent.press(card8_element);

	// FLIP TWO MATCHED CARD
	const card3_element = getByTestId('CARD_FRONT_3');
	const card9_element = getByTestId('CARD_FRONT_9');
	fireEvent.press(card3_element);
	fireEvent.press(card9_element);

	// FLIP TWO MATCHED CARD
	const card4_element = getByTestId('CARD_FRONT_4');
	const card10_element = getByTestId('CARD_FRONT_10');
	fireEvent.press(card4_element);
	fireEvent.press(card10_element);

	// FLIP TWO MATCHED CARD
	const card5_element = getByTestId('CARD_FRONT_5');
	const card11_element = getByTestId('CARD_FRONT_11');
	fireEvent.press(card5_element);
	fireEvent.press(card11_element);
	expect(getByTestId('CARD_FRONT_11')).toBeTruthy();
});

// TEST CASE 11
// FLIP TWO CARD AND RESET
test('Test 11: Flip two card and reset', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act(async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});		
	// FLIP TWO MATCHED CARD
	const card0_element = getByTestId('CARD_FRONT_0');
	const card6_element = getByTestId('CARD_FRONT_6');
	await act(async () => {
		fireEvent.press(card0_element);
		fireEvent.press(card6_element);
	});

	// FLIP TWO MATCHED CARD
	const card1_element = getByTestId('CARD_FRONT_1');
	const card7_element = getByTestId('CARD_FRONT_7');
	await act(async () => {
		fireEvent.press(card1_element);
		fireEvent.press(card7_element);
	});

	// FAKE TIMER WHEN WE USE SETIMEOUT FEATURE
	jest.useFakeTimers()
	// RESET BUTTON
	let element  = getByTestId('RESET_GAME_TESTID');
	await act(async () => {
		fireEvent.press(element);
	});
	expect(getByTestId('RESET_GAME_TESTID')).toBeTruthy();
});

// TEST CASE 12
// FLIP TWO CARD WRONGLY AND WAIT 2 SECOND TILL IT FLIP BACK
test('Test 12: Flip two card wrongly and wait till it flip back', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act(async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});	
	// FLIP TWO UNMATCHED CARD
	const card0_element = getByTestId('CARD_FRONT_0');
	const card1_element = getByTestId('CARD_FRONT_1');
	await act(async () => {
		fireEvent.press(card0_element);
		fireEvent.press(card1_element);
	});
	expect(getByTestId('CARD_FRONT_1')).toBeTruthy();
});

// TEST CASE 13
// PLAY SOUND
test('Test 13: Play sound', () => {
	// FETCH SOUND
	let isPlayed = SoundUtils.playAudio(Constant.GENERIC.FLIP_AUDIO);
	// MUST BE TRUE
  	expect(isPlayed).toBe(true);
});


// TEST CASE 14
// FLIP FLIP BACK OF THE CARD
test('Test 14: Flip back of the card', async () => {
	// RENDER APP
	const { getByTestId } = appRender();
	// FETCHING TEST ID FOR START GAME BTN
	let homePageBtnElement  = getByTestId('START_GAME_BTN_TESTID');
	await act(async () => {
		// CLICKING THE START GAME BUTTON
		fireEvent.press(homePageBtnElement);
	});	

	// FLIP CARD BACK
	let card0_back_element  = getByTestId('CARD_BACK_0');
	await act(async () => {
		fireEvent.press(card0_back_element);
	});
	expect(getByTestId('CARD_BACK_0')).toBeTruthy();
});
