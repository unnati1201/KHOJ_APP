import {Text, TextInput, View, StyleSheet, TouchableOpacity, Image} from "react-native"
import Layout from "../Layout";
import Header from "./Header";
import AuthButton from "./AuthButton";
import InputBox from './InputBox'
import GoogleAuth from './GoogleAuth'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

export default function LoginPage({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const submit = () => {
        if(email === ''){
            setLoginError("Enter email ID")
        }else if(password === ''){
            setLoginError("Enter password")
        }else{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate("Explore", {user:user})
            })
            .catch((error) => {
                if(error.code === "auth/user-not-found"){
                    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                    if(reg.test(email) === false){
                        console.log("Incorrect Email ID")
                        setLoginError("Incorrect Email ID")
                    }else{
                        console.log("Account doesn't exist. Please create an Account!")
                        setLoginError("Account doesn't exist. Please create an Account!")
                    }
                } else if (error.code === "auth/wrong-password"){
                    console.log("Wrong Password")
                    setLoginError("Wrong Password")
                } else {
                    console.log(error.message)
                    setLoginError("Error Occurred. Please retry.")
                }
            })
        }
    }

    // const validate = (text) => {
    //     console.log(text);
    //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    //     if (reg.test(text) === false) {
    //       console.log("Email is Not Correct");
    //       return false;
    //     }
    //     else {
    //       console.log("Email is Correct");
    //       return true;
    //     }
    //   }
    return (
        <Layout >
            <View width='90%'>
                <Header heading="LOGIN"/>
                {loginError !== null && <Text style={{textAlign: 'center', paddingTop: 5, color: 'red'}}>{loginError}</Text>}
                <View>
                    <InputBox>
                        <TextInput placeholder="Email ID"  onChangeText={(email) => setEmail(email)}/>
                    </InputBox>
                    <InputBox>
                        <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>
                    </InputBox>
                    <AuthButton buttonName="Login" navigateOption={navigation} onClick={submit}/>
                </View>

                <GoogleAuth navigate="Signup" text="Don't have an account?" linkName="Sign Up!" navigateOption={navigation} otherOptionText="or Sign In with"/>
            </View>
        </Layout>
    );
}
