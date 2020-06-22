import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';



const getTime=  (item)=> {
    let milliseconds = item.timestamp * 1000 // 1575909015000
    let dateObject = new Date(milliseconds)
    let humanDateFormat = dateObject.toLocaleString() //2


return  humanDateFormat
}

export default function Report() {

  const [arr, setarr] = useState([]);

  const  getallvalues = () => {
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/values/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
    .then(response => response.json())
    .then(data => {
       console.log(data.results)
       setarr(data.results)     
    });
  
  }

  useEffect(()=>{
    getallvalues()
 },[]);
    
  return (
    
    <View>
     
      <FlatList
            data={arr} 
           
            renderItem={ ( {item,index} )=>(
                
                <View style={styles.container}>
                  <Text style={{ width: '5%'}}>{item.value}</Text>
                  <Text style={{ width: '95%'}}> {getTime(item)}</Text>
                </View>
                )}

            keyExtractor={(item, index) => index.toString()}
            />
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
