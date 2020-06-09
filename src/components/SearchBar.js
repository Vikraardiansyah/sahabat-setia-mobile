import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, StyleProvider } from 'native-base';
import { View } from 'react-native'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'
export default class SearchBar extends Component {
  render() {
    return (
      <Header searchBar style={{ backgroundColor: '#F8F8F8' }}>
        <Item style={{ borderRadius: 20, overflow: 'hidden' }} >
          <Icon name="ios-search" />
          <Input returnKeyType="search" placeholder="Search" />
        </Item>
      </Header>
    );
  }
}