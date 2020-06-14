import React, { Component } from "react"
import { debounce } from "lodash";
import { FlatList, StyleSheet, View, Image, BackHandler } from "react-native"
import { ListItem, Text, SearchBar } from "react-native-elements"
import qs from "querystring";
import SortBy from "../components/SortBy";
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux";
import { getBookBySearchActionCreator, getBookBySearchPageActionCreator, deleteBookBySearchActionCreator } from "../redux/actions/books";


class Search extends Component {

  state = {
    search: '',
    limit: 4,
  }

  componentDidMount() {
    this.deleteSearch()
  }

  getBookBySearchDebounce = debounce(() => this.getBookBySearch(), 500)

  updateSearch = search => {
    this.setState({
      search,
      page: 1,
    }, () => this.getBookBySearchDebounce())
  };

  getBookBySearch = async () => {
    const { search } = this.state
    const { getBookBySearchAction } = this.props
    if (search.length > 0) {
      await getBookBySearchAction(qs.stringify(this.state))
    }
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        containerStyle={{ backgroundColor: '#f4f4f4' }}
        title={item.name}
        subtitle={<>
          <Text style={{ color: '#7e7e7e', fontWeight: 'bold' }}>{item.author}</Text>
          <Text style={{ color: '#7e7e7e', textAlign: 'justify' }} numberOfLines={6}>{item.description}</Text>
        </>}
        leftElement={<Image
          source={item.avatar}
          style={styles.image} />}
        bottomDivider
        rightElement={<></>}
      />
    </TouchableOpacity>
  )

  handleSortTitleAZ = () => {
    this.setState({
      value: 'books.title',
      sort: 'true',
      page: 1
    }, () => this.props.getBookBySearchAction(qs.stringify(this.state)))
  }

  handleSortTitleZA = () => {
    this.setState({
      value: 'books.title',
      sort: 'false',
      page: 1
    }, () => this.props.getBookBySearchAction(qs.stringify(this.state)))
  }

  handleSortAuthorAZ = () => {
    this.setState({
      value: 'author.author',
      sort: 'true',
      page: 1
    }, () => this.props.getBookBySearchAction(qs.stringify(this.state)))
  }

  handleSortAuthorZA = () => {
    this.setState({
      value: 'author.author',
      sort: 'false',
      page: 1
    }, () => this.props.getBookBySearchAction(qs.stringify(this.state)))
  }

  scroll = () => {
    const { totalPage, page } = this.props.books.resSearchPage
    if (page < totalPage) {
      this.setState({
        page: page + 1
      }, () => this.props.getBookBySearchPageAction(qs.stringify(this.state)))
    }
  }

  detailBook = (id) => {
    this.props.navigation.navigate("Detail", {
      id,
      page: 'search'
    })
  }

  deleteSearch = () => {
    this.props.deleteBookBySearchAction()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        containerStyle={{ backgroundColor: '#f4f4f4' }}
        title={item.title}
        subtitle={<>
          <Text style={{ color: '#7e7e7e', fontWeight: 'bold' }}>{item.author}</Text>
          <Text style={{ color: '#7e7e7e', textAlign: 'justify' }} numberOfLines={6}>{item.description}</Text>
        </>}
        leftElement={<Image
          source={{ uri: `http://192.168.43.73:5000/${item.image}` }}
          style={styles.image} />}
        bottomDivider
        rightElement={<></>}
        onPress={() => this.detailBook(item.id)}
      />
    </TouchableOpacity>
  )
  goBack = () => {
    this.props.navigation.goBack()
  }

  goToSearch = () => {
    this.props.navigation.navigate('Search')
  }

  render() {
    const { search } = this.state
    const { books } = this.props
    const searchBar =
      (<SearchBar
        platform='android'
        containerStyle={styles.search}
        placeholder="Search book.."
        onChangeText={this.updateSearch}
        value={search}
        returnKeyType='search'
        inputContainerStyle={{
          backgroundColor: '#e0e0e0', overflow: 'hidden', borderRadius: 30,
        }}
        autoFocus
        onCancel={() => { this.goBack(); this.deleteSearch() }}
        onClear={this.deleteSearch}
      />)
    return (
      <View
        style={styles.container}>
        {searchBar}
        {search.length > 0 ?
          books.resSearch[0] === undefined ?
            <Text style={{ marginLeft: 20, fontSize: 18 }}>No result found "{search}"</Text> :
            <FlatList
              keyExtractor={this.keyExtractor}
              data={books.resSearch}
              renderItem={this.renderItem}
              onEndReachedThreshold={0.1}
              onEndReached={this.scroll}
              keyboardShouldPersistTaps='handled'
            /> : <></>}
        <SortBy
          handleSortTitleAZ={this.handleSortTitleAZ}
          handleSortTitleZA={this.handleSortTitleZA}
          handleSortAuthorAZ={this.handleSortAuthorAZ}
          handleSortAuthorZA={this.handleSortAuthorZA}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 102,
    height: 150,
    borderRadius: 5,
  },
  search: {
    backgroundColor: "#F4F4F4",
    padding: 10
  },
})

const mapStateToProps = ({
  books,
}) => {
  return {
    books,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBookBySearchAction: (body) => {
      dispatch(getBookBySearchActionCreator(body))
    },
    getBookBySearchPageAction: (body) => {
      dispatch(getBookBySearchPageActionCreator(body))
    },
    deleteBookBySearchAction: () => {
      dispatch(deleteBookBySearchActionCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)