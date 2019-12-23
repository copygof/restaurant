import _ from 'lodash';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSlice} from '@reduxjs/toolkit';
import RNGooglePlaces from 'react-native-google-places';

// ========= initialState =======================
export const initialState = {
  isFetching: false,
  error: null,
  data: {},
};

// ========= Slice =======================
const placeDetail = createSlice({
  name: 'placeDetail',
  initialState,
  reducers: {
    placeDetailRequest(state, action) {
      state.error = null;
      state.data = {};
      state.isFetching = true;
    },
    placeDetailSuccess(state, action) {
      state.isFetching = false;
      state.data = action.payload.data;
    },
    placeDetailFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

// ========= Actions =======================
export const {
  placeDetailRequest,
  placeDetailSuccess,
  placeDetailFailure,
} = placeDetail.actions;

export default placeDetail.reducer;

// ========= Selectors =======================
export const placeDetailSelector = state => state.placeDetail;

// ========= Thunks =======================
export function getPlaceDetail(placeID) {
  return dispatch => {
    dispatch(placeDetailRequest());
    return RNGooglePlaces.lookUpPlaceByID(placeID)
      .then(places => {
        console.log('places => ', JSON.stringify(places));
        dispatch(placeDetailSuccess({data: places}));
      })
      .catch(error => dispatch(placeDetailFailure({error: error.message})));
  };
}

// ========= Hooks =======================
export function usePlaceDetail() {
  const dispatch = useDispatch();
  const {isFetching, error, data} = useSelector(placeDetailSelector);

  const getPlaceDetailById = useCallback(
    placeID => {
      dispatch(getPlaceDetail(placeID));
    },
    [dispatch],
  );

  return {
    isFetching,
    error,
    data,
    getPlaceDetailById,
  };
}
