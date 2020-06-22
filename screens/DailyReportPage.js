import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Report from './screens/report'

const getTime = (item) => {
  let milliseconds = item.timestamp * 1000 // 1575909015000
  let dateObject = new Date(milliseconds)
  let humanDateFormat = dateObject.toLocaleString() //2
  return <Text> {humanDateFormat} </Text>
}

export default function App() {

  const [currentPosture, setCurrentPosture] = useState(0);
  const [allPostures, setAllPostures] = useState([]);

  const getCurrentPosture = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/lv/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCurrentPosture(data)
      });
  }

  const getAllPostures = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/values/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        setAllPostures(data.results)
        console.log(allPostures);
      });

  }

  useEffect(() => {
    getCurrentPosture()
    getAllPostures()
  }, []);


  return  <Report/>
  //   (<View style={styles.container}>
  //     <Text>Current posture is  {currentPosture}</Text>
  //     <FlatList
  //       data={allPostures}
  //       renderItem={({ item }) => (
  //         <View>
  //           <Text>{item.value}</Text>
  //           <Text> {getTime(item)}</Text>
  //         </View>
  //       )}
  //     />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
