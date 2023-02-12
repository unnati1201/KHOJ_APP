import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { TAGS } from '../../data/tagsData';

const Tags = ({filterPosts}) => {
  return (
    <View style={{marginBottom: 20}}>
        <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        >
            {TAGS.map((tag, index)=>(
                <TouchableOpacity style={styles.tag} key={index} onPress={()=>filterPosts(tag.tagName)}>
                    <Text style={styles.name}>{tag.tagName}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    tag:{
        backgroundColor:'#003585',
        paddingBottom:5,
        paddingTop:5,
        paddingLeft:10,
        paddingRight:10,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        borderRadius:10,
    },
    name:{
        color:'#FFF4E0',
        fontFamily:'Nunito-Bold',
    },
  });

export default Tags