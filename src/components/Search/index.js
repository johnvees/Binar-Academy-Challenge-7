import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';
import {colors, fonts} from '../../utils';

const Search = () => {
  const [Pencarian, setPencarian] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Here"
        placeholderTextColor={colors.text.secondary}
        selectionColor={colors.text.primary}
        onChangeText={text => {
          setPencarian(text);
        }}
      />
      <TouchableOpacity style={styles.button}>
        <Feather name="search" size={ms(24)} color={colors.button.text} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginEnd: ms(24),
    borderRadius: ms(6),
    backgroundColor: colors.background.secondary,
    height: ms(36),
    paddingHorizontal: ms(16),
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    fontSize: ms(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  button: {
    padding: ms(6),
    borderRadius: ms(8),
    backgroundColor: colors.button.background,
    shadowColor: colors.button.background,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
