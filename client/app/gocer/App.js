import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Left, Right, Button, Body, Title, Content, Footer, FooterTab } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import LinkingConfiguration from './navigation/LinkingConfiguration';
import TabNavigator from './navigation/TabNavigator';
import BottomNavigator from './navigation/BottomNavigator';
import LoginSreen from './screens/LoginScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const shouldShowLogin = true;

  
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,          
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          "Roboto": require("native-base/Fonts/Roboto.ttf"),
          "Roboto_medium": require("native-base/Fonts/Roboto_medium.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (shouldShowLogin)
    return (
      <LoginSreen/>
    )

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Container>
      <Header style={styles.header}>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>CrowdControl</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <TabNavigator/>
      </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  header : {
    
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
