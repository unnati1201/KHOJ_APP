import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import FontContainer from '../components/FontContainer';
import { auth, database } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue} from "firebase/database";
import Icon from 'react-native-vector-icons/AntDesign';

const MoreInfo = ({navigation, route}) => {
    const {postId} = route.params;

    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tag, setTag] = useState('');
    const [likes, setLikes] = useState('');
    const [uid, setUid] = useState('');
    // const [comments, setComments] = useState('');

    onAuthStateChanged(auth, (user) => {
        if(user){
            
            const postDetails = ref(database, 'posts/' + postId);
            onValue(postDetails, (snapshot) => {
            const data = snapshot.val();
            setHeading(data.heading)
            setDescription(data.description);
            setLocation(data.location);
            setImageUrl(data.imageUrl);
            setTag(data.tag);
            setLikes(data.likes);
            setUid(data.uid);
            });
        }else{
        console.log("signed out")
        }
    })

  return (
    <FontContainer>
    <SafeAreaView style={{backgroundColor:'#FFFFFF', flex: 1}}>
        <ScrollView>
            <View style={styles.container}>
                <Header navigateOption={navigation}/>
                <View style={styles.outer}>
                    <Image source={{uri: imageUrl}} style={{width: 320, height: 320}}/>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', margin:10}}>
                        <View style={{flex:1}}>
                            <Likes likes={likes} />
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity style={styles.tag}>
                                <Text style={[styles.name, {textAlign:'center'}]}>{tag}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <TouchableOpacity onPress={() => navigation.navigate("Commment Section", {postId:postId, postTag:tag})}>
                                <Image style={styles.footerIcon} source={require('../assets/commentN.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Heading heading={heading}/>
                    <Divider width={1} orientation='vertical' />
                    <View style={{flexDirection:'row', marginTop:20, marginBottom:10}}>
                        <Text style={{fontFamily:'Nunito-Bold', fontSize:13, color:'#149DE1'}}>Location: </Text>
                        <Location location={location}/>
                    </View>
                    <Description description={description}/>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    </FontContainer>
  )
}

const Header = ({navigateOption}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigateOption.navigate("Explore")}>
            {/* <Image source={require('../assets/back.png')} style={{width: 20, height: 20}}/> */}
            <Icon name="left" size={20} color="#003585"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>MORE INFO</Text>
        <Text></Text>
    </View>
)

const Heading =({heading}) => (
    <View>
        <Text style={styles.heading}>{heading}</Text>
    </View>
)

const Description =({description}) => (
    <View style={{marginTop: 5}}>
        <Text style={styles.description}>{description}</Text>
    </View>
)

const Location =({location}) => (
    <View>
        <Text style={styles.location}>{location}</Text>
    </View>
)

const Likes =({likes}) => (
    <View style={{flexDirection:'row', justifyContent:'flex-start', marginLeft: 4}}>
        <Text style={{fontFamily:'Nunito-Bold', fontSize:13, color:'#003585'}}>{likes} likes</Text>
    </View>
)

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
    },
    headerContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft:10,
    },
    headerText:{
       color:'#003585',
       fontSize:20,
       marginRight: 15,
       fontFamily:'NunitoBlack',
    },
    outer:{
        margin:20,
        marginTop:40,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    heading:{
        fontFamily:'Nunito-XBold',
        fontSize: 20,
        color:'#003585',
        marginTop:20,
        marginBottom:20,
        textAlign:'center',
    },
    description:{
        fontFamily:'Nunito-Light',
        fontSize: 13,
        color:'#003585',
    },
    location:{
        fontFamily:'Nunito-Light',
        fontSize: 13,
        color:'#149DE1',
    },
    tag:{
        backgroundColor:'#FEBA02',
        paddingBottom:5,
        paddingTop:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
        height:30,
    },
    name:{
        color:'#003585',
        fontSize:13,
        // fontWeight:'500',
        fontFamily:'Nunito-Bold',
    },
    footerIcon:{
        width:22,
        height:22,
    },
  });

export default MoreInfo