import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddNewPost from '../components/newPost/AddNewPost';
import FontContainer from '../components/FontContainer';
import { auth } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth';

const NewPostScreen = ({navigation}) => {

  onAuthStateChanged(auth, (user) => {
    if(user){
      console.log(user.email," signed in")
    }else{
      console.log("signed out")
    }
  })

  return (
    <FontContainer>
    <SafeAreaView style={{backgroundColor:'#FFFFFF', flex: 1}}>
      <AddNewPost navigateOption={navigation}/>
    </SafeAreaView>
    </FontContainer>
  )
}

export default NewPostScreen