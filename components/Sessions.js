import React, { Component } from '../node_modules/react';
import {TimePickerAndroid, Text, View, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../node_modules/react-native-responsive-screen';
import moment from "moment";
import { CheckBox } from 'react-native-elements'
import { Icon } from 'react-native-elements'
// import CheckBox from '@react-native-community/checkbox';

// const newClientSession = {
// 	startTime: "undefined time",
// 	endTime: "undefined time2"
// }
//this Sessions component should hold the sessions in its state just like the accordion holds the clients(collapsible's) in an array
//I think maybe a function needs to be passed as a prop on the Session component to be used on the add Session button. 
//The handler of the Session button will return the summed up sessions which should be stored in the Sessions component state.
//Perhaps the individual sessions should be stateless components. Perhaps the sessions component will have a function 
//(the aforementioned handler) that passes that handler as a prop to each stateless session component which calculates it's minutes.
//On second thought, I probably have to have a state on each session in order to store the results of the timepickers. But the handler
//sent to each session via its prop will still be used to calculate its minutes. This handler will probably be run when you click
//save within the session modal. It'll save the start and end times and shouldn't let you save until you have both. Can probably do some
//check right on the save button to enable/disable it if the times are undefined/--
//Whereas in awesome project... at this moment we would calculate the minute difference here. There's no reason to here.
///Instead need to return the start and end times to Sessions component to let it calculate the total minutes... then perhaps return
//those minutes in the handler passed as a prop to the Sessions component to then be calculated in the default app component. That's
//where the moment.js code will go to calc the difference. 

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
			 clientSessionModalVisible: false,
            sessions: [],
			deleteMode: false,
			numSessionsSelected: 0
        };
    }


	componentDidUpdate(prevProps, prevState, snapshot) {
	}

	onAddClientSession = () => {
		// this.setClientSessionModalVisible(true);
		this.setState({sessions: this.state.sessions.concat({
				startTime: 'SET START',
				endTime: 'SET END',
				selected: false
			})
		});
	}
	
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

	deleteSelectedSessions = () => {
		this.setState(state => {
			const sessions = state.sessions.map((item, j) => {
				if (!item.selected) {
					return item;
				}
			});
			return {
				sessions
			};
		},() => {
			// this.setState({ state: this.state });
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


	toggleDeleteMode = () => {
		this.setState(previousState => ({deleteMode: !previousState.deleteMode}),() => {
			if (this.state.deleteMode === false) {
				this.deselectAllSessions();
			}
		});
	}

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
		});
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

	setNumSessionsSelected = () => {
		let sessionsSelected = 0;
		const sessions = this.state.sessions;
		for (let i = 0; i < sessions.length; i++) {
			if(sessions[i].selected) {
				sessionsSelected++;
			}
		}
		Alert.alert("" + sessionsSelected);
		this.setState({numSessionsSelected: sessionsSelected});
	}

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
		this.props.updateClientSessionMinutes(allSessionMinutes);

	}

	calculateMinuteDifference = (startTime, endTime) => {
		if (endTime.isBefore(startTime)) endTime.add(1, 'day');
		const sessionMinutes = moment.duration(endTime.diff(startTime)).asMinutes();
		return sessionMinutes;
	}

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
                <View style={styles.sessionHeading}>
                    <Text style={styles.sessionHeadingText}>SESSIONS</Text>
					<View style={{borderRadius:2,backgroundColor:'steelblue',padding:wp('1%'),margin:wp('1.1%'),marginRight:wp('3%')}}>
						<TouchableOpacity onPress={this.toggleDeleteMode}>
							<Text style={{color:'white',backgroundColor:'steelblue',fontSize:hp('2.2%'),padding:wp('1%')}}>Delete Mode</Text>
						</TouchableOpacity>
					</View>
                </View>
				{this.state.numSessionsSelected > 0 &&
					<View style={{flexDirection: 'row', borderColor: 'steelblue', borderBottomWidth:1,justifyContent:'center',alignItems: 'center'}}>
						<Text style={{color:'steelblue', fontWeight:'bold', fontFamily:'normal',fontSize:hp('2%'),margin:wp('3%')}}>{this.state.numSessionsSelected} SELECTED</Text>
						<Icon name='delete' color='steelblue' onPress={this.deleteSelectedSessions}/>
					</View>
				}
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
                <View style={styles.clientSessions}>

                    {this.state.sessions.map((item,index) => (
						typeof item !== "undefined" &&
							//NEED A BETTER KEY
							//RIGHT HERE IS WHERE WE CAN CREATE AN EDIT BUTTON AND PASS THE INDEX TO EACH BUTTON
							<View key={item+index} 
							style={styles.clientSession} 
							pointerEvents={this.state.deleteMode ? 'box-only' : 'auto'} 
							onStartShouldSetResponder={() => this.state.deleteMode && this.onSelectClientSession(index)} 
							onResponderTerminationRequest={() => (true)}
							>
								{!this.state.deleteMode &&
									<View style={[styles.clientSessionColumn,styles.clientSessionCount]}>
										<Text style={styles.clientSessionText}>{index + 1}</Text>
									</View>
								}
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
								<View style={[styles.clientSessionColumn,styles.clientSessionTimes]}>
									<TouchableOpacity style={styles.clientSessionButton} 
									onPress={this._onPressButton.bind(this, this.buildTimePickerEvent("start",index,item.startTime,item.endTime))}>
									<Text style={[styles.clientSessionText, !this.state.deleteMode && styles.clientSessionTimesText, !this.isSessionTimeSet(item.startTime) && styles.clientSessionTextSmall]}>
										{!this.isSessionTimeSet(item.startTime) ? item.startTime : item.startTime.format("LT")}
									</Text>
									</TouchableOpacity>
								</View>
								<View style={[styles.clientSessionColumn,styles.clientSessionTimes]}>
									<TouchableOpacity 
									style={styles.clientSessionButton} 
									onPress={this._onPressButton.bind(this, this.buildTimePickerEvent("end",index,item.startTime,item.endTime))}>
										<Text style={[styles.clientSessionText, !this.state.deleteMode && styles.clientSessionTimesText, !this.isSessionTimeSet(item.endTime) && styles.clientSessionTextSmall]}>
											{!this.isSessionTimeSet(item.endTime) ? item.endTime : item.endTime.format("LT")}
										</Text>
									</TouchableOpacity>
								</View>
								<View style={[styles.clientSessionColumn,styles.clientSessionMinDiff]}>
										<Text style={styles.clientSessionText}>{item.startTime !== "SET START" && item.endTime !== "SET END" ? this.calculateMinuteDifference(item.startTime, item.endTime): "--"}</Text>
								</View>
							</View>
						))
					}
                    <TouchableOpacity onPress={(index) => {this.onAddClientSession(index)}} style={styles.addSessionButton}>
                        <Text style={styles.addSessionButtonText}>+ ADD SESSION +</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
	}
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

	//CLIENT HEADING
	sessionHeading: {
		// paddingLeft: wp('3%'),
		// height:hp('6.9%'),
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: 'steelblue',
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems: 'center'
	},
	sessionHeadingText: {
		fontSize:hp('2.5%'),
		color: 'steelblue',
		fontWeight: 'bold',
		fontFamily: 'normal',
		margin:wp('3%')
	},

	//CLIENT SESSIONS
	clientSessions: {
		flexDirection: 'column',
		// height: hp('10%')
		
	},
	clientSession: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: 'steelblue',
		height: hp('10%')
		// padding: wp('4%'),
	},
	clientSessionColumn: {
		borderRightWidth: 1,
		borderColor: 'steelblue',
		// padding: wp('4%'),

		// flex:1
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
	// clientSessionTimes: {
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	// padding: wp('4%'),
	// 	flexDirection: 'row'
	// },
	clientSessionText: {
		color: 'steelblue',
		fontFamily: 'normal',
		fontSize: hp('3%'),
		fontWeight: 'bold',
		textAlign: 'center',
		// borderBottomWidth: 1,
		// borderColor: 'steelblue'
	},
	clientSessionTextSmall: {
		fontSize: hp('2.5%'),
		// borderBottomWidth: 1,
		// borderColor: 'steelblue'
	},
	clientSessionTimesText: {
		borderBottomWidth: 1,
		borderColor: 'steelblue'
	},

	addSessionButton: {
		flex:1,
		borderColor:'steelblue',
		height:hp('10%'),
		borderBottomWidth: 5,
		borderTopWidth: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	addSessionButtonText: {
		fontFamily: 'normal',
		fontSize:hp('3.2%'),
		color:'steelblue',
		fontWeight: 'bold',

	},
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

export default Sessions;