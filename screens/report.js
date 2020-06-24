import React ,{useState, useEffect , useLayoutEffect}from 'react';
import { StyleSheet, Text, View , FlatList, Button} from 'react-native';
import { DataTable } from 'react-native-paper';

const getPostureName = (value)=>{
  if( value == 0 ) return 'Standing'
  else if( value == 1 ) return 'Resting'
  else if( value == 2) return 'Moving'
  return 'Eating'
}

const getTime = (item)=> {
  let milliseconds = item.timestamp  
  let dateObject = new Date(milliseconds)
  let humanDateFormat = dateObject.toLocaleString() 
return  humanDateFormat
}
                          //week 0 month 1 year 2
const stillInTheInterval = ( chosenInterval , currentDate) => {
 
  
  let DateNow=new Date();
  currentDate = new Date(currentDate)
  
  
  
  if(!chosenInterval){
    return (DateNow.getDate() - currentDate.getDate()) <=   7
  }
  else if( chosenInterval == 1 ){
    return (DateNow.getMonth() == currentDate.getMonth())
  }
  return (DateNow.getYear() == currentDate.getYear())
  
}
export default function LastValues() {

  const [arr, setarr] = useState([]);
  const [week, setweek] = useState([]);
  const [month, setmonth] = useState([]);
  const [year, setyear] = useState([]);
  const[ showMoreFlag, setshowMoreFlag]= useState(0)
 
    


  const  getallvalues = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/values/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
    .then(response => response.json())
    .then(data => {
       console.log(data.results)
       setarr(data.results)
      
    });
  }


  const getLastTime = (currentPosture) =>{
    for (let i = 0; i < arr.length; i++) {
      if( arr[i].value == currentPosture){
        return getTime(arr[i]) 
      }
   }
  
  }
  const getNumberOfHours = () =>{
   
    
    let interval = 1 //in seconds
    for (let chosenInterval = 0; chosenInterval < 3; chosenInterval++) {
      let  l=[0,0,0,0]
      for (let i = 0; i < arr.length; i++) {
       
        let flag = stillInTheInterval(chosenInterval, arr[i].timestamp)
        if(!flag) break

        if(arr[i].value >=0 && arr[i].value<=3) l[arr[i].value]+= ( interval )        
    }

      if(!chosenInterval){
        setweek(l)
      }
      else if(chosenInterval==1){
        setmonth(l)
      }
      else {
        setyear(l)
      }
    }
    setshowMoreFlag(1)
  }
  useEffect(()=>{
    getallvalues()
    
 },[]);

  
    return (
      
      <View>
        <Text> Last time your cow ate was at {getLastTime(3)} </Text> 
      
        <Text> Last time your cow slept was at {getLastTime(1)}</Text> 
      
        <Text> Last time your cow moved was at {getLastTime(2)}</Text> 
      
        <Text> Last time your cow stood was at {getLastTime(0)}</Text> 
       
   {showMoreFlag ? ( <View>
     <Text>Every Posture in the last week month and year in seconds</Text>
   <DataTable >
  <DataTable.Header>
      <DataTable.Title  style={{alignSelf:'center'}}>Posture</DataTable.Title>
      <DataTable.Title style={{alignSelf:'center'}}>Standing</DataTable.Title>
      <DataTable.Title style={{alignSelf:'center'}}>Resting</DataTable.Title>
      <DataTable.Title style={{alignSelf:'center'}}>Moving</DataTable.Title>
      <DataTable.Title style={{alignSelf:'center'}}>Eating</DataTable.Title>
  </DataTable.Header>
  <DataTable.Row>
    <DataTable.Cell style={{alignSelf:'center'}}>Week</DataTable.Cell>
    <DataTable.Cell style={{alignSelf:'center'}}>{week[0]}</DataTable.Cell> 
    <DataTable.Cell style={{alignSelf:'center'}}>{week[1]}</DataTable.Cell>
    <DataTable.Cell style={{alignSelf:'center'}}>{week[2]}</DataTable.Cell> 
    <DataTable.Cell style={{alignSelf:'center'}}>{week[3]}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{alignSelf:'center'}}>Month</DataTable.Cell>
    <DataTable.Cell style={{alignSelf:'center'}}>{month[0]}</DataTable.Cell> 
    <DataTable.Cell style={{alignSelf:'center'}}>{month[1]}</DataTable.Cell>
    <DataTable.Cell style={{alignSelf:'center'}}>{month[2]}</DataTable.Cell> 
    <DataTable.Cell style={{alignSelf:'center'}}>{month[3]}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={{alignSelf:'center'}}>Year</DataTable.Cell>
    <DataTable.Cell style={{alignSelf:'center'}}>{year[0]}</DataTable.Cell> 
    <DataTable.Cell style={{alignSelf:'center'}}>{year[1]}</DataTable.Cell>
    <DataTable.Cell style={{alignSelf:'center'}}>{year[2]}</DataTable.Cell> 
    <DataTable.Cell style={{alignSelf:'center'}}>{year[3]}</DataTable.Cell>
    </DataTable.Row>
      

   </DataTable>
    <Button title ="Show Less" onPress={() => setshowMoreFlag(0)}>Show More </Button>
    </View>) :
    (<View>
    <Button title ="Show More" onPress={() => getNumberOfHours()}>Show More </Button>
    </View>)}
  </View>
    );
  
} 
const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'flex-start', // if you want to fill rows left to right
    justifyContent:'space-between'
  },
});
