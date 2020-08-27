/**
*
* card.js
* Card component
*
* @author - Ahamed
* @date   - 26 August 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import { Icon } from 'react-native-elements';
import CardFlip from 'react-native-card-flip';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// ALL SHARED FILES
import * as Utils from '../../shared/utils';
import * as Constant from '../../shared/constant';
import { styles } from '../../shared/stylesheet';
import * as Sound from '../../shared/sound';
import { Colors } from '../../shared/colors';

export const FlipCard = (props) => {
	return (
		<CardFlip style={[styles.card]} ref={(card) => ( this[`card${props.cardId}`] = card)} testID={'CARD_' + props.cardId}>
          <TouchableOpacity testID={'CARD_FRONT_' + props.cardId} disabled={props.disableFlipCard  || props.matchNumber.indexOf(props.num[props.cardId]) > -1} style={styles.cardFront} onPress={() => {props.checkNum(props.cardId, this[`card${props.cardId}`])}} >
            <View style={[styles.cardFrontInner]}>
              <Text style={[styles.cardLabel]}>
                <Icon name={'question'} size={RFValue(40)} color={Colors.white} type='font-awesome-5'/>
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity testID={'CARD_BACK_' + props.cardId} disabled={props.disableFlipCard || props.matchNumber.indexOf(props.num[props.cardId]) > -1 || props.checkNumber.indexOf(props.num[props.cardId]) > -1} style={[styles.cardBack]} onPress={() => this[`card${props.cardId}`].flip()} >
            <View style={[styles.cardBackInner, styles.cardBack, props.matchNumber.indexOf(props.num[props.cardId]) > -1 ? styles.correctCardInner : '']}>
              <Text style={[styles.cardMatchedLabel, props.matchNumber.indexOf(props.num[props.cardId]) > -1 ? styles.correctCardLabel : '']}>{props.num[props.cardId]}</Text>
            </View>
          </TouchableOpacity>
        </CardFlip>
	)
}