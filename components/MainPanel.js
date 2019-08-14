import React from 'react';

import {
	StyleSheet,
	Text,
	View,
} from 'react-native';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MainPanel = (props) => {
	return (
		<View style={styles.container}>
            <View style={styles.navBar}>
                <View>
                    <Text style={styles.navBarText}>Session Calculator</Text>
                </View>
            </View>
            {props.children}
        </View>
	);
}

const styles = StyleSheet.create({
	//CONTAINER
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	//NAVBAR
	navBar: {
		height: hp('7%'),
		width: wp('100%'),
		backgroundColor: 'steelblue',
		elevation: 3,
		justifyContent: 'center',
		paddingLeft: wp('3%'),
	},
	navBarText: {
		fontSize: hp('3.2%'),
		fontWeight: 'bold',
		color: 'white',
		fontFamily: 'normal'	
	},
});

export default MainPanel;