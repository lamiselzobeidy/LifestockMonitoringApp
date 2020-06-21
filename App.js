import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';





export default function App() {
  const [x, setx] = useState(-2);
  const [arr, setarr] = useState([]);
  const  getlastvalue = () => {
    let x;
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/lv/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setx(data.results)
    });
  
  }
  const  getallvalues = () => {
    let x;
    fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/values/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
    .then(response => response.json())
    .then(data => {
      console.log(data.results)
      setarr(data.results)
      console.log(arr);
    });
  
  }
  useEffect(()=>{
    getlastvalue()  
    getallvalues()
 },[]);
  if(! arr.length) return <view> betengan </view>
  return (
    
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! {x}</Text>   
      <FlatList
            data={arr}  
            renderItem={ ( {item} )=>(
                <Text>{item.value}</Text>
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
