import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../utils';
import {ms} from 'react-native-size-matters';

const Button = ({
  onPress,
  type,
  title,
  secondaryTitle,
  primaryTitle,
  danger,
}) => {
  if (type === 'fullButton') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button(danger)}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  } else if (type === 'textOnly') {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.secondaryText}>
          {secondaryTitle}
          <Text style={styles.primaryText}>{primaryTitle}</Text>
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View>
        <Text>Button</Text>
      </View>
    );
  }
};

export default Button;

const styles = StyleSheet.create({
  button: danger => ({
    backgroundColor: danger ? colors.icon.danger : colors.button.background,
    borderRadius: ms(8),
    paddingVertical: ms(10),
    paddingHorizontal: ms(24),
  }),
  buttonText: {
    fontSize: ms(16),
    fontFamily: fonts.primary[600],
    color: colors.button.text,
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: ms(14),
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textAlign: 'center',
  },
  primaryText: {
    fontSize: ms(14),
    fontFamily: fonts.primary[600],
    color: colors.button.background,
    textAlign: 'center',
  },
});
