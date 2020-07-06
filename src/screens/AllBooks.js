import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Image} from 'react-native';
import {ListItem, Text, Header, Button} from 'react-native-elements';
import qs from 'querystring';
import SortBy from '../components/SortBy';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  getBooksActionCreator,
  getBookByPageActionCreator,
  getBookByIdActionCreator,
} from '../redux/actions/books';
const API_URL = 'http://54.158.250.235:5000';

class AllBooks extends Component {
  state = {
    limit: 4,
  };

  handleSortTitleAZ = () => {
    this.setState(
      {
        value: 'books.title',
        sort: 'true',
        page: 1,
      },
      () => this.props.getBooksAction(qs.stringify(this.state)),
    );
  };

  handleSortTitleZA = () => {
    this.setState(
      {
        value: 'books.title',
        sort: 'false',
        page: 1,
      },
      () => this.props.getBooksAction(qs.stringify(this.state)),
    );
  };

  handleSortAuthorAZ = () => {
    this.setState(
      {
        value: 'author.author',
        sort: 'true',
        page: 1,
      },
      () => this.props.getBooksAction(qs.stringify(this.state)),
    );
  };

  handleSortAuthorZA = () => {
    this.setState(
      {
        value: 'author.author',
        sort: 'false',
        page: 1,
      },
      () => this.props.getBooksAction(qs.stringify(this.state)),
    );
  };

  scroll = () => {
    const {totalPage, page} = this.props.books.resPagination;
    if (page < totalPage) {
      this.setState(
        {
          page: page + 1,
        },
        () => this.props.getBookByPageAction(qs.stringify(this.state)),
      );
    }
  };

  detailBook = id => {
    this.props.navigation.navigate('Detail', {
      id,
    });
    // this.props.getBookByIdAction(id)
  };
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <TouchableOpacity>
      <ListItem
        containerStyle={styles.containerList}
        title={item.title}
        subtitle={
          <>
            <Text style={styles.author}>{item.author}</Text>
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
      />
    </TouchableOpacity>
  );
  goBack = () => {
    this.props.navigation.goBack();
  };

  goToSearch = () => {
    this.props.navigation.navigate('Search');
  };

  render() {
    const {resBooks} = this.props.books;
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          placement="left"
          leftComponent={
            <Button
              buttonStyle={styles.backButton}
              icon={<Ionicons name="md-arrow-back" size={24} />}
              onPress={this.goBack}
            />
          }
          centerComponent={{
            text: 'All Books',
            style: {color: '#000000', fontSize: 22},
          }}
          rightComponent={
            <Button
              buttonStyle={styles.search}
              icon={<Ionicons name="ios-search" size={24} />}
              onPress={this.goToSearch}
            />
          }
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={resBooks}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={this.scroll}
        />
        <SortBy
          handleSortTitleAZ={this.handleSortTitleAZ}
          handleSortTitleZA={this.handleSortTitleZA}
          handleSortAuthorAZ={this.handleSortAuthorAZ}
          handleSortAuthorZA={this.handleSortAuthorZA}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerList: {
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
  image: {
    width: 102,
    height: 150,
    borderRadius: 5,
  },
  search: {
    backgroundColor: '#CDD5DC',
    borderRadius: 50,
    width: 40,
  },
  backButton: {
    backgroundColor: '#CDD5DC',
    borderRadius: 50,
    width: 40,
  },
  author: {
    color: '#7e7e7e',
    fontWeight: 'bold',
  },
  description: {
    color: '#7e7e7e',
    textAlign: 'justify',
  },
});

const mapStateToProps = ({books}) => {
  return {
    books,
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
    getBookByIdAction: id => {
      dispatch(getBookByIdActionCreator(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllBooks);
