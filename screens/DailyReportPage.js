import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


const getTime = (item)=> {
    let milliseconds = item.timestamp  
    let dateObject = new Date(milliseconds)
    let humanDateFormat = dateObject.toLocaleString() 


return  humanDateFormat
}
const getPostureName = (value)=>{
  if( value == 0 ) return 'Standing'
  else if( value == 1 ) return 'Resting'
  else if( value == 2) return 'Moving'
  return 'Eating'
}

export default function Report() {

  

  const [arr, setarr] = useState([]);

  const  getallvalues = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/values/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
    .then(response => response.json())
    .then(data => {
       console.log(data.results)
       setarr(data.results.slice(0,10))     
    });
  
  }

  useEffect(()=>{
    const interval = setInterval(() => {
      getallvalues();
    }, 1000);
    return () => clearInterval(interval);
    
 },[]);
    
  return (
    <View style={styles.container} >
      <View style={styles.tableContainer}>
    <DataTable>
      <DataTable.Header>
          <DataTable.Title  style={{alignSelf:'center'}}>Posture</DataTable.Title>
          <DataTable.Title style={{alignSelf:'center'}}>Time</DataTable.Title>
      </DataTable.Header>
      <ScrollView>
      <FlatList
            data={arr} 
            renderItem={ ( {item,index} )=>(
              <DataTable.Row>
                <DataTable.Cell style={{alignSelf:'center'}}>{getPostureName(item.value)}</DataTable.Cell>
                <DataTable.Cell style={{alignSelf:'center'}}>{getTime(item)}</DataTable.Cell> 
             </DataTable.Row> )}
            keyExtractor={(item, index) => index.toString()} />

</ScrollView>
           
    
    </DataTable>
    </View>
    <View style={styles.buttonContainer}>
    <Button color='#b504be' icon="reload" mode="contained" onPress={() => getallvalues}>Reload </Button>
    </View>
    </View>
    
    
  );
}


const styles = StyleSheet.create({
  container: {
    padding:10,
    flex: 6,
    backgroundColor: '#fff',
  },
  tableContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'40%',
    height: '37%',
    alignSelf: 'center',
  }
});
