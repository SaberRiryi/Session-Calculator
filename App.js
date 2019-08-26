import React, { Component } from 'react';

import MainPanel from './components/MainPanel';
import AddClientContainer from './components/AddClientContainer';
import ClientSummaryContainer from './components/ClientSummaryContainer';
import Sessions from './components/Sessions';

import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert
} from 'react-native';
// import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class App extends Component {

	constructor() {
		super()
		this.state = {
			activeSections: [],
			collapsed: true,
			multipleSelect: false,
			
			CONTENT: [
				// {
				// 	total: 250,
				// }
			]
		};

	}

	toggleExpanded = () => {
		this.setState({ collapsed: !this.state.collapsed});
	};
	setSections = sections => {
		// Alert.alert('section updated');
		this.setState({
			activeSections: sections.includes(undefined) ? [] : sections,
		});
	};
	
	onAddClient = (client) => {
		//do a callback here to zero out newClient object again.
		this.setState({CONTENT: this.state.CONTENT.concat(client)});
		this.setSections([this.state.CONTENT.length]);
	}
	
	//need a function onUpdateClient that works similar to onAddClient


	updateClientSessionMinutes = (totalSessionMinutes, clientIndex) => {
		Alert.alert(JSON.stringify(totalSessionMinutes));
		// this.setState({totalSessionMinutes: totalSessionMinutes});



		this.setState(state => {
			const clients = state.CONTENT.map((item, j) => {
				if (j === clientIndex) {
					const newClient = item;
					newClient.totalSessionMinutes = totalSessionMinutes;
				} else {
					return item;
				}
			});

			return {
				clients,
			};
		});




	}

	renderHeader = (section, _, isActive) => {
		return (
			<View
				// duration={400}
				style={[styles.header, isActive ? styles.active : styles.inactive]}
				// transition="backgroundColor"
			>
				<Text style={[styles.headerText, isActive ? styles.headerTextActive : styles.headerTextInactive]}>CLIENT: {_ + 1}</Text>
			</View>
		);
	};
	renderContent = (section, index, isActive, sections) => {
		
		return (
			 <View>
				 <ClientSummaryContainer totalMinutes={section.total} totalSessionMinutes={section.totalSessionMinutes}/>
				 {/* // SessionsContainer should go here.
				 // This should be moved back to app.js and be renamed SessionsContainer.js */}
				 <Sessions clientIndex={index} updateClientSessionMinutes={this.updateClientSessionMinutes} />
			 </View>
		)
	}
	render = () => {
		const { multipleSelect, activeSections } = this.state;
		return (
			<MainPanel>
				<AddClientContainer onAddClient={this.onAddClient}/>
				<ScrollView ref='_scrollView' contentContainerStyle={{ paddingTop: hp("0%") }}>
					<Accordion
						activeSections={activeSections}
						sections={this.state.CONTENT}
						touchableComponent={TouchableOpacity }
						expandMultiple={multipleSelect}
						renderHeader={this.renderHeader}
						renderContent={this.renderContent}
						duration={200}
						onChange={this.setSections}
					/>
				</ScrollView>
			</MainPanel>
		);
	}
}

const styles = StyleSheet.create({


	//HEADER
	header: {
		color: 'white',
		height: hp('11.3%'),
		// padding: hp('3%'),
		justifyContent: 'center',
		alignItems: 'center',
		
	},
	headerText: {
		textAlign: 'center',
		fontSize: hp('4%'),
		fontWeight: 'bold',
		color: 'white',
		fontFamily: 'normal'
	},
	headerTextActive: {
		color: 'steelblue'
	},
	headerTextInactive: {
		color: 'white'
	},
	active: {
		backgroundColor: 'white',
		color: 'steelblue'
	},
	inactive: {
		backgroundColor: 'steelblue',
		marginBottom: 1
	},
});