import React, {Component} from 'react';
import {Image, Text, Button, Badge} from 'react-native-elements';
import {
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import qs from 'querystring';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getBookByRecommendedIdActionCreator,
  getBookByGenreIdActionCreator,
  getBookBySearchIdActionCreator,
  getBookByIdActionCreator,
  borrowBookActionCreator,
} from '../redux/actions/books';
import {
  getBorrowActionCreator,
  postBorrowActionCreator,
  putBorrowActionCreator,
} from '../redux/actions/borrow';
import {postOrderActionCreator} from '../redux/actions/order';
const API_URL = 'http://3.92.162.78:5000';

const {width, height} = Dimensions.get('window');

class Detail extends Component {
  state = {
    modalBorrow: false,
    modalReturn: false,
  };

  componentDidMount() {
    const {
      getBookByRecommendedIdAction,
      getBookByIdAction,
      getBookBySearchIdAction,
      getBookByGenreIdAction,
      borrow,
      getBorrowAction,
    } = this.props;
    const {id, page} = this.props.route.params;
    const {role} = this.props.login.response;
    const {token} = this.props.login;
    if (page === 'search') {
      getBookBySearchIdAction(id);
    } else if (page === 'genre') {
      getBookByGenreIdAction(id);
    } else if (page === 'recommended') {
      getBookByRecommendedIdAction(id);
    } else {
      getBookByIdAction(id);
    }
    if (!borrow.isFulfilled && role) {
      getBorrowAction(token);
    }
  }

  borrowBook = async () => {
    const {id} = this.props.route.params;
    const {resBookById} = this.props.books;
    const {email, name} = this.props.login.response;
    const {response, token} = this.props.login;
    const {postBorrowAction, borrowBookAction} = this.props;
    await borrowBookAction(
      id,
      qs.stringify({
        id_status: this.state.id_status,
        email_borrow: this.state.email_borrow,
        status: 'Unavailable',
      }),
      token,
    );
    await postBorrowAction(
      qs.stringify({
        id_book: id,
        id_user: response.id,
        status: 2,
        title: resBookById.title,
        image: resBookById.image,
        email,
        name,
        borrow_at: new Date().toISOString(),
        return_at: new Date().toISOString(),
      }),
      token,
    );
  };

  returnBook = async () => {
    const {id} = this.props.route.params;
    const {response, token} = this.props.login;
    const {putBorrowAction, borrowBookAction} = this.props;
    await borrowBookAction(
      id,
      qs.stringify({
        id_status: this.state.id_status,
        email_borrow: this.state.email_borrow,
        status: 'Available',
      }),
      token,
    );
    await putBorrowAction(
      qs.stringify({
        id_book: id,
        id_user: response.id,
        status: 1,
        return_at: new Date().toISOString(),
      }),
      token,
    );
  };

  handleBorrow = async () => {
    const {email} = this.props.login.response;
    const {id_status} = this.props.books.resBookById;
    if (id_status === 1) {
      this.setState(
        {
          id_status: 2,
          email_borrow: email,
        },
        () => this.borrowBook(),
      );
    } else {
      this.setState(
        {
          id_status: 1,
          email_borrow: '',
        },
        () => this.returnBook(),
      );
    }
  };

  toggleModalBorrow = () => {
    this.setState({
      modalBorrow: !this.state.modalBorrow,
    });
  };

  toggleModalReturn = () => {
    this.setState({
      modalReturn: !this.state.modalReturn,
    });
  };

  render() {
    const {
      title,
      description,
      author,
      genre,
      status,
      image,
      id_status,
      email_borrow,
    } = this.props.books.resBookById;
    const {role, email} = this.props.login.response;
    const {modalBorrow, modalReturn} = this.state;
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.backButtonView}>
            <TouchableOpacity>
              <Button
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                icon={<MaterialIcons name="arrow-back" size={24} />}
                buttonStyle={styles.backButton}
                raised
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={{uri: `${API_URL}/${image}`}}
              style={styles.imageBackground}
            />
            <View style={styles.image}>
              <Image
                source={{uri: `${API_URL}/${image}`}}
                style={{width: width * 0.2, height: height * 0.15}}
              />
            </View>
          </View>
          <View style={styles.containerDetail}>
            <View style={styles.badge}>
              <Badge badgeStyle={styles.badgeColor} value={genre} />
            </View>
            <View style={styles.detail}>
              <View>
                <Text h4 style={styles.title}>
                  {title}
                </Text>
                <Text style={styles.author}>{author}</Text>
              </View>
              {id_status === 1 ? (
                <Text style={styles.available}>{status}</Text>
              ) : (
                <Text style={styles.unavailable}>{status}</Text>
              )}
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <TouchableOpacity>
            {role === 2 && id_status === 1 ? (
              <Button
                title="Borrow"
                buttonStyle={styles.borrowButton}
                raised
                onPress={this.toggleModalBorrow}
              />
            ) : id_status === 2 && email_borrow === email ? (
              <Button
                title="Return"
                buttonStyle={styles.returnButton}
                raised
                onPress={this.toggleModalReturn}
              />
            ) : (
              <></>
            )}
          </TouchableOpacity>
          {/* modal borrow */}
          <Modal
            isVisible={modalBorrow}
            onBackButtonPress={this.toggleModalBorrow}
            onBackdropPress={this.toggleModalBorrow}>
            <View style={styles.containerModal}>
              <Text style={styles.textModal}>
                Are you sure want to borrow this book?
              </Text>
              <View style={styles.buttonModalView}>
                <Button
                  title="Yes"
                  type="clear"
                  containerStyle={styles.buttonModal}
                  onPress={() => {
                    this.toggleModalBorrow();
                    this.handleBorrow();
                  }}
                />
                <Button
                  title="No"
                  type="clear"
                  containerStyle={styles.buttonModal}
                  onPress={this.toggleModalBorrow}
                />
              </View>
            </View>
          </Modal>
          {/* modal return */}
          <Modal
            isVisible={modalReturn}
            onBackButtonPress={this.toggleModalReturn}
            onBackdropPress={this.toggleModalReturn}>
            <View style={styles.containerModal}>
              <Text style={styles.textModal}>
                Are you sure want to return this book?
              </Text>
              <View style={styles.buttonModalView}>
                <Button
                  title="Yes"
                  type="clear"
                  containerStyle={styles.buttonModal}
                  onPress={() => {
                    this.toggleModalReturn();
                    this.handleBorrow();
                  }}
                />
                <Button
                  title="No"
                  type="clear"
                  containerStyle={styles.buttonModal}
                  onPress={this.toggleModalReturn}
                />
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonView: {
    position: 'absolute',
    top: 17,
    left: 15,
    zIndex: 1,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ececec',
  },
  imageBackground: {
    width: width,
    height: height * 0.25,
  },
  image: {
    position: 'absolute',
    top: height * 0.17,
    right: width * 0.1,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
  },
  containerDetail: {
    marginLeft: 20,
    marginTop: 40,
  },
  badge: {
    flex: 0.04,
    flexDirection: 'row',
  },
  badgeColor: {
    backgroundColor: '#B2B6BB',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: width * 0.1,
  },
  title: {width: 250},
  author: {fontWeight: '700'},
  available: {
    paddingTop: 15,
    color: 'green',
  },
  unavailable: {
    paddingTop: 15,
    color: 'red',
  },
  description: {
    flex: 0.1,
    marginRight: 25,
  },
  descriptionText: {
    textAlign: 'justify',
    paddingBottom: 50,
  },
  button: {
    position: 'absolute',
    bottom: 17,
    right: 15,
    zIndex: 1,
  },
  containerModal: {
    flex: 0.1,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 20,
    margin: 50,
  },
  textModal: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonModalView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonModal: {
    width: 120,
  },
  borrowButton: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FBCC38',
  },
  returnButton: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FF0000',
  },
});

const mapStateToProps = ({books, borrow, login}) => {
  return {
    books,
    borrow,
    login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBookByIdAction: id => {
      dispatch(getBookByIdActionCreator(id));
    },
    getBookBySearchIdAction: id => {
      dispatch(getBookBySearchIdActionCreator(id));
    },
    getBookByGenreIdAction: id => {
      dispatch(getBookByGenreIdActionCreator(id));
    },
    getBookByRecommendedIdAction: id => {
      dispatch(getBookByRecommendedIdActionCreator(id));
    },
    borrowBookAction: (id, body, token) => {
      dispatch(borrowBookActionCreator(id, body, token));
    },
    getBorrowAction: token => {
      dispatch(getBorrowActionCreator(token));
    },
    postBorrowAction: (body, token) => {
      dispatch(postBorrowActionCreator(body, token));
    },
    putBorrowAction: (body, token) => {
      dispatch(putBorrowActionCreator(body, token));
    },
    postOrderAction: (body, token) => {
      dispatch(postOrderActionCreator(body, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
