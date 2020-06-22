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

    const getCurrentPosture = () => {
        fetch('https://things.ubidots.com/api/v1.6/devices/flaskServer/posture-value/lv/?token=BBFF-BjBE8UN70vxuFasG3L0PVLIxv0SNg6')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCurrentPosture(data)
            });
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../images/cow.png')} />
            <View style={styles.postureContainer}>
                <Text style={styles.posture}>Current Posture</Text>
                <Text style={styles.postureValue}>{getPostureName(currentPosture)}</Text>
            </View>
            <Text style={styles.content}></Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '10px',
        paddingTop: '100px'
    },
    image: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 310,
        height: 100,
        marginBottom: '20px',
    },
    postureContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
    },
    posture: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'roboto',
        fontWeight: 'bold',
    },
    postureValue: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25,
        textAlign: 'center',
    },
    content: {
        flex: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

});