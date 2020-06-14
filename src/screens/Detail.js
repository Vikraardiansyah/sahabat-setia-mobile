import React, { Component } from "react";
import { Image, Text, Button, Badge } from 'react-native-elements';
import { Dimensions, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Modal from "react-native-modal";
import { connect } from "react-redux"
import qs from "querystring";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getBookByRecommendedIdActionCreator, getBookByGenreIdActionCreator, getBookBySearchIdActionCreator, getBookByIdActionCreator, borrowBookActionCreator } from "../redux/actions/books";
import { getBorrowActionCreator, postBorrowActionCreator, putBorrowActionCreator } from '../redux/actions/borrow'
import { postOrderActionCreator } from '../redux/actions/order'

class Detail extends Component {

  state = {
    modalBorrow: false,
    modalReturn: false,
    modalOrder: false,
  }

  componentDidMount() {
    const { getBookByRecommendedIdAction, getBookByIdAction, getBookBySearchIdAction, getBookByGenreIdAction, borrow, getBorrowAction } = this.props
    const { id, page } = this.props.route.params
    const { role } = this.props.login.response
    const { token } = this.props.login
    if (page === 'search') {
      getBookBySearchIdAction(id)
    } else if (page === 'genre') {
      getBookByGenreIdAction(id)
    } else if (page === 'recommended') {
      getBookByRecommendedIdAction(id)
    } else {
      getBookByIdAction(id)
    }
    if (!borrow.isFulfilled && role) {
      getBorrowAction(token)
    }
  }

  borrowBook = async () => {
    const { id } = this.props.route.params
    const { resBookById } = this.props.books
    const { email, name } = this.props.login.response
    const { response, token } = this.props.login
    const { postBorrowAction, borrowBookAction } = this.props
    await borrowBookAction(id, qs.stringify({
      id_status: this.state.id_status,
      email_borrow: this.state.email_borrow,
      status: "Unavailable"
    }), token)
    await postBorrowAction(qs.stringify({
      id_book: id,
      id_user: response.id,
      status: 2,
      title: resBookById.title,
      image: resBookById.image,
      email,
      name,
      borrow_at: new Date().toISOString(),
      return_at: new Date().toISOString(),
    }), token)
  }

  returnBook = async () => {
    const { id } = this.props.route.params
    const { response, token } = this.props.login
    const { putBorrowAction, borrowBookAction } = this.props
    await borrowBookAction(id, qs.stringify({
      id_status: this.state.id_status,
      email_borrow: this.state.email_borrow,
      status: "Available"
    }), token)
    await putBorrowAction(qs.stringify({
      id_book: id,
      id_user: response.id,
      status: 1,
      return_at: new Date().toISOString(),
    }), token)
  }

  handleBorrow = async () => {
    const { email } = this.props.login.response
    const { id_status } = this.props.books.resBookById
    if (id_status === 1) {
      this.setState({
        id_status: 2,
        email_borrow: email,
      }, () => this.borrowBook())
    } else {
      this.setState({
        id_status: 1,
        email_borrow: "",
      }, () => this.returnBook())
    }
  }

  postOrder = async () => {
    const { id } = this.props.route.params
    const { response, token } = this.props.login
    const { postOrderAction } = this.props
    const { email, name } = this.props.login.response
    const { resBookById } = this.props.books
    await postOrderAction(qs.stringify({
      name,
      email,
      image: resBookById.image,
      id_book: id,
      id_user: response.id,
      order_at: new Date().toISOString(),
    }), token)
  }

  toggleModalBorrow = () => {
    this.setState({
      modalBorrow: !this.state.modalBorrow,
    })
  }

  toggleModalReturn = () => {
    this.setState({
      modalReturn: !this.state.modalReturn,
    })
  }

  toggleModalOrder = () => {
    this.setState({
      modalOrder: !this.state.modalOrder,
    })
  }

  render() {
    const { width, height } = Dimensions.get('window')
    const { title, description, author, genre, status, image, id_status, email_borrow } = this.props.books.resBookById
    const { role, email } = this.props.login.response
    const { modalBorrow, modalReturn, modalOrder } = this.state
    return (
      <>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{ position: 'absolute', top: 17, left: 15, zIndex: 1 }}
          >
            <TouchableOpacity>
              <Button onPress={() => {
                this.props.navigation.goBack()
              }}
                icon={
                  <MaterialIcons name="arrow-back" size={24} />
                }
                buttonStyle={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#ececec' }}
                raised
              />
            </TouchableOpacity>
          </View>
          <View >
            <Image
              source={{ uri: `http://192.168.43.73:5000/${image}` }}
              style={{ width: width, height: height * 0.25 }}
            ></Image>
            <View style={{
              position: 'absolute', top: height * 0.17, right: width * 0.1, borderRadius: 10, overflow: 'hidden'
            }} >
              <Image
                source={{ uri: `http://192.168.43.73:5000/${image}` }}
                style={{ width: width * 0.20, height: height * 0.15 }}
              ></Image>
            </View>
          </View >
          <View style={{ marginLeft: 20, marginTop: 40 }}>
            <View style={{ flex: 0.04, flexDirection: 'row', }} >
              <Badge status="warning" value={genre} textStyle={{ fontSize: 14 }} badgeStyle={{ height: 20 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: width * 0.1 }}>
              <View>
                <Text h4 style={{ width: 250 }}>{title}</Text>
                <Text style={{ fontWeight: '700' }}>{author}</Text>
              </View>
              {id_status === 1 ? <Text style={{ paddingTop: 15, color: 'green' }}>{status}</Text> :
                <Text style={{ paddingTop: 15, color: 'red' }}>{status}</Text>}
            </View>
            <View style={{ flex: 0.1, marginRight: 25 }}>
              <Text style={{ textAlign: 'justify', paddingBottom: 50 }}>{description}</Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{ position: 'absolute', bottom: 17, right: 15, zIndex: 1 }}
        >
          <TouchableOpacity>
            {role === 2 && id_status === 1 ?
              <Button
                title="Borrow"
                buttonStyle={styles.borrowButton}
                raised
                onPress={this.toggleModalBorrow}
              /> :
              id_status === 2 && email_borrow === email ?
                <Button
                  title="Return"
                  buttonStyle={styles.returnButton}
                  raised
                  onPress={this.toggleModalReturn}
                /> :
                role === 2 ?
                  <Button
                    title="Order"
                    buttonStyle={styles.orderButton}
                    raised
                    onPress={this.toggleModalOrder}
                  /> : <></>}
          </TouchableOpacity>
          {/* modal borrow */}
          <Modal isVisible={modalBorrow} onBackButtonPress={this.toggleModalBorrow} onBackdropPress={this.toggleModalBorrow} >
            <View style={{ flex: 0.1, backgroundColor: "white", borderRadius: 10, justifyContent: 'center', padding: 20, margin: 50 }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you sure want to borrow this book?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title="Yes" type="clear" onPress={() => { this.toggleModalBorrow(); this.handleBorrow() }} />
                <Button title="No" type="clear" onPress={this.toggleModalBorrow} />
              </View>
            </View>
          </Modal>
          {/* modal return */}
          <Modal isVisible={modalReturn} onBackButtonPress={this.toggleModalReturn} onBackdropPress={this.toggleModalReturn} >
            <View style={{ flex: 0.1, backgroundColor: "white", borderRadius: 10, justifyContent: 'center', padding: 20, margin: 50 }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you sure want to return this book?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title="Yes" type="clear" onPress={() => { this.toggleModalReturn(); this.handleBorrow() }} />
                <Button title="No" type="clear" onPress={this.toggleModalReturn} />
              </View>
            </View>
          </Modal>
          {/* modal order */}
          <Modal isVisible={modalOrder} onBackButtonPress={this.toggleModalOrder} onBackdropPress={this.toggleModalOrder} >
            <View style={{ flex: 0.1, backgroundColor: "white", borderRadius: 10, justifyContent: 'center', padding: 20, margin: 50 }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you sure want to order this book?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title="Yes" type="clear" onPress={() => { this.toggleModalOrder(); this.postOrder() }} />
                <Button title="No" type="clear" onPress={this.toggleModalOrder} />
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  borrowButton: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FBCC38'
  },
  returnButton: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FF0000'
  },
  orderButton: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#008000'
  }
})

const mapStateToProps = ({
  books,
  borrow,
  login
}) => {
  return {
    books,
    borrow,
    login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBookByIdAction: (id) => {
      dispatch(getBookByIdActionCreator(id))
    },
    getBookBySearchIdAction: (id) => {
      dispatch(getBookBySearchIdActionCreator(id))
    },
    getBookByGenreIdAction: (id) => {
      dispatch(getBookByGenreIdActionCreator(id))
    },
    getBookByRecommendedIdAction: (id) => {
      dispatch(getBookByRecommendedIdActionCreator(id))
    },
    borrowBookAction: (id, body, token) => {
      dispatch(borrowBookActionCreator(id, body, token))
    },
    getBorrowAction: (token) => {
      dispatch(getBorrowActionCreator(token))
    },
    postBorrowAction: (body, token) => {
      dispatch(postBorrowActionCreator(body, token))
    },
    putBorrowAction: (body, token) => {
      dispatch(putBorrowActionCreator(body, token))
    },
    postOrderAction: (body, token) => {
      dispatch(postOrderActionCreator(body, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)