import React from '../node_modules/react';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AddSessionButton = (props) => {
    return (
        <TouchableOpacity onPress={props.addClientSession} style={styles.addSessionButton}>
            <Text style={styles.addSessionButtonText}>+ ADD SESSION +</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
	addSessionButton: {
		flex:1,
		borderColor:'steelblue',
		height:hp('10%'),
		borderBottomWidth: 5,
		borderTopWidth: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	addSessionButtonText: {
		fontFamily: 'normal',
		fontSize:hp('3.2%'),
		color:'steelblue',
		fontWeight: 'bold',
	},
});

export default AddSessionButton;