import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Text} from 'native-base'
import { NavigationContainer } from "@react-navigation/native";
import LinksScreen from '../screens/LinksScreen'

const Tab = createMaterialBottomTabNavigator(); 

export default class BottomNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={LinksScreen} />
                    <Tab.Screen name="Settings" component={LinksScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}