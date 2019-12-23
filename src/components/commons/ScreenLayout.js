import React, {useEffect} from 'react';
import {Platform, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Header from './Header';

const ScreenLayout = ({children, navbarProps}) => {
  useEffect(() => {
    StatusBar.setBackgroundColor('#13999b');
  }, []);

  if (Platform.OS === 'android') {
    return (
      <React.Fragment>
        <Header {...navbarProps} />
        {children}
      </React.Fragment>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header {...navbarProps} />
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? '#ffffff' : '#13999b',
  },
});
