import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function Footer({active, uid, navigateOption}) {

    const styles = StyleSheet.create({
        footerStyle: {
            flexDirection:'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderTopColor:'#92acd4',
            borderTopWidth:0.2,
        },
        homeIcon: {
            color: active !== 'home' ? '#92acd4' : '#003585'
        },
        exploreIcon: {
            color: active !== 'explore' ? '#92acd4' : '#003585'
        },
        profileIcon: {
            color: active !== 'profile' ? '#92acd4' : '#003585'
        },
        groupIcon: {
            color: active !== 'travelMate' ? '#92acd4' : '#003585'
        },
        font: {
            fontSize: 11,
            textAlign: 'center',
            paddingTop: 3
        },
        iconStyle: {
            alignItems: 'center',
            paddingVertical:10,
            paddingHorizontal:Dimensions.get("window").width/8,
        }
    })

    return (
        <View style={styles.footerStyle}>
            <TouchableOpacity style={styles.iconStyle} onPress={() => navigateOption.navigate("Explore")}>
                <Icon name='home' size={20} color='grey' style={styles.homeIcon}></Icon>
                {/* <Text style={[styles.font, styles.homeIcon]}>Home</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle} onPress={() => navigateOption.navigate("ExplorePage")}>
                <FontAwesomeIcon name='binoculars' size={17} style={styles.exploreIcon}/>
                {/* <Text style={[styles.font, styles.exploreIcon]}>Explore</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle} onPress={() => navigateOption.navigate("Profile",{authorUid: uid})}>
                <FontAwesomeIcon name='user-o' size={19} style={styles.profileIcon}/>
                {/* <Text style={[styles.font, styles.profileIcon]}>Profile</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle} onPress={() => navigateOption.navigate("TravelMate")}>
                <FontAwesomeIcon name='group' size={20} style={styles.groupIcon}></FontAwesomeIcon>
                {/* <Text style={[styles.font, styles.groupIcon]}>TravelMate</Text> */}
            </TouchableOpacity>
        </View>
    )
}

export default Footer;