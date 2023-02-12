import { Text, StyleSheet, TouchableOpacity } from "react-native"

export default function AuthButton(props){
    return (
        <TouchableOpacity style={styles.authbutton} onPress={props.onClick}>
            <Text style={styles.buttonContent}>{props.buttonName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    authbutton: {
        backgroundColor: '#003585',
        borderColor: '#003585',
        margin: 10,
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonContent: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16
    },
})