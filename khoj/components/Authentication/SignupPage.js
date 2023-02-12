import {Text, TextInput, View} from "react-native"
import {useState} from "react"
import Layout from "../Layout"
import Header from "./Header"
import AuthButton from "./AuthButton"
import InputBox from "./InputBox"
import GoogleAuth from "./GoogleAuth"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, database } from '../../firebase'
import { equalTo, getDatabase, ref, set, query, orderByChild, onValue } from "firebase/database";

export default function SignupPage({navigation}){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState(null);

    const submit = () => {
        if(username === ''){
            setSignupError("Please enter username");
        }else if(name === ''){
            setSignupError("Please enter name");
        }else if(email === ''){
            setSignupError("Please enter email ID");
        }else if(password === ''){
            setSignupError("Please enter password");
        }else{

            if(username !== username.toLowerCase()){
                setSignupError("Username must not have capital letters")
            }else{
                const format = /^[a-z0-9_]+$/;
                if(!format.test(username)){
                    setSignupError("Invalid characters present. Only alphanumeric values and underscore allowed in Username")
                }else{
                    
                    const usernameExists = query(ref(database, 'users'),orderByChild("username"),equalTo(username));
                    
                    onValue(usernameExists, (snapshot) => {
                        if(snapshot.val() === null){
                            createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredentials) => {
                                console.log("signing up...")
                                writeUserData(userCredentials.user.uid, name, username, email)
                            })
                            .catch((error) => {
                                if(error.code === "auth/email-already-in-use"){
                                    setSignupError("Email already exists. Please create an account with another email ID!")
                                }else if(error.code === "auth/invalid-email"){
                                    setSignupError("Incorrect Email ID")
                                }
                                // console.log(err.message)
                            })
                        }else{
                            setSignupError("Username already exists! Please try different username")
                        }
                    })
                    
                }
            }
        }
    }

    function writeUserData(userId, name, username, email) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            name: name,
            username: username,
            email: email,
            profileUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            postCount: 0,
            streakCount: 0,
            posts: [],
            liked: [],
            starred: [],
        }).then(() => {navigation.navigate("Explore")});
      }

    return (
        <Layout>
            <View width="90%">
                <Header heading="SIGN UP"/>
                {signupError !== null && <Text style={{textAlign: 'center', paddingTop: 5, color: 'red'}}>{signupError}</Text>}
                <View>
                <InputBox>
                        <TextInput placeholder="Username" autoCapitalize='none' maxLength={20} onChangeText={(username) => setUsername(username.replace(/\s/g, ''))}/>
                    </InputBox>
                    <InputBox>
                        <TextInput placeholder="Name" maxLength={20} onChangeText={(name) => setName(name)}/>
                    </InputBox>
                    <InputBox>
                        <TextInput placeholder="Email ID" textContentType='emailAddress' keyboardType='email-address' autoCapitalize='none' autoCorrect={false} autoCompleteType='email' onChangeText={(email) => setEmail(email.replace(/\s/g, ''))}/>
                    </InputBox>
                    <InputBox>
                        <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>
                    </InputBox>
                    <AuthButton buttonName="Sign Up" navigateOption={navigation} onClick={submit}/>
                </View>

                <GoogleAuth navigate="Login" text="Already have an account?" linkName="Login!" navigateOption={navigation} otherOptionText="or Sign Up with"/>
            </View>
        </Layout>
    )
}