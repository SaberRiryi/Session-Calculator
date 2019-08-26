import React, { Component } from 'react';

import DeleteModeButton from './DeleteModeButton';

class DeleteModeButtonContainer extends Component {
    constructor(props) {
        super(props);
	}

	toggleDeleteMode = () => {
        this.props.setDeleteMode(!this.props.deleteMode);
	}

	render = () => {
		return (
			<DeleteModeButton toggleDeleteMode={this.toggleDeleteMode}/>
		);
	}
}

export default DeleteModeButtonContainer;

//Started to create this but it felt like I was overengineering. I was trying to separate out the deletemodebutton to have its own
//container to hold the toggledeletemode function and then return the changed deleteMode
// (true/false)... back to the Sessions component... but the code is so minimal to toggle the state
//back and forth, that to extract it to its own container component seemed overkill when I need to just set the state of the deleteMode
//in the Sessions component anyway. Still might considering creating a SessionsContainer and a Sessions component to separate
//ui from logic


//I'M ACTUALLY USING THIS NOW


