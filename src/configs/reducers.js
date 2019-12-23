import {combineReducers} from 'redux';
import searchPlace from '../redux/searchPlace/searchPlaceSlice';
import placeDetail from '../redux/placeDetail/placeDetailSlice';

export default combineReducers({
  searchPlace,
  placeDetail,
});
