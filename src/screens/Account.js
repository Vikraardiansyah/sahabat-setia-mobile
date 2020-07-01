import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {ListItem, Text, Header, Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {logoutActionCreator} from '../redux/actions/logout';

class Account extends Component {
  state = {
    modalLogout: false,
  };

  login = () => {
    this.props.navigation.navigate('Login');
  };

  logout = () => {
    this.props.logoutAction();
  };

  goToHistory = () => {
    this.props.navigation.navigate('History');
  };

  goToOrder = () => {
    this.props.navigation.navigate('Order');
  };

  toggleModalLogout = () => {
    this.setState({
      modalLogout: !this.state.modalLogout,
    });
  };

  render() {
    const {isFulfilled, response} = this.props.login;
    const {modalLogout} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          containerStyle={styles.header}
          placement="left"
          centerComponent={{
            text: 'Account',
            style: {color: '#000000', fontSize: 22},
          }}
        />
        <View style={styles.list}>
          {isFulfilled ? (
            <>
              <ListItem
                leftAvatar={{
                  source: {
                    uri: `https://ui-avatars.com/api/?background=B2B6BB&color=000000&size=128&name=${
                      response.name
                    }`,
                  },
                }}
                title={response.name}
                subtitle={response.email}
                bottomDivider
              />
              <TouchableOpacity onPress={this.goToHistory}>
                <ListItem
                  key="history"
                  title="History"
                  leftIcon={
                    <MaterialCommunityIcons
                      name="history"
                      size={24}
                      color="#b2b6bb"
                    />
                  }
                  bottomDivider
                  chevron
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleModalLogout}>
                <ListItem
                  key="logout"
                  title="Logout"
                  leftIcon={
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color="#b2b6bb"
                    />
                  }
                  bottomDivider
                  chevron
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={this.login}>
              <ListItem
                key="login"
                title="Login"
                leftIcon={
                  <MaterialCommunityIcons
                    name="login"
                    size={24}
                    color="#b2b6bb"
                  />
                }
                bottomDivider
                chevron
              />
            </TouchableOpacity>
          )}
        </View>
        {/* modal logout */}
        <Modal
          isVisible={modalLogout}
          onBackButtonPress={this.toggleModalLogout}
          onBackdropPress={this.toggleModalLogout}>
          <View style={styles.containerModal}>
            <Text style={styles.textModal}>Are you sure want to logout?</Text>
            <View style={styles.buttonModalView}>
              <Button
                title="Yes"
                type="clear"
                containerStyle={styles.buttonModal}
                onPress={() => {
                  this.toggleModalLogout();
                  this.logout();
                }}
              />
              <Button
                title="No"
                type="clear"
                containerStyle={styles.buttonModal}
                onPress={this.toggleModalLogout}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
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
  list: {},
  listItem: {
    backgroundColor: '#f4f4f4',
  },
  modal: {
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
});

const mapStateToProps = ({login}) => {
  return {
    login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => {
      dispatch(logoutActionCreator());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
