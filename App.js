import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';



const getTime=  (item)=> {
  
    let milliseconds = item.timestamp * 1000 // 1575909015000
    let dateObject = new Date(milliseconds)
    let humanDateFormat = dateObject.toLocaleString() //2


return <Text> {humanDateFormat}</Text>
}

export default function App() {
  const [x, setx] = useState(-2);
  const [arr, setarr] = useState([]);

  const  getlastvalue = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/lv/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setx(data)
    });
  }
  const  getallvalues = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/values/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
    .then(response => response.json())
    .then(data => {
      console.log(data.results)
     // arr=data.results
       setarr(data.results)
       console.log(arr);
    });
  
  }

  useEffect(()=>{
    getlastvalue()  
    getallvalues()
 },[]);
  
  
  return (
    
    <View style={styles.container}>
     
      <Text>Current posture is  {x}</Text>   
      <FlatList
            data={arr}  
            renderItem={ ( {item} )=>(
                
                <View>
                  <Text>{item.value}</Text>
                  <Text> {getTime(item)}</Text>
                </View>
                )}
            // keyExtractor={(item) => item.id.toString()} 
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
