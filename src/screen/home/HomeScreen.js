import React from 'react';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreens = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Icon name="map" color="#ffffff" size={120} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.textBanner}>BS</Text>
        <Text style={styles.textHeadear}>Bangsue restaurants</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={Actions.searchRestaurant}>
        <Text style={styles.buttonText}>Find your restaurants</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13999b',
    padding: 12,
    paddingTop: 45,
  },
  textBanner: {
    color: '#ffffff',
    fontSize: 54,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  textHeadear: {
    color: '#1b4b4b',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#ec6664',
  },
  logo: {
    elevation: 4,
    alignSelf: 'center',
    ...Platform.select({
      android: {
        marginTop: 0,
        marginBottom: 0,
      },
      ios: {
        marginTop: 100,
        marginBottom: 30,
      },
    }),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
