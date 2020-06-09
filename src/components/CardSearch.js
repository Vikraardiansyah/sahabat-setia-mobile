import React, { Component } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { Thumbnail, Text, Left, Body, Right, List, ListItem } from 'native-base';
import Dilan from '../images/covernya.jpg'

export default class CardSearch extends Component {
  render() {
    return (
      <>

        <List>
          <ListItem avatar>
            <TouchableOpacity>
              <Left>
                <Thumbnail source={Dilan} />
              </Left>
            </TouchableOpacity>
            <Body>
              <TouchableOpacity>
                <Text>Dilan</Text>
                <Text note >Pidi Baiq</Text>
              </TouchableOpacity>
            </Body>
            <Right />
          </ListItem>
        </List>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={Dilan} />
            </Left>
            <Body>
              <Text>Dilan</Text>
              <Text note >Pidi Baiq</Text>
            </Body>
            <Right />
          </ListItem>
        </List>
      </>
    );
  }
}