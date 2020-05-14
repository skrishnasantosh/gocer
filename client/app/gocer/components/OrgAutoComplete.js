import React, {Component} from 'react'
import { Text, Grid, Col, Row, Input, Form } from 'native-base';
import Organization from '../models/Organizations';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';

export default class OrgAutoComplete extends Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            selectedOrg: {},
            orgs: [],
            filteredResults: []
        };        
    }

    componentDidMount() {

        this.setState({
            orgs : [
                new Organization('T1', 'Sheng Siong', 'Tanglin Halt'),
                new Organization('T2', 'Rubiya Stores', 'Tanglin Halt'),
                new Organization('T3', 'Poongani Stores', 'No 10, Aditya Avenue Extension, Saravana Nagar North, TVS Road, Koundampalayam'),
            ]
        });
    }
    
    getSelectedOrg() {
        return this.state.selectedOrg;
    }

    findOrg(query) {
        
        if (query === '')
            return [];
         
        var jsonResult = [];

        fetch('http://192.168.0.101:5000/Organization/' + query, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) => {                        
            

            const regex = new RegExp(`${query}`, 'i');                

            this.setState({
                filteredResults: json.filter(o => o.name.search(regex) >= 0)
            });
        });
    }

    updateFields = (item) => {
        if (this.props.onChange !== undefined)
            this.props.onChange(item);
    }

    render = () => {
        
        const { query } = this.state;        
        const orgList = this.findOrg(query);

        const {filteredResults} = this.state;

        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return(
            <View style={styles.autocompleteContainer}>
                <Autocomplete
                    autoCapitalize='none'                    
                    data={filteredResults.length  >= 1 && comp(query, filteredResults[0].name) ? [] : filteredResults} 
                    defaultValue={query}                        
                    inputContainerStyle={styles.input}
                    listStyle = {styles.list} 
                    placeholder = "Where do you want to go ?"
                    onChangeText={text => this.setState({ query: text })}
                    renderItem={({ item, i }) => (
                        <TouchableOpacity onPress={() => { this.setState({ query: item.name, selectedOrg: item }); this.updateFields(item); }}>
                            <Grid>
                                <Row>
                                    <Col>
                                        <Text style={styles.listItem}>                                            
                                            {item.name}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.listDescriptionItem}>
                                            {item.address}
                                        </Text>
                                    </Col>
                                </Row>
                            </Grid>                        
                        </TouchableOpacity>
                    )}
                />
                <View>
                    <Text style={styles.infoText}>
                        {this.state.selectedOrg.address}
                    </Text>
                </View>
            </View>           
        );
    }
}


const styles = StyleSheet.create({

    input: {        
        borderBottomColor: '#808CD2',
        borderWidth: 0,
        borderBottomWidth: 1,
        fontSize:18
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
        zIndex: 9 
    },
    infoText: {
        color: "#808080",
        textAlign: "right",
        marginTop: 10,
        fontSize: 12
    }
});
  