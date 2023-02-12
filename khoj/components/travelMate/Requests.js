import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, FlatList} from 'react-native';
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import FontContainer from '../FontContainer';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchBar from '../SearchBar';
import { auth } from "../../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import Footer from "../Footer";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { USERS } from '../../data/users';

// const data=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Requests = ({navigation}) => {
    const [uid, setUid] = useState('');
    onAuthStateChanged(auth, (user) => {
        if(user){
            setUid(user.uid)
        }else{
          console.log("signed out")
        }
      })

  return (
    <FontContainer>
        <SafeAreaView style={{backgroundColor:'#FFFFFF', flex: 1}}>
            <View style={styles.container}>
                <Header navigateOption={navigation}/>
                <FlatList
                numColumns={1}
                data={USERS}
                // extraData={allComments}
                renderItem={({item}) => {
                    return (
                        <BuddyRequests username={item.username} name={item.name}/>
                    )
                }}
                />
                <Footer active='travelMate' uid={uid} navigateOption={navigation}></Footer>
            </View>
        </SafeAreaView>
        </FontContainer>
  )
}

const Header = ({navigateOption}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigateOption.navigate("TravelMate")} style={{flex:1}}>
            {/* <Image source={require('../../assets/back.png')} style={{width: 20, height: 20}}/> */}
            <Icon name="left" size={20} color="#003585"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>BUDDY REQUESTS</Text>
    </View>
)

const BuddyRequests = ({username, name}) => {

    const [requestAccept, setRequestAccept] = useState(false);

return (
    <View style={{marginTop:10}}>
    <View style={{flexDirection:'row', marginBottom:5}}>
        <View>
            <Image source={require('../../assets/profile.png')} style={{margin:10, width: 50, height: 50, backgroundColor:'#D9D9D9', borderRadius:50}}/>
        </View>
            <View style={{marginTop:5, marginLeft:10}}>
            <TouchableOpacity>
                <Text style={{color:'#2B3A55', marginBottom:10, marginTop:5, fontSize:15}}>
                    <Text style={{fontFamily:'Nunito-XBold', color:'#003585'}}>{username}</Text>
                </Text>
            </TouchableOpacity>
                <Text style={{color:'#149DE1', marginBottom:15, fontSize:12, fontFamily:'Nunito-Medium'}}>{name}</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end', marginRight:10, justifyContent:'flex-end', flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity>
                    <Icon name='close' size={20} color="red" style={{paddingHorizontal:10, paddingVertical:10}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='check' size={20} color="green" style={{paddingHorizontal:10, paddingVertical:10}}/>
                </TouchableOpacity>
            </View>
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
  marginHorizontal:10,
  marginBottom:20
},
headerText:{
   color:'#003585',
   fontSize:20,
   fontFamily:'NunitoBlack',
   flex:6,
   textAlign: "center",
   marginRight:20
},
button: {
    alignItems: 'center',
    padding: 10,
    width: 90,
    margin: 10,
    borderRadius: 10,
},
});

export default Requests