import React, { Component } from '../node_modules/react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AddClient = (props) => {
    return (
        <View style={styles.addClientContainer}>
            <TouchableOpacity onPress={(props.onShowNewClientModal)} style={styles.addClientButton}>
                <Text style={styles.addClientButtonText}>+ ADD CLIENT +</Text>
            </TouchableOpacity>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({

	//ADD CLIENT
	addClientContainer: {
		height: hp('10%'),
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'steelblue'
	},
	addClientButton: {
		width: wp('60%'),
		height: hp('7%'),
		backgroundColor: 'steelblue',
		justifyContent: 'center',
		alignItems: 'center'
	},
	addClientButtonText: {
		color: 'white',
		fontSize: hp('3.2%'),
		fontWeight: 'bold',
		fontFamily: 'normal'
	},
});

export default AddClient;