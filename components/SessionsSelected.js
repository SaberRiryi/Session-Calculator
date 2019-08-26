import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SessionsSelected = (props) => {
    return (
        <View>
            {props.visible &&
                <View style={styles.selectedSessionsContainer}>
                    <Text style={styles.numSessionsSelectedText}>{props.numSessionsSelected} SELECTED</Text>
                    {props.children}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    selectedSessionsContainer: {
        flexDirection: 'row',
        borderColor: 'steelblue',
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    numSessionsSelectedText: {
        color:'steelblue',
        fontWeight:'bold',
        fontFamily:'normal',
        fontSize:hp('2%'),
        margin:wp('3%')
    }
});

export default SessionsSelected;