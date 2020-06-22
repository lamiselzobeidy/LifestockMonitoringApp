import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';
import { DataTable, Button } from 'react-native-paper';


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
    
    <DataTable >
       <Button style={{width:'10%', alignSelf:'flex-end'}} icon="reload" mode="contained" onPress={() => window.location.reload()}>Reload </Button>
      <DataTable.Header>
          <DataTable.Title>Posture</DataTable.Title>
          <DataTable.Title>Time</DataTable.Title>
      </DataTable.Header>

      <FlatList
            data={arr} 
            renderItem={ ( {item,index} )=>(
              <DataTable.Row>
                <DataTable.Cell>{getPostureName(item.value)}</DataTable.Cell>
                <DataTable.Cell >{getTime(item)}</DataTable.Cell> 
             </DataTable.Row> )}
            keyExtractor={(item, index) => index.toString()} />
           
    
    </DataTable>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
