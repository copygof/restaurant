import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {usePlaceListByWording} from '../../redux/searchPlace/searchPlaceSlice';
import ScreenLayout from '../../components/commons/ScreenLayout';

const SearchRestaurantScreen = () => {
  const {searchPlaceByWording, isFetching, data} = usePlaceListByWording();
  const [isOpenSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText) {
      searchPlaceByWording(searchText);
    }
  }, [searchPlaceByWording, searchText]);

  return (
    <ScreenLayout navbarProps={{title: 'Find restaurants'}}>
      <View style={styles.container}>
        {!isOpenSearch ? (
          <TouchableOpacity
            style={styles.inputLauncher}
            onPress={() => setOpenSearch(true)}>
            <Text style={styles.buttonText}>Restaurant name ?</Text>
          </TouchableOpacity>
        ) : (
          <React.Fragment>
            <TextInput
              style={[styles.inputLauncher, styles.buttonText]}
              placeholder="Enter a restaurant name"
              onChangeText={setSearchText}
              value={searchText}
              autoFocus={isOpenSearch}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setOpenSearch(false);
                setSearchText('');
              }}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </React.Fragment>
        )}
        <FlatList
          data={searchText ? data : []}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.placeID}
              style={styles.item}
              onPress={() =>
                Actions.restaurantDetail({
                  placeID: item.placeID,
                })
              }>
              <Text style={styles.textTitle}>{item.primaryText}</Text>
              <Text style={styles.textDescription}>{item.secondaryText}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            isFetching ? (
              <Text style={styles.buttonText}>Loading...</Text>
            ) : null
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ScreenLayout>
  );
};

export default SearchRestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#1b4b4b',
  },
  item: {
    padding: 8,
  },
  textTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1b4b4b',
    fontWeight: '500',
  },
  textDescription: {
    fontSize: 12,
    lineHeight: 20,
    color: '#1b4b4b',
  },
  inputLauncher: {
    backgroundColor: '#F3F7F9',
    width: '100%',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 16,
    paddingRight: 30,
  },
  separator: {
    height: 1,
    backgroundColor: '#33333326',
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
