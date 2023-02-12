import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native"

export default function AuthButton(props){

    const navigate = () => {
        props.navigateOption.navigate(props.navigate)
    }

    return (
        <View>
            <View style={{flexDirection:"row", paddingTop: 20, alignItems: 'center'}}>
                <View style={styles.divider}></View>
                <View><Text style={{color: '#149DE1', textAlign: 'center', paddingHorizontal: 10}}> {props.otherOptionText} </Text></View>
                <View style={styles.divider}></View>
            </View>

            <View>
                <TouchableOpacity style={styles.googlebutton}>
                    <Image source={require('../../assets/google.png')} style={{width: 30, height: 30}}/>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row", alignItems: 'center', justifyContent: 'center'}}>
                <View>
                    <Text style={{color: '#003585', textAlign: 'center'}}> {props.text} </Text>
                </View>
                <View>
                    <Text 
                        style={{color: '#CF2E2E', textAlign: 'center', textDecorationLine: 'underline'}}
                        onPress={() => navigate()}
                    >
                        {props.linkName}</Text>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    divider: {
        flex:1, 
        height: 1,  
        backgroundColor: '#149DE1'
    },
    googlebutton: {
        backgroundColor: '#FFF4E0',
        padding: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 30
    }
})