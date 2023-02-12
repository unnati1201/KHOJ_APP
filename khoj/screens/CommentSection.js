import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import { POSTS } from '../data/posts';
import FontContainer from '../components/FontContainer';
import { auth, database } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, push, update, onValue, set, remove } from "firebase/database";
import Icon from 'react-native-vector-icons/AntDesign';

const CommentSection = ({navigation, route}) => {

    const [uid, setuid] = useState('');
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const {postId, postTag} = route.params;

    onAuthStateChanged(auth, (user) => {
        if(user){
          setuid(user.uid);
        }else{
          console.log("signed out")
        }
      })

    useEffect(() => {
        const commentDetails = ref(database, 'posts/'+postId+'/comments');
        onValue(commentDetails, (snapshot) => {
          const data=snapshot.val();
          const allComments = []
          for(const item in data){
              allComments.unshift(data[item])
          }
          setAllComments(allComments)
        })
    }, [uid])

    const pushComment = () => {
        const newCommentKey = push(child(ref(database), 'posts/'+postId+'/comments')).key;
        // update(ref(database, 'users/'+uid+'/posts/'+postId+'/comments/'+newCommentKey), {
        //     comment: comment,
        //     author: uid,
        //     commentId: newCommentKey,
        // })
        update(ref(database, 'posts/'+postId+'/comments/'+newCommentKey), {
            comment: comment,
            author: uid,
            commentId: newCommentKey,
        })
        update(ref(database, postTag+'/'+postId+'/comments/'+newCommentKey), {
            comment: comment,
            author: uid,
            commentId: newCommentKey,
        })
        setComment('');
    }

    return (
        <FontContainer>
        <SafeAreaView style={{backgroundColor:'#FFFFFF', flex: 1}}>
            <View style={styles.container}>
                <Header navigateOption={navigation} commentCount={allComments.length}/>
                {allComments.length!==0 ? <FlatList
                numColumns={1}
                data={allComments}
                extraData={allComments}
                renderItem={({item}) => {
                    return (
                        <Comments commentData={item} navigateOption={navigation}/>
                    )
                }}
                /> : <View style={{flex:1, justifyContent: 'center', paddingBottom: 80}}>
                <Text style={{textAlign: 'center', fontSize: 16, color: 'grey'}}>No Comments</Text>
              </View>}
            </View>
            <View style={{justifyContent:'flex-end', backgroundColor:'#003585'}}>
                <View style={{marginLeft:20, marginRight:20, marginBottom:15, marginTop:15, justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                    <TextInput 
                        style={{color: 'white', width:'85%', fontFamily:'Nunito-Medium'}}
                        placeholder='Write a comment...' 
                        placeholderTextColor='gray'
                        multiline={true}
                        maxLength={200}
                        onChangeText={(value)=>setComment(value)}
                        // onBlur={handleBlur('heading')}
                        value={comment}
                    />
                    <TouchableOpacity onPress={pushComment}><Text style={{color:'#FFF4E0', fontFamily:'Nunito-Bold'}}>Post</Text></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        </FontContainer>
      )
}

const Header = ({navigateOption, commentCount}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigateOption.navigate("Explore")}>
            {/* <Image source={require('../assets/backBlue.png')} style={{width: 20, height: 20}}/> */}
            <Icon name="left" size={20} color="#003585"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>COMMENTS ({commentCount})</Text>
        <Text></Text>
    </View>
)

const Comments = ({commentData, navigateOption}) => {
        const [profileUrl, setProfileUrl] = useState('');
        const [username, setUsername] = useState('');

        useEffect(()=>{
            const userDetails = ref(database, 'users/'+ commentData.author);
            onValue(userDetails, (snapshot) => {
                const data=snapshot.val();
                setProfileUrl(data.profileUrl);
                setUsername(data.username);
            })
        }, [])
        
    return (
        <View style={{marginTop:10}}>
        <View style={{flexDirection:'row', marginBottom:10}}>
            <View>
                <Image source={{uri: profileUrl}} style={{margin:10, width: 50, height: 50, backgroundColor:'white', borderRadius:50}}/>
            </View>
            <View style={{marginTop:5, marginLeft:10, }}>
                <TouchableOpacity onPress={() => navigateOption.navigate("Profile",{authorUid: commentData.author})}>
                    <Text style={{color:'#2B3A55', marginBottom:10, marginTop:5, fontSize:15}}>
                        <Text style={{fontFamily:'Nunito-XBold', color:'#003585'}}>{username}</Text>
                    </Text>
                </TouchableOpacity>
                <Text style={{color:'#003585', marginBottom:15, fontSize:12, fontFamily:'Nunito-Medium'}}>{commentData.comment}</Text>
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
      marginLeft:10,
    },
    headerText:{
       color:'#003585',
    //    fontWeight:'700',
       fontSize:20,
       marginRight: 15,
       fontFamily:'NunitoBlack'
    },
    outer:{
        margin:20,
        marginTop:40,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
  });


export default CommentSection