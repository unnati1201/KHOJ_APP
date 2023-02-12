import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import FontContainer from '../FontContainer';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchBar from '../SearchBar';

const data=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const ChatPage = ({navigation}) => {
  return (
    <FontContainer>
        <SafeAreaView style={{backgroundColor:'#FFFFFF', flex: 1}}>
            <View style={styles.container}>
                <Header navigateOption={navigation}/>
                <SearchBar />
                <FlatList
                numColumns={1}
                data={data}
                // extraData={allComments}
                renderItem={({item}) => {
                    return (
                        <Comments/>
                    )
                }}
                />
            </View>
        </SafeAreaView>
        </FontContainer>
  )
}

const Header = ({navigateOption}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>TRAVEL MATE</Text>
        <TouchableOpacity  style={{flex:1}}>
            <Icon name="addusergroup" size={25} color="#003585"></Icon>
        </TouchableOpacity>
    </View>
)

const Comments = () => {
return (
    <View style={{marginTop:10}}>
    <View style={{flexDirection:'row', marginBottom:10}}>
        <View style={{flex:1}}>
            <Image source={require('../../assets/profile.png')} style={{margin:10, width: 50, height: 50, backgroundColor:'#D9D9D9', borderRadius:50}}/>
        </View>
        <TouchableOpacity style={{flex: 4}}>
            <View style={{marginTop:5, marginLeft:10}}>
                <Text style={{color:'#2B3A55', marginBottom:10, marginTop:5, fontSize:15}}>
                    <Text style={{fontFamily:'Nunito-XBold', color:'#003585'}}>the_explorer</Text>
                </Text>
                <Text style={{color:'#149DE1', marginBottom:15, fontSize:12, fontFamily:'Nunito-Medium'}}>Unnati</Text>
            </View>
        </TouchableOpacity>
    </View>
    <Divider width={1} orientation='vertical'/>
</View>
)
}

const styles = StyleSheet.create({
container:{
    marginTop: 10,
    flex:1,
},
headerContainer:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft:10,
},
headerText:{
   color:'#003585',
//    fontWeight:'700',
   fontSize:20,
   marginRight: 15,
   fontFamily:'NunitoBlack',
   flex:6,
   textAlign: "center",
   marginLeft: 50,
},
});

export default ChatPage