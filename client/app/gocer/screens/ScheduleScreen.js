import React, {Component} from 'react'
import { StyleSheet, View,Alert } from 'react-native';

import { Container, Text, Button, Icon,  } from 'native-base';

import OrgAutoComplete from '../components/OrgAutoComplete'
import GroupedControls from '../components/GroupedControls';
import LinksScreen from './LinksScreen';
import AppointmentDate from '../components/AppointmentDate';
import AppointmentTime from '../components/AppointmentTime';

export default class ScheduleScreen extends Component { 
    
    constructor() {
        super();        
        this.state = {
            selectedDate: {},
            selectedPlace: {},
            selectedTime : '',            
            dateFieldEnabled: false,
            timeFieldEnabled: true
        };
    }

    componentDidMount() {
            
    }

    placeSelectionChanged = (item) => {
        console.log(JSON.stringify(item));

        this.setState({
            dateFieldEnabled: this.item !== undefined && this.item.name !== undefined && this.item.name !== ''
        });
    }

    placeSelectionChanged = (item) => {
        console.log(JSON.stringify(item));

        this.setState({            
            selectedPlace: item
        });
    }

    dateSelectionChanged = (date) => {
        this.setState({            
            selectedDate: date
        }); 
    }

    timeSelectionChanged = (time) => {
        this.setState({            
            selectedTime: time
        }); 
    }

    bookAppointment = () => {
        
        var timeStrs = this.state.selectedTime.split(':');
        var dateStrs = this.state.selectedDate.dateString.split('-');

        var date = new Date(parseInt(dateStrs[0]), parseInt(dateStrs[1]), parseInt(dateStrs[2]), parseInt(timeStrs[0]), parseInt(timeStrs[1]));
        var dateUtcStr = date.toISOString();

        console.log("Date : " + date.toString())
        console.log("Utc : " + dateUtcStr)

        var orgId = this.state.selectedPlace.id;
        var userId = "UserId";
        var bookingTime = dateUtcStr;

        var o = { orgId, userId, bookingTime };

        var response = fetch("http://192.168.0.101:5000/Booking", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(o)
        })
        .then((response => response.json()))
        .then((json) => {return json;})
        .catch(error => { 
            console.error(error);
        });

        Alert.alert(JSON.stringify(response));

    }
   
    render() {
        return(
            <Container>          
                <View style={styles.vspacer}>                
                    <OrgAutoComplete  onChange = {this.placeSelectionChanged} />
                </View>
                
                <View style={styles.vspacer}>
                    <AppointmentDate enabled={this.state.dateFieldEnabled} onChange = {this.dateSelectionChanged}/>
                </View>                
                
                <View style={styles.vspacer}>
                    <AppointmentTime onChange = {this.timeSelectionChanged}/>
                </View>                
                
                <View style={styles.vspacer}>
                </View>                
                <View style={styles.vspacer}>
                <Button block onPress= { this.bookAppointment}>                    
                    <Text>Schedule an Appointment</Text>
                    <Icon name="calendar" type="Ionicons" style={styles.icon}/>
                </Button>
                </View>                
                
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    vspacer: {        
        marginBottom:20,
        height: 60
    },
    centered: {
        textAlign: 'center'
    }
   
});
  