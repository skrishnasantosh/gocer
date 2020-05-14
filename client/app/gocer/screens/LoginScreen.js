import React, {Component} from 'react'
import {StyleSheet, View, Modal} from 'react-native'
import { Container, Header, Content, Text, Body, Title, Form, Label, Item, Input, Button, DeckSwiper, Left, Right, Grid, Row, Col, Icon, Center } from 'native-base'
import PhoneInput from 'react-native-phone-input'
import OTPInput from 'react-native-otp';
import axios from 'axios';


export default class LoginSreen extends Component {

    
    state = {
        otp: '',
        phoneNumber: '',
        showOtpBox: false
    }
    
    handleOTPChange = (otp) => {
        this.setState({ otp })
    }


    showPhoneBox = () => {
        this.setState({
            showOtpBox : false,
            otp: ''
        })
    }

    handleSendOtp = () => { 
        console.log(this.state.phoneNumber);

        axios.post('http://192.168.0.101:5000/Login', { 
                phone: "+65" + this.state.phoneNumber            
        })
        .then((response) => {
            console.log("Otp is : " + JSON.stringify(response));
            this.setState({
                showOtpBox: true
            })
        });        
    }

    phoneNumberChanged = (number) => {
        this.setState({
            phoneNumber: number
        })
    }

     render() {
         return (
         <Container>             
             <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>                                      
                <Text style={styles.title}>
                    
                    SKYBEAN GoSafe!
                    
                </Text>
                <View style={styles.phoneInputContainer}>
                    <Text note style={{marginBottom:20}}>
                        Phone Number
                    </Text>
                    <PhoneInput ref='phone' autoFormat={true} initialCountry={'sg'} style={styles.phoneInput} onChangePhoneNumber={(n) => this.phoneNumberChanged(n)} />                    
                
                    <Button primary style={{marginTop: 50, width:220, justifyContent: 'center', alignSelf:'center'}} onPress={() => this.handleSendOtp()}>
                        <Text>Send Verification Code</Text>
                    </Button>
                </View>
                <Modal  animationType="slide" visible={this.state.showOtpBox}>                    
                    <View style={styles.container}>
                    
                        <Text style={{marginTop: 50}}>

                        </Text>
                        <Text style={styles.title}>
                            
                            SKYBEAN GoSafe!
                            
                        </Text>
                        <Text note style={{marginTop: 50, marginBottom:20, alignSelf:'center'}}>
                            
                                Verification Code
                        </Text>
                        <OTPInput
                            value={this.state.otp}
                            onChange={this.handleOTPChange}
                            tintColor="#21749C"
                            offTintColor="#BBBCBE"
                            otpLength={6}
                            />

                        <View style={{ marginTop: 20, flexDirection: "row", flex: 1,  left: 0, right: 0, justifyContent: 'space-between', padding: 15, marginLeft:47, marginRight:47}}>
                            <Button iconLeft onPress={() => this.showPhoneBox()}>
                                <Icon name="arrow-back" />
                                <Text>Back  </Text>
                            </Button>
                            <Button>            
                                <Text>Verify and Login</Text>
                            </Button>
                        </View>                           
                    </View>
                </Modal>
             </Content>
         </Container>
         )

     }
}


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
      },

      phoneInput: {          
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,          
          paddingBottom: 10,
      },

      phoneInputContainer: {        
        margin:15,
        marginTop:50,
      },

      title: {
          fontSize: 22,
          alignSelf: 'center',
          fontWeight: 'bold'
      }
});