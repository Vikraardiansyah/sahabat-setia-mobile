import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native'
import { ListItem, Text, Header, Image, Button } from 'react-native-elements'
import qs from "querystring";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { getOrderActionCreator } from "../redux/actions/order"
import { getBorrowActionCreator, getBorrowByIdActionCreator, putBorrowActionCreator } from "../redux/actions/borrow";
import { borrowBookActionCreator } from "../redux/actions/books";


class History extends Component {
  state = {
    modalReturn: false
  }

  async componentDidMount() {
    const { getBorrowByIdAction, getOrderAction, getBorrowAction, order, borrow } = this.props
    const { token, response, } = this.props.login
    if (response.role === 1 && !order.isFulfilled) {
      await getOrderAction(token)
    }
    if (response.role === 1 && !borrow.isFulfilled) {
      await getBorrowAction(token)
    }
    if (response.role === 2 && !borrow.isFulfilled) {
      await getBorrowByIdAction(response.id, token)
    }
  }

  returnBook = async (id_book, id_user) => {
    const { token } = this.props.login
    const { putBorrowAction, borrowBookAction } = this.props
    await borrowBookAction(id_book, qs.stringify({
      id_status: 1,
      email_borrow: '',
      status: "Available"
    }), token)
    await putBorrowAction(qs.stringify({
      id_book,
      id_user,
      status: 1,
      return_at: new Date().toISOString(),
    }), token)
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={
        <View style={styles.subtitleView}>
          {this.props.login.response.role === 1 ? <>
            <Text style={styles.ratingText}>{item.name}</Text>
            <Text style={styles.ratingText}>{item.email}</Text>
          </> : <></>}
          <Text style={styles.ratingText}>Borrow: {new Date(item.borrow_at).toLocaleDateString()}</Text>
          {item.status === 1 && this.props.login.response.role === 2 ? <Text style={styles.ratingText}>Return: {new Date(item.return_at).toLocaleDateString()}</Text> : <Text style={styles.ratingText}>Return: -</Text>}
        </View>
      }
      leftElement={<Image
        source={{ uri: `http://192.168.43.73:5000/${item.image}` }}
        style={styles.image} />}
      rightElement={item.status === 2 ? <Button
        title="Return"
        buttonStyle={styles.returnButton}
        raised
        onPress={() => this.toggleModalReturn(item.id_book, item.id_user)}
      /> : <></>}
      topDivider
    />
  )

  toggleModalReturn = (id_book, id_user) => {
    this.setState({
      modalReturn: !this.state.modalReturn,
      id_book,
      id_user
    })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { resBorrow, isLoading } = this.props.borrow
    const { id_book, id_user, modalReturn } = this.state
    return (
      <View style={styles.container}>
        <Header containerStyle={{ paddingTop: -30, height: 60 }}
          backgroundColor="#F8"
          placement="left"
          leftComponent={<Button
            buttonStyle={{ backgroundColor: "#f4f4f4", borderRadius: 50 }}
            icon={<Ionicons name="md-arrow-back" size={24} />}
            onPress={this.goBack} />}
          centerComponent={{ text: 'History', style: { color: '#000000', fontSize: 22 } }}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={resBorrow}
          renderItem={this.renderItem}
        />
        {/* modal return */}
        <Modal isVisible={modalReturn} onBackButtonPress={this.toggleModalReturn} onBackdropPress={this.toggleModalReturn} >
          <View style={{ flex: 0.1, backgroundColor: "white", borderRadius: 10, justifyContent: 'center', padding: 20, margin: 50 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you sure want to return this book?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button title="Yes" type="clear" onPress={() => { this.toggleModalReturn(); this.returnBook(id_book, id_user) }} />
              <Button title="No" type="clear" onPress={this.toggleModalReturn} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitleView: {
    flex: 1,
    marginLeft: -10,
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: '#7e7e7e'
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
    backgroundColor: '#FF0000'
  },
})

const mapStateToProps = ({
  order,
  borrow,
  login,
}) => {
  return {
    order,
    borrow,
    login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderAction: (token) => {
      dispatch(getOrderActionCreator(token))
    },
    getBorrowAction: (token) => {
      dispatch(getBorrowActionCreator(token))
    },
    getBorrowByIdAction: (id, token) => {
      dispatch(getBorrowByIdActionCreator(id, token))
    },
    putBorrowAction: (body, token) => {
      dispatch(putBorrowActionCreator(body, token))
    },
    borrowBookAction: (id, body, token) => {
      dispatch(borrowBookActionCreator(id, body, token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)