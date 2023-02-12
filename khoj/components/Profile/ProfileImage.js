import { StyleSheet, Image } from "react-native"

export default function ProfileImage(props){
    return (
        <Image source={props.source ? {uri: props.source} : null} style={styles.profileImg} alt="profile pic"/>
    )
}

const styles = StyleSheet.create({
    profileImg: {
        width: 120, 
        height: 120, 
        borderRadius: 60,
        borderColor: '#003585',
        borderWidth: 5
    },
})