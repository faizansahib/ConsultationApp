import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { auth, database } from '../config/firebase';
import {  updateProfile } from 'firebase/auth';


const UpdateProfile = ({navigation}) => {
  const user = auth.currentUser

  const [name, setName] = useState(user.displayName);
  const [age, setAge] = useState();
  const [bio, setBio] = useState('Software Engineer');
  const [location, setLocation] = useState('New York, USA');
  const [imageUri, setImageUri] = useState(user.photoURL ? user.photoURL : 'https://via.placeholder.com/150'); // Placeholder image URL


console.log(user)
  const uploadImage = async () => {
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
        setImageUri(imageUri);
      }
    }
  };


  const updateHandler = () => {
    return updateProfile(user, { displayName: name, photoURL: imageUri,bio:bio,location:location })
        .then(() => {
            console.log('Profile updated successfully');
             navigation.navigate('Home')
            // Additional logic or navigation after successful update
        })
        .catch((profileErr) => console.log('Error updating profile:', profileErr));
}

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={uploadImage}>
        <Image
          source={{ uri: imageUri }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />
      
      {/* Button with shadow */}
      <TouchableOpacity onPress={() => updateHandler()} style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UpdateProfile;
