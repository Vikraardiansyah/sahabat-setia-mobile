import React, { Component } from "react"
import { FlatList, StyleSheet, View, Image } from "react-native"
import { ListItem, Text, Header, Button } from "react-native-elements"
import qs from "querystring";
import SortBy from "../components/SortBy";
import { TouchableOpacity } from "react-native-gesture-handler"
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { getBookByGenreActionCreator, getBookByGenrePageActionCreator, deleteBookByGenreActionCreator } from "../redux/actions/books";

class GenreBook extends Component {

  state = {
    search: '',
    limit: 4,
  }

  componentDidMount() {
    this.deleteGenre()
    const { search } = this.props.route.params
    this.setState({
      search,
      page: 1,
    }, () => this.props.getBookByGenreAction(qs.stringify(this.state)))
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
    }, () => this.props.getBookByGenreAction(qs.stringify(this.state)))
  }

  handleSortTitleZA = () => {
    this.setState({
      value: 'books.title',
      sort: 'false',
      page: 1
    }, () => this.props.getBookByGenreAction(qs.stringify(this.state)))
  }

  handleSortAuthorAZ = () => {
    this.setState({
      value: 'author.author',
      sort: 'true',
      page: 1
    }, () => this.props.getBookByGenreAction(qs.stringify(this.state)))
  }

  handleSortAuthorZA = () => {
    this.setState({
      value: 'author.author',
      sort: 'false',
      page: 1
    }, () => this.props.getBookByGenreAction(qs.stringify(this.state)))
  }

  scroll = () => {
    const { totalPage, page } = this.props.books.resGenrePage
    if (page < totalPage) {
      this.setState({
        page: page + 1
      }, () => this.props.getBookByGenrePageAction(qs.stringify(this.state)))
    }
  }

  detailBook = (id) => {
    this.props.navigation.navigate("Detail", {
      id,
      page: 'genre'
    })
  }

  deleteGenre = () => {
    this.props.deleteBookByGenreAction()
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
    const { books } = this.props
    const { search } = this.props.route.params
    return (
      <View
        style={styles.container}>
        <Header
          containerStyle={styles.header}
          placement="left"
          leftComponent={<Button
            buttonStyle={{ backgroundColor: "#f4f4f4", borderRadius: 50 }}
            icon={<Ionicons name="md-arrow-back" size={24} />}
            onPress={this.goBack} />}
          centerComponent={{ text: `${search}`, style: { color: '#000000', fontSize: 22 } }}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={books.resGenre}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={this.scroll}
          keyboardShouldPersistTaps='handled'
        />
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
  header: {
    paddingTop: 0,
    height: 60,
    backgroundColor: "#F4F4F4"
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
    getBookByGenreAction: (body) => {
      dispatch(getBookByGenreActionCreator(body))
    },
    getBookByGenrePageAction: (body) => {
      dispatch(getBookByGenrePageActionCreator(body))
    },
    deleteBookByGenreAction: () => {
      dispatch(deleteBookByGenreActionCreator())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenreBook)