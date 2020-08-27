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
import { SafeAreaView, View, Text, StatusBar, FlatList, Alert, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import CardFlip from 'react-native-card-flip';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// ALL SHARED FILES
import * as Utils from '../shared/utils';
import * as Constant from '../shared/constant';
import { styles } from '../shared/stylesheet';
import * as Sound from '../shared/sound';
import { Colors } from '../shared/colors';

// ALL COMPONENT
import { FlipCard } from '../component/complex/card';

export const PlayScreen = ({ navigation }) => {

  // LOCAL VARIABLE
  const totalCard = Constant.GENERIC.TOTAL_CARD; // ALWAYS MULTIPLE OF 6
  const orderArr  = Array(totalCard).fill(0).map((item, index) => {return index});
  const totalRow  = orderArr.filter((item, index) => {return item%3===0});  

  // STATIC VALUE
  const [checkNumberIndex, setCheckNumberIndex] = useState([]);
  const [num, setNum]                           = useState(Utils.createStaticRandNumber(Constant.GENERIC.CARD_PAIRS_VALUE));
  const [steps, setSteps]                       = useState(0);
  const [checkNumber, setCheckNumber]           = useState([]);
  const [matchNumber, setMatchNumber]           = useState([]);
  const [matchNumberIndex, setMatchNumberIndex] = useState([]);
  const [disableAllCard, setDisableAllCard]     = useState(false);

  /**
  * FEATURE USED TO RESET THE GAME
  *
  * @input  Array - Matched number list
  * @return NA
  */
  const resetGame = (indexList = matchNumberIndex) => {
    // PLAY RESTART SOUND
    Sound.playAudio(Constant.GENERIC.RESTART_AUDIO);
    // FLIP BACK ALL THE FLIPPED CARD
    indexList.forEach(item => {
      this[`card${item}`].flip();
    });
    if (indexList.length !== num.length) {
      checkNumberIndex.forEach(item => {
        this[`card${item}`].flip();
      });
    }
    setTimeout(() => {
      // STATIC VALUE 
      setNum(Utils.createStaticRandNumber(Constant.GENERIC.CARD_PAIRS_VALUE));
      // RESET THE STEP
      setSteps(0);
      // RESET THE CHECK NUMBER
      setCheckNumber([]);
      // RESET THE MATCH NUMBER
      setMatchNumber([]);
      // RESET THE CHECK INDEX NUMBER
      setCheckNumberIndex([]);
      // RESET THE MATCH INDEX NUMBER
      setMatchNumberIndex([])
      // ENABLE BACK ALL CARD
      setDisableAllCard(false);
    }, 200);
  }

  /**
  * FEATURE USED TO CHECK NUMBER
  *
  * @input  Integer - Target Card Index
  * @input  Object  - Flip card object
  * @return NA
  */
  const checkNum = (targetIndex, flipObj) => {
    // CHECK WHETHER ONLY MAXIMUM TWO CARD IS FLIPPED
    if (checkNumber.length < 2) {
      // PLAY FLIP SOUND
      Sound.playAudio(Constant.GENERIC.FLIP_AUDIO);
      // FLIP CARD FEATURE
      flipObj.flip();

      // DECLARE LOCAL VARIABLE
      let nums   = [...checkNumber, num[targetIndex]];
      let indexs = [...checkNumberIndex, targetIndex];

      // INCREASE THE STEP BY ONE
      setSteps(steps + 1);

      // UPDATE THE STATE 
      setCheckNumber(nums);
      setCheckNumberIndex(indexs);

      // CALCULATE THE TOTAL SUM OF THE FLIPPED CARDS
      let sum = nums.reduce((total, currValue) => {
        return total + currValue;
      });

      // FINDING WHETHER FLIPPED CARDS ARE SAME
      if (sum/2 === checkNumber[0]) {
        
        // CREATE LOCAL VARIABLE
        let matchedValue = [...nums, ...matchNumber];
        let matchedIndex = [...indexs, ...matchNumberIndex];

        // PLAY CORRECT SOUND AFTER 0.5 SECOND
        setTimeout(() => {
          // PLAY CORRECT SOUND
          Sound.playAudio(Constant.GENERIC.CORRECT_AUDIO);

          // UPDATE THE STATE 
          setMatchNumber(matchedValue);
          setMatchNumberIndex(matchedIndex);

          // RESET THE STATE TO INITIAL VALUE
          setCheckNumber([]);
          setCheckNumberIndex([]);

          // CHECK WHETHER ALL THE CARD ARE CORRECTR AND FLIPPED
          checkWinner(matchedValue, matchedIndex);
        }, 500);
        

        // ENABLE BACK ALL CARD
        setDisableAllCard(false);
      } 
      // WHEN TWO CARD IS FLIPPED AND BOTH THE ANSWER IS WORNG
      else if (nums.length === 2) {
        // DISABLE  ALL CARD
        setDisableAllCard(true);
        // AFTER ONE SECOND FLIP BACK THE FLIPPED CARDS
        setTimeout(() => {
          indexs.forEach(item => {
            if (this[`card${item}`]) {
              // PLAY FLIP SOUND
              Sound.playAudio(Constant.GENERIC.FLIP_AUDIO);
              this[`card${item}`].flip();
            }
          });
          // ENABLE BACK ALL CARD
          setDisableAllCard(false);
        }, 1000);

        // RESET STATE VALUE TO INITIAL VALUE
        setCheckNumber([]);
        setCheckNumberIndex([]);
      }
    }
  }

  /**
  * CHECK WHETHER ALL THE CARD ARE CORRECTR AND FLIPPED
  *
  * @input  Array - Matched value in Array
  * @input  Array - Matched value index in Array
  * @return NA
  */
  const checkWinner = (matchedValue, matchedIndex) => {
    // CHECK WHETHER ALL MATCHED NUMBER AND TOTAL FLIPPED CARD ARE SAME
    if (num.length === matchedValue.length) {
      // PLAY WINNER SOUND
      Sound.playAudio(Constant.GENERIC.WINNER);
      // DISABLE BACK ALL CARD
      setDisableAllCard(true);
      // SHOW ALERT 
      // WITH PLAY AGAIN POPUP
      Alert.alert(
        'Congratulations!',
        "You won the game by " + (steps + 1) + " steps!",
        [
          
          {
            text: 'Cancel',
            onPress: () => navigation.navigate("Home")
          },
          {
            text: 'Try another round',
            onPress: () => resetGame(matchedIndex),
            style: 'cancel'
          },
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <>
      <SafeAreaView style={[styles.safeViewContainer]}>
      <View style={[styles.body, styles.gameContainer]}>
        <View style={{height: 150, flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.controlBox]} onPress={() => resetGame()} testID={'RESET_GAME_TESTID'}>
            <View style={[styles.circleIconContainer]}>
              <Icon name={'redo-alt'} size={RFValue(15)} color={Colors.white} type='font-awesome-5'/>
            </View>
            <Text style={[styles.controlBoxLabel]}>Restart</Text>
          </TouchableOpacity>
          <View style={[styles.controlBox]}>
            <View style={[styles.circleIconContainer]}>
              <Text style={[styles.circleIconText]}>{steps ? steps : 0}</Text>
            </View>
            <Text style={[styles.controlBoxLabel]}>Steps</Text>
          </View>

        </View>
        <View style={{flex: 1}}>
          {
            totalRow.map((item, index) => {
              return (
              <View style={[styles.cardRow]} key={'CARD_CONTAINER_'+index}>
                <FlipCard disableFlipCard={disableAllCard} cardId={0 + item} checkNumber={checkNumber} matchNumber={matchNumber} num={num} checkNum={checkNum}></FlipCard>
                <FlipCard disableFlipCard={disableAllCard} cardId={1 + item} checkNumber={checkNumber} matchNumber={matchNumber} num={num} checkNum={checkNum}></FlipCard>
                <FlipCard disableFlipCard={disableAllCard} cardId={2 + item} checkNumber={checkNumber} matchNumber={matchNumber} num={num} checkNum={checkNum}></FlipCard>
              </View>
              );
            })
          }
        </View>
        </View>
      </SafeAreaView>
    </>
  );
}

/*
<CardFlip style={[styles.card]} ref={(card) => ( this[`card${0 + item}`] = card)} testID={'CARD_' + (0 + item)}>
  <TouchableOpacity testID={'CARD_FRONT_' + (0 + item)} disabled={checkNumber.length > 1 || matchNumber.indexOf(num[0 + item]) > -1} style={styles.cardFront} onPress={() => {checkNum(0 + item, this[`card${0 + item}`])}} >
    <View style={[styles.cardFrontInner]}>
      <Text style={[styles.cardLabel]}>
        <Icon name={'question'} size={RFValue(40)} color={Colors.white} type='font-awesome-5'/>
      </Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity testID={'CARD_BACK_' + (0 + item)} disabled={checkNumber.length > 1 || matchNumber.indexOf(num[0 + item]) > -1 || checkNumber.indexOf(num[0 + item]) > -1} style={styles.cardBack} onPress={() => this[`card${0 + item}`].flip()} >
    <View style={[styles.cardBackInner]}>
      <Text style={[styles.cardMatchedLabel]}>{num[0 + item]}</Text>
    </View>
  </TouchableOpacity>
</CardFlip>

<CardFlip style={[styles.card]} ref={(card) => ( this[`card${1 + item}`] = card)} testID={'CARD_' + (1 + item)}>
  <TouchableOpacity testID={'CARD_FRONT_' + (1 + item)} disabled={checkNumber.length > 1 || matchNumber.indexOf(num[1 + item]) > -1} style={styles.cardFront} onPress={() => {checkNum(1 + item, this[`card${1 + item}`])}} >
    <View style={[styles.cardFrontInner]}>
      <Text style={[styles.cardLabel]}>
        <Icon name={'question'} size={RFValue(40)} color={Colors.white} type='font-awesome-5'/>
      </Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity testID={'CARD_BACK_' + (1 + item)} disabled={checkNumber.length > 1 || matchNumber.indexOf(num[1 + item]) > -1 || checkNumber.indexOf(num[1 + item]) > -1} style={styles.cardBack} onPress={() => this[`card${1 + item}`].flip()} >
    <View style={[styles.cardBackInner]}>
      <Text style={[styles.cardMatchedLabel]}>{num[1 + item]}</Text>
    </View>
  </TouchableOpacity>
</CardFlip>
<CardFlip style={[styles.card]} ref={(card) => ( this[`card${2 + item}`] = card)} testID={'CARD_' + (2 + item)}>
  <TouchableOpacity testID={'CARD_FRONT_' + (2 + item)} disabled={checkNumber.length > 1 || matchNumber.indexOf(num[2 + item]) > -1} style={styles.cardFront} onPress={() => {checkNum(2 + item, this[`card${2 + item}`])}}>
    <View style={[styles.cardFrontInner]}>
      <Text style={[styles.cardLabel]}>
        <Icon name={'question'} size={RFValue(40)} color={Colors.white} type='font-awesome-5'/>
      </Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity testID={'CARD_BACK_' + (2 + item)} disabled={checkNumber.length > 1 || matchNumber.indexOf(num[2 + item]) > -1 || checkNumber.indexOf(num[2 + item]) > -1} style={styles.cardBack} onPress={() => this[`card${2 + item}`].flip()}>
    <View style={[styles.cardBackInner]}>
      <Text style={[styles.cardMatchedLabel]}>{num[2 + item]}</Text>
    </View>
  </TouchableOpacity>
</CardFlip>
*/
