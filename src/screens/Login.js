import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, ToastAndroid} from 'react-native';
import {Button, Header} from 'react-native-elements';
import qs from 'querystring';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import {connect} from 'react-redux';
import {loginActionCreator, tokenActionCreator} from '../redux/actions/login';
import {getBooksActionCreator} from '../redux/actions/books';
import {Formik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Enter email')
    .required('Please enter email'),
  password: yup
    .string()
    .label('Password')
    .required('Please enter password'),
});

const Toast = props => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50,
    );
    return null;
  }
  return null;
};

class Login extends Component {
  state = {
    email: '',
    password: '',
    visible: false,
  };

  handleButtonPress = () => {
    setTimeout(() => {
      if (this.props.login.isRejected) {
        this.setState(
          {
            visible: true,
          },
          () => this.hideToast(),
        );
      }
    }, 500);
  };

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleSubmit = values => {
    this.props.loginAction(qs.stringify(values));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.login !== this.props.login) {
      const {isFulfilled, token} = this.props.login;
      const {refreshToken} = this.props.login.response;
      if (isFulfilled && token.length <= 0) {
        this.props.tokenAction(
          qs.stringify({
            token: refreshToken,
          }),
        );
        this.props.navigation.navigate('LandingPage');
      }
    }
  }

  goToSignup = () => this.props.navigation.navigate('Register');

  goBack = () => this.props.navigation.goBack();

  render() {
    const {visible} = this.state;
    const {errorMsg} = this.props.login;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          containerStyle={styles.header}
          backgroundColor="#F8"
          placement="left"
          leftComponent={
            <Button
              buttonStyle={styles.backButton}
              icon={<Ionicons name="md-arrow-back" size={24} />}
              onPress={this.goBack}
            />
          }
          centerComponent={{
            text: 'Login',
            style: {color: '#000000', fontSize: 22},
          }}
        />
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            this.handleSubmit(values);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
          }) => (
            <>
              <ErrorMessage errorValue={touched.name && errors.name} />
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter password"
                secureTextEntry
                autoCapitalize="none"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur('password')}
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={() => {
                    handleSubmit();
                    this.handleButtonPress();
                  }}
                  title="Login"
                  buttonColor="#000000"
                  disabled={!isValid}
                />
              </View>
            </>
          )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={styles.titleSignup}
          type="clear"
        />
        <Toast visible={visible} message={errorMsg} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  buttonContainer: {
    margin: 20,
  },
  header: {
    paddingTop: 0,
    height: 60,
    backgroundColor: '#CDD5DC',
    borderBottomColor: '#CDD5DC',
    elevation: 10,
  },
  backButton: {
    backgroundColor: '#CDD5DC',
    borderRadius: 50,
    width: 40,
  },
  titleSignup: {
    color: '#B2B6BB',
  },
});

const mapStateToProps = ({login}) => {
  return {
    login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAction: body => {
      dispatch(loginActionCreator(body));
    },
    tokenAction: body => {
      dispatch(tokenActionCreator(body));
    },
    getBooksAction: () => {
      dispatch(getBooksActionCreator());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
