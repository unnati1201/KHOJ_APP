import {Text, View, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity, Modal, TextInput} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../Layout";
import {useRef, useState} from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { auth } from "../../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import FontContainer from "../FontContainer";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Chat = ({navigation}) => {
  return (
    <FontContainer>
    <SafeAreaView style={{backgroundColor:'#FFFFFF', flex: 1}}>
        <Header navigateOption={navigation}/>
        <View style={{flex:1, flexDirection:'column-reverse', margin:10}}>
            <ChatContainer />
        </View>
        <View>
            <ChatBox />
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
        <Text style={styles.headerText}>the_explorer</Text>
    </View>
)

const ChatContainer = () => {
    return (
        <View>
            <View style={styles.right}>
                <Text style={styles.chatText}>Hello dost</Text>
            </View>
            <View style={styles.left}>
                <Text style={styles.chatText}>Hello yaara!</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.chatText}>Lets catch up!</Text>
            </View>
            <View style={styles.left}>
                <Text style={styles.chatText}>Sure, it'll be fun</Text>
            </View>
        </View>
    )
}

const ChatBox = () => {
    return (
        <View style={{justifyContent:'flex-end', backgroundColor:'#003585'}}>
            <View style={{width:'100%', paddingVertical:10, paddingHorizontal:15, justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                <TextInput 
                    style={{color: 'white', width:'85%', fontFamily:'Nunito-Medium'}}
                    placeholder='Write a comment...' 
                    placeholderTextColor='gray'
                    multiline={true}
                    maxLength={200}
                    // onChangeText={(value)=>setComment(value)}
                    // onBlur={handleBlur('heading')}
                />
                <TouchableOpacity style={{width:'20%', height:'150%', alignItems:'center', justifyContent:'space-around', flexDirection:'row'}}><FontAwesomeIcon name="send" size={20} color="#FFF4E0"/></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
        paddingBottom:20
    },
    headerText:{
        color:'#003585',
        fontSize:20,
        fontFamily:'NunitoBlack',
        flex:2
    },
    right:{
        backgroundColor:'#FFF4E0',
        flexDirection:'row',
        alignSelf:'flex-end',
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingVertical:5,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        borderTopRightRadius:8,
        marginBottom:5,
    },
    left:{
        backgroundColor:'#FEBA02',
        flexDirection:'row',
        alignSelf:'flex-start',
        paddingHorizontal:20,
        paddingVertical:5,
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
        borderTopLeftRadius:8,
        marginBottom:5,
    },
    chatText:{
        fontFamily:'Nunito-Medium',
        color:'#003585',
    }
});

export default Chat