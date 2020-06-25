import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const getPostureName = (value) => {
    if (value == 0) return 'Standing'
    else if (value == 1) return 'Resting'
    else if (value == 2) return 'Moving'
    return 'Eating'
}

export default function CurrentPosture() {

    const [currentPosture, setCurrentPosture] = useState(0);
    let restingCount=0
    const checkrestingCount = () =>{
        console.log("da l restingCount",restingCount);
                 if( restingCount == 50 ){
                    alert("Your cow has been sleeping for so long")
                   restingCount=0
                 }
    }
    const getCurrentPosture = () => {
        fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/lv/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCurrentPosture(data)
                if( data == 1){
                    restingCount++
                }              
            });
            checkrestingCount()
    }
   
    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentPosture();
            console.log("this is called");
        }, 1000);
        return () => clearInterval(interval);
    
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../images/cow.png')} />
            </View>
            <View style={styles.postureContainer}>
                <Text style={styles.posture}>Current Posture</Text>
                <Text style={styles.postureValue}>"{getPostureName(currentPosture)}"</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100',
        width: '100',
        justifyContent: 'space-between'
    },
    imageContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        height: '100vh',
        width: '100vh'
    },
    postureContainer: {
        flex: 2,
        alignItems: "center",
        width: '100vh'
    },
    refreshContainer: {
        flex: 1,
        alignItems: "center",
        width: '100vh'
    },
    image: {
        height: 200,
        width: 248,
        alignItems: 'center',
        justifyContent: 'center',
    },
    posture: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
        textAlign: 'center',
    },
    postureValue: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25,
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
    },

});