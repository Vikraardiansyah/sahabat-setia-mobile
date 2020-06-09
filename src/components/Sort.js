import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';
import { View } from 'react-native'


export default class Sort extends Component {

  state = {
    value: undefined,
    sort: undefined
  }
  onValueChange = (value) => {
    this.setState({
      value
    })
  }
  onValueChange2 = (value) => {
    this.setState({
      sort: value
    })
  }
  render() {
    const { sort } = this.state
    return (
      <View style={{ flex: 0.1, flexDirection: 'row', }}>
        <Form style={{ width: 150, marginLeft: 15 }}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 165 }}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={sort}
              onValueChange={this.onValueChange}
            >
              <Picker.Item label="Sort By" value="" />
              <Picker.Item label="Title" value="books.title" />
              <Picker.Item label="Author" value="author.author" />
            </Picker>
          </Item>
        </Form>
        <Form style={{ width: 150, marginLeft: 15 }}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 165 }}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={sort}
              onValueChange={this.onValueChange2}
            >
              <Picker.Item label="(A-Z)" value="true" />
              <Picker.Item label="(Z-A)" value="false" />
            </Picker>
          </Item>
        </Form>
      </View>

    );
  }
}