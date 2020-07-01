import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import SpalshIcon from '../images/splash-icon.png';
import {connect} from 'react-redux';
import {getBooksActionCreator} from '../redux/actions/books';

class Splash extends Component {
  state = {
    limit: 4,
  };

  async componentDidMount() {
    const data = await this.navigateToHome();
    if (data !== null) {
      this.props.navigation.navigate('Home');
    }
  }

  navigateToHome = async () => {
    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    return wait(2000).then(() => this.props.navigation.navigate('Home'));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar showHideTransition="fade" />
        <Image style={styles.image} source={SpalshIcon} />
        <Text style={styles.text}>Sahabat Setia</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
