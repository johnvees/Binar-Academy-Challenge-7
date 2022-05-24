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
import {ms} from 'react-native-size-matters';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {Button, Gap, Loading} from '../../components';
import Logo from '../../assets/logo.png';
import {colors, fonts, useForm} from '../../utils';
import {Fire} from '../../configs';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useForm({
    email: '',
    fullName: '',
    password: '',
  });

  // const [border, setBorder] = useState(colors.background.primary);

  // const onFocusForm = () => {
  //   setBorder(colors.button.background);
  // };

  // const onBlurForm = () => {
  //   setBorder(colors.background.primary);
  // };

  const postRegister = () => {
    console.log(form);

    setLoading(true);
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        // https://firebase.com/users
        const data = {
          email: form.email,
          fullName: form.fullName,
        };

        Fire.database()
          .ref('users/' + success.user.uid + '/')
          .set(data);
        console.log(success);
      })
      .catch(error => {
        const errorMessage = error.message;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.icon.danger,
          color: colors.text.primary,
        });
      });
    // navigation.replace('MainApp');
  };

  return (
    <>
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
            value={form.email}
            onChangeText={value => {
              setForm('email', value);
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
            value={form.fullName}
            onChangeText={value => {
              setForm('fullName', value);
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
            value={form.password}
            onChangeText={value => {
              setForm('password', value);
            }}
          />
          <Gap height={ms(16)} />
          <Button
            type={'fullButton'}
            title={'Continue'}
            onPress={postRegister}
          />
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
      {loading && <Loading />}
    </>
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
