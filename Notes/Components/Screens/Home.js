import React from 'react';

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from 'react-native';

const Home = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../Assets/Notes.png')}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar
        barStyle="white"
        hidden={false}
        backgroundColor="black"
        translucent={true}
      />
      <View style={styles.viewOne}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notes')}
          style={styles.button}>
          <Text style={styles.buttonText}>Continue </Text>
          <Text style={styles.icon}>
            <Ionicons
              
              name="arrow-forward"
              size={30}
              color="black"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  viewOne: {
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    width: 200,
    height: 50,
    borderRadius: 10,
    top: 670,
    left: 80,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems:'center'
    
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    
  },
  
});

export default Home;
