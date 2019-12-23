import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={Actions.pop}>
        <Icon name="keyboard-backspace" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'android' ? 48 : 68,
    backgroundColor: '#13999b',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: '#ffffff',
    alignSelf: 'center',
    fontWeight: '500',
    flex: 1,
  },
  textLink: {
    color: '#ec6664',
  },
  icon: {
    width: 44,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
