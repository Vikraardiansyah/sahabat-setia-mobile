import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Button } from 'react-native-elements'
import qs from "querystring";
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from "../components/ErrorMessage";
import { connect } from "react-redux";
import { loginActionCreator, tokenActionCreator } from "../redux/actions/login";
import { getBooksActionCreator } from '../redux/actions/books'
import { Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup.string()
    .label('Email')
    .email('Enter email')
    .required('Please enter email'),
  password: yup.string()
    .label('Password')
    .required('Please enter password')
})

class Login extends Component {
  state = {
    email: '',
    password: '',
  }


  handleEmailChange = email => {
    this.setState({ email })
  }

  handlePasswordChange = password => {
    this.setState({ password })
  }


  handleSubmit = values => {
    // const { email, password } = values
    this.props.loginAction(qs.stringify(values))
  }

  componentDidUpdate() {
    const { isFulfilled } = this.props.login
    const { refreshToken } = this.props.login.response
    if (isFulfilled) {
      this.props.tokenAction(qs.stringify({
        token: refreshToken
      }))
      this.props.navigation.navigate("Home")
    }
  }

  goToSignup = () => this.props.navigation.navigate('Register')

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{ email: '', password: '', }}
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
          }) => (
              <Fragment>
                <ErrorMessage errorValue={touched.name && errors.name} />
                <FormInput
                  name='email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder='Enter email'
                  autoCapitalize='none'
                  iconName='ios-mail'
                  iconColor='#2C384A'
                  onBlur={handleBlur('email')}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name='password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder='Enter password'
                  secureTextEntry
                  autoCapitalize='none'
                  iconName='ios-lock'
                  iconColor='#2C384A'
                  onBlur={handleBlur('password')}
                />
                <ErrorMessage errorValue={touched.password && errors.password} />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title='Login'
                    buttonColor='#000000'
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
              </Fragment>
            )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#1132a8'
          }}
          type='clear'
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 20
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
    loginAction: (body) => {
      dispatch(loginActionCreator(body))
    },
    tokenAction: (body) => {
      dispatch(tokenActionCreator(body))
    },
    getBooksAction: () => {
      dispatch(getBooksActionCreator())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)