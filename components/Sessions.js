import React, { Component } from '../node_modules/react';
import {TimePickerAndroid, Text, View, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../node_modules/react-native-responsive-screen';
import moment from "moment";
import { CheckBox } from 'react-native-elements'

import SessionsHeading from './SessionsHeading';
import DeleteModeButtonContainer from './DeleteModeButtonContainer';
import SessionsSelected from './SessionsSelected';
import DeleteSelectedSessionsButtonContainer from './DeleteSelectedSessionsButtonContainer';
import SessionsColumnHeadings from './SessionsColumnHeadings';
import AddSessionButtonContainer from './AddSessionButtonContainer';

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
			deleteMode: false,
			numSessionsSelected: 0
        };
    }

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.state.deleteMode !== prevState.deleteMode) {
			this.deselectAllSessions();
		}
	}

	setDeleteMode = (deleteMode) => {
		this.setState({deleteMode: deleteMode});
	}

	deselectAllSessions = () => {
		this.setState(state => {
			const sessions = state.sessions.map((item, j) => {
				const newItem = item;
				newItem.selected = false;
				return newItem;
			});
			return {
				sessions
			};
		});
	}

	updateSessions = (sessions) => {
		this.setState({sessions: sessions});
		Alert.alert('updating sessions');
	}

	//ABOVE GOOD AND SHOULD STAY IN SESSIONS COMPONENT


	//This function will eventually be moved the the ComponentDidUpdate function of the "SessionContainer" component
	//but modified heavily to increment or decrement the number of sessions in the SessionsContainer's state.
	setNumSessionsSelected = () => {
		let sessionsSelected = 0;
		const sessions = this.state.sessions;
		for (let i = 0; i < sessions.length; i++) {
			if(sessions[i].selected) {
				sessionsSelected++;
			}
		}
		// Alert.alert("" + sessionsSelected);
		this.setState({numSessionsSelected: sessionsSelected});
	}
	
	// This should maybe be in a container component specifically for the android time pickers
	onEditClientSession  = (sessionIndex, timeToUpdate, time) => {

		this.setState(state => {
			const sessions = state.sessions.map((item, j) => {
				if (j === sessionIndex) {
					const newItem = item;
					if(timeToUpdate === 'start'){
						newItem.startTime = time;
					} else if (timeToUpdate === 'end') {
						newItem.endTime = time;
					} else {
						Alert.alert('Something went wrong.');
					}
					return newItem;
				} else {
					return item;
				}
			});
			return {
				sessions
			};
		}, () => {
			if(this.state.sessions[sessionIndex].startTime !== 'SET START' && this.state.sessions[sessionIndex].endTime !== 'SET END') {
				this.getSessionMinutes();
			}
			
		});
	}



	// onRemoveItem = i => {
	// 	this.setState(state => {
	// 	  const list = state.list.filter((item, j) => i !== j);
	
	// 	  return {
	// 		list,
	// 	  };
	// 	});
	//   };



	//This should perhaps be in a Session component(although might do separate Session and EditSession components)
	// This will be modified to not search through the sessions like this, but instead only care about toggling the selected state
	//of the Session 
	onSelectClientSession  = (sessionIndex) => {

		this.setState(state => {
			const sessions = state.sessions.map((item, j) => {
				if (j === sessionIndex) {
					const newItem = item;
					newItem.selected = !newItem.selected;
					return newItem;
				} else {
					return item;
				}
			});
			return {
				sessions
			};
		},() => {
			this.setNumSessionsSelected();
			//I think each session will have its own "Session" component with probably a container component as well where I'll hold
			//the fact it's selected. Along with the start and end time in the state. When that state changes... I'll run this
			//setNumSessionsSelected function from the ComponentDidUpdate function of the Session (singular) component instead of doing
			//a callback here. This function will be passed in as a prop from the Sessions (plural) component. ComponentDidUpdate will
			//just do a check to see if the selected property in the state changed, and if so, call setNumSessionsSelected from parent
			//Sessions

			//Addendum: Here's the trick though. You'll be within a single Session(singular) component. Which means what I think I'll
			//need to do is pass in the numSessionsSelected state from the Sessions component here as a prop into each Session
			//component so that when it does the ComponentDidUpdate function... it can increment or decrement the numSessionsSelected
			// depending on if a session is selected or deselected... then pass that number back up to the parent SessionsContainer
			//(plural) component to update the numSessionsSelected state. There will need to be a simple update function in here
			//for that just like when you update the sessions array.
		});
	}





	//This should be in the SessionContainer (singular) Component and be calculated in the ComponentDidUpdate on start or end time change
	getSessionMinutes = () => {
		const sessions = this.state.sessions;
		let allSessionMinutes = 0;
		for (let i = 0; i < sessions.length; i++) {

			const session = sessions[i];
			const start = session.startTime;
			const end = session.endTime;
			if(this.areSessionTimesSet(start, end)) {
	
				
				// Alert.alert("" + start.hour() + ':' + start.minute() +"------" + end.hour() + ':' + end.minute());
				// Alert.alert("" + end.hour() + ':' + end.minute());
				if (end.isBefore(start)) end.add(1, 'day');
				const sessionMinutes = moment.duration(end.diff(start)).asMinutes();
	
				allSessionMinutes += sessionMinutes;
			}
		}
		this.props.updateClientSessionMinutes(allSessionMinutes, this.props.clientIndex);

	}

	//This should be in the SessionContainer (singular) Component and be calculated in the ComponentDidUpdate on start or end time change
	calculateMinuteDifference = (startTime, endTime) => {
		if (endTime.isBefore(startTime)) endTime.add(1, 'day');
		const sessionMinutes = moment.duration(endTime.diff(startTime)).asMinutes();
		return sessionMinutes;
	}

	//perhaps have a function that specifically handles what to put in start/endTime state to remove logic from html code 

	areSessionTimesSet = (startTime, endTime) => {
		return (this.isSessionTimeSet(startTime) && this.isSessionTimeSet(endTime) ? true : false);
	}

	isSessionTimeSet = time => {
		if (time === "SET START" || time === "SET END") {
			return false;
		} else{
			return true;
		}
	}

	isOnlyOneSessionTimeSet = (startTime, endTime) => {
		return (this.isSessionTimeSet(startTime) && !this.isSessionTimeSet(endTime) ||
				!this.isSessionTimeSet(startTime) && this.isSessionTimeSet(endTime) ? true : false);
	}

	buildTimePickerEvent = (time, sessionIndex, startTime, endTime) => {
		// {time:"end",sessionIndex: index, hours: this.isOnlySessionStartTimeSet(item.startTime,item.endTime) null, minutes: null}

		let hours = null;
		let minutes = null;
		
		if(this.isOnlyOneSessionTimeSet(startTime, endTime)) {

			if(this.isSessionTimeSet(startTime)){
				hours = startTime.hour();
				minutes = startTime.minutes();
			} else if (this.isSessionTimeSet(endTime)){
				hours = endTime.hour();
				minutes = endTime.minutes();
			}
		} else if(this.areSessionTimesSet(startTime,endTime)) {
			if(time === "start"){
				hours = startTime.hour();
				minutes = startTime.minutes();
			} else if(time === "end") {
				hours = endTime.hour();
				minutes = endTime.minutes();
			}
		}
		return {
					time: time,
					sessionIndex: sessionIndex,
					hours: hours,
					minutes: minutes
				};
	}

	isOnlyOneSessionTimeSet = (startTime, endTime) => {
		return (this.isSessionTimeSet(startTime) && !this.isSessionTimeSet(endTime) ||
				!this.isSessionTimeSet(startTime) && this.isSessionTimeSet(endTime) ? true : false);
	}
	async _onPressButton(event) {
		try {
			const {action, hour, minute} = await TimePickerAndroid.open({
				is24Hour: false,
				hour: event.hours,
				minute: event.minutes
			});
			if (action !== TimePickerAndroid.dismissedAction) {
			
				this.onEditClientSession(event.sessionIndex, event.time, moment.utc(hour+":"+minute, "HH:mm"));

				// //right here we need to call the add to sessions function
				// if(event.time === "start"){
				// 	this.setState({'startTime': moment.utc(hour+":"+minute, "HH:mm")});
				// } else if (event.time === "end") {
				// 	this.setState({'endTime': moment.utc(hour+":"+minute, "HH:mm")});
				// }
				//the calculate minutes function for the summary page should be in a callback for either of these.
			}
	
		} catch ({code, message}) {
			alert(message);
		}  
	}

    render() {
		return (
            <View>
				<SessionsHeading>
					<DeleteModeButtonContainer deleteMode={this.state.deleteMode} setDeleteMode={this.setDeleteMode}/>
				</SessionsHeading>
				<SessionsSelected
					visible={this.state.numSessionsSelected > 0}
					numSessionsSelected={this.state.numSessionsSelected}
				>
					<DeleteSelectedSessionsButtonContainer sessions={this.state.sessions} updateSessions={this.updateSessions}/>
				</SessionsSelected>
				<SessionsColumnHeadings/>

				{/* Session Row Component */}
                <View style={styles.clientSessions}>
                    {
						this.state.sessions.map((item,index) => (
							typeof item !== "undefined" &&
								//NEED A BETTER KEY
								//RIGHT HERE IS WHERE WE CAN CREATE AN EDIT BUTTON AND PASS THE INDEX TO EACH BUTTON
								<View key={item+index} 
								style={styles.clientSession} 
								pointerEvents={this.state.deleteMode ? 'box-only' : 'auto'} 
								onStartShouldSetResponder={() => this.state.deleteMode && this.onSelectClientSession(index)} 
								onResponderTerminationRequest={() => (true)}
								>
									{/* Session count */}
									{!this.state.deleteMode &&
										<View style={[styles.clientSessionColumn,styles.clientSessionCount]}>
											<Text style={styles.clientSessionText}>{index + 1}</Text>
										</View>
									}
									{/* Session count selected checkbox */}
									{this.state.deleteMode &&
										<View style={[styles.clientSessionColumn,styles.clientSessionCountDeleteMode]}>
											<View style={{flex:1}}>
												<CheckBox containerStyle={styles.clientSessionCheckBox}
													checked={item.selected}
												/>
											</View>
											<View style={{flex:3}}>
												<Text style={[styles.clientSessionText,{marginTop:3} ]}>{index + 1}</Text>
											</View>
										</View>
									}
									{/* start time */}
									<View style={[styles.clientSessionColumn,styles.clientSessionTimes]}>
										<TouchableOpacity style={styles.clientSessionButton} 
										onPress={this._onPressButton.bind(this, this.buildTimePickerEvent("start",index,item.startTime,item.endTime))}>
										<Text style={[styles.clientSessionText, !this.state.deleteMode && styles.clientSessionTimesText, !this.isSessionTimeSet(item.startTime) && styles.clientSessionTextSmall]}>
											{!this.isSessionTimeSet(item.startTime) ? item.startTime : item.startTime.format("LT")}
										</Text>
										</TouchableOpacity>
									</View>

									{/* end time */}
									<View style={[styles.clientSessionColumn,styles.clientSessionTimes]}>
										<TouchableOpacity 
										style={styles.clientSessionButton} 
										onPress={this._onPressButton.bind(this, this.buildTimePickerEvent("end",index,item.startTime,item.endTime))}>
											<Text style={[styles.clientSessionText, !this.state.deleteMode && styles.clientSessionTimesText, !this.isSessionTimeSet(item.endTime) && styles.clientSessionTextSmall]}>
												{!this.isSessionTimeSet(item.endTime) ? item.endTime : item.endTime.format("LT")}
											</Text>
										</TouchableOpacity>
									</View>

									{/* minute difference */}
									<View style={[styles.clientSessionColumn,styles.clientSessionMinDiff]}>
											<Text style={styles.clientSessionText}>{item.startTime !== "SET START" && item.endTime !== "SET END" ? this.calculateMinuteDifference(item.startTime, item.endTime): "--"}</Text>
									</View>
								</View>
						))
					}
					{/* Add Session Button component */}
					{/* THIS SHOULD NOT BE VISIBLE WHEN IN DELETE MODE */}
                    <AddSessionButtonContainer sessions={this.state.sessions} updateSessions={this.updateSessions}/>
                </View>
            </View>
        );
	}
}

const styles = StyleSheet.create({
	clientSessions: {
		flexDirection: 'column',
	},
	clientSession: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: 'steelblue',
		height: hp('10%')
	},
	clientSessionColumn: {
		borderRightWidth: 1,
		borderColor: 'steelblue',
	},
	clientSessionCheckBox: {
		marginTop:0,
		paddingTop:0,
		paddingBottom:0,
		marginRight:0,
		marginBottom:0,
		marginLeft:3,
		paddingLeft:0,
		paddingRight:0
	},
	clientSessionCount: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	clientSessionCountDeleteMode: {
		flex: 1,
	},
	clientSessionTimes: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	clientSessionMinDiff: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	clientSessionButton: {
		width:"100%",
		height:"100%",
		justifyContent:'center',
		alignItems: 'center'
	},
	clientSessionText: {
		color: 'steelblue',
		fontFamily: 'normal',
		fontSize: hp('3%'),
		fontWeight: 'bold',
		textAlign: 'center',
	},
	clientSessionTextSmall: {
		fontSize: hp('2.5%'),
	},
	clientSessionTimesText: {
		borderBottomWidth: 1,
		borderColor: 'steelblue'
	},

});

export default Sessions;