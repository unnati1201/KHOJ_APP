import {Text, View, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../Layout";
import {useRef} from 'react'

const FindBuddy = ({navigation}) => {
    return (
        <Layout>
            <Header/>
            <ImageBackground source={require('../../assets/Map.jpg')} style={styles.image}>
                <View style={styles.radar}>
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
        <Text style={styles.headerText}>FIND BUDDY</Text>
    </View>
)

const Buddy = ({top, left}) => {
    const ChipStyles = useRef({
        position: 'absolute',
        top: top,
        left: left,
    });

    return (
        <TouchableOpacity>
            <Image source={require('../../assets/profile.png')} style={[ChipStyles.current, {margin:10, width: 50, height: 50, backgroundColor:'#D9D9D9', borderRadius:50, borderColor: '#003585', borderWidth: 2}]}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
    },
    headerText:{
        color:'#003585',
        fontSize:20,
        fontFamily:'NunitoBlack',
     },
     image: {
        height: Dimensions.get('window').height-50,
        width: Dimensions.get('window').width,
        opacity: 0.7,
      },
      radar: {
        height: Dimensions.get('window').width-40,
        width: Dimensions.get('window').width-40,
        backgroundColor: '#FEBA02',
        borderRadius: 200,
        marginTop: ((Dimensions.get('window').height-40)/2)-((Dimensions.get('window').width-40)/2)-40,
        marginLeft: ((Dimensions.get('window').width)/2)-((Dimensions.get('window').width-40)/2),
      }
});

export default FindBuddy;