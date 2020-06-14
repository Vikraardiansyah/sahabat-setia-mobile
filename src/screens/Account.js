import React, { Component } from "react"
import { StyleSheet, View, SafeAreaView } from "react-native"
import { ListItem, Text, Header, Button } from "react-native-elements"
import { TouchableOpacity } from "react-native-gesture-handler"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { logoutActionCreator } from "../redux/actions/logout";

class Account extends Component {

  state = {
    modalLogout: false,
  }

  login = () => {
    this.props.navigation.navigate('Login')
  }

  logout = () => {
    this.props.logoutAction()
  }

  goToHistory = () => {
    this.props.navigation.navigate('History')
  }

  goToOrder = () => {
    this.props.navigation.navigate('Order')
  }

  toggleModalLogout = () => {
    this.setState({
      modalLogout: !this.state.modalLogout,
    })
  }

  render() {
    const { isFulfilled, response } = this.props.login
    const { modalLogout } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header
          containerStyle={styles.header}
          placement="left"
          centerComponent={{
            text: isFulfilled ? `${response.name}` : `Account`,
            style: { color: '#000000', fontSize: 22 }
          }}
        />
        <View style={{ marginTop: 20 }}>
          {response.role === 1 ?
            <TouchableOpacity onPress={this.goToOrder}>
              <ListItem
                key='order'
                title='Order'
                leftIcon={<MaterialCommunityIcons name='alert-circle-outline' size={24} color='#b2b6bb' />}
                topDivider
                bottomDivider
                chevron
                containerStyle={styles.listItem}
              />
            </TouchableOpacity> : <></>}
          {isFulfilled ? <>
            <TouchableOpacity onPress={this.goToHistory}>
              <ListItem
                key='history'
                title='History'
                leftIcon={<MaterialCommunityIcons name='history' size={24} color='#b2b6bb' />}
                topDivider
                bottomDivider
                chevron
                containerStyle={styles.listItem}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleModalLogout}>
              <ListItem
                key='logout'
                title='Logout'
                leftIcon={<MaterialCommunityIcons name='logout' size={24} color='#b2b6bb' />}
                bottomDivider
                chevron
                containerStyle={styles.listItem}
              />
            </TouchableOpacity>
          </> :
            <TouchableOpacity onPress={this.login}>
              <ListItem
                key='login'
                title='Login'
                leftIcon={<MaterialCommunityIcons name='login' size={24} color='#b2b6bb' />}
                topDivider
                bottomDivider
                chevron
                containerStyle={styles.listItem}
              />
            </TouchableOpacity>
          }
        </View>
        {/* modal logout */}
        <Modal isVisible={modalLogout} onBackButtonPress={this.toggleModalLogout} onBackdropPress={this.toggleModalLogout} >
          <View style={{ flex: 0.1, backgroundColor: "white", borderRadius: 10, justifyContent: 'center', padding: 20, margin: 50 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you sure want to logout?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button title="Yes" type="clear" onPress={() => { this.toggleModalLogout(); this.logout() }} />
              <Button title="No" type="clear" onPress={this.toggleModalLogout} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 0,
    height: 60,
    backgroundColor: "#F4F4F4"
  },
  listItem: {
    backgroundColor: "#f4f4f4"
  }
})

const mapStateToProps = ({
  login,
}) => {
  return {
    login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => {
      dispatch(logoutActionCreator())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)