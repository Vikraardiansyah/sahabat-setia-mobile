import React, {Component} from 'react';
import qs from 'querystring';
import {Header, Button, ListItem, Text, Tile} from 'react-native-elements';
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getBooksActionCreator,
  getBookByRecommendedActionCreator,
  getBookByPageActionCreator,
} from '../redux/actions/books';
import {getGenreActionCreator} from '../redux/actions/genre';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesImage from '../images/categories.png';
import SpalshIcon from '../images/splash-icon.png';
const API_URL = 'http://54.158.250.235:5000';

class Home extends Component {
  state = {
    limit: 4,
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {
        books,
        genre,
        getBooksAction,
        getBookByRecommendedAction,
        getGenreAction,
      } = this.props;
      const {limit} = this.state;
      if (!books.isFulfilled) {
        this.setState(
          {
            page: undefined,
          },
          () => {
            getBooksAction(qs.stringify({limit}));
            getBookByRecommendedAction();
          },
        );
      }
      if (!genre.isFulfilled) {
        getGenreAction();
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  refresh = () => {
    const {
      getBooksAction,
      getBookByRecommendedAction,
      getGenreAction,
    } = this.props;
    this.setState(
      {
        page: undefined,
      },
      () => {
        getBooksAction(qs.stringify(this.state));
        getBookByRecommendedAction();
        getGenreAction();
      },
    );
  };

  detailBook = id => {
    this.props.navigation.navigate('Detail', {
      id,
    });
  };

  detailRecommendedBook = id => {
    this.props.navigation.navigate('Detail', {
      id,
      page: 'recommended',
    });
  };

  genreBook = search => {
    this.props.navigation.navigate('GenreBook', {
      search,
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <TouchableOpacity>
      <ListItem
        title={item.title}
        subtitle={
          <>
            <Text>{item.author}</Text>
            <Text style={styles.description} numberOfLines={6}>
              {item.description}
            </Text>
          </>
        }
        leftElement={
          <Image
            source={{uri: `${API_URL}/${item.image}`}}
            style={styles.image}
          />
        }
        bottomDivider
        rightElement={<></>}
        onPress={() => this.detailBook(item.id)}
        containerStyle={styles.listAllBooks}
      />
    </TouchableOpacity>
  );

  renderItemRecommended = ({item}) => (
    <View style={styles.containerRecommended}>
      <TouchableOpacity onPress={() => this.detailRecommendedBook(item.id)}>
        <Image
          style={styles.image}
          source={{uri: `${API_URL}/${item.image}`}}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
      </TouchableOpacity>
    </View>
  );

  renderItemCategories = ({item}) => (
    <View>
      <TouchableOpacity onPress={() => this.genreBook(item.genre)}>
        <Tile
          imageSrc={CategoriesImage}
          imageContainerStyle={styles.imageCategories}
          containerStyle={styles.tile}
          title={item.genre}
          titleStyle={styles.textTile}
          featured
          onPress={() => this.genreBook(item.genre)}
        />
      </TouchableOpacity>
    </View>
  );

  goToSearch = () => {
    this.props.navigation.navigate('Search');
  };

  allBooks = () => {
    this.props.navigation.navigate('AllBooks');
  };

  render() {
    const {books, genre} = this.props;
    const recommended = (
      <View>
        <View style={styles.textTitleView}>
          <Text style={styles.textTitle}>Recommended</Text>
        </View>

        <FlatList
          horizontal={true}
          keyExtractor={this.keyExtractor}
          data={books.resRecommended}
          renderItem={this.renderItemRecommended}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
    const categories = (
      <View>
        <View style={styles.textTitleView}>
          <Text style={styles.textTitle}>Categories</Text>
        </View>
        <FlatList
          horizontal={true}
          keyExtractor={this.keyExtractor}
          data={genre.response}
          renderItem={this.renderItemCategories}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        />
      </View>
    );
    return (
      <SafeAreaView style={styles.container}>
        <Header
          containerStyle={styles.header}
          placement="left"
          centerComponent={
            <View style={styles.centerHeader}>
              <Text style={styles.textHeader}>Sahabat Setia</Text>
              <Image style={styles.imageHeader} source={SpalshIcon} />
            </View>
          }
          rightComponent={
            <Button
              buttonStyle={styles.searchButton}
              icon={<Ionicons name="ios-search" size={24} />}
              onPress={this.goToSearch}
            />
          }
        />

        <FlatList
          ListHeaderComponent={
            <>
              {recommended}
              {categories}
              <View style={styles.textTitleAllBooks}>
                <Text style={styles.textTitle}>All Books</Text>
              </View>
            </>
          }
          ListFooterComponent={
            <Button
              title="Show all"
              type="clear"
              onPress={this.allBooks}
              titleStyle={styles.showAll}
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {
    paddingTop: 0,
    height: 60,
    backgroundColor: '#CDD5DC',
    borderBottomColor: '#CDD5DC',
    elevation: 10,
  },
  centerHeader: {
    flexDirection: 'row',
  },
  textHeader: {
    color: '#000000',
    fontSize: 22,
  },
  image: {
    width: 101,
    height: 150,
    borderRadius: 5,
  },
  imageHeader: {
    width: 30,
    height: 30,
    marginTop: 4,
    marginLeft: 5,
  },
  title: {
    width: 110,
  },
  author: {
    color: '#7E7E7E',
  },
  flatList: {},
  categories: {
    fontSize: 16,
  },
  categoriesList: {marginTop: -10},
  searchButton: {
    backgroundColor: '#CDD5DC',
    borderRadius: 50,
    width: 40,
  },
  description: {
    color: '#7e7e7e',
    textAlign: 'justify',
  },
  containerRecommended: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  imageCategories: {
    width: 150,
    height: 75,
  },
  tile: {
    width: 150,
    height: 75,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 10,
    elevation: 5,
  },
  textTile: {fontSize: 16},
  textTitleView: {
    margin: 15,
  },
  textTitleAllBooks: {
    margin: 15,
    marginBottom: 0,
  },
  textTitle: {fontSize: 22},
  listAllBooks: {
    backgroundColor: '#F4F4F4',
  },
  showAll: {
    color: '#B2B6BB',
  },
});

const mapStateToProps = ({books, login, genre}) => {
  return {
    books,
    login,
    genre,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBooksAction: data => {
      dispatch(getBooksActionCreator(data));
    },
    getBookByPageAction: data => {
      dispatch(getBookByPageActionCreator(data));
    },
    getBookByRecommendedAction: () => {
      dispatch(getBookByRecommendedActionCreator());
    },
    getGenreAction: () => {
      dispatch(getGenreActionCreator());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
