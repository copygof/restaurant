import _ from 'lodash';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSlice} from '@reduxjs/toolkit';
import RNGooglePlaces from 'react-native-google-places';

// ========= initialState =======================
export const initialState = {
  isFetching: false,
  error: null,
  data: [],
};

// ========= Slice =======================
const searchPlace = createSlice({
  name: 'searchPlace',
  initialState,
  reducers: {
    searchPlaceRequest(state, action) {
      state.error = null;
      state.data = [];
      state.isFetching = true;
    },
    searchPlaceSuccess(state, action) {
      state.isFetching = false;
      state.data = action.payload.data;
    },
    searchPlaceFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

// ========= Actions =======================
export const {
  searchPlaceRequest,
  searchPlaceSuccess,
  searchPlaceFailure,
} = searchPlace.actions;

export default searchPlace.reducer;

// ========= Selectors =======================
export const searchPlaceSelector = state => state.searchPlace;

// ========= Thunks =======================
export function searchPlaceList(query) {
  return dispatch => {
    dispatch(searchPlaceRequest());
    return RNGooglePlaces.getAutocompletePredictions(
      query,
      {
        type: 'restaurant',
        country: 'TH',
        locationRestriction: {
          latitudeNE: 13.8496853,
          longitudeSW: 100.5063032,
          latitudeSW: 13.7972891,
          longitudeNE: 100.5449568,
        },
      },
      [
        'photos',
        'name',
        'placeID',
        'plusCode',
        'location',
        'openingHours',
        'phoneNumber',
        'address',
        'rating',
        'userRatingsTotal',
        'priceLevel',
        'types',
        'website',
        'viewport',
        'addressComponents',
      ],
    )
      .then(places => {
        dispatch(searchPlaceSuccess({data: places}));
      })
      .catch(error => dispatch(searchPlaceFailure({error: error.message})));
  };
}

// ========= Hooks =======================
export function usePlaceListByWording() {
  const dispatch = useDispatch();
  const {isFetching, error, data} = useSelector(searchPlaceSelector);

  const searchPlaceByWording = useCallback(
    query => {
      dispatch(searchPlaceList(query));
    },
    [dispatch],
  );

  return {
    isFetching,
    error,
    data,
    searchPlaceByWording,
  };
}
