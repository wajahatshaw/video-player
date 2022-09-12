import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducers from './src/redux/reducers'
import MainScreen from "./src/components/MainScreen";

const store = createStore(reducers) 
function App() {

  return (
    <Provider store={store}>
    <View style={styles.mainContainer}>
      <MainScreen/>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    marginTop: 40,
    marginHorizontal: 20,
    alignItems:'center',justifyContent:'center',
  }
});

export default App;