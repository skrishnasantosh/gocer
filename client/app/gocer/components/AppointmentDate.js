import React, {Component, useState } from 'react'
import {View, Modal, StyleSheet, TouchableHighlight, Alert, Text, TextInput, Platform } from 'react-native'
import {Header, Grid, Row, Col, Icon, Button} from 'native-base'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import moment from 'moment'

export default class AppointmentDate extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            modalVisible: false,
            selectedDate: '',
            freeSlotCount: 0,
            averageTimeMinutes: 60,
        }
    }

    setModalVisible = (visible) => {
        this.setState({
            modalVisible: visible
        });
    }

    showCalendar = () => {
        this.setState({
            modalVisible:true
        });
    }

    daySelect = (dateObj) => {
        this.setState({
            modalVisible:false
        });

        this.setState({
            selectedDate: moment(dateObj.dateString).format('MMM Do, YYYY ')
        });

        if (this.props.onChange !== undefined)
            this.props.onChange(dateObj);
    }

    render() {
        const { modalVisible } = this.state;

        return(
            <View>
                <TextInput style={styles.input} placeholder = "Date" onTouchStart ={() => this.showCalendar()} editable={Platform.OS=='android' ? true : false} value = {this.state.selectedDate}/>
                
                <Modal animationType="slide" transparent={false} visible={modalVisible}>

                    <Header style={styles.backButtonHeader}>
                        <Grid>
                            <Row>
                                <Col>
                                <TouchableHighlight
                                    style={{ ...styles.backButton}}
                                    onPress={() => {
                                        this.setModalVisible(!modalVisible);
                                    }}
                                    >
                                        <Icon name="md-arrow-back" type="Ionicons" style={styles.icon}/>
                                    </TouchableHighlight>                                                                            
                                </Col>                                    
                                <Col>                                    
                                </Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                        </Grid>
                    </Header>

                    <CalendarList
                    
                        selected={'2020-06-01'}
                        minDate={'2020-05-10'}
                        maxDate={'2021-05-30'}                        
                        onDayPress = { (dateObj) => this.daySelect(dateObj)}
                        />
               
                  
                </Modal>
                
                <View>
                    <Text style={styles.infoText}>
                        {this.state.freeSlotCount} free slots. {this.state.averageTimeMinutes} minutes on average
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 12,
      height:20
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    input: {        
        borderBottomColor: '#808CD2',
        borderWidth: 0,
        borderBottomWidth: 1,
        height: 40,        
        fontSize : 16
    },
    backButton: {
        paddingLeft:10,
        paddingTop:5,        
        color: Platform.OS === 'android' ? 'white' : 'black'
    },
    backButtonHeader: {
        color: Platform.OS === 'android' ? 'white' : 'black'
    },
    titleText: {
        paddingTop: 10,
        paddingLeft: Platform.OS === 'android' ? 20 : 0
    },
    icon:{
        color:"#00ACEE"
    },
    infoText: {
        color: "#808080",
        textAlign: "right",
        marginTop: 10,
        fontSize: 12
    }
  });
  