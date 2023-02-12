import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TAGS } from '../../data/tagsData';

const DropdownComponent = ({setTag}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#FEBA02' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{backgroundColor:'#FFF4E0', fontFamily:'Nunito-Medium', borderRadius: 8}}
        itemContainerStyle={{margin:3, height:55, fontFamily:'Nunito-Medium', borderRadius: 8}}
        itemTextStyle={{color:'#003585', fontSize:14, fontFamily:'Nunito-Medium'}}
        activeColor='#FEBA02'
        data={TAGS.slice(1)}
        search
        maxHeight={300}
        labelField="tagName"
        valueField="value"
        placeholder={!isFocus ? 'Select the tag' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          setTag(item.tagName)
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#FEBA02',
    backgroundColor: '#FFF4E0',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor:'#FEBA02',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color:'#5d7ba8',
    fontFamily:'Nunito-Medium',
  },
  selectedTextStyle: {
    fontSize: 14,
    color:'#003585',
    marginLeft:5,
    fontFamily:'Nunito-Medium',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color:'#003585',
    fontFamily:'Nunito-Medium',
    borderColor: '#FEBA02',
    borderRadius: 8,
  },
});