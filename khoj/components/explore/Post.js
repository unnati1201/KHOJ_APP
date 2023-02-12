import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Divider } from 'react-native-elements';
import { auth, database } from "../../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, push, update, onValue, set, remove } from "firebase/database";

const postFooterIcons = [
    {
        name:'Like',
        imageUrl:require('../../assets/heartN.png'),
        likedImageUrl:require('../../assets/filledHeart.png'),
    },
    {
        name:'Comment',
        imageUrl:require('../../assets/commentN.png'),
    },
    {
        name:'Save',
        imageUrl:require('../../assets/starN.png'),
        savedImageUrl:require('../../assets/filledStar.png'),
    },
]

const Post = ({post, navigateOption}) => {

    const [username, setUsername] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [uid, setuid] = useState('');
    const [starred, setStarred] = useState(false);
    const [liked, setLiked] = useState(false);
    const [postLikes, setPostLikes] = useState(0);
    const [allComments, setAllComments] = useState([]);

    onAuthStateChanged(auth, (user) => {
        if(user){

            const userDetails = ref(database, 'users/' + post.author);
            onValue(userDetails, (snapshot) => {
            const data = snapshot.val();

            setuid(user.uid);
            setUsername(data.username);
            setProfileUrl(data.profileUrl);
            setPostLikes(data.posts[post.key].likes)
        
            });
        }else{
          console.log("signed out")
        }
      })

      const starPost = () => {
        if(!starred){
            set(ref(database, 'users/' + uid + '/starred/' + post.key), true)
            setStarred(true)
        }else{
            remove(ref(database, 'users/' + uid + '/starred/' + post.key))
            setStarred(false)
        }
      }

      const likedPost = () => {
        if(!liked){
            set(ref(database, 'users/' + uid + '/liked/' + post.key), true)
            setLiked(true)
            
            update(ref(database, 'users/' + post.author + '/posts/' + post.key),{likes: postLikes+1})
            update(ref(database, 'posts/' + post.key),{likes: postLikes+1})
            update(ref(database, post.tag + '/' + post.key), {likes: postLikes+1})

        }else{
            remove(ref(database, 'users/' + uid + '/liked/' + post.key))
            setLiked(false)

            update(ref(database, 'users/' + post.author + '/posts/' + post.key),{likes: postLikes-1})
            update(ref(database, 'posts/' + post.key),{likes: postLikes-1})
            update(ref(database, post.tag + '/' + post.key), {likes: postLikes-1})
        }
      }

      useEffect(() => {
        
        const starredDetails = ref(database, 'users/' + uid + '/starred/' + post.key);
        onValue(starredDetails, (snapshot) => {
            const data=snapshot.val();
            
            if(data!==null){
                setStarred(true)
            }
        })

        const likedDetails = ref(database, 'users/' + uid + '/liked/' + post.key);
        onValue(likedDetails, (snapshot) => {
            const data=snapshot.val();
            
            if(data!==null){
                setLiked(true)
            }
        })

        const commentDetails = ref(database, 'posts/'+post.key+'/comments');
        onValue(commentDetails, (snapshot) => {
          const data=snapshot.val();
          const allComments = []
          for(const item in data){
              allComments.unshift(data[item])
          }
          setAllComments(allComments)
        })

      }, [uid])

  return (
    <View style={{marginBottom: 30}}>
        <Divider width={1} orientation='vertical' />
        <PostHeader username={username} profileUrl={profileUrl} navigateOption={navigateOption} authorUid={post.author}/>
        <PostImage post={post} />
        <View style={{marginHorizontal: 15, marginTop: 10}}>
            <PostFooter post={post} navigateOption={navigateOption} starPost={starPost} starred={starred} liked={liked} likedPost={likedPost}/>
            <View style={{flexDirection:'row', height:25, justifyContent:'space-between'}}>
                <Likes post={post} />
                {allComments.length!==0 && <Comments commentCount={allComments.length} post={post} navigateOption={navigateOption}/>}
            </View>
            <Heading post={post} />
            <MoreInfo  post={post} navigateOption={navigateOption}/>
        </View>
    </View>
  )
}

const PostHeader = ({username, profileUrl,navigateOption,authorUid}) => {
    return <View style={styles.outer}>
        <TouchableOpacity style={styles.inner} onPress={() => navigateOption.navigate("Profile",{authorUid: authorUid})}>
            <Image source={profileUrl ? {uri: profileUrl} : null} style={styles.image}/>
            <Text style={[styles.username, {fontFamily:'Nunito-XBold'}]}>{username}</Text>
        </TouchableOpacity>
    </View>
}

const PostImage = ({post}) => (
    <View style={styles.postImage}>
        <Divider width={1} orientation='vertical' />
        <Image 
            source={post.imageUrl ? {uri: post.imageUrl} : null}
            style={{height:'100%', width:'100%'}} 
        />
    </View>
)

const PostFooter = ({post, navigateOption, starPost, starred, liked, likedPost}) => {
    return (
        <View style={{flexDirection:'row', height:25, justifyContent:'space-between'}}>
            <View>
                <TouchableOpacity style={styles.tag}>
                    <Text style={styles.name}>{post.tag}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerIconContainer}>
                <TouchableOpacity onPress={() => likedPost()}>
                    <Image style={styles.footerIcon} source={!liked ? postFooterIcons[0].imageUrl : postFooterIcons[0].likedImageUrl} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateOption.navigate("Commment Section", {postId:post.key, postTag:post.tag})}>
                    <Image style={{height: 22, width: 22}} source={postFooterIcons[1].imageUrl} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => starPost()}>
                    <Image style={{height: 23.5, width: 23.5}} source={!starred ? postFooterIcons[2].imageUrl : postFooterIcons[2].savedImageUrl} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Likes =({post}) => (
    <View style={{flexDirection:'row', marginTop: 10, justifyContent:'flex-start', marginLeft: 4}}>
        <Text style={{fontFamily:'Nunito-Bold', fontSize:13, color:'#003585'}}>{post.likes} likes</Text>
    </View>
)

const Comments =({commentCount, post, navigateOption}) => (
    <View style={{flexDirection:'row', marginTop: 10, justifyContent:'flex-end', marginLeft: 4}}>
        <TouchableOpacity onPress={() => navigateOption.navigate("Commment Section", {postId:post.key, postTag:post.tag})}>
            {commentCount==1 ? <Text style={{fontFamily:'Nunito-Bold', fontSize:13, color:'#003585'}}>{commentCount} comment</Text> : <Text style={{fontFamily:'Nunito-Bold', fontSize:13, color:'#003585'}}>{commentCount} comments</Text>}
        </TouchableOpacity>
    </View>
)

const Heading =({post}) => (
    <View style={{marginTop: 5}}>
        <Text style={styles.heading}>{post.heading}</Text>
    </View>
)

const MoreInfo =({post, navigateOption}) => (
    <TouchableOpacity onPress={() => {
        navigateOption.navigate('More Info', {
          postId:post.key,
        });
      }}>
        <Text style={{marginLeft: 4, color:'gray', fontSize: 13, fontFamily:'Nunito-Medium'}}>More info...</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    outer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
    },
    inner:{
        flexDirection:'row',
        alignItems:'center',
    },
    image:{
        width:35,
        height:35,
        borderRadius:50,
        marginLeft:6,
        borderWidth:1.6,
        borderColor:'#003585',
    },
    username:{
        color:'#003585',
        marginLeft: 5,
    },
    postImage:{
        width:'100%', 
        height:450, 
    },
    footerIcon:{
        width:25,
        height:25,
    },
    footerIconContainer:{
        flexDirection:'row',
        width:'30%',
        justifyContent:'space-between',
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
    heading:{
        marginLeft: 3,
        color:'#003585',
        fontSize: 18,
        fontFamily:'Nunito-XBold',
    },
  });

export default Post