import React, { Component } from 'react';
import qs from 'querystring'
import {  } from "";
import { Container, Text, Root } from 'native-base';
import { Header, Button } from "react-native-elements";
import { StyleSheet, FlatList, Dimensions, View, ScrollView } from 'react-native'
import CardBooks from '../components/CardBooks'
import SortBy from '../components/SortBy'
import { connect } from 'react-redux'
import { getBooksActionCreator, getBookByPageActionCreator } from '../redux/actions/books'
import { logoutActionCreator } from "../redux/actions/logout";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class Home extends Component {

  state = {
    limit: 4,
  }

  componentDidMount() {
    const { getBooksAction } = this.props
    const { isFulfilled } = this.props.books
    if (!isFulfilled) {
      getBooksAction(qs.stringify(this.state))
    }
  }

  scroll = () => {
    const { totalPage, page } = this.props.books.resPagination
    if (this.state.page === undefined && page < totalPage) {
      this.setState({
        page: page + 1
      }, () => this.props.getBookByPageAction(qs.stringify(this.state)))
    } else if (this.state.page < totalPage) {
      this.setState({
        page: this.state.page + 1
      }, () => this.props.getBookByPageAction(qs.stringify(this.state)))
    }
  }

  refresh = () => {
    this.setState({
      page: undefined
    }, () => this.props.getBooksAction(qs.stringify(this.state)))
  }

  logout = () => {
    const { logoutAction } = this.props
    logoutAction()
    this.props.navigation.navigate("Login")
  }


  handleSortTitleAZ = () => {
    this.setState({
      value: 'books.title',
      sort: 'true',
      page: 1
    }, () => this.props.getBooksAction(qs.stringify(this.state)))
  }

  handleSortTitleZA = () => {
    this.setState({
      value: 'books.title',
      sort: 'false',
      page: 1
    }, () => this.props.getBooksAction(qs.stringify(this.state)))
  }

  handleSortAuthorAZ = () => {
    this.setState({
      value: 'author.author',
      sort: 'true',
      page: 1
    }, () => this.props.getBooksAction(qs.stringify(this.state)))
  }

  handleSortAuthorZA = () => {
    this.setState({
      value: 'author.author',
      sort: 'false',
      page: 1
    }, () => this.props.getBooksAction(qs.stringify(this.state)))
  }

  detailBook = (id) => {
    this.props.navigation.navigate("Detail", {
      id
    })
  }




  render() {
    const { books, login, logoutAction } = this.props
    const { height } = Dimensions.get('window')
    const { limit } = this.state
    return (
      <Root>
        <View style={{ flex: 1 }}>
          <Header containerStyle={{ paddingTop: -30, height: 60 }}
            backgroundColor="#F8"
            placement="left"
            centerComponent={{ text: 'Sahabat Setia', style: { color: '#000000', fontSize: 22 } }}
            rightComponent={login.isFulfilled ?
              <Button
                onPress={() => this.logout()}
                containerStyle={{ borderRadius: 50 }}
                type="clear"
                icon={<MaterialCommunityIcons name="logout" size={24} />}
                title="Logout"
                titleStyle={{ color: "#000000" }}
              ></Button> : <Button
                onPress={() => this.props.navigation.navigate("Login")}
                containerStyle={{ borderRadius: 50 }}
                type="clear"
                icon={<MaterialCommunityIcons name="login" size={24} />}
                title="Login"
                titleStyle={{ color: "#000000" }}
              ></Button>}
          />
          <SortBy
            handleSortTitleAZ={this.handleSortTitleAZ}
            handleSortTitleZA={this.handleSortTitleZA}
            handleSortAuthorAZ={this.handleSortAuthorAZ}
            handleSortAuthorZA={this.handleSortAuthorZA}
          />
          <View style={{ flex: 1, height: height, paddingLeft: 10, paddingRight: 10 }}>
            <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center' }} >What do you want to read?</Text>
            <FlatList
              data={books.resBooks}
              extraData={books.resBooks}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return <CardBooks
                  detailBook={(id) => this.detailBook(id)}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  author={item.author}
                  id={item.id} />;
              }}
              onEndReachedThreshold={0.1}
              onEndReached={this.scroll}
              onRefresh={this.refresh}
              refreshing={!books.isFulfilled}
            />
          </View>
        </View>
      </Root>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
})

const mapStateToProps = ({
  books,
  login,
}) => {
  return {
    books,
    login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooksAction: (data) => {
      dispatch(getBooksActionCreator(data))
    },
    getBookByPageAction: (data) => {
      dispatch(getBookByPageActionCreator(data))
    },
    logoutAction: () => {
      dispatch(logoutActionCreator())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)