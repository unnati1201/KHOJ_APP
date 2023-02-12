import {View, Text, StyleSheet, ScrollView, FlatList, Image, Dimensions} from "react-native"
import Footer from "../Footer"
import Layout from "../Layout"
import { useState } from "react"
import { auth } from "../../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import Tags from "../explore/Tags"
import SearchBar from "../SearchBar"

const ExplorePage = ({navigation}) => {
    const [uid, setUid] = useState('');
    onAuthStateChanged(auth, (user) => {
        if(user){
            setUid(user.uid)
        }else{
          console.log("signed out")
        }
      })

      const filterPosts = (tagName) => {
        // const postDetails = tagName==='All' ? ref(database, 'posts') : ref(database, tagName);
        // onValue(postDetails, (snapshot) => {
        //     const data = snapshot.val();
        //     const allPosts = []
        //     for(const item in data){
        //         var obj = data[item];
        //         obj["key"] = item;
        //         allPosts.unshift(data[item])
        //     }
        //     setPosts(allPosts)
        // })
      }

      const postsImages = [
        "https://assets.traveltriangle.com/blog/wp-content/uploads/2016/07/limestone-rock-phang-nga-1-Beautiful-limestone-rock-in-the-ocean.jpg",
        "https://www.opodo.co.uk/blog/wp-content/uploads/sites/12/2016/04/regaleira-portugal.jpg",
        "https://www.revv.co.in/blogs/wp-content/uploads/2021/06/Unakoti-Hill.jpg",
        "https://assets.telegraphindia.com/telegraph/2022/Jul/1656615678_new-project-6-25.jpg",
        "https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2022/04/2c3d4-street-food-delhi.jpg?fit=1000%2C666&ssl=1",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/harpers-ferry-west-virginia-royalty-free-image-1660073165.jpg?crop=0.699xw:1.00xh;0.128xw,0&resize=640:*",
        "https://assets.traveltriangle.com/blog/wp-content/uploads/2015/11/Chembra-Lake-in-Meppadi.jpg",
        "https://im.indiatimes.in/media/content/2015/Sep/shivagange_cliff_1443524577_725x725.jpg",
        "https://static2.tripoto.com/media/filter/tst/img/295892/TripDocument/1488820541_national_museum_travel_samosa.jpg",
        "https://assets.cntraveller.in/photos/616821af65f0a7c290960b16/3:2/w_1620,h_1080,c_limit/street-food-innovations-lead.jpg",
        "https://images.travelandleisureindia.in/wp-content/uploads/2022/02/18123747/Untitled-design-2022-02-18T123717.280.jpg",
        "https://qph.cf2.quoracdn.net/main-qimg-467ede38ba6e9e18b41ad836c0ac9483-lq",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCre2qyl9Xwm1p-SRFeZ81lTzEgj8HIjjy-g&usqp=CAU",
        "https://static2.tripoto.com/media/filter/tst/img/295892/TripDocument/1488820541_national_museum_travel_samosa.jpg",
        "https://etimg.etb2bimg.com/thumb/msid-87355500,imgsize-73826,width-1200,height-900,overlay-ethospitalityworld/bengaluru-s-popular-cafe-noir-forays-into-mumbai.jpg"
    ]
    return (
        <Layout>
            <View width='100%' height='100%'>
            <Header/>
            <SearchBar />
            <Tags filterPosts={filterPosts}/>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', marginHorizontal: 3}}>
                <FlatList 
                    numColumns={3}
                    data={postsImages}
                    scrollEnabled={false}
                    renderItem={(item) => {
                        console.log(item.item)
                        return (
                            <View>
                                <Image 
                                    source={{uri: item.item}} 
                                    style={styles.images}
                                />
                            </View>
                            )
                        }
                    }
                />
            </ScrollView>
            <Footer active='explore' uid={uid} navigateOption={navigation}></Footer>
            </View>
        </Layout>
    )
} 

const Header = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>EXPLORE</Text>
    </View>
)

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
    },
    headerText:{
        color:'#003585',
        fontSize:20,
        fontFamily:'NunitoBlack',
     },
    images: {
        height: (Dimensions.get('window').width-20)/3,
        width: (Dimensions.get('window').width-20)/3,
        margin: 2,
        marginBottom: 2
    }
})

export default ExplorePage