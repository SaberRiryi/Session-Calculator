import React, { Component } from '../node_modules/react';

import AddClient from './AddClient';
import AddClientModal from './AddClientModal';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
	TextInput,
	Alert,
	Fragment
} from 'react-native';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class AddClientContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
			clientModalVisible: false,
			newClient: {
				total: 0,
				//INITIALS
			}
        };
    }

	//things to do
	//separate the logic and presentation of this addclientcontainer
	///separate out the logic and presentation of the Modal. Everything should be passed to the presentation as a prop.

	setClientModalVisible(visible) {
		this.setState({clientModalVisible: visible});
	}

	showNewClientModal = () => {
		this.setClientModalVisible(true);
	}

	updateTotalMin = (TextInputValue) => {
		this.setState(state => {
			const updatedClient = state.newClient;
			updatedClient.total = TextInputValue;
			return updatedClient;
		});
	}

	onSaveClient = () => {
		this.props.onAddClient({
			total: this.state.newClient.total,
		});
		this.setClientModalVisible(!this.state.clientModalVisible);
		this.initializeNewClient();
	}
	
	onClientSaved = () => {
		this.initializeNewClient();
        this.setClientModalVisible(!this.state.clientModalVisible);
	}

	initializeNewClient = () => {
		this.setState(state => {
			const updatedClient = state.newClient;
			updatedClient.total = TextInputValue = 0;
			
			return updatedClient;
		});
	}


    render() {
		return (
			<AddClient onShowNewClientModal={this.showNewClientModal}>
				<AddClientModal onSaveClient={this.onSaveClient} onClientSaved={this.onClientSaved} updateTotalMin={this.updateTotalMin} visible={this.state.clientModalVisible}/>
			</AddClient>
        );
	}
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

export default AddClientContainer;