import React, { Component } from 'react';
import qs from 'querystring'
import { Header, Button, ListItem, Text, Card, Image, Tile } from "react-native-elements";
import { StyleSheet, FlatList, Dimensions, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getBooksActionCreator, getBookByRecommendedActionCreator, getBookByPageActionCreator } from '../redux/actions/books'
import { getGenreActionCreator } from "../redux/actions/genre";
import Ionicons from "react-native-vector-icons/Ionicons";
import CategoriesImage from '../images/categories.jpg'

class Home extends Component {

  state = {
    limit: 4,
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const { books, genre, getBooksAction, getBookByRecommendedAction, getGenreAction } = this.props
      const { limit } = this.state
      if (!books.isFulfilled) {
        this.setState({
          page: undefined
        }, () => { getBooksAction(qs.stringify({ limit })); getBookByRecommendedAction() })
      }
      if (!genre.isFulfilled) {
        getGenreAction()
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  refresh = () => {
    const { books, genre, getBooksAction, getBookByRecommendedAction, getGenreAction } = this.props
    this.setState({
      page: undefined
    }, () => { getBooksAction(qs.stringify(this.state)); getBookByRecommendedAction(); getGenreAction() })
  }

  detailBook = (id) => {
    this.props.navigation.navigate("Detail", {
      id
    })
  }

  detailRecommendedBook = (id) => {
    this.props.navigation.navigate("Detail", {
      id,
      page: 'recommended',
    })
  }

  genreBook = (search) => {
    this.props.navigation.navigate('GenreBook', {
      search
    })
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

  renderItemRecommended = ({ item }) => (
    <View style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
      <TouchableOpacity onPress={() => this.detailRecommendedBook(item.id)}>
        <Image
          style={styles.image}
          source={{ uri: `http://192.168.43.73:5000/${item.image}` }}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
      </TouchableOpacity>
    </View>
  )

  renderItemCategories = ({ item }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => this.genreBook(item.genre)}>
        <Card containerStyle={styles.categoriesCard} >
          <Tile
            imageSrc={CategoriesImage}
            imageContainerStyle={{ width: 150, height: 75, }}
            containerStyle={{ width: 150, height: 75, borderRadius: 5, overflow: 'hidden', }}
            title={item.genre}
            titleStyle={{ fontSize: 16 }}
            featured
            onPress={() => this.genreBook(item.genre)}
          />
        </Card>
      </TouchableOpacity>
    </View>
  )

  goToSearch = () => {
    this.props.navigation.navigate('Search')
  }

  allBooks = () => {
    this.props.navigation.navigate('AllBooks')
  }

  render() {
    const { books, login, genre } = this.props
    const { height, width } = Dimensions.get('window')
    const { limit } = this.state
    const recommended =
      (<View style={{ marginTop: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginBottom: 15 }}>
          <Text style={{ fontSize: 22 }}>Recommended</Text>
        </View>

        <FlatList
          horizontal={true}
          keyExtractor={this.keyExtractor}
          data={books.resRecommended}
          renderItem={this.renderItemRecommended}
          showsHorizontalScrollIndicator={false}
        />
      </View >)
    const categories =
      (
        <View style={{ marginTop: 10 }}>
          <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
            <Text style={{ fontSize: 22 }}>Categories</Text>
          </View>
          <FlatList
            horizontal={true}
            keyExtractor={this.keyExtractor}
            data={genre.response}
            renderItem={this.renderItemCategories}
            showsHorizontalScrollIndicator={false}
          />

        </View>
      )
    return (
      <SafeAreaView style={styles.container} >
        <Header
          containerStyle={styles.header}
          placement="left"
          centerComponent={{ text: 'Sahabat Setia', style: { color: '#000000', fontSize: 22 } }}
          rightComponent={<Button
            buttonStyle={{ backgroundColor: "#f4f4f4", borderRadius: 50 }}
            icon={<Ionicons name="ios-search" size={24} />}
            onPress={this.goToSearch} />}
        />

        <FlatList
          ListHeaderComponent={
            <>
              {recommended}
              {categories}
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 20 }}>
                <Text style={{ fontSize: 22 }}>All Books</Text>
              </View>
            </>
          }
          ListFooterComponent={
            <Button
              title="Show All"
              type="clear"
              titleStyle={{ color: '#7e7e7e' }}
              onPress={this.allBooks}
            />

          }
          keyExtractor={this.keyExtractor}
          data={books.resBooksHome}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          onRefresh={this.refresh}
          refreshing={!books.isFulfilled}
          initialNumToRender={6}
        />
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  header: {
    paddingTop: 0,
    height: 60,
    backgroundColor: "#F4F4F4"
  },
  image: {
    width: 101,
    height: 150,
    borderRadius: 5,
  },
  title: {
    width: 110
  },
  card: {
    margin: 5,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    alignItems: 'center'
  },
  author: {
    color: '#7E7E7E',
  },
  flatList: {
  },
  categories: {
    fontSize: 16
  }, categoriesCard: {
    padding: 0,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  search: {
    backgroundColor: "#F4F4F4",
    padding: 10
  },
})

const mapStateToProps = ({
  books,
  login,
  genre,
}) => {
  return {
    books,
    login,
    genre,
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
    getBookByRecommendedAction: () => {
      dispatch(getBookByRecommendedActionCreator())
    },
    getGenreAction: () => {
      dispatch(getGenreActionCreator())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)