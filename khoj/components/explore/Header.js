import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
  return (
    <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.container}>
          <View style={styles.header1}>

          </View>
          <View style={styles.header2}>
            <Image style={styles.logo} source={require('../../assets/NewLogo.png')}/>
            <TouchableOpacity onPress={() => props.navigateOption.navigate("Add Post")}>
              <FontAwesomeIcon name='plus-square-o' size={28} style={styles.profile}/>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      width:'100%',
      height:60,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5,
  },
  header1:{
      flex:1,
  },
  header2:{
      flex:2,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center',
  },
  logo:{
      width:400,
      height:200,
      flex:0.5,
      paddingLeft:'25%',
  },
  profile:{
      paddingRight:'8%',
      color:'#003585',
  },
});

export default Header