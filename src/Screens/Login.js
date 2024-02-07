import { StyleSheet, Text, View,Image,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../config/firebase';





const Login = ({navigation}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleLogin = () => {
      console.log('called')
      if(email !== '' && password !== '') {
             
          signInWithEmailAndPassword(auth,email,password)
          .then(() => console.log("Login Success"))
          .catch((err) => console.log("Login Error", err.message))
      }
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Image style={styles.logo} source={require('../../assets/logo.png')} />
         <Text style={styles.title}>MEDEASY</Text>
      </View>
      <View style={styles.subContainer} >
           <Text style={styles.subtitle}>Login</Text>
           <View>
            <TextInput style={styles.inputs} onChangeText={(t) => setEmail(t)} placeholderTextColor={'#000000'} placeholder={'Mobile Number / \n Email'} />
            <TextInput style={styles.inputs} onChangeText={(t) => setPassword(t) } placeholderTextColor={'#000000'} placeholder='Password' />
           </View>
           <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
            <Text style={styles.btnTxt}>Log In</Text>
           </TouchableOpacity>
           <Text style={styles.forgetTxt}>Forget password?</Text>
           <View style={styles.line} />

           <TouchableOpacity style={styles.btnTwo} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.txtGoogle}>Sign Up</Text>
            {/* <Image source={require('../../assets/google.png')} style={styles.googleImg} /> */}
           </TouchableOpacity>
      </View>

    </View>
  )
}

export default Login

const styles = StyleSheet.create({

   container:{
    flex:1,
    
   },
   header:{
    flexDirection:'row',
    height:100,
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
   },
   logo:{
    width:56,
    height:43
   },
   title:{
    marginLeft:11,
    color:"#166FC1"
   },
   subContainer:{
    flex:1,
    backgroundColor:'#C4C4C4',
    justifyContent:'center',
    alignItems:'center',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    marginTop:50
   },
   subtitle:{
    color:'#000000',
    fontSize:18,
    fontWeight:'bold',
    marginBottom:20
   },
   inputs:{
    width:227,
    height:63,
    backgroundColor:'#E5E5E5',
    marginBottom:10,
    borderRadius:10,
    justifyContent:'center',
    textAlign:'center'
   },
   btn:{
    width:227,
    height:63,
    backgroundColor:'#288CE8',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
   },
   btnTxt:{
    fontSize:14,
    fontWeight:'600',
    color:'#FFFFFF'
   },
   forgetTxt:{
    marginTop:14,
    color:'#000000',

   },
   line:{
    height:2,
    width:200,
    backgroundColor:'#000000',
    marginTop:30
   },
   btnTwo:{
    marginTop:32,
    width:270,
    height:48,
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    flexDirection:'row'
   },
   googleImg:{
    width:35,
    height:35,
    
   },
   txtGoogle:{
    color:'#000000',
    fontWeight:'bold'
   }
})