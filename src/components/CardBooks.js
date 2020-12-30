import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Text,
} from 'native-base';
import Dilan from '../images/covernya.jpg';

class CardBooks extends Component {
  render() {
    const {width} = Dimensions.get('window');
    const widthImage = width / 2.5;
    const {id, title, description, image, author, detailBook} = this.props;
    return (
      <TouchableOpacity>
        <Card style={{borderRadius: 20, overflow: 'hidden'}}>
          <TouchableOpacity onPress={() => detailBook(id)}>
            <CardItem>
              <Body style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: `https://serene-ravine-24514.herokuapp.com/${image}`,
                  }}
                  style={{
                    height: widthImage * 1.4,
                    width: widthImage,
                    borderRadius: 5,
                  }}
                />
              </Body>
              <Body>
                <Text>{title}</Text>
                <Text note style={{fontWeight: 'bold'}}>
                  {author}
                </Text>
                <Text note numberOfLines={9}>
                  {description}
                </Text>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
});

export default CardBooks;
