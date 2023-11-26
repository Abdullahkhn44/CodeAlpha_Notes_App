import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

const BigNote = ({route}) => {
    const receivedData = route.params?.data 
    console.log(receivedData)
    return (
        <View>
           {receivedData.map((item,index)=>(
            <View key={index}>
                <Text style={{color:'black',fontWeight:'600',textAlign:'center',marginTop:20,fontSize:30}}>{item.istitle}</Text>
                <Text style={{color:'purple',fontWeight:'800'}}>________________________________________________________</Text>
                <Text style={{color:'black',margin:15,fontSize:17,fontWeight:'500'}}>{item.isnote}</Text>
            </View>
           ))}
        </View>
    );
}

const styles = StyleSheet.create({})

export default BigNote;
