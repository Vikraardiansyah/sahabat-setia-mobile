import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {ListItem, Text, Header, Image, Button} from 'react-native-elements';
import qs from 'querystring';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {getOrderActionCreator} from '../redux/actions/order';
import {
  getBorrowActionCreator,
  getBorrowByIdActionCreator,
  putBorrowActionCreator,
} from '../redux/actions/borrow';
import {borrowBookActionCreator} from '../redux/actions/books';
const API_URL = 'serene-ravine-24514.herokuapp.com';

class History extends Component {
  state = {
    modalReturn: false,
  };

  async componentDidMount() {
    const {getBorrowByIdAction, getBorrowAction} = this.props;
    const {token, response} = this.props.login;
    if (response.role === 1) {
      await getBorrowAction(token);
    }
    if (response.role === 2) {
      await getBorrowByIdAction(response.id, token);
    }
  }

  returnBook = async (id_book, id_user) => {
    const {token} = this.props.login;
    const {putBorrowAction, borrowBookAction} = this.props;
    await borrowBookAction(
      id_book,
      qs.stringify({
        id_status: 1,
        email_borrow: '',
        status: 'Available',
      }),
      token,
    );
    await putBorrowAction(
      qs.stringify({
        id_book,
        id_user,
        status: 1,
        return_at: new Date().toISOString(),
      }),
      token,
    );
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.title}
      subtitle={
        <View style={styles.subtitleView}>
          {this.props.login.response.role === 1 ? (
            <>
              <Text style={styles.ratingText}>{item.name}</Text>
              <Text style={styles.ratingText}>{item.email}</Text>
            </>
          ) : (
            <></>
          )}
          <Text style={styles.ratingText}>
            Borrow: {new Date(item.borrow_at).toLocaleDateString()}
          </Text>
          {item.status === 1 && this.props.login.response.role === 2 ? (
            <Text style={styles.ratingText}>
              Return: {new Date(item.return_at).toLocaleDateString()}
            </Text>
          ) : (
            <Text style={styles.ratingText}>Return: -</Text>
          )}
        </View>
      }
      leftElement={
        <Image
          source={{uri: `${API_URL}/${item.image}`}}
          style={styles.image}
        />
      }
      rightElement={
        item.status === 2 && this.props.login.response.role === 2 ? (
          <Button
            title="Return"
            buttonStyle={styles.returnButton}
            raised
            onPress={() => this.toggleModalReturn(item.id_book, item.id_user)}
          />
        ) : (
          <></>
        )
      }
      bottomDivider
      containerStyle={styles.books}
    />
  );

  toggleModalReturn = (id_book, id_user) => {
    this.setState({
      modalReturn: !this.state.modalReturn,
      id_book,
      id_user,
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {resBorrow} = this.props.borrow;
    const {id_book, id_user, modalReturn} = this.state;
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          backgroundColor="#F8"
          placement="left"
          leftComponent={
            <Button
              buttonStyle={styles.backButton}
              icon={<Ionicons name="md-arrow-back" size={24} />}
              onPress={this.goBack}
            />
          }
          centerComponent={{
            text: 'History',
            style: {color: '#000000', fontSize: 22},
          }}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={resBorrow}
          renderItem={this.renderItem}
        />
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
                  this.returnBook(id_book, id_user);
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 0,
    height: 60,
    backgroundColor: '#CDD5DC',
    borderBottomColor: '#CDD5DC',
    elevation: 10,
  },
  backButton: {
    backgroundColor: '#CDD5DC',
    borderRadius: 50,
    width: 40,
  },
  subtitleView: {
    flex: 1,
    marginLeft: -10,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: '#7e7e7e',
  },
  image: {
    width: 101,
    height: 150,
    borderRadius: 5,
  },
  returnButton: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FF0000',
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
  books: {
    backgroundColor: '#F4F4F4',
  },
});

const mapStateToProps = ({order, borrow, login}) => {
  return {
    order,
    borrow,
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderAction: (token) => {
      dispatch(getOrderActionCreator(token));
    },
    getBorrowAction: (token) => {
      dispatch(getBorrowActionCreator(token));
    },
    getBorrowByIdAction: (id, token) => {
      dispatch(getBorrowByIdActionCreator(id, token));
    },
    putBorrowAction: (body, token) => {
      dispatch(putBorrowActionCreator(body, token));
    },
    borrowBookAction: (id, body, token) => {
      dispatch(borrowBookActionCreator(id, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
