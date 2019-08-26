import React, { Component } from '../node_modules/react';
import AddSessionButton from './AddSessionButton';
import {
	Alert
} from 'react-native';

class AddSessionButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

	addClientSession = () => {
        Alert.alert('addClientSession in container');
        const sessions = this.props.sessions.concat({
				startTime: 'SET START',
				endTime: 'SET END',
				selected: false
            });
        this.props.updateSessions(sessions);
	}

    render() {
		return (
            <AddSessionButton addClientSession={this.addClientSession}/>
        );
	}
}

export default AddSessionButtonContainer;