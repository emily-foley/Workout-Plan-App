import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList } from 'react-native-gesture-handler';
import { useState, useCallback, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {Card} from 'react-native-paper';

const Stack = createNativeStackNavigator();

function Cooldown() {
  //storing the number of seconds and setting seconds to 45
  let [seconds, setSeconds] = useState(45);
  //storing the timer's state (active/timing or paused), setting the default to paused (false)
  let [isActive, setIsActive] = useState(false);

  //setting the value of isActive to the opposite of what it is (if it is paused it will switch to timing and vice versa)
  function toggle() {
    setIsActive(!isActive);
  }

  //resetting the timer by setting seconds to 45 and setting isActive to false 
  function reset() {
    setSeconds(45);
    setIsActive(false);
  }

  //if isActive is true set the interval to decrease by 1 every 1000 milliseconds
  //if setActive is false, the interval is cleared
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{seconds}s</Text>
      <TouchableOpacity style={styles.button} onPress={toggle}>{isActive ? 'Pause' : 'Start'}</TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={reset}>Reset</TouchableOpacity>
    </View>
  );
};



function Warmups(){
  let stretches = [
    { 
      id: 1,  
      name: "Standing Hamstring Stretch", 
      image: '../images/hamstringstretch.png',
    },
    { 
      id: 2, 
      name: "Triceps stretch", 
      image: '../images/tricepStretch.jpeg',
      description: "Bend your right elbow and reach your right hand to touch the top middle of your back.",
    },
    { 
      id: 3,  
      name: "Butterfly stretch",
      image: '../images/butterflyStretch.jpeg',
      description: "Sit on the floor or a prop with the soles of your feet pressing into each other.",
    },
  ]
  const renderData = (item) => {
    return(
      <Card style = {styles.card}>
        <Card.Cover source={item.image} />
        <Text style = {{fontSize:25}}>{item.name}</Text>
        <Text style = {{fontSize:15}}>{item.description}</Text>
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
      <Button title="Cool down"
        onPress={() => navigation.navigate('Cooldown')}></Button>
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
        <Stack.Screen name="Cooldown" component={Cooldown} />
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
  button: {
    alignItems: "center",
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '50%',
  },
  timerText: {
    fontSize: 100,
    paddingBottom: 50,
  }
});