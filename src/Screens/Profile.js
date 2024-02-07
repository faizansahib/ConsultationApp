import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { auth,database} from '../config/firebase';



const Profile = ({navigation}) => {

    const [user, setUser] = useState(null);

    
      useEffect(() => {
        const unsubscribe = auth.currentUser
          setUser(unsubscribe);
        
    
      
          console.log('user data:',unsubscribe.displayName)
      }, []);


  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.photoURL ? user?.photoURL : 'https://via.placeholder.com/150' }} // Placeholder image URL
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user?.displayName}</Text>
      <Text style={styles.bio}>Software Engineer</Text>
      <Text style={styles.info}>Age: 30</Text>
      <Text style={styles.info}>Location: New York, USA</Text>
      <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile') } style={styles.btn} >
            <Text style={styles.SigneInStylesText}>Update Profile</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 18,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  SigneInStylesText:{
    fontSize:20,
    fontWeight:'500',
    color:'#FFFFFF'
    
  },
  btn:{
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop:20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
});

export default Profile;
