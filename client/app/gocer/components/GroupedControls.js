import React, {Component, Children} from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'


export default class GroupedControls extends Component {
    
    constructor(props)   {
        super(props);
    }

    render() {
        
        const title = this.props.title;

        if (title == undefined)
            title = "Undefined";

        return (
            <View>
                <View>
                    <Text>
                        {title}
                    </Text>
                </View>
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}