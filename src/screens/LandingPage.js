import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Page1 from '../images/page1.png';
import Page2 from '../images/page2.png';
import Page3 from '../images/page3.png';

export default class App extends React.Component {
  _onDone = () => {
    this.props.navigation.navigate('Home');
  };
  _onSkip = () => {
    this.props.navigation.navigate('Home');
  };
  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 100,
        }}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  render() {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}
        showSkipButton={true}
        onSkip={this._onSkip}
      />
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 30,
  },
});

const slides = [
  {
    key: 's1',
    text: 'Borrow your favorite book',
    image: Page1,
    backgroundColor: '#CDD5DC',
  },
  {
    key: 's2',
    text: 'get your mind with so many stories',
    image: Page2,
    backgroundColor: '#E0E0E0',
  },
  {
    key: 's3',
    text: 'Get started!',
    image: Page3,
    backgroundColor: '#B2B6BB',
  },
];
