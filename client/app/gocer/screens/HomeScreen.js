import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';

import {
  ScrollView,
  RefreshControl,
  StyleSheet,  
  SafeAreaView,
} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';

import moment from 'moment';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeBookings : []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  
  fetchData = () => {
      console.log("fetching data...");
      fetch('http://192.168.0.101:5000/Booking', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((json) => {                        
        
        this.setState({
            activeBookings: json
        });
    });
  }

  render(){
    return (
      <Container>    
      <Content>
        <ScrollView>
          <RefreshControl onRefresh={this.fetchData} />        
        <List onScrollEndDrag={this.fetchData}>

          {              
              this.state.activeBookings !== null && this.state.activeBookings.map(i => 
                  (
                      <ListItem avatar>
                          <Left>
                            <Icon name="calendar"/>
                          </Left>
                          <Body>
                            <Text style={{fontWeight: "bold", color: "black"}}>
                              {moment(Date.parse(i.dateTime + "Z")).local().format("MMM DD, YYYY")} at {moment(Date.parse(i.dateTime + "Z")).local().format("hh:mm A")}
                            </Text>
                            <Text></Text>
                            <Text>{i.orgName}</Text>            
                            <Text note>{i.orgAddress}</Text>
                            <Text></Text>
                          </Body>
                          <Right>
                          <Icon name="ellipsis-v" type="FontAwesome" style={{color:"black"}}/>
                          </Right>
                      </ListItem>
                    
                  ))
          }               
        </List>
        </ScrollView>
      </Content>
    </Container>
    );
  }
}
