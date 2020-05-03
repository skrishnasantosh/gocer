import React, { Component } from 'react';
import { Keyboard, StyleSheet, SafeAreaView, View, Alert } from 'react-native';

import { Container, Header, Grid, Col, Card, CardItem, Body, Content, Button, Item, Input, Label,Form, Icon, Text, Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Ionicons} from "@expo/vector-icons";
import "@expo/vector-icons";
import {Font} from 'expo'

import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";

export default class NewScheduleScreen extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      value: '',
      mode: 'datetime',
      displayFormat: 'DD/MM/YYYY hh:mm A',
      label: 'Date',
      description: 'Select a place to view slot information',
      placeName: '',
      exDisabled:true,
      nextFreeSlot: new Date(),      
      selectedLocation: '',
      selectedLatitude: 0.0,
      selectedLongitude: 0.0,
      peopleCount: undefined
    };
  }

  handleSelectItem = (item, index) =>{
    //const {onDropdownClose} = this.props;
    //onDropdownClose();

    item.freeSlot = 2;
    item.peoplePerSlot = 100;
    item.averageMinutes = 30;
    item.nextFreeSlot = new Date();
   
    let slotDescription = `${item.freeSlot} free slots for today. ${item.peoplePerSlot} people per slot. People spend an average of ${item.averageMinutes} minutes here.`
    slotDescription = `${item.name} at ${item.street}\n\n` + slotDescription;

    let disabledState = item ===  undefined || item === '';
    this.setState({exDisabled:disabledState, description: slotDescription});
    console.log(item);
  }

  showDateTimePicker = () => {
   // alert('showDateTimePicker');
    if (this.state.exDisabled)
      return;
    
    this.setState({ show: true });
    Keyboard.dismiss();
  };

  hideDateTimePicker = () => {
    this.setState({ show: false });
  };

  handleDatePicked = value => {
    this.setState({ value: value });
    setTimeout(() => {
      this.hideDateTimePicker();
    }, 250);
  };

  bookAppointment(){
    Alert.alert('will proceeed');
  }

  onPeopleValueChange = (value) => {
    this.setState({peopleCount: value})
  }

  render() {
    const {label, value, show, mode, displayFormat, exDisabled} = this.state;
    const apiUrl = "https://5eab7d6da280ac00166574f8.mockapi.io/api/v1/orgs";

    let totalSlots = 100;
    let averageMinutes = 30;
    
    return (      
      <Container avoidKeyboard> 
        <Content padder>        
        <Card>
        <CardItem header>
              <Text>Where do you want to go?</Text>
            </CardItem>
        <CardItem>
          
        <View style={styles.autocompletesContainer}>        
        <SafeAreaView>
        <Autocomplete caretHidden
                    key={'somekey'}
                    style={styles.input}          
                    containerStyle = {{borderWidth:0}}          
                    inputContainerStyle={styles.inputContainer}
                    handleSelectItem={(item, id) => this.handleSelectItem(item, id)}                    
                    fetchDataUrl={apiUrl}
                    minimumCharactersCount={2}
                    highlightText
                    valueExtractor={item => item.name}
                    rightContent
                    rightTextExtractor={item => item.street}
                    placeholder=""
                    />
        </SafeAreaView>
        <Text style={{marginTop:20, marginBottom: 20, color:'#A0a0A0', alignContent: 'center', textAlign: 'center', flex:1, borderBottomColor:'#ccc', borderBottomWidth:1}}>          
              {this.state.description}
          </Text>
        </View>
        </CardItem>
        </Card>

        <Form style={{borderBottomWidth:2, borderBottomColor: "#ccc"}}>
         
              <Item picker style={{margin:10, marginLeft:20, marginRight:20, borderBottomWidth:0}}>
                <Grid>
                <Col style={{width:120}}>
                <Text style={{width:120, borderBottomWidth:0, marginTop:15}}>How many ?</Text>
                </Col>
                <Col>
              <Picker
                  mode="dropdown"
                  color="#c0c0c0"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width:undefined, alignItems: 'center', borderBottomWidth:1, borderBottomColor:"#ccc" }}                
                  selectedValue={this.state.peopleCount}
                  onValueChange={this.onPeopleValueChange.bind(this)}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                </Picker>
                </Col>
                </Grid>
            </Item>
            
          <Item style={{margin:10, marginLeft:20, marginRight:20, borderBottomWidth:0}} onKeyPress={this.showDateTimePicker}>
            
          <Grid>
                  <Col style={{width:120}}>
                <Text style={{width:120, borderBottomWidth:0, marginTop:15}}>Date/Time</Text>
                </Col>
                <Col>

             
              <Input caretHidden   value={value ? moment(value).format(displayFormat) : ''} onFocus={this.showDateTimePicker} style={{borderBottomColor:"#ccc", borderBottomWidth:1}} />
              <DateTimePicker
                date={value ? new Date(value) : new Date()}
                isVisible={show}
                disabled={exDisabled}                      
                mode={mode}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                minimumDate={moment().toDate()}
                style={{marginBottom: 30, borderBottomWidth:1}}
                inputContainerStyle = {{borderBottomWidth: 1, width:100}}
                minuteInterval = {averageMinutes}
              />
          </Col>
          </Grid>
          </Item>
          <Text style={{marginTop:20, marginBottom: 20, color:'#A0a0A0', alignContent: 'center'}}>
          </Text>
          
          </Form>
          <Button iconLeft full primary disabled={exDisabled} style={{marginTop:20}}>
              <Text> Schedule Appointment </Text>
              <Icon name="arrowright" type="AntDesign"/>
          </Button>
  
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',   
      paddingTop: 10,
      paddingBottom: 20
    },

    item: {
        marginBottom:20
    },

    itemLabel: {
      borderBottomWidth:0
    },

    button: {
      marginTop: 25,
      paddingTop:10
    },
  
    welcomeContainer: {
         
      marginTop: 10,
      marginBottom: 20,
    },

    titleText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        marginBottom:10
    },
    autocompletesContainer: {
        paddingTop: 0,
        zIndex: 1,
        borderWidth:0,
        width: "100%",
        paddingHorizontal: 2,
      },
      input: {maxHeight: 40},
      inputContainer: {
        display: "flex",
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",        
        paddingLeft: 40,
        paddingRight: 40,        
        borderWidth:0,
        width: "100%",
        justifyContent: "flex-start",
      },
      container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },
      plus: {
        position: "absolute",
        left: 15,
        top: 10,
      },
  
  });
