import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { DataTable } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';


const getTime = (item) => {
  let milliseconds = item.timestamp
  let dateObject = new Date(milliseconds)
  let humanDateFormat = dateObject.toLocaleString()


  return humanDateFormat
}
const getPostureName = (value) => {
  if (value == 0) return 'Standing'
  else if (value == 1) return 'Resting'
  else if (value == 2) return 'Moving'
  return 'Eating'
}

export default function Report() {

  const [arr, setarr] = useState([]);
  const getallvalues = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/values/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        setarr(data.results.slice(0, 10))
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getallvalues();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container} >
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ alignSelf: 'center' }}>Posture</DataTable.Title>
            <DataTable.Title style={{ alignSelf: 'center' }}>Time</DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={arr}
            renderItem={({ item, index }) => (
              <DataTable.Row>
                <DataTable.Cell style={{ alignSelf: 'center' }}>{getPostureName(item.value)}</DataTable.Cell>
                <DataTable.Cell style={{ alignSelf: 'center' }}>{getTime(item)}</DataTable.Cell>
              </DataTable.Row>)}
            keyExtractor={(item, index) => index.toString()} />
        </DataTable>
      </View>
      <View style={styles.buttonContainer}>
        <FontAwesome.Button name="refresh" backgroundColor="#b2c2b5" onPress={() => getallvalues()}>Reload</FontAwesome.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 6,
  },
  tableContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: '37%',
    alignSelf: 'center',
  }
});
