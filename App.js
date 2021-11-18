import * as React from 'react';
import { useState } from 'react';
import { Button, View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SvgUri } from "react-native-svg";

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
    flexDirection: "column",
    flex: 1,
    margin: 0,
    padding: 0,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#737FC0',
  },

  headerContainer: {
    flex : 3.5,
    justifyContent: "center",
    flexDirection: "column",
    //alignItems: "center",
  },

  buttonContainer: {
    backgroundColor: "white",
    flex: 3,
    padding: 20,
    margin: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    justifyContent: "center",
    
  },
  
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  
  title: {
    //flex: 1,
    fontSize: 32,

    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    //flexWrap: "wrap",
  },
  
  subtitle: {
    fontSize: 16,
    color: "#7B7171",
    padding: 10,
    marginVertical: 0,
    textAlign: "center",
  },

  buttons: {
    backgroundColor: "#DDDFFF",
    padding: 20,
    margin: 0,
    borderRadius: 50,
	  marginVertical: 0,
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  buttonText: {
    fontSize: 25,
    color: 'black',
	  fontWeight: "bold",
  }, 
  //flex box containing button + description text
  buttonTextContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "space-around",
    alignItems: 'center',
    width: "90%",
  },

  bottomRectangle: {
    flex: 0.2,
    backgroundColor: "black",
    justifyContent: "flex-end",
  },

  imgContainer: {
    margin: 10,
    flex: 5,

    alignItems: "center",
    justifyContent: "flex-end",
  },

  imgStyle: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
	  
});

function HomeScreen({ navigation }) {
  return (
    
    <View style={styles.container}>
      <View style = {styles.headerContainer}>
        <View style = {styles.imgContainer}>
          <Image 
              source = {require("./assets/homeScreen_icon.png")}
              style = {styles.imgStyle}
              />
        </View>
        <View style = {{flex: 2, width: "100%"}}>
          <Text style = {styles.title}> {"UIUC Bike Rack Locations"}</Text>
        </View>
        
      </View>
      <View style = {styles.buttonContainer}>
        <View style = {styles.buttonTextContainer}>
          <TouchableOpacity onPress={() => {
                navigation.navigate('Maps');
              }} style={styles.buttons}>
              <Text style={styles.buttonText}>Go to Map</Text>
          </TouchableOpacity>
          <Text style = {[styles.subtitle, {marginBottom: 0}]}>Map of Bike Rack Locations on campus.</Text>
          
        </View>
        
        
        <View style = {styles.buttonTextContainer}>
          <TouchableOpacity onPress={() => {
                navigation.navigate('Menu');
              }} style={styles.buttons}>
              <Text style={styles.buttonText}>Go to Menu</Text>
          </TouchableOpacity>
          <View>
            <Text style = {[styles.subtitle, {marginBottom: 0}]}>Lists nearest bike rack locations within 0.5 miles of your location.</Text>
          </View>
        </View>

      </View>
      <View style = {styles.bottomRectangle}></View>
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
