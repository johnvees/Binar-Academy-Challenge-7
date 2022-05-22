import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors, fonts} from '../../utils';

const Header = ({title, type}) => {
  if (type === 'chat') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="message-plus-outline"
              size={ms(24)}
              color={colors.white}
              style={{marginRight: ms(16)}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons
              name="notifications-none"
              size={ms(24)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else if (type === 'contact') {
    return (
      <SafeAreaView>
        <Text>{title}</Text>
      </SafeAreaView>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.primary[500],
    fontSize: ms(24),
  },
});
