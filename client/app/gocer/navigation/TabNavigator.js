import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import ScheduleScreen from '../screens/ScheduleScreen';

export default class TabNavigator extends Component {
  render() {
    return(
    <Container>
        <Tabs>
            <Tab heading = { <TabHeading><Icon name="home"/><Text>Home</Text></TabHeading> }>
                <Container style={styles.container}>
                  <Text>Hi</Text>
                </Container>
            </Tab>
            <Tab heading = { <TabHeading><Icon name="calendar"/><Text>Schedule</Text></TabHeading> }>                
                <Container style={styles.container}>
                  <ScheduleScreen/>
                </Container>
            </Tab>            
            <Tab heading = { <TabHeading><Icon name="cog"/><Text>Settings</Text></TabHeading> }>
                <Text>Hi</Text>
            </Tab>
        </Tabs>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    paddingLeft: 20,
    paddingRight: 20
  }
});
