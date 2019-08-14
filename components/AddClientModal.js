import React, { Component } from '../node_modules/react';
import MainPanel from './MainPanel';
import {Text, View, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AddClientModal = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={props.onClientSaved}>
            <MainPanel>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>NEW CLIENT</Text>
                </View>
                <View style={styles.modalContent}>
                    <TextInput  maxLength={5} keyboardType='number-pad' onChangeText={(TextInputValue) => {props.updateTotalMin(TextInputValue)}}
                    style={styles.modalTotalMinutesTextInput}
                        placeholder="Total Minutes"
                    />
                    <TouchableOpacity onPress={props.onSaveClient} style={styles.modalSaveButton}>
                        <Text style={styles.modalSaveButtonText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                <View >
                </View>
            </MainPanel>
		</Modal>
    );
}

const styles = StyleSheet.create({

    //MODAL
    modalHeader: {
        flexDirection: 'column',
        height: hp('10%'),
        width: wp('100%'),
        paddingLeft:wp('4%'),
        paddingTop:wp('3%')
    },
    modalHeaderText: {
        color: 'steelblue',
        fontSize: hp('4%'),
        fontWeight: 'bold',
        fontFamily: 'normal'
    },
    modalContent: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    modalTotalMinutesTextInput: {
        marginTop:hp('24%'),
        paddingLeft:wp('5%'),
        marginBottom:hp('4%'),
        height: 60,
        width: wp('50%'),
        borderWidth: 2,
        borderColor: 'steelblue',
        fontSize:hp('3%')
    },
    modalSaveButton: {
        width: wp('60%'),
        height: hp('7%'),
        backgroundColor: 'steelblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSaveButtonText: {
        color: 'white',
        fontSize: hp('3.2%'),
        fontWeight: 'bold',
        fontFamily: 'normal'
    }
});

export default AddClientModal;