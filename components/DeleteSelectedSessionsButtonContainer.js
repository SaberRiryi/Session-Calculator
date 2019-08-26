import React, { Component } from 'react';
import DeleteSelectedSessionsButton from './DeleteSelectedSessionsButton';



class DeleteSelectedSessionsButtonContainer extends Component {
    constructor(props) {
        super(props);
	}


	deleteSelectedSessions = () => {
		const sessions = this.props.sessions.map((item, j) => {
			if (!item.selected) {
				return item;
			}
		});
		this.props.updateSessions(sessions);
	}

	render = () => {
		return (
			<DeleteSelectedSessionsButton deleteSelectedSessions={this.deleteSelectedSessions}/>
		);
	}
}

export default DeleteSelectedSessionsButtonContainer;



