import { View, StyleSheet, TouchableOpacity } from "react-native"

export default function AuthButton({children}){
    return (
        <View style={styles.inputbox} >{children}</View>
    )
}

const styles = StyleSheet.create({
    inputbox: {
        margin: 10,
        borderColor: '#FEBA02',
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: '#FFF4E0'
    },
})