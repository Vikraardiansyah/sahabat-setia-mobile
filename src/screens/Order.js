import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {ListItem, Text, Header, Image, Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getOrderActionCreator} from '../redux/actions/order';

class Order extends Component {
  state = {};

  async componentDidMount() {
    const {getOrderAction, order} = this.props;
    const {token, response} = this.props.login;
    if (!order.isFulfilled) {
      await getOrderAction(token);
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.title}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.ratingText}>{item.name}</Text>
          <Text style={styles.ratingText}>{item.email}</Text>
          <Text style={styles.ratingText}>
            Order: {new Date(item.order_at).toLocaleDateString()}
          </Text>
        </View>
      }
      leftElement={
        <Image
          source={{uri: `http://192.168.43.73:5000/${item.image}`}}
          style={styles.image}
        />
      }
      topDivider
    />
  );

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {resOrder} = this.props.order;
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{paddingTop: -30, height: 60}}
          backgroundColor="#F8"
          placement="left"
          leftComponent={
            <Button
              buttonStyle={{backgroundColor: '#f4f4f4', borderRadius: 50}}
              icon={<Ionicons name="md-arrow-back" size={24} />}
              onPress={this.goBack}
            />
          }
          centerComponent={{
            text: 'Order',
            style: {color: '#000000', fontSize: 22},
          }}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={resOrder}
          renderItem={this.renderItem}
        />
      </View>
    );
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
});

const mapStateToProps = ({order, login}) => {
  return {
    order,
    login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderAction: token => {
      dispatch(getOrderActionCreator(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);
