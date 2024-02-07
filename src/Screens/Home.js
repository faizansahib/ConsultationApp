import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList, } from 'react-native'
import React,{useState,useEffect} from 'react'
import { auth,database} from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


const Home = ({ navigation }) => {


  const data = [
    {
      id: 1,
      image: require('../../assets/1.png'),
      Title: 'Dr.Shah',
      subTitle: 'Cardiologist',
      ArrowImage: require('../../assets/Vector.png')
    },
    {
      id: 2,
      image: require('../../assets/2.png'),
      Title: 'Dr.Khan',
      subTitle: 'Neurologists',
      ArrowImage: require('../../assets/Vector.png')
    },
    {
      id: 3,
      image: require('../../assets/3.png'),
      Title: 'Dr.Lee',
      subTitle: 'Psychiatrists',
      ArrowImage: require('../../assets/Vector.png')
    },
    {
      id: 4,
      image: require('../../assets/3.png'),
      Title: 'Dr.Eril',
      subTitle: 'Gynecologists',
      ArrowImage: require('../../assets/Vector.png')
    }
  ]


  const [user, setUser] = useState(null);

const nav = useNavigation()

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      setUser(user);
      console.log('User data:', user.displayName);
    } else {
      // User is signed out
      setUser(null);
      console.log('User is signed out');
    }
  });

  return unsubscribe; // Unsubscribe when component unmounts
}, []);


 



  const ShowData = (data) => (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('Slots',
        {img:data.item.image,title:data.item.Title,subtitle:data.item.subTitle})}

        style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingHorizontal: 10,
          paddingVertical: 20
        }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.ImgStyles} source={data.item.image} />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.TitleStyles}>{data.item.Title}</Text>
            <Text style={styles.subTitle}>{data.item.subTitle}</Text>
          </View>
        </View>
        <View />
        <Image style={styles.ArrowImageStyles} source={data.item.ArrowImage} />
        <View />

      </TouchableOpacity>
      <View style={{ height: 1, width: "90%", backgroundColor: '#166FC1E5' }} />
    </>

  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>

        <View style={styles.subContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            {/* <Image style={styles.btnImage} source={require('../../assets/hum.png')}>

            </Image> */}
            <Text>Chat</Text>
          </TouchableOpacity>
          <Text style={{ color: '#000', fontSize: 24, fontWeight: '400' }}>
            Hay,
            <Text style={{ color: '#000', fontSize: 24, fontWeight: '700' }}>
              { user?.displayName ? user?.displayName : user?.email }
            </Text>
          </Text>
          <TouchableOpacity onPress={() => nav.navigate('Settings') }>
          <Image style={styles.ProfileStyles} source={{uri:user?.photoURL ? user?.photoURL : 'https://i.pravatar.cc/300' }} />
   
          </TouchableOpacity>
        </View>

        <View style={styles.containerSub}>
          {/* <Image tintColor={"#166FC1E5"} style={styles.stylesSearch} source={require('../../assets/search.png')} /> */}
        
           
            <TextInput placeholder='Search' blurOnSubmit style={{borderColor:'white', }} />
        
        </View>

        <FlatList
          data={data}
          renderItem={ShowData}

        />

      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  btnImage: {
    width: 21,
    height: 21
  },
  subContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ProfileStyles: {
    width: 60,
    height: 60
  },
  containerSub: {
    height: 40,
    width: 301,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 10


  },
  stylesSearch: {
    width: 20,
    height: 20,
    },
  ImgStyles: {
    width: 69,
    height: 69
  },
  ArrowImageStyles: {
    width: 15,
    height: 15
  },
  TitleStyles: {
    fontSize: 24,
    color: "#000000CC",
    fontWeight: '700'
  },
  subTitle: {
    fontSize: 18,
    color: '#1F67A9E5',
    fontWeight: '500'
  }
})