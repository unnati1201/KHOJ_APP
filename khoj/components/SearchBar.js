import {View, StyleSheet, TextInput, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SearchBar = () => {
  return (
    <View style={{marginTop:15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput maxLength={20} style={[styles.textBox]} placeholder={"Search..."}/>
            <View style={[styles.label,{backgroundColor: '#FEBA02'}]}>
                {/* <Text style={{color: '#FFFFFF', textAlign: 'center'}}>Name</Text> */}
                <FontAwesomeIcon name='search' size={20} style={{color: '#FFFFFF', textAlign: 'center', paddingRight:5}}></FontAwesomeIcon>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textBox: {
        borderWidth: 1,
        paddingVertical: 5,
        padding: 20,
        margin: 10,
        marginRight: 0,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        borderColor: '#FEBA02',
        backgroundColor:'#FFF4E0',
        flex: 5
    },
    label: {
      borderColor: '#FEBA02',
      borderWidth: 0.5,
      paddingVertical: 9.5,
      paddingHorizontal: 5,
      margin: 10,
      marginLeft: 0,
      borderBottomRightRadius: 50,
      borderTopRightRadius: 50,
      flex: 1
    },
});

export default SearchBar