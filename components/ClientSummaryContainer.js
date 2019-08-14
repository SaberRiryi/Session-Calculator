import React, { Component } from 'react';
import MainPanel from './MainPanel';
import Sessions from './Sessions';
import {Text, View, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ClientSummaryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
			totalSessionMinutes: 0
        };
	}

	updateClientSessionMinutes = totalSessionMinutes => {
		this.setState({totalSessionMinutes: totalSessionMinutes});
	}

	calculateOvertime = () => {
		if((this.props.totalMinutes - this.state.totalSessionMinutes) < 0) {
			return Math.abs(this.props.totalMinutes - this.state.totalSessionMinutes)
		} else {
			return 0;
		}
	}

	calculateRemaining = () => {
		if((this.props.totalMinutes - this.state.totalSessionMinutes) < 0) {
			return 0;
		} else {
			return this.props.totalMinutes - this.state.totalSessionMinutes;
		}
	}

	render = () => {
		return (
			<View>
				<View style={styles.clientHeading}>
					<Text style={styles.clientHeadingText}>SUMMARY</Text>
				</View>
				<View style={styles.clientSummary}>
					<Text style={styles.clientSummaryText}>TOTAL: {this.props.totalMinutes} MIN</Text>
					<Text style={styles.clientSummaryText}>SESSIONS: {this.state.totalSessionMinutes} MIN</Text>
					<Text style={styles.clientSummaryText}>REMAIN: {this.calculateRemaining()} MIN</Text>
					<Text style={styles.clientSummaryText}>OVER: {this.calculateOvertime()} MIN</Text>
				</View>
				<Sessions updateClientSessionMinutes={this.updateClientSessionMinutes} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
		
	//CLIENT HEADING
	clientHeading: {
		padding: wp('3%'),
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: 'steelblue',
	},
	clientHeadingText: {
		fontSize:hp('2.5%'),
		color: 'steelblue',
		fontWeight: 'bold',
		fontFamily: 'normal'
	},

	//CLIENT SUMMARY
	clientSummary: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	clientSummaryText: {
		padding: wp('3%'),
		color: 'steelblue',
		fontWeight: 'bold',
		fontFamily: 'normal',
		fontSize: hp('2.8%')

	},
});

export default ClientSummaryContainer;