import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SessionsHeading = (props) => {
    return (
		<View style={styles.sessionsHeading}>
			<Text style={styles.sessionsHeadingText}>SESSIONS</Text>
			{props.children}
		</View>
    );
}

const styles = StyleSheet.create({
	sessionsHeading: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: 'steelblue',
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems: 'center'
	},
	sessionsHeadingText: {
		fontSize:hp('2.5%'),
		color: 'steelblue',
		fontWeight: 'bold',
		fontFamily: 'normal',
		margin:wp('3%')
	},
});

export default SessionsHeading;