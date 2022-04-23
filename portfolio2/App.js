import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList } from 'react-native-gesture-handler';
import { useState, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import {Card} from 'react-native-paper';

const Stack = createNativeStackNavigator();

function Warmups(){
  let stretches = [
    { 
      id: 1,  
      name: "Standing Hamstring Stretch", 
      image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80',
      description: "Bend forward at the hips and touch your toes" ,
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
    data = {stretches}
    renderItem = {({item}) => {
        return renderData(item)
    }}
    keyExtractor = {item => `${item.id}`}
    />   
  )
}


function ExerciseScreen({ route, navigation }) {
  let [count, setCount] = useState(0);
  let {exerciseList, exerciseKey } = route.params
  let gotoExercise = useCallback(() => {
    navigation.push("RepetitionExercise", { exerciseList: exerciseList, exerciseKey: currentExercise.suggestedKey, count: route.params.count + 1})
  })
  let currentExercise = exerciseList.find(ex => ex.key === exerciseKey)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{currentExercise.name} : {currentExercise.description}</Text>

      <Text>Reps: {count}</Text>
      <Button title="Complete rep" onPress={() => setCount(count + 1)}></Button>
      <Button title="Reset" onPress={() => setCount(0)}>Reset</Button>
      
      <Text styles={styles.suggestedExercise}>Suggested exercise:</Text>
      <Button onPress={gotoExercise} title="Go to Screen"></Button>

      <Button title="Home" onPress={() => navigation.navigate('Home')}></Button>

      <StatusBar style='auto'/>
    </View>
  );
}


function HomeScreen({ navigation }) {
  let exerciseList = [
  { 
    key: "1",  
    name: "Pushups", 
    description: "Done laying with face, palms and toes facing down, keeping legs and back straight, extending arms straight to push body up and back down again" ,
    suggestedKey: "2"
  },
  { 
    key: "2", 
    name: "Jumping Jacks", 
    description: "Performed from a standing position by jumping to a position with legs spread and arms raised",
    suggestedKey: "3"
  },
  { 
    key: "3",  
    name: "Sit ups",
    description: "Done by lying on your back and lifting your torso",
    suggestedKey: "1"
  },
]

  let gotoExercise = useCallback(({ key }) => {
    navigation.navigate("RepetitionExercise", { exerciseKey: key, count: 0, exerciseList })
  })

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Warm ups"
        onPress={() => navigation.navigate('Warmups')}></Button>
      <FlatList 
        data={exerciseList}
        renderItem={
          ({ item }) => <Button onPress={() => gotoExercise(item)} title={item.name}></Button>
        }
      />
      <StatusBar style='auto'/>
    </View>
  );
}



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RepetitionExercise" component={ExerciseScreen} />
        <Stack.Screen name="Warmups" component={Warmups} />
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
  text: {
    width: '400px',
    marginBottom: '30px',
  },
  suggestedExercise: {
    paddingTop: '100px',
  },
  card: {
    width: 400,
    padding: 10, 
    margin: 10, 
    backgroundColor:"#e5e5e5"
  },
});