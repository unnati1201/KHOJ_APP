import {Text, View, Image, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity} from "react-native"
import Layout from "../Layout"
import { useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/AntDesign'
import ProfileImage from "./ProfileImage"
import { auth, database, storage } from "../../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue} from "firebase/database";
import Footer from "../Footer"
// import { ref as REF, onValue as ONVALUE, getDownloadURL}  from "firebase/storage";

// const db = getDatabase();

export default function ProfilePage({navigation, route}){
    const params = route.params;
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [postCount, setPostCount] = useState(0);
    const [streakCount, setStreakCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [starredPosts, setStarredPosts] = useState([]);
    const [uid, setUid] = useState('');
    const [userUid, setUserUid] = useState('');

    onAuthStateChanged(auth, (user) => {
        if(user){
            
            if(typeof(params) !== "undefined" && typeof(params.authorUid) !== "undefined") {
                setUid(params.authorUid)
            }
            else setUid(user.uid)
            setUserUid(user.uid)
            const userDetails = ref(database, 'users/' + uid);
            onValue(userDetails, (snapshot) => {
            const data = snapshot.val();

            setName(data.name);
            setUsername(data.username);
            setProfileUrl(data.profileUrl);
            setPostCount(data.postCount);
            setStreakCount(data.streakCount);
            });
        }else{
          console.log("signed out")
        }
      })

      useEffect(() => {
        const userDetails = ref(database, 'users/' + uid);
        const allStarredPostsKeys = []
        onValue(userDetails, (snapshot) => {
            const data = snapshot.val();
            const allPosts = []
            
            for(const item in data.posts){
                var obj = data.posts[item];
                obj["key"] = item;
                allPosts.unshift(data.posts[item])
                setPosts([...posts,allPosts])
            }

            for(const item in data.starred){
                allStarredPostsKeys.push(item)
            }
        })
        const postDetails = ref(database, 'posts/');
        onValue(postDetails, (snapshot) => {
            const data = snapshot.val()
            const allStarredPosts = []

            for(const item in allStarredPostsKeys){
                var obj = data[allStarredPostsKeys[item]];
                obj["key"] = allStarredPostsKeys[item];
                allStarredPosts.unshift(obj)
                setStarredPosts([...starredPosts,allStarredPosts])
            }
            // setStarredPosts(allStarredPosts)
        })

      }, [uid])

    const postsImages = [
        "https://assets.traveltriangle.com/blog/wp-content/uploads/2016/07/limestone-rock-phang-nga-1-Beautiful-limestone-rock-in-the-ocean.jpg",
        "https://www.opodo.co.uk/blog/wp-content/uploads/sites/12/2016/04/regaleira-portugal.jpg",
        "https://www.revv.co.in/blogs/wp-content/uploads/2021/06/Unakoti-Hill.jpg",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/harpers-ferry-west-virginia-royalty-free-image-1660073165.jpg?crop=0.699xw:1.00xh;0.128xw,0&resize=640:*",
        "https://assets.traveltriangle.com/blog/wp-content/uploads/2015/11/Chembra-Lake-in-Meppadi.jpg",
        "https://im.indiatimes.in/media/content/2015/Sep/shivagange_cliff_1443524577_725x725.jpg",
        "https://qph.cf2.quoracdn.net/main-qimg-467ede38ba6e9e18b41ad836c0ac9483-lq",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCre2qyl9Xwm1p-SRFeZ81lTzEgj8HIjjy-g&usqp=CAU"
    ]

    const starredImages = [
        "https://www.swantour.com/blogs/wp-content/uploads/2019/04/Unexplored-Places-in-Delhi.jpg",
        "https://www.revv.co.in/blogs/wp-content/uploads/2020/03/unexplored-places-to-visit-in-delhi-1280x720.jpg",
        "https://qph.cf2.quoracdn.net/main-qimg-53e29f2f0cb078fa348b0ee7a9e03c82-lq",
        "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/1/2017/12/05190911/HARPER-NINE-CHAMBERED-1.jpg?w=1200&h=628&fill=blur&fit=fill",
    ]

    const [visible, setVisible] = useState(0);
    return (
        <Layout>
            <View width='100%' height='100%'>
            <ScrollView width="100%" nestedScrollEnabled={true}>
                <View height={60} style={{justifyContent: 'center', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={{position: 'absolute', left: 10}} onPress={() => navigation.navigate("Explore")}>
                        <Icon name="left" size={20} color="#003585"/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>PROFILE</Text>
                </View>
                <View style={styles.profileheader}>
                    <View style={{alignItems: 'center'}}>
                        <ProfileImage source={profileUrl}/>
                        <Text 
                            style={{paddingTop: 10, fontFamily: 'Nunito-Bold', fontSize: 20, color: '#003585' }}
                        >{username}</Text>
                        <Text style={{padding: 10, color: '#149DE1', fontFamily: 'Nunito-Medium'}}>{name}</Text>
                    </View>
                    {uid === userUid &&
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("Edit")}>
                            <Text style={{color: "#FFF4E0", fontFamily: 'Nunito-Medium'}}>Edit Profile</Text>
                        </TouchableOpacity>
                    }
                    <View style={styles.briefDetails}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.number}>{postCount}</Text>
                            <Text style={{color: "#003585", fontFamily: 'Nunito-Medium'}}>Posts</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.number}>{streakCount}</Text>
                            <Text style={{color: "#003585"}}>Streaks</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.tab, {marginHorizontal: 10}]}>
                    <View style={styles.tab}>
                            <TouchableOpacity style={[styles.tabButton, (visible!=0) ? {opacity: 0.5, color: '#003585'} : null]} onPress={() => visible!=0 & setVisible(0)}>
                                <Text style={{fontFamily: 'Nunito-Medium', color:'#003585'}}>Posts</Text>
                                <View style={styles.divider}></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabButton, (visible!=1) ? {opacity: 0.5, color: '#003585'} : null]} onPress={() => visible!=1 & setVisible(1)}>
                                <Text style={{fontFamily: 'Nunito-Medium', color:'#003585'}}>Starred</Text>
                                <View style={styles.divider}></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabButton, (visible!=2) ? {opacity: 0.5, color: '#003585'} : null]} onPress={() => visible!=2 & setVisible(2)}>
                                <Text style={{fontFamily: 'Nunito-Medium', color:'#003585'}}>Memories</Text>
                                <View style={styles.divider}></View>
                            </TouchableOpacity>
                    </View>
                </View>
                <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', marginHorizontal: 3}}>
        
                    {visible==0 ? (posts!=="undefined" && posts!==null) ? <FlatList 
                        numColumns={3}
                        data={posts[0]}
                        scrollEnabled={false}
                        extraData={posts}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('More Info', {
                                      postId:item.key,
                                    });
                                  }}>
                                    <Image 
                                        source={{uri: item.imageUrl}} 
                                        style={styles.images}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    /> : null : (visible==1 ? <FlatList 
                    numColumns={3}
                    data={starredPosts[0]}
                    scrollEnabled={false}
                    extraData={starredPosts}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('More Info', {
                                  postId:item.key,
                                });
                            }}>
                                <Image 
                                    source={{uri: item.imageUrl}} 
                                    style={styles.images}
                                />
                            </TouchableOpacity>
                        )
                    }}
                    /> : <FlatList 
                            numColumns={3}
                            data={postsImages}
                            scrollEnabled={false}
                            renderItem={({item}) => {
                                return (
                                    <View>
                                        <Image 
                                            source={{uri: item}} 
                                            style={styles.images}
                                        />
                                        <Text style={{textAlign: 'center', backgroundColor: '#1c315e', color: '#fff', marginHorizontal: 2, marginBottom: 2, padding: 5}}>January, 2023</Text>
                                    </View>
                                )
                            }}
                        />)
                    }
        
                </ScrollView>
            </ScrollView>
            <Footer active='profile' uid={uid} navigateOption={navigation}/>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    profileheader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Dimensions.get('window').height/2,
        backgroundColor: '#FFF4E0',
        paddingVertical: 40
    },
    editButton: {
        paddingVertical: 10,
        margin: 5,
        paddingHorizontal: 40,
        borderRadius: 20,
        backgroundColor: '#1c315e',
    },
    briefDetails: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10
    },
    number: {
        fontSize: 20,
        fontFamily: 'NunitoBlack',
        color: '#003585'
    },
    tab: {
        height: Dimensions.get('window').height/12,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 8
    },
    tabButton: {
        color: '#003585',
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
    },
    divider: {
        borderBottomColor: '#003585',
        borderWidth: 1,
        width: '90%',
        margin: 10
    },
    images: {
        height: (Dimensions.get('window').width-20)/3,
        width: (Dimensions.get('window').width-20)/3,
        margin: 2,
        marginBottom: 0
    },
    headerText:{
        color:'#003585',
        fontSize:20,
        marginLeft: 5,
        fontFamily:'NunitoBlack'
     }
})