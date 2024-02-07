import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Button, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../config/firebase';
import { ScrollView } from 'react-native-gesture-handler';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleSignUp = () => {
    if (email !== '' && password !== '' && username !== '' && profilePic !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          
          // Log user data
          console.log('User signed up:', user);
  
          // Update the user's profile with additional information
          updateProfile(user, { displayName: username, photoURL: profilePic })
            .then(() => {
              console.log('Profile updated successfully');
              // Additional logic or navigation after successful signup
            })
            .catch((profileErr) => console.log('Error updating profile:', profileErr));
        })
        .catch((err) => console.log('Unable to create account', err.message));
    }
  };
  



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
  
      // Check if the image size is greater than 1 MB
      const imageSizeInBytes = result.assets[0].fileSize;
      const imageSizeInMB = imageSizeInBytes / (1024 * 1024);
  
      if (imageSizeInMB > 1) {
        // Show an alert or handle the case when the image size is greater than 1 MB
        alert('Image size should be 1 MB or less.');
      } else {
        setProfilePic(imageUri);
      }
    }
  };


  useEffect(() => {
    // setProfilePic(null)
    console.log(profilePic,username,email,password)
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.MainImg}>
        <Image style={styles.ImageStyles} source={require('../../assets/logo.png')} />
        <Text style={styles.TextStyles}>MEDEASY</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.LogoText}>Register</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginTop:5,marginBottom:5 }}>
        
    </View>
    <TouchableOpacity onPress={() => pickImage()} style={styles.BtnStyles1}>
      <ImageBackground source={{uri:profilePic}} borderRadius={50} style={{ width: 100, height: 100, }}   />
        </TouchableOpacity  >
      {/* {profilePic && <Image source={{ uri: profilePic }} style={{ width: 100, height: 100 }} />} */}

    <TextInput
          style={styles.TextInputStyles}
          placeholder="Username"
          placeholderTextColor={'#000000'}
          onChangeText={(t) => setUsername(t)}
        />
        <TextInput
          style={styles.TextInputStyles}
          placeholder="Email"
          placeholderTextColor={'#000000'}
          onChangeText={(t) => setEmail(t)}
        />
        <TextInput
          style={styles.TextInputStyles}
          placeholder="Password"
          placeholderTextColor={'#000000'}
          onChangeText={(t) => setPassword(t)}
          secureTextEntry
        />
       
     
        <TouchableOpacity onPress={() => handleSignUp()} style={styles.BtnStyles}>
          <Text style={styles.SignUpStyles}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.SignInStyles}>
          <Text style={styles.StylesAccount}>Already have an account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.SigneInStylesText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center'
  },
  ImageStyles: {
    width: 56,
    height: 43
  },
  MainImg: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 56,
  
  },
  TextStyles: {
    fontSize: 20,
    fontWeight: '700',
    color: '#166FC1E5'
  },
  subContainer: {
    backgroundColor: '#C4C4C4',
    width: "100%",
    height: 579,
    borderRadius: 40,
    paddingHorizontal: 56,
    paddingVertical: 21,
    justifyContent:'center',
    alignItems:'center'
  },
  LogoText:{
    fontSize:24,
  fontWeight:'600',
  color:'#000000CC',
   alignSelf:'center'
  },
  TextInputStyles:{
     height:67,
     width:277,
     backgroundColor:'#E5E5E5',
     marginTop:8,
     borderRadius:10,
     alignItems:'center',
     justifyContent:'center',
     textAlign:'center',
     fontSize:20,
     fontWeight:"700"
    
    
  },
  BtnStyles:{
    width:280,
    height:63,
    backgroundColor:'#288CE8B2',
    borderRadius:20,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center'
  },
  BtnStyles1:{
    width: 100, 
    height: 100,
    borderRadius: 50, 
    backgroundColor:'#288CE8B2',
    justifyContent:'center',
    alignItems:'center'
  },
  SignUpStyles:{
    color:'white',
    fontSize:20,
    fontWeight:'500'
  },
  SignInStyles:{
 alignItems:'center',
 marginTop:20
  },
  StylesAccount:{
    fontSize:20,
    fontWeight:'700',
    color:"black"
  },
  SigneInStylesText:{
    fontSize:20,
    fontWeight:'500',
    color:'#288CE8B2'
    
  }
})