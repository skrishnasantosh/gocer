import React, {Component} from 'react'
import { StyleSheet, View } from 'react-native';

import { Container } from 'native-base';

import OrgAutoComplete from '../components/OrgAutoComplete'

export default class ScheduleScreen extends Component { 
    
    constructor() {
        super();        
    }

    componentDidMount() {

    }

    render() {
        return(
            <Container>
               <OrgAutoComplete/>
            </Container>
        );
    }
}


const styles = StyleSheet.create({

   
});
  