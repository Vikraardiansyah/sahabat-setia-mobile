import React, { Component } from "react";
import { Image, Text, Button, Badge } from 'react-native-elements';
import { Dimensions, View, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from "react-redux"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Dilan from '../images/covernya.jpg'
import { getBookByIdActionCreator } from "../redux/actions/books";

class Detail extends Component {

  componentDidMount() {
    const { getBookByIdAction } = this.props
    const { id } = this.props.route.params
    getBookByIdAction(id)
  }

  render() {
    const { width, height } = Dimensions.get('window')
    const { title, description, author, genre, status, image } = this.props.books.resBookById
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 100 }}>
              <View>
                <Text h4>{title}</Text>
                <Text style={{ fontWeight: '700' }}>{author}</Text>
              </View>
              <Text style={{ paddingTop: 15, color: 'green' }} >{status}</Text>
            </View>
            <View style={{ flex: 0.1, marginRight: 25 }}>
              <Text style={{ textAlign: 'justify' }}>{description}</Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{ position: 'absolute', bottom: 17, right: 15, zIndex: 1 }}
        >
          <TouchableOpacity>
            <Button
              title="Borrow"
              titleStyle={{}}
              buttonStyle={{ width: 100, height: 50, borderRadius: 50, backgroundColor: '#FBCC38' }}
              raised
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({
  books,
}) => {
  return {
    books,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBookByIdAction: (id) => {
      dispatch(getBookByIdActionCreator(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)