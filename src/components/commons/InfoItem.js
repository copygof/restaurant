import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InfoItem = ({iconName, textInfo, isLink, onPressLink}) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={30} color="#ec6664" style={styles.icon} />
      <Text
        style={[styles.text, isLink && styles.textLink]}
        {...(onPressLink ? {onPress: onPressLink} : {})}>
        {textInfo}
      </Text>
    </View>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    margin: 1,
    borderTopColor: '#3333331A',
    borderTopWidth: 1,
  },
  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
    marginLeft: 10,
    alignSelf: 'center',
  },
  textLink: {
    color: '#ec6664',
  },
  icon: {
    width: 44,
  },
});
