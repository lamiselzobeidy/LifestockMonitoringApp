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
       setarr(data.results.slice(0,20))     
    });
  
  }

  useEffect(()=>{
    getallvalues()
 },[]);
    
  return (
    <View >
    <DataTable>
       <Button style={{width:'100%', height:'15%', alignSelf:'flex-end'}} icon="reload" mode="contained" onPress={() => getallvalues}>Reload </Button>
      <DataTable.Header>
          <DataTable.Title>Posture</DataTable.Title>
          <DataTable.Title>Time</DataTable.Title>
      </DataTable.Header>
      <ScrollView>
      <FlatList
            data={arr} 
            renderItem={ ( {item,index} )=>(
              <DataTable.Row>
                <DataTable.Cell>{getPostureName(item.value)}</DataTable.Cell>
                <DataTable.Cell >{getTime(item)}</DataTable.Cell> 
             </DataTable.Row> )}
            keyExtractor={(item, index) => index.toString()} />

</ScrollView>
           
    
    </DataTable>
    </View>
    
    
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop:100,
    padding:20,
    flex: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
