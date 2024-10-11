
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';


const App = () => {

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
    <View style={[styles.mainContainer]}>
      <View style={[styles.container, { backgroundColor:  getRandomColor()}]}>
      </View>
      <View style={[styles.container, { backgroundColor: getRandomColor()}]}>

      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    backgroundColor: `yellow`,
    flex: 1
  }
});

export default App;
