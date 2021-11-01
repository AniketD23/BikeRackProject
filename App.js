import * as React from 'react';
import { useState } from 'react';
import { Button, View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Bike Rack One',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Bike Rack Two',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: ' Bike Rack Three',
  },
];


const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  
  title: {
    fontSize: 32,
  },
});

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Maps"
        onPress={() => {
          navigation.navigate('Maps');
        }}
      />
	  <Text> </Text>
	  <Button
        title="Go to Menu"
        onPress={() => {
          navigation.navigate('Menu');
        }}
      />
    </View>
  );
}

function MapsScreen({ navigation }) {
  return (
    <View style={[styles.container, {
      flexDirection: "column"
    }]}>
      <View style={{ flex: 1}}>
	
		<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	  
      <View style={{ flex: 9, alignItems: "center"}}>	  
		<Image
			source={{
				uri: 'https://www.parking.illinois.edu/sites/default/files/inline-images/campus-parking-map.png',
			}}	
			style={{ width: 300, height: 600 }}
		/>
		</View>
    </View>
	
	
	
  );
}


function MenuScreen({ navigation }) {
	
	const [selectedId, setSelectedId] = useState(null);
	
	const renderItem = ({ item }) => {
		const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
		const color = item.id === selectedId ? 'white' : 'black';

		return (
		  <Item
			item={item}
			onPress={() => setSelectedId(item.id)}
			backgroundColor={{ backgroundColor }}
			textColor={{ color }}
		  />
		);
	  };
	
  return (
  
    <View style={[styles.container, {
      flexDirection: "column"
    }]}>
      <View style={{ flex: 9 }}> 
		<SafeAreaView style={styles.container}>
		  <FlatList
			data={DATA}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			extraData={selectedId}
		  />
		</SafeAreaView>
	  
	
		</View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
		<Button title="Go to Home Screen" onPress={() => navigation.navigate('Home')} />
		</View>
    </View>
	
	
	
	);
	}




const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
			name="Home" 
			component={HomeScreen} 
			options={{ title: 'Illinois Bike Rack Locations' }}
		/>
        <Stack.Screen
			name="Maps"
			component={MapsScreen}
			// initialParams={{ itemId: 42 }}
		/>
		<Stack.Screen
			name="Menu"
			component={MenuScreen}
			options={{ title: 'Bike Rack Locations' }}
			
			// initialParams={{ itemId: 42 }}
		/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
