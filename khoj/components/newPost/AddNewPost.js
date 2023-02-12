import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
// import FormikPostUploader from './FormikPostUploader';
import PostUploader from './PostUploader';
import Icon from 'react-native-vector-icons/AntDesign'

const AddNewPost = (props) => {
  return (
    <View style={styles.container}>
        <Header navigateOption={props.navigateOption}/>
        {/* <FormikPostUploader /> */}
        <PostUploader navigateOption={props.navigateOption}/>
    </View>
  )
}

const Header = (props) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => props.navigateOption.navigate("Explore")}>
            {/* <Image source={require('../../assets/back.png')} style={{width: 20, height: 20}}/> */}
            <Icon name="left" size={20} color="#003585"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>NEW POST</Text>
        <Text></Text>
    </View>
)

const styles = StyleSheet.create({
  container:{
      marginHorizontal: 10,
      marginTop: 10,
  },
  headerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText:{
     color:'#003585',
    //  fontWeight:'700',
     fontSize:20,
     marginRight: 15,
     fontFamily: 'NunitoBlack',
  },
});

export default AddNewPost