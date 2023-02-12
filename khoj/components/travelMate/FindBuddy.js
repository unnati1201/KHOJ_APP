import {Text, View, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity, Modal, Pressable} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../Layout";
import {useRef, useState} from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { auth } from "../../firebase"
import { onAuthStateChanged } from 'firebase/auth';

const FindBuddy = ({navigation}) => {

    const [uid, setUid] = useState('');
    onAuthStateChanged(auth, (user) => {
        if(user){
            setUid(user.uid)
        }else{
          console.log("signed out")
        }
    })

    return (
        <Layout>
            <Header navigateOption={navigation}/>
            <ImageBackground source={require('../../assets/Map.jpg')} style={styles.image} imageStyle={{opacity:0.2}}>
                <View style={styles.radar}>

                </View>
                <View style={styles.buddyArea}>
                    <Buddy top={Math.floor(Math.random()*200)} left={Math.floor(Math.random()*200)}/>
                    <Buddy top={Math.floor(Math.random()*200)} left={Math.floor(Math.random()*200)}/>
                    <Buddy top={Math.floor(Math.random()*200)} left={Math.floor(Math.random()*200)}/>
                </View>
            </ImageBackground>
        </Layout>
    )
}

const Header = ({navigateOption}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigateOption.navigate("TravelMate")} style={{flex:1}}>
            {/* <Image source={require('../../assets/back.png')} style={{width: 20, height: 20}}/> */}
            <Icon name="left" size={20} color="#003585"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>FIND BUDDY</Text>
    </View>
)

const Buddy = ({top, left}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
   
    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image source={require('../../assets/profile.png')} style={{margin:10, width: 100, height: 100, backgroundColor:'#D9D9D9', borderRadius:50, borderColor: '#003585', borderWidth: 2}}/>
                    <Text style={{paddingTop: 10, fontFamily: 'Nunito-Bold', fontSize: 20, color: '#003585' }}>the_explorer</Text>
                    <Text style={{padding: 10, color: '#149DE1', fontFamily: 'Nunito-Medium'}}>Unnati</Text>
                    <TouchableOpacity
                        style={[styles.button,{backgroundColor: '#FEBA02'}]}
                        onPress={() => setRequestSent(true)}
                        disabled={requestSent}>
                        <Text style={{color:'#FFFFFF', fontFamily: 'Nunito-Bold'}}>{!requestSent ? "REQUEST TO TAG ALONG" : "REQUEST SENT!"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{color:'#FEBA02', fontFamily: 'Nunito-Bold'}}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <TouchableOpacity onPress={()=>setModalVisible(true)} style={{position:'absolute', top:top, left:left}}>
            <Image source={require('../../assets/profile.png')} style={{margin:10, width: 50, height: 50, backgroundColor:'#D9D9D9', borderRadius:50, borderColor: '#003585', borderWidth: 2}}/>
        </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
        paddingTop:20,
    },
    headerText:{
        color:'#003585',
        fontSize:20,
        fontFamily:'NunitoBlack',
        flex:2
     },
     image: {
        height: Dimensions.get('window').height-50,
        width: Dimensions.get('window').width,
        // opacity: 0.6,
      },
      radar: {
        height: Dimensions.get('window').width-40,
        width: Dimensions.get('window').width-40,
        backgroundColor: '#FEBA02',
        borderRadius: 200,
        opacity:0.6,
        marginTop: ((Dimensions.get('window').height-40)/2)-((Dimensions.get('window').width-40)/2)-40,
        marginLeft: ((Dimensions.get('window').width)/2)-((Dimensions.get('window').width-40)/2),
      },
      buddyArea: {
        height: Dimensions.get('window').width-40,
        width: Dimensions.get('window').width-40,
        borderRadius: 200,
        marginTop: ((Dimensions.get('window').height-40)/2)-((Dimensions.get('window').width-40)/2)-40,
        marginLeft: ((Dimensions.get('window').width)/2)-((Dimensions.get('window').width-40)/2),
        position:'absolute',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        alignItems: 'center',
        padding: 15,
        width: 230,
        margin: 10,
        borderRadius: 10,
        borderColor: '#FEBA02', 
        borderWidth: 1,
    },
});

export default FindBuddy;