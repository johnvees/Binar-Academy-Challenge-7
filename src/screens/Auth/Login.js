import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Gap, Loading} from '../../components';
import {useDispatch} from 'react-redux';

import Logo from '../../assets/logo.png';
import {colors, fonts, showError, storeData, useForm} from '../../utils';
import {ms} from 'react-native-size-matters';
import {Fire} from '../../configs';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = Fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user: ', user);
        navigation.replace('MainApp');
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  const postLogin = () => {
    console.log('isi form: ', form);
    dispatch({type: 'SET_LOADING', value: true});
    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        console.log('success: ', res);
        dispatch({type: 'SET_LOADING', value: false});
        Fire.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(resDB => {
            console.log('data user: ', resDB.val());
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('MainApp');
            }
          });
      })
      .catch(err => {
        console.log('error: ', err);
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentLogo}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <Gap height={ms(24)} />
        <Text style={styles.title}>Welcome Back!</Text>
        <Gap height={ms(16)} />
        <TextInput
          style={styles.textInput}
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
        <Button type={'fullButton'} title={'Login'} onPress={postLogin} />
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button
          type={'textOnly'}
          secondaryTitle={"Don't Have an Account Yet?"}
          primaryTitle={' Register Here'}
          onPress={() => navigation.replace('Register')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
