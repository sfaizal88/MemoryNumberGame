/**
*
* stylesheet.js
* Declare all style details.
*
* @author - Ahamed
* @date   - 26 August 2020
*
***/
// REACT NATIVE IMPORT
import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// ALL SHARED FILES
import { Colors } from './colors';
import { Setting } from './setting';
import { Fonts } from './fonts';
import  * as Utils from './utils';

/* LAYOUT - STARTS */
const layoutStyle ={
	safeViewContainer: {
    	flex: 1,
    	backgroundColor: '#ecf0f1',
	},
	body: {
		flex: 1,
		paddingTop: Utils.isIpad() ? RFValue(10) : 20,
		paddingBottom: Utils.isIpad() ? RFValue(10) : 20,
		paddingHorizontal: Utils.isIpad() ? RFValue(5) : 20,
        flexDirection: 'column',
    	backgroundColor: Colors.white,
    	marginHorizontal: 15,
    	marginTop: 15,
    	marginBottom: 15,
    	borderTopRightRadius: 20,
 		borderTopLeftRadius: 20,
    	borderBottomRightRadius: 20,
 		borderBottomLeftRadius: 20,
 		overflow: 'hidden',

	}
}
/* LAYOUT - ENDS */
/* GAME PLAY PAGE - STARTS */
const gamePlayPage = {
	gameContainer: {
		flex: 1,
		flexDirection: 'column',
	},
	cardRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch'
	},
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: "center",
		borderRadius: 5,
	},
	cardFront: {
		flex: 1,
		backgroundColor: Colors.cardFront,
		margin: 5,
		borderRadius: 5,
		padding: 5
	},
	cardFrontInner: {
		borderRadius: 5,
		borderWidth: 2,
		borderColor: Colors.white,
		flex: 1,
		width: "100%",
		alignItems: 'center',
		justifyContent: "center",
	},
	cardBack: {
		flex: 1,
		backgroundColor: Colors.white,
		margin: 5,
		alignItems: 'center',
		justifyContent: "center",
		borderRadius: 5
	},
	cardBackInner: {
		borderRadius: 5,
		borderWidth: 2,
		borderColor: Colors.cardBack,
		flex: 1,
		width: "100%",
		alignItems: 'center',
		justifyContent: "center",
	},
	correctCard: {
		backgroundColor: Colors.green
	},
	correctCardInner: {
		borderColor: Colors.green
	},
	correctCardLabel: {
		color: Colors.green,
	},
	cardSelected: {
		backgroundColor: '#2c3e50'
	},
	cardMatched: {
		backgroundColor: Colors.cardBack
	},
	cardMatchedLabel: {
		color: Colors.cardBack,
		...Setting.fontWeight600,
		fontSize: Setting.h2TextSize,
	},
	cardLabel: {
		...Setting.fontWeight600,
		fontSize: Setting.h4TextSize,
		alignItems: "center",
		color: Colors.primary
	},
	circleIconContainer: {
		borderWidth: 3,
		borderColor: Colors.cardText,
		height: 50,
		width: 50,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: "center",
		marginBottom: 10,
		backgroundColor: Colors.cardText,
	},
	controlBox: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	controlBoxLabel: {
		color: Colors.cardText,
		...Setting.fontWeight600,
		fontSize: Setting.nTextSize,
	},
	circleIconText: {
		color: Colors.white,
		...Setting.fontWeight600,
		fontSize: Setting.nTextSize,

	}
}
/* GAME PLAY PAGE - ENDS */
/* GAME START PAGE - STARTS */
const gameStartPage = {
	gameStartPageContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: RFPercentage(-5)
	},
	gameTitle: {
		color: Colors.primary,
		...Setting.fontWeight600,
		fontSize: Setting.h1TextSize,
	},
	gameTitleImg: {
		marginTop: 40,
		marginBottom: 40
	}
}
/* GAME START PAGE - ENDS */
/* FORM FIELD - STARTS */
const fieldStyle = {
	btn: {
		backgroundColor: Colors.primary,
 		paddingTop: RFValue(10),
 		paddingBottom: RFValue(10),
 		paddingHorizontal: RFValue(15),
 		borderRadius: RFValue(5),
 		marginHorizontal: 4,
	},
	btnLabel: {
		color: Colors.white,
		fontSize: Setting.nTextSize,
		...Setting.fontWeight600,
 		textTransform: 'uppercase',
		marginHorizontal: 10,
	},
}
/* FORM FIELD - ENDS */
/* ALIGN - STARTS */
const alignStyle = {
	centerView: {
		alignItems: "center",
		justifyContent: "center"
	}
}
/* ALIGN - ENDS */

/* IMAGES - STARTS */
const imagesStyle = {
	img200: {
		width: Utils.isIpad() ? RFValue(200) : RFValue(150),
		height: Utils.isIpad() ? RFValue(200) : RFValue(150),
	}
}
/* IMAGES - ENDS */
/* SPECIAL ICONS - STARTS */
const specialIconStyle = {
}
/* SPECIAL ICONS - ENDS */
export const styles = StyleSheet.create({
	...layoutStyle,
	...alignStyle,
	...imagesStyle,
	...gameStartPage,
	...fieldStyle,
	...gamePlayPage,
	...specialIconStyle
});
