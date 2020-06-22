import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function CurrentPosture() {

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../images/cow.png')} />
            </View>  
            <View style={styles.postureContainer}>
                <Text style={styles.posture}>Current Posture</Text>
                <Text style={styles.postureValue}></Text>         
            </View>  
            <View style={styles.refreshContainer}>
            {/* <Button style={{width:'100%', height:'15%', alignSelf:'flex-end'}} icon="reload" title="Reload" mode="contained" onPress={() => getCurrentPosture}>Reload </Button> */}
            </View>
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
        height: '100',
        width:'100',
        justifyContent:'space-between'
        // padding: 10,
        // paddingTop: 100
    },
    imageContainer:{
        flex: 3,
        flexDirection:'column',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "blue",
        height:'100vh',
        width:'100vh'
    },
    postureContainer:{
        flex:2,
        alignItems: "center",
        backgroundColor: "red",
        width:'100vh'
    },
    refreshContainer: {
        flex:1,
        alignItems:"center",
        backgroundColor:"yellow",
        width:'100vh'
    },
    image:{
        height:200,
        width: 248,
        alignItems:'center',
        justifyContent:'center',
    },
    posture:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'roboto',
        fontWeight: 'bold',
    }
});