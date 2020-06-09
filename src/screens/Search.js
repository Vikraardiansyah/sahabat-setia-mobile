import React, { Component } from "react";
import { SearchBar, ListItem } from 'react-native-elements';
import { View, TouchableOpacity, FlatList, Text } from 'react-native'
import { connect } from "react-redux"
import { getBookBySearchActionCreator, deleteBookBySearchActionCreator } from '../redux/actions/books'
import qs from "querystring";

class Search extends Component {
  state = {
    search: '',
    limit: 10,
    get: false
  };

  handleSearch = search => {
    this.setState({
      search,
      get: false
    });

  };

  enterSearch = () => {
    this.props.getBookBySearchAction(qs.stringify(this.state));
    this.setState({
      get: true
    })
    setTimeout(() => {
      console.log(this.props.books.resSearch[0])
    }, 3000);
  }

  deleteSearch = () => {
    this.props.deleteBookBySearchAction()
  }

  detailBook = (id) => {
    this.props.navigation.navigate("Detail", {
      id
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        title={item.title}
        subtitle={item.author}
        leftAvatar={{ source: { uri: `http://192.168.43.73:5000/${item.image}` } }}
        onPress={() => this.detailBook(item.id)}
      />
    </TouchableOpacity>

  )

  render() {
    const { search, get } = this.state;
    const { resSearch, isFulfilled } = this.props.books
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Search"
          onChangeText={this.handleSearch}
          value={search}
          platform="android"
          containerStyle={{ backgroundColor: '#F8', marginLeft: 10, marginRight: 10 }}
          inputContainerStyle={{ backgroundColor: 'white', borderRadius: 30 }}
          returnKeyType="search"
          onSubmitEditing={this.enterSearch}
          autoCapitalize="none"
          onClear={this.deleteSearch}
          onCancel={this.deleteSearch}
          on
        />
        <View>
          {resSearch[0] === undefined && get ? <Text>No result found for {this.state.search}</Text> : <FlatList
            keyExtractor={this.keyExtractor}
            data={resSearch}
            renderItem={this.renderItem}
          />}
        </View>
      </View>

    );
  }
}

const mapStateToProps = ({
  books,
}) => {
  return {
    books,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBookBySearchAction: (data) => {
      dispatch(getBookBySearchActionCreator(data))
    },
    deleteBookBySearchAction: () => {
      dispatch(deleteBookBySearchActionCreator())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)