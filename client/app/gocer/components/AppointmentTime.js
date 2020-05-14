import React, {Component, useState } from 'react'
import {View, Modal, StyleSheet, TouchableHighlight, Alert, Text, TextInput, Platform } from 'react-native'
import {Header, Grid, Row, Col, Icon, Button, Picker, Content, Form, Item, Container} from 'native-base'
import moment from 'moment'


export default class AppointmentTime extends Component {

    availableTime = [];

    constructor(props) {
        super(props);

        this.state = { 
            modalVisible: false,
            selectedTime: '',
            freeSlotCount: 0,            
            showTimePicker: false,
            timeSlots: []
        }

        this.prepareTimeSlots();
    }

    pad(n) {
        return n < 10 ? "0" + n : n;
    }

    prepareTimeSlots() {

        console.log("preparing time slots");
        var averageMins = this.props.averageTimeInMinutes;

        if (averageMins === undefined)
            averageMins = 60;

        
        var ampm = "AM";
        var start = 8;
        var circular = false;

        var minsEnd = (60 - (60 - averageMins) - 1);
        var minsStart = 0;

        for (var i = 0; i < (24 * (60 * (60 / averageMins))); i += averageMins) {
            
            var label = this.pad(start) + ":" + this.pad(minsStart) + " " + ampm + " to " + this.pad(start) + ":" +  this.pad(minsEnd) + " " + ampm;
            var val = this.pad(start) + ":" + this.pad(minsStart);

            this.availableTime.push({text: label, value: val });

            minsStart = (minsEnd + 1);
            minsEnd += averageMins;

            if (minsEnd % 60 === 0 || minsEnd / 60 > 1)  {
                start ++;
                minsEnd = (60 - (60 - averageMins) - 1);
                minsStart = 0;
                console.log ("incrementing")
            }

            if (start % 12 == 0 || start / 12 >= 1)            
            {
                ampm = "PM";
                console.log ("am pm")
            }

            if (start % 24 == 0 || start / 24 >= 1)
            {
                console.log ("resetting for early morning");
                circular = true;
                start = 0;
                ampm = "AM";                
            }

            if (circular && start == 8)
                break;
        }
    }

    componentDidMount(){
        this.setState({
            timeSlots: this.availableTime
        })
    }

    setModalVisible = (visible) => {
        this.setState({
            modalVisible: visible
        });
    }

    showTimePicker = () => {
        this.setState({
            showTimePicker:true,
            modalVisible:true
        });
    }

    onChange = (value) => {        
        console.log(value);

        this.setState({
            selectedTime: value
        })

        if (this.props.onChange !== undefined)
            this.props.onChange(value);
    };
    

    render() {
        const { modalVisible, showTimePicker } = this.state;

        return(
            <Container>                
                <Form>
                    <Item picker>                      
                        <Picker
                            mode="dropdown"
                            style={styles.input}                                    
                            selectedValue={this.state.selectedTime}
                            iosIcon={<Icon name="arrow-down" />}
                            onValueChange={this.onChange}
                            placeholder="Select time"
                            placeholderStyle={{ fontSize:14 }}                        
                            
                            >

                            {
                                this.state.timeSlots.map(i => 
                                    (
                                        <Item label={i.text} value={i.value}></Item>
                                    ))
                            }                                    
                            </Picker>
                        </Item>
                </Form>
                
                <View>
                    <Text style={styles.infoText}>
                        Please be on time and leave on time
                    </Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  
    input: {        
        borderBottomColor: '#808CD2',
        borderWidth: 0,
        borderBottomWidth: 1,        
        fontSize:18,
        minWidth: 120,
        height:40,
        width:(Platform.OS==="android" ? "100%" : undefined)
    },   
    icon:{
        color:"#00ACEE"
    },
    infoText: {
        color: "#808080",
        textAlign: "right",
        marginTop: 10,
        fontSize: 12
    },
    pickerStyle: {

    }
  });
  