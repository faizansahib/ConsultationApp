import { StyleSheet, Text, View, Image, TextInput , TouchableOpacity} from 'react-native'
import React from 'react'

const SignUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.MainImg}>
        <Image style={styles.ImageStyles} source={require('../../assets/logo.png')}>

        </Image>
        <Text style={styles.TextStyles}>MEDEASY</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.LogoText}>Register</Text>
        <TextInput  style={styles.TextInputStyles}
        placeholder='Full Name'
        placeholderTextColor={'#000000'}
        >

        </TextInput>
        <TextInput  style={styles.TextInputStyles}
        placeholder='Email'
        placeholderTextColor={'#000000'}
        >

        </TextInput>

        <TextInput  style={styles.TextInputStyles}
        placeholder='Mobile Number'
        placeholderTextColor={'#000000'}
        >

        </TextInput>
        <TextInput  style={styles.TextInputStyles}
        placeholder='Password'
        placeholderTextColor={'#000000'}
        >

        </TextInput>
        <TouchableOpacity style={styles.BtnStyles}>
          <Text style={styles.SignUpStyles}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.SignInStyles}>
          <Text style={styles.StylesAccount}>Already have an account</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.SigneInStylesText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: 'white'
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
    marginBottom: 56
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