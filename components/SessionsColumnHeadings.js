import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SessionsColumnHeadings = (props) => {
    return (
        <View style={styles.columnHeadings}>
            <View style={styles.columnHeadingCount}>
                <Text style={styles.columnHeadingText}>#</Text>
            </View>
            <View style={styles.columnHeadingTime}>
                <Text style={styles.columnHeadingText}>START TIME</Text>
            </View>
            <View style={styles.columnHeadingTime}>
                <Text style={styles.columnHeadingText}>END TIME</Text>
            </View>
            <View style={styles.columnHeadingMinutes}>
                <Text style={styles.columnHeadingText}>MIN</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
	columnHeadings: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: 'steelblue'
	},
	columnHeadingCount: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderColor: 'steelblue',
	},
	columnHeadingTime: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderColor: 'steelblue',
	},
	columnHeadingMinutes: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderColor: 'steelblue',
	},
	columnHeadingText: {
		fontSize: hp('2%'),
		color: 'steelblue'
	}
});

export default SessionsColumnHeadings;