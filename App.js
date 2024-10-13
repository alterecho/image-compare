
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet, Dimensions, useWindowDimensions, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';


const App = () => {

  const Toolbar = () => {
    return (
      <View style={styles.toolbar}>
        <Button title='add'>
        </Button>
        <Button title='camera'>
        </Button>
        <Button title='compare'>
        </Button>
      </View>
    )
  }

  const getRandomColor = () =>  {
    let color = {
      r: Math.random() * 256,
      g: Math.random() * 256,
      b: Math.random() * 256,
    }
    
    console.log(`rgb: ${JSON.stringify(color)}`)
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };
  console.log("returning View")

  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <View style={[styles.container, { backgroundColor:  getRandomColor()}]}>
        <Toolbar />
      </View>
      <View style={[styles.container, { backgroundColor: getRandomColor()}]}>
        <Toolbar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#6200EE',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16, 
   },

  mainContainer: {
    flex: 1
  },
  container: {
    backgroundColor: `yellow`,
    flex: 1
  }
});

export default App;
