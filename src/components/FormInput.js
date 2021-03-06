
import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...props
}) => (
    <View style={styles.inputContainer}>
      <Input
        {...props}
        leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
        leftIconContainerStyle={styles.iconStyle}
        placeholderTextColor='grey'
        name={name}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  )

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15, marginBottom: -20
  },
  iconStyle: {
    marginRight: 10
  }
})

export default FormInput