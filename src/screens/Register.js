import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, ToastAndroid} from 'react-native';
import {Button, Header} from 'react-native-elements';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import qs from 'querystring';
import {Formik} from 'formik';
import * as yup from 'yup';
import {connect} from 'react-redux';
import {registerActionCreator} from '../redux/actions/register';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label('Full name')
    .required('Please enter full name'),
  email: yup
    .string()
    .label('Email')
    .email('Enter email')
    .required('Please enter email'),
  password: yup
    .string()
    .label('Password')
    .required('Please enter password')
    .matches(
      /^(?=.*[a-z])(?=.*[0-9]).{8,}$/i,
      'Password must be minimum 8 characters, at least one letter and one number',
    ),
  confirmPassword: yup
    .string()
    .required('Please enter password again')
    .label('Confirmation password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
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

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    visible: false,
  };

  handleButtonPress = () => {
    setTimeout(() => {
      if (this.props.register.isRejected) {
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

  handleNameChange = name => {
    this.setState({name});
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleConfirmPasswordChange = confirmPassword => {
    this.setState({confirmPassword});
  };

  handleSubmit = values => {
    const {name, email, password} = values;
    const {registerAction} = this.props;
    registerAction(
      qs.stringify({
        name,
        email,
        password,
        role: 2,
      }),
    );
  };

  goToLogin = () => this.props.navigation.navigate('Login');

  goBack = () => this.props.navigation.goBack();

  componentDidUpdate(prevProps) {
    if (prevProps.register !== this.props.register) {
      const {isFulfilled} = this.props.register;
      if (isFulfilled) {
        this.props.navigation.navigate('Login');
      }
    }
  }

  render() {
    const {visible} = this.state;
    const {errorMsg} = this.props.register;
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
            text: 'Register',
            style: {color: '#000000', fontSize: 22},
          }}
        />
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
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
              <FormInput
                name="name"
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Enter full name"
                autoCapitalize="words"
                iconName="ios-contact"
                iconColor="#2C384A"
                onBlur={handleBlur('name')}
              />
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
              <FormInput
                name="confirmPassword"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder="Enter confirmation password"
                secureTextEntry
                autoCapitalize="none"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur('confirmPassword')}
              />
              <ErrorMessage
                errorValue={touched.confirmPassword && errors.confirmPassword}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={() => {
                    handleSubmit();
                    this.handleButtonPress();
                  }}
                  title="Sign Up"
                  buttonColor="#000000"
                  disabled={!isValid}
                />
              </View>
            </>
          )}
        </Formik>
        <Button
          title="Have an account? Login"
          onPress={this.goToLogin}
          titleStyle={styles.textLogin}
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
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#CDD5DC',
    borderRadius: 50,
    width: 40,
  },
  textLogin: {
    color: '#B2B6BB',
  },
});

const mapStateToProps = ({register}) => {
  return {
    register,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerAction: body => {
      dispatch(registerActionCreator(body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
