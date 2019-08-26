import React from 'react';
// import {Text, View, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements'

const DeleteSelectedSessionsButton = (props) => {
    return (
        <Icon name='delete' color='steelblue' onPress={props.deleteSelectedSessions}/>
    );
}

export default DeleteSelectedSessionsButton;