import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Linking, Clipboard} from 'react-native';
import _ from 'lodash';
import {usePlaceDetail} from '../../redux/placeDetail/placeDetailSlice';
import InfoItem from '../../components/commons/InfoItem';
import {Rating} from 'react-native-ratings';
import ScreenLayout from '../../components/commons/ScreenLayout';
import makePlaceTypeGreatingAgain from '../../utils/makePlaceTypeGreatingAgain';

const RestaurantDetailScreen = ({placeID}) => {
  const {isFetching, data, getPlaceDetailById} = usePlaceDetail();

  useEffect(() => {
    if (placeID) {
      getPlaceDetailById(placeID);
    }
  }, [getPlaceDetailById, placeID]);

  return (
    <ScreenLayout navbarProps={{title: 'Restaurant details'}}>
      <View style={styles.container}>
        {isFetching ? (
          <Text style={styles.buttonText}>Loading...</Text>
        ) : (
          <React.Fragment>
            <Text style={styles.textTitle}>{data.name}</Text>
            <View style={styles.wrapperRating}>
              <Text style={styles.textDescription}>
                {data.rating ? data.rating.toFixed(1) : '-'}
              </Text>
              <Rating
                startingValue={data.rating ? data.rating.toFixed(1) : 0}
                ratingCount={5}
                imageSize={12}
                style={styles.rating}
              />
              <Text style={styles.textDescription}>{`(${data.userRatingsTotal ||
                '-'})`}</Text>
            </View>
            <Text style={styles.placeType}>{`${
              data.types
                ? data.types.map(makePlaceTypeGreatingAgain).join(', ')
                : '-'
            }`}</Text>
            <InfoItem iconName="place" textInfo={data.address || '-'} />
            <InfoItem
              iconName="flare"
              textInfo={_.get(data, 'placeCode.compoundCode', '-') || '-'}
              onPressLink={() => {
                Clipboard.setString(_.get(data, 'placeCode.compoundCode', '-'));
              }}
            />
            <InfoItem
              iconName="phone"
              textInfo={data.phoneNumber || '-'}
              onPressLink={() => {
                Clipboard.setString(data.phoneNumber);
              }}
            />
            <InfoItem
              iconName="language"
              textInfo={data.website || '-'}
              isLink
              onPressLink={() => {
                if (data.website) {
                  Linking.canOpenURL(data.website)
                    .then(supported => {
                      if (!supported) {
                        alert("Can't handle url: " + data.website);
                      } else {
                        return Linking.openURL(data.website);
                      }
                    })
                    .catch(err => console.error('An error occurred', err));
                }
              }}
            />
          </React.Fragment>
        )}
      </View>
    </ScreenLayout>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  textTitle: {
    fontSize: 24,
    lineHeight: 28,
    color: '#1b4b4b',
    fontWeight: '500',
  },
  textDescription: {
    fontSize: 12,
    lineHeight: 20,
    color: '#1b4b4b',
  },
  placeType: {
    fontSize: 12,
    lineHeight: 20,
    color: '#1b4b4b',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    color: '#1b4b4b',
  },
  separator: {
    height: 1,
    backgroundColor: '#1b4b4b',
  },
  wrapperRating: {
    flexDirection: 'row',
    marginTop: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});
