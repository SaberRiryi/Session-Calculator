// import React, { Component } from 'react';
// import MainPanel from './MainPanel';
// import {Text, View, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


// class AddClientModalContainer extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             clientModalVisible: false,
//         };
//     }

// 	setClientModalVisible = (visible) => {
// 		this.setState({clientModalVisible: visible});
// 	}

// 	onRequestClose = () => {
// 		this.props.onClientAdded();
// 		this.setClientModalVisible(!this.state.clientModalVisible);
// 	}

//     render() {
// 		return (
//             <View>
// 				<Modal
// 					animationType="slide"
// 					transparent={false}
// 					visible={this.state.clientModalVisible}
// 					onRequestClose={this.onRequestClose}>
// 					<MainPanel>
// 						<View style={styles.modalHeader}>
// 							<Text style={styles.modalHeaderText}>NEW CLIENT</Text>
// 						</View>
// 						<View style={styles.modalContent}>
// 							<TextInput  maxLength={5} keyboardType='number-pad' onChangeText={(TextInputValue) => {this.updateTotalMin(TextInputValue)}}
// 							style={styles.modalTotalMinutesTextInput}
// 								placeholder="Total Minutes"
// 							/>
// 							<TouchableOpacity onPress={this.props.onSaveClient} style={styles.modalSaveButton}>
// 								<Text style={styles.modalSaveButtonText}>SAVE</Text>
// 							</TouchableOpacity>
// 						</View>
// 						<View >
// 						</View>
// 					</MainPanel>
// 				</Modal>
//             </View>
//         );
// 	}
// }

// const styles = StyleSheet.create({
// 	//MODAL
// 	modalHeader: {
// 		flexDirection: 'column',
// 		height: hp('10%'),
// 		width: wp('100%'),
// 		paddingLeft:wp('4%'),
// 		paddingTop:wp('3%')
// 	},
// 	modalHeaderText: {
// 		color: 'steelblue',
// 		fontSize: hp('4%'),
// 		fontWeight: 'bold',
// 		fontFamily: 'normal'
// 	},
// 	modalContent: {
// 		flex: 1,
// 		// justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	modalSaveButton: {
// 		width: wp('60%'),
// 		height: hp('7%'),
// 		backgroundColor: 'steelblue',
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	modalSaveButtonText: {
// 		color: 'white',
// 		fontSize: hp('3.2%'),
// 		fontWeight: 'bold',
//         fontFamily: 'normal'
//     }
// });

// export default AddClientModalContainer;