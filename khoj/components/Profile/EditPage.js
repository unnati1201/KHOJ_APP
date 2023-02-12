import {View, StyleSheet, TextInput, Text, Image, TouchableOpacity} from 'react-native'
import Layout from '../Layout';
import ProfileImage from './ProfileImage';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { auth, database, storage } from "../../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, push, update, onValue } from "firebase/database";
import { ref as REF, uploadBytes, getDownloadURL}  from "firebase/storage";

export default function EditPage({navigation}) {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uid, setUid] = useState('');

    let oldName, oldUsername, profileImageDefault;

    const userDetails = ref(database, 'users/' + uid);
            onValue(userDetails, (snapshot) => {
            const data = snapshot.val();
            oldName=data.name;
            oldUsername=data.username;
            profileImageDefault=data.profileUrl
    });

    onAuthStateChanged(auth, (user) => {
        if(user){
          setUid(user.uid);
        }else{
          console.log("signed out")
        }
      })

      const saveChanges = () => {
        update(ref(database, 'users/' + uid), {
          name: name.length!==0 ? name : oldName,
          username: username.length!==0 ? username : oldUsername,
      });
        uploadImage()
        navigation.navigate("Profile");
      }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    setImage(result.assets[0].uri);
  };

  const uploadImage = async () => {
    setUploading(true);

    if(image !== null){
      const response = await fetch(image)
      const blob = await response.blob()

      const storageRef = REF(storage, 'profileImages/'+uid);

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(() => {
        setUploading(false)
        setImage(null);
        const profileImageDetails = REF(storage, 'profileImages/' + uid)
        getDownloadURL(profileImageDetails).then((url) => {
          update(ref(database, 'users/'+uid), {profileUrl: url})
        })
      });
    }
  }

    return (
        <Layout>
            <View style={styles.editBox}>
                <Text style={styles.title}>EDIT PROFILE</Text>
                <View style={{opacity: 0.6, alignItems: 'center'}}>
                    <ProfileImage source={image ? image : profileImageDefault}/>
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={{textDecorationLine: 'underline', padding: 10, fontFamily: 'Nunito-Medium', color:'#149DE1'}}>Change Profile Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', width: '85%'}}>
                  <View style={[styles.label,{backgroundColor: '#FEBA02'}]}>
                    <Text style={{color: '#FFFFFF', textAlign: 'center'}}>Name</Text>
                  </View>
                  <TextInput maxLength={20} style={[styles.textBox]} placeholder={oldName} onChangeText={(name) => setName(name)}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', width: '85%'}}>
                  <View style={[styles.label,{backgroundColor: '#FEBA02'}]}>
                    <Text style={{color: '#FFFFFF', textAlign: 'center'}}>Username</Text>
                  </View>
                  <TextInput maxLength={20} style={styles.textBox} placeholder={oldUsername} onChangeText={(username) => setUsername(username)}/>
                </View>
                <TouchableOpacity style={[styles.savebutton,{backgroundColor: '#003585'}]} onPress={saveChanges}>
                    <Text style={{color:'#FFFFFF', fontFamily: 'Nunito-Medium'}}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.savebutton,{borderColor: '#003585', borderWidth: 1}]} onPress={()=>navigation.navigate("Profile")}>
                    <Text style={{color:'#003585', fontFamily: 'Nunito-Medium'}}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
  }

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontFamily: 'NunitoBlack',
        color: '#003585',
        padding: 20
    },
    editBox: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    textBox: {
        borderWidth: 1,
        paddingVertical: 10,
        padding: 20,
        margin: 10,
        marginLeft: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderColor: '#FEBA02',
        backgroundColor:'#FFF4E0',
        flex: 4
    },
    label: {
      borderColor: '#FEBA02',
      borderWidth: 0.5,
      paddingVertical: 14,
      paddingHorizontal: 5,
      margin: 10,
      marginRight: 0,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      flex: 2
    },
    savebutton: {
        alignItems: 'center',
        padding: 15,
        width: '80%',
        margin: 10,
        borderRadius: 10,
    },
  });