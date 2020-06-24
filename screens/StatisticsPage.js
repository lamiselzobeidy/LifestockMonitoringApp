import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useFonts, NotoSerif_700Bold, NotoSerif_400Regular } from '@expo-google-fonts/noto-serif';
import { FontAwesome } from '@expo/vector-icons';

const getTime = (item) => {
  let milliseconds = item.timestamp
  let dateObject = new Date(milliseconds)
  let humanDateFormat = dateObject.toLocaleString()
  return humanDateFormat
}

const stillInTheInterval = (chosenInterval, currentDate) => {

  let DateNow = new Date();
  currentDate = new Date(currentDate)
  if (!chosenInterval) {
    return (DateNow.getDate() - currentDate.getDate()) <= 7
  }
  else if (chosenInterval == 1) {
    return (DateNow.getMonth() == currentDate.getMonth())
  }
  return (DateNow.getYear() == currentDate.getYear())
}
export default function LastValues() {
  let [fontsLoaded] = useFonts({
    NotoSerif_700Bold,
    NotoSerif_400Regular
  });

  const [arr, setarr] = useState([]);
  const [week, setweek] = useState([]);
  const [month, setmonth] = useState([]);
  const [year, setyear] = useState([]);
  const [showMoreFlag, setshowMoreFlag] = useState(0)
  const getallvalues = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/values/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        setarr(data.results)
      });
  }

  const getLastTime = (currentPosture) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value == currentPosture) {
        return getTime(arr[i])
      }
    }
  }

  const getNumberOfHours = () => {
    let interval = 1 //in seconds
    for (let chosenInterval = 0; chosenInterval < 3; chosenInterval++) {
      let l = [0, 0, 0, 0]
      for (let i = 0; i < arr.length; i++) {
        let flag = stillInTheInterval(chosenInterval, arr[i].timestamp)
        if (!flag) break
        if (arr[i].value >= 0 && arr[i].value <= 3) l[arr[i].value] += (interval)
      }
      if (!chosenInterval) {
        setweek(l)
      }
      else if (chosenInterval == 1) {
        setmonth(l)
      }
      else {
        setyear(l)
      }
    }
    setshowMoreFlag(1)
  }
  useEffect(() => {
    getallvalues()
  }, []);

  return (

    <View style={styles.container}>
      <View style={styles.lastUpdateContainer}>
        <Text style={styles.titleContainer}>Postures last detected at</Text>
        <Text style={styles.textContainer}>Eating "{getLastTime(3)}" </Text>
        <Text style={styles.textContainer}>Sleeping "{getLastTime(1)}"</Text>
        <Text style={styles.textContainer}>Moving "{getLastTime(2)}"</Text>
        <Text style={styles.textContainer}>Standing "{getLastTime(0)}"</Text>
      </View>
      {showMoreFlag ? (<View style={styles.tableContainer}>
        <DataTable >
          <DataTable.Header>
            <DataTable.Title style={{ alignSelf: 'center' }}>Posture</DataTable.Title>
            <DataTable.Title style={{ alignSelf: 'center' }}>Standing</DataTable.Title>
            <DataTable.Title style={{ alignSelf: 'center' }}>Resting</DataTable.Title>
            <DataTable.Title style={{ alignSelf: 'center' }}>Moving</DataTable.Title>
            <DataTable.Title style={{ alignSelf: 'center' }}>Eating</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell style={{ alignSelf: 'center' }}>Week</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{week[0]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{week[1]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{week[2]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{week[3]} mins</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{ alignSelf: 'center' }}>Month</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{month[0]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{month[1]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{month[2]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{month[3]} mins</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{ alignSelf: 'center' }}>Year</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{year[0]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{year[1]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{year[2]} mins</DataTable.Cell>
            <DataTable.Cell style={{ alignSelf: 'center' }}>{year[3]} mins</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View style={styles.btnContainer}>
          <FontAwesome.Button name="arrow-circle-o-up" backgroundColor="#b2c2b5" onPress={() => setshowMoreFlag(0)}>Show Less</FontAwesome.Button>
        </View>
      </View>)
        :
        (<View style={styles.tableContainer}>
          <FontAwesome.Button name="arrow-circle-o-down" backgroundColor="#b2c2b5" onPress={() => getNumberOfHours()}>Show More</FontAwesome.Button>
        </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-center',
    justifyContent: 'space-between'
  },
  lastUpdateContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
  },
  tableContainer: {
    flex: 3,
    paddingTop: 10,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 25,
  },
  btnContainer: {
    paddingTop: 10,
  }
});