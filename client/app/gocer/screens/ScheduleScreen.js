import React, {Component} from 'react'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Grid, Col, Row, Input, Form } from 'native-base';
import Organization from '../models/Organizations';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';
import { FontDisplay } from 'expo-font';

export default class ScheduleScreen extends React.Component { 
    
    constructor() {
        super();
        this.state = {
            query: '',
            selectedOrg: {},
            orgs: []
        };        
    }

    componentDidMount() {

        this.setState({
            orgs : [
                new Organization('T1', 'Sheng Siong', 'Tanglin Halt'),
                new Organization('T2', 'Rubiya Stores', 'Tanglin Halt'),
            ]
        });
    }

    findOrg(query) {
        if (query == '')
            return [];

        const { orgs } = this.state;
        const regex = new RegExp(`${query}`, 'i');    
        return orgs.filter(o => o.name.search(regex) >= 0);
    }

    render = () => {
        
        const { query, selectedOrg } = this.state;
        const orgList = this.findOrg(query);

        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return(
            <Container>
                <View style={styles.autocompleteContainer}>
                        <Autocomplete
                            autoCapitalize='none'                    
                            data={orgList.length  === 1 && comp(query, orgList[0].name) ? [] : orgList}                        
                            defaultValue={query}                        
                            inputContainerStyle={styles.input}
                            listStyle = {styles.list} 
                            placeholder = "Where do you want to go ?"
                            onChangeText={text => this.setState({ query: text })}
                            renderItem={({ item, i }) => (
                                <TouchableOpacity onPress={() => { this.setState({ query: item.name + "    [ " + item.street + " ]", selectedOrg: item });  }}>
                                    <Grid>
                                        <Row>
                                            <Col>
                                                <Text style={styles.listItem}>                                            
                                                    {item.name}
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text style={styles.listDescriptionItem}>
                                                    {item.street}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Grid>                        
                                </TouchableOpacity>
                            )}
                        />
                        <Form>
                            <Input/>
                        </Form>
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
        
    },
    list: {
        borderWidth:1,
        borderColor: 'grey',
        shadowRadius: 10,
        shadowColor: '#c0c0c0',        
        
    },
    listItem: {
        padding:15,
        fontSize: 16,        
    },
    listDescriptionItem: {
        textAlign: 'right',
        padding:15,
        fontSize:12,
        color: 'grey',
        textAlignVertical: 'center'
    },
    listIconStyle: {
        fontSize: 15,
        color: 'grey'
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }
});
  