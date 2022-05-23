import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Gap} from '../../components';

import Logo from '../../assets/logo.png';
import {colors, fonts} from '../../utils';
import {ms} from 'react-native-size-matters';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  // const [border, setBorder] = useState(colors.background.primary);

  // const onFocusForm = () => {
  //   setBorder(colors.button.background);
  // };

  // const onBlurForm = () => {
  //   setBorder(colors.background.primary);
  // };

  const postRegister = () => {
    console.log(email, password, fullName);
    // navigation.replace('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentLogo}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <Gap height={ms(24)} />
      <Text style={styles.title}>Nice To See You!</Text>
      <Gap height={ms(16)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          style={styles.textInput}
          // onFocus={onFocusForm}
          // onBlur={onBlurForm}
          placeholder="Email"
          placeholderTextColor={colors.text.secondary}
          selectionColor={colors.text.primary}
          value={email}
          onChangeText={value => {
            setEmail(value);
          }}
        />
        <Gap height={ms(16)} />
        <TextInput
          style={styles.textInput}
          // onFocus={onFocusForm}
          // onBlur={onBlurForm}
          placeholder="Full Name"
          placeholderTextColor={colors.text.secondary}
          selectionColor={colors.text.primary}
          value={fullName}
          onChangeText={value => {
            setFullName(value);
          }}
        />
        <Gap height={ms(16)} />
        <TextInput
          style={styles.textInput}
          // onFocus={onFocusForm}
          // onBlur={onBlurForm}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={colors.text.secondary}
          selectionColor={colors.text.primary}
          value={password}
          onChangeText={value => {
            setPassword(value);
          }}
        />
        <Gap height={ms(16)} />
        <TextInput
          style={styles.textInput}
          // onFocus={onFocusForm}
          // onBlur={onBlurForm}
          placeholder="Re-Enter Password"
          secureTextEntry={true}
          placeholderTextColor={colors.text.secondary}
          selectionColor={colors.text.primary}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <Gap height={ms(16)} />
        <Button type={'fullButton'} title={'Register'} onPress={postRegister} />
      </ScrollView>

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button
          type={'textOnly'}
          secondaryTitle={'Already Have an Account?'}
          primaryTitle={' Login Here'}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: ms(24),
  },
  contentLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: colors.icon.danger,
  },
  logo: {
    width: ms(100),
    height: ms(100),
  },
  title: {
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    fontSize: ms(32),
  },
  textInput: {
    borderRadius: ms(6),
    backgroundColor: colors.background.secondary,
    // borderWidth: 1,
    // borderColor: border,
    height: ms(44),
    paddingHorizontal: ms(16),
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    fontSize: ms(14),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
