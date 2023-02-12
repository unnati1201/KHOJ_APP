import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Divider } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import DropdownComponent from './DropdownComponent';
import { auth, database, storage } from "../../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, push, update, onValue } from "firebase/database";
import { ref as REF, uploadBytes, getDownloadURL}  from "firebase/storage";
const PostUploader = (props) => {

    const placeHolderImg = require('../../assets/placeHolder.png');

    const [postImage, setPostImage] = useState(null);
    const [uid, setUid] = useState('');
    const [tag, setTag] = useState('');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    let postCount;
    const newPostKey = push(child(ref(database), 'posts')).key;

    const [uploading, setUploading] = useState(false);

    const userDetails = ref(database, 'users/' + uid);
        onValue(userDetails, (snapshot) => {
            const data = snapshot.val();
            postCount = data.postCount;
        });

    onAuthStateChanged(auth, (user) => {
        if(user){
          setUid(user.uid)
        }else{
          console.log("signed out")
        }
    })

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setPostImage(result.assets[0].uri);
    };

    const uploadImage = async () => {
      setUploading(true);
  
      if(postImage !== null){
        const response = await fetch(postImage)
        const blob = await response.blob()
  
        const storageRef = REF(storage, 'postImages/'+newPostKey);
        
        const test = await uploadBytes(storageRef, blob).then(async (snapshot) => {
          console.log('Uploaded a blob or file!');
          const ans= await getDownloadURL(storageRef).then((url) => {
            setUploading(false)
            
            return url;
          })
          return ans;
        });
        return test
      }
    }

    const newPost = () => {
        uploadImage().then((value) => {
          const time = new Date();
          update(ref(database, 'users/' + uid + '/posts/' + newPostKey), {
            imageUrl: value,
            tag: tag,
            likes: 0,
            heading: heading,
            description: description,
            location: location,
            comments: [],
            timestamp: time
        }).then(()=> {
          update(ref(database, 'users/' + uid),{
              postCount: postCount+1
          })
        }).then(() => {
          update(ref(database, tag + '/' + newPostKey), {
              imageUrl: value,
              tag: tag,
              likes: 0,
              heading: heading,
              description: description,
              location: location,
              comments: [],
              author: uid,
              timestamp: time
          })
        }).then(() => {
          update(ref(database, 'posts/' + newPostKey), {
              imageUrl: value,
              tag: tag,
              likes: 0,
              heading: heading,
              description: description,
              location: location,
              comments: [],
              author: uid,
              timestamp: time
          })
        });
          props.navigateOption.navigate("Profile");
        })
      }

  return (
    <View>
    <ScrollView style={{height:'88%'}}>
        <View style={styles.outer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={postImage ? {uri: postImage} : placeHolderImg} style={styles.photo}/>
                </TouchableOpacity>
                <View style={styles.inner}>
                    <TextInput 
                    style={{color: '#003585', fontSize: 17, marginBottom:15, fontFamily:'Nunito-Medium'}}
                    placeholder='Write a heading' 
                    placeholderTextColor='#5d7ba8'
                    multiline={true}
                    maxLength={100}
                    onChangeText={(heading) => setHeading(heading)}
                    />

                    <Divider width={1} orientation='vertical' />

                    <TextInput 
                    style={{color: '#003585', marginTop:5, fontFamily:'Nunito-Medium'}}
                    placeholder='Add location' 
                    placeholderTextColor='#5d7ba8'
                    multiline={true}
                    maxLength={1100}
                    onChangeText={(location) => setLocation(location)}
                    />

                </View>
            </View>
            <View style={{ marginTop:20 }}>
                <Divider width={1} orientation='vertical' />
                    <DropdownComponent setTag={(tag) => setTag(tag)}/>
    
                <Divider width={1} orientation='vertical' />
                    <TextInput 
                    style={styles.lowerFields}
                    placeholder='Add the description...' 
                    placeholderTextColor='#5d7ba8'
                    multiline={true}
                    maxLength={1200}
                    numberOfLines={35}
                    textAlignVertical='top'
                    onChangeText={(description) => setDescription(description)}
                    />
            </View>
    </ScrollView>
    <View style={styles.buttonOuter}>
        <TouchableOpacity onPress={newPost} style={styles.button}><Text style={{fontFamily:'Nunito-Medium', color:'#FFFFFF'}}>Share</Text></TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    outer:{
        margin:20,
        marginTop:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    inner:{
        flex:1,
        marginLeft:20,
    },
    photo:{
        width: 140, 
        height: 140,
        borderRadius:5,
        elevation:5,
        borderColor:'white',
        borderWidth:1,
    },
    lowerFields:{
        color:'#003585',
        marginLeft:20,
        marginRight:10,
        marginTop:12,
        marginBottom:12,
        fontFamily:'Nunito-Medium',
    },
    button:{
        backgroundColor:'#003585',
        borderRadius:10,
        padding:15,
        alignItems:'center',
    },
    buttonOuter:{
        justifyContent:'flex-end',
    },
  });

export default PostUploader