import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Scene} from 'react-native-router-flux';
import store from '../configs/configStore';
import HomeScreen from '../screen/home/HomeScreen';
import SearchRestaurantScreen from '../screen/searchRestaurant/SearchRestaurantScreen';
import RestaurantDetailScreen from '../screen/restaurantDetail/RestaurantDetailScreen';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="home" component={HomeScreen} hideNavBar />
            <Scene
              key="searchRestaurant"
              component={SearchRestaurantScreen}
              hideNavBar
            />
            <Scene
              key="searchRestaurantResult"
              component={HomeScreen}
              hideNavBar
            />
            <Scene
              key="restaurantDetail"
              component={RestaurantDetailScreen}
              hideNavBar
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
