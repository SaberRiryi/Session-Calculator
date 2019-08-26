import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DeleteModeButton = (props) => {
    return (
        <View style={styles.deleteModeButton}>
            <TouchableOpacity onPress={props.toggleDeleteMode}>
            {/* maybe make this delete mode button visible only when there are multiple sessions */}
                <Text style={styles.deleteModeButtonText}>Delete Mode</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
	deleteModeButton: {
		borderRadius:2,
		backgroundColor:'steelblue',
		padding:wp('1%'),
		margin:wp('1.1%'),
		marginRight:wp('3%')
	},
	deleteModeButtonText: {
		color:'white',
		backgroundColor:'steelblue',
		fontSize:hp('2.2%'),
		padding:wp('1%')
	}
});

export default DeleteModeButton;