import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function Footer({active, uid, navigateOption}) {

    const styles = StyleSheet.create({
        footerStyle: {
            flexDirection:'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#003585',
            paddingVertical:10,
        },
        homeIcon: {
            color: active !== 'home' ? '#5d7ba8' : '#FFF4E0'
        },
        exploreIcon: {
            color: active !== 'explore' ? '#5d7ba8' : '#FFF4E0'
        },
        profileIcon: {
            color: active !== 'profile' ? '#5d7ba8' : '#FFF4E0'
        },
        groupIcon: {
            color: active !== 'setting' ? '#5d7ba8' : '#FFF4E0'
        },
        font: {
            fontSize: 11,
            textAlign: 'center',
            paddingTop: 3
        },
        iconStyle: {
            alignItems: 'center',
        }
    })

    return (
        <View style={styles.footerStyle}>
            <TouchableOpacity style={styles.iconStyle} onPress={() => navigateOption.navigate("Explore")}>
                <Icon name='home' size={20} color='grey' style={styles.homeIcon}></Icon>
                <Text style={[styles.font, styles.homeIcon]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle} onPress={() => navigateOption.navigate("ExplorePage")}>
                <FontAwesomeIcon name='binoculars' size={17} style={styles.exploreIcon}/>
                <Text style={[styles.font, styles.exploreIcon]}>Explore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle} onPress={() => navigateOption.navigate("Profile",{authorUid: uid})}>
                <FontAwesomeIcon name='user-o' size={17} style={styles.profileIcon}/>
                <Text style={[styles.font, styles.profileIcon]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle}>
                <FontAwesomeIcon name='group' size={20} style={styles.groupIcon}></FontAwesomeIcon>
                <Text style={[styles.font, styles.groupIcon]}>TravelMate</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer;