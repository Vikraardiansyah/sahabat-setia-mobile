import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, View, Image } from 'react-native'
import { Picker } from "@react-native-community/picker";
import { Button } from 'react-native-elements'
import qs from "querystring"
import FormInput from '../components/FormInput'
import ErrorMessage from "../components/ErrorMessage"
import ImagePicker from 'react-native-image-picker'
import { connect } from "react-redux";
import { getAuthorActionCreator } from "../redux/actions/author"
import { getGenreActionCreator } from "../redux/actions/genre"
import { getStatusActionCreator } from "../redux/actions/status";
import { postBookActionCreator } from "../redux/actions/books";
import { Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  title: yup.string()
    .label('Email')
    .required('Please fill the form'),
  description: yup.string()
    .label('Password')
    .required('Please fill the form'),
  id_author: yup.string()
    .label('id_author')
    .required('Please fill the form'),
  id_genre: yup.string()
    .label('id_genre')
    .required('Please fill the form'),
  id_status: yup.string()
    .label('id_status')
    .required('Please fill the form'),
})

class AddBook extends Component {
  state = {
    email: '',
    password: '',
    image: null,
  }

  componentDidMount() {
    const { author, genre, status, login, getAuthorAction, getGenreAction, getStatusAction } = this.props
    const { role } = this.props.login.response
    const { token } = this.props.login
    if (role === 1) {
      getAuthorAction(token)
      getGenreAction(token)
      getStatusAction(token)
    }
  }


  handleSubmit = values => {
    const { title, description, id_author, id_genre, id_status } = values
    const form = new FormData()
    const { postBookAction, author, genre, status } = this.props
    const { token } = this.props.login
    const { image } = this.state
    form.append("title", title)
    form.append("description", description)
    form.append("id_author", id_author)
    const dataAuthor = author.response.filter(
      author => author.id === id_author)
    form.append("author", dataAuthor[0].author)
    form.append("id_genre", id_genre)
    const dataGenre = genre.response.filter(
      genre => genre.id === id_genre)
    form.append("genre", dataGenre[0].genre)
    form.append("id_status", id_status)
    const dataStatus = status.response.filter(
      status => status.id === id_status)
    form.append("status", dataStatus[0].status)
    form.append("image", image)
    postBookAction(form, token)
  }

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        this.setState({
          image: response,
        });
      }
    });
  };

  goToSignup = () => this.props.navigation.navigate('Register')

  render() {
    const { image } = this.state
    const { author, genre, status } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{ title: '', description: '', id_author: '', id_genre: '', id_status: '' }}
          onSubmit={values => { this.handleSubmit(values) }}
          validationSchema={validationSchema} >
          {({ handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            isSubmitting,
            touched,
            handleBlur,
            setFieldValue
          }) => (
              <View>
                <ErrorMessage errorValue={touched.name && errors.name} />
                <FormInput
                  name='title'
                  value={values.title}
                  onChangeText={handleChange('title')}
                  placeholder='Enter title'
                  autoCapitalize='words'
                  onBlur={handleBlur('title')}
                />
                <ErrorMessage errorValue={touched.title && errors.title} />
                <FormInput
                  name='description'
                  value={values.description}
                  onChangeText={handleChange('description')}
                  placeholder='Enter description'
                  autoCapitalize='sentences'
                  onBlur={handleBlur('description')}
                />
                <ErrorMessage errorValue={touched.description && errors.description} />
                <Picker
                  style={styles.picker}
                  name='id_author'
                  selectedValue={values.id_author}
                  onValueChange={itemValue => setFieldValue('id_author', itemValue)}
                >
                  <Picker.Item label="--Choose Author--" value="" />
                  {author.response.map(author =>
                    <Picker.Item key={author.id} label={author.author} value={author.id} />)}
                </Picker>
                <ErrorMessage errorValue={touched.id_author && errors.id_author} />
                <Picker
                  style={styles.picker}
                  name='id_genre'
                  selectedValue={values.id_genre}
                  onValueChange={itemValue => setFieldValue('id_genre', itemValue)}>
                  <Picker.Item label="--Choose Genre--" value="" />
                  {genre.response.map(genre =>
                    <Picker.Item key={genre.id} label={genre.genre} value={genre.id} />)}
                </Picker>
                <ErrorMessage errorValue={touched.id_genre && errors.id_genre} />
                <Picker
                  style={styles.picker}
                  name='id_status'
                  selectedValue={values.id_status}
                  onValueChange={itemValue => setFieldValue('id_status', itemValue)}>
                  <Picker.Item label="--Choose Status--" value="" />
                  {status.response.map(status =>
                    <Picker.Item key={status.id} label={status.status} value={status.id} />)}
                </Picker>
                <ErrorMessage errorValue={touched.id_status && errors.id_status} />
                <View style={styles.buttonContainer}>
                  {image && (
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 100, height: 150 }}
                    />
                  )}
                  <Button
                    title="Choose Photo"
                    onPress={this.handleChoosePhoto}
                    type="outline"
                    titleStyle={{ color: '#000000' }}
                    buttonStyle={{ borderColor: "#000000" }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    type="outline"
                    titleStyle={{ color: '#000000' }}
                    buttonStyle={{ borderColor: "#000000" }}
                    onPress={handleSubmit}
                    title='Add'
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
              </View>
            )}
        </Formik>
      </SafeAreaView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 20, width: 150
  },
  picker: {
    marginLeft: 15, width: 200
  }
})

const mapStateToProps = ({
  author,
  genre,
  status,
  login
}) => {
  return {
    author,
    genre,
    status,
    login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthorAction: (token) => {
      dispatch(getAuthorActionCreator(token))
    },
    getGenreAction: (token) => {
      dispatch(getGenreActionCreator(token))
    },
    getStatusAction: (token) => {
      dispatch(getStatusActionCreator(token))
    },
    postBookAction: (body, token) => {
      dispatch(postBookActionCreator(body, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook)