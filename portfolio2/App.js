import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList } from 'react-native-gesture-handler';
import { useState, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import {Card} from 'react-native-paper';


//component 2
function Newsletter(){


}

//component 1
function Listings() {
  let saleItems = [
    { 
      id: 1,  
      name: "Hoodie", 
      image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80',
      description: "Black hoodie" ,
      price: "30.00"
    },
    { 
      id: 2, 
      name: "Shorts", 
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Womens running shorts",
      price: "18.00"
    },
    { 
      id: 3,  
      name: "T-shirt",
      image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      description: "Oversized graphic tee",
      price: "15.00"
    },
  ]
  const renderData = (item) => {
    return(
      <Card style = {styles.card}>
        <Card.Cover source={{ uri: item.image }} />
        <Text style = {{fontSize:25}}>{item.name}</Text>
        <Text style = {{fontSize:15}}>{item.description}</Text>
        <Text style = {{fontSize:20}}>$ {item.price}</Text>
      </Card>   
    )
  }
  return (
     
    <FlatList
    data = {saleItems}
    renderItem = {({item}) => {
        return renderData(item)
    }}
    keyExtractor = {item => `${item.id}`}
    />   
  )
}

//Screen 1
function Products({ navigation }) {
  return (
    <View style={styles.container}>
      <Text styles={{fontSize:25}}>Products</Text>
      <Listings></Listings>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

//Screen 2
function Screen2({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Screen 2</Text>
      
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

//Screen 3
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Browse products"
        onPress={() => navigation.navigate('Products')}
      />
      <Button
        title="Join our Newsletter"
        onPress={() => navigation.navigate('Screen 2')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Screen 2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 400,
    padding: 10, 
    margin: 10, 
    backgroundColor:"#e5e5e5"
  },
  pageTitle: {
    fontSize: 25,
  }
});
