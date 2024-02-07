import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import React from 'react'


const Slots = ({ route, navigation }) => {


    const { img, title, subtitle } = route.params;

    const data = [
        {
            id: 1,

            Title: 'Sep 10',
            slotOne: '11 AM',
            slotTwo: '1 PM',
            slotThree: '3 PM',
            slotFour: '4 PM',
            slotFive: '6 PM'

        },
        {
            id: 2,
            Title: 'Sep 11',
            slotOne: '11 AM',
            slotTwo: '1 PM',
            slotThree: '3 PM',
            slotFour: '4 PM',
         
        },
        {
            id: 3,
            Title: 'Sep 12',
            slotOne: '11 AM',
            slotTwo: '1 PM',
            slotThree: '3 PM',
           
        },

    ]

    const RenderItemHandler = ({ item }) => {

        return (
            <View style={styles.listStyle}>
                <Text style={{ color: '#000', fontSize: 18, fontWeight: '500', marginBottom: 10 }}>{item.Title}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {[item.slotOne, item.slotTwo, item.slotThree, item.slotFour, item.slotFive].map((slot, index) => (
            slot &&
            <View key={index} style={index === 0 ?  [styles.dateContainer, { backgroundColor: 'red' }] : styles.dateContainer}>
                <Text>{slot}</Text>
            </View>
        ))}
    </View>


            </View>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>

                <View style={styles.subContainer}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image style={styles.btnImage} source={require('../../assets/hum.png')}>

                        </Image>
                    </TouchableOpacity>

                    <Image style={styles.ProfileStyles} source={require('../../assets/profile.png')} />
                </View>

                <View style={styles.subContainerConsultant}>

                    <Image source={img} style={{ width: 69, height: 69 }} />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={styles.heading}>{title}</Text>
                        <Text style={styles.subHeading}>{subtitle}</Text>
                    </View>


                </View>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Graph')}
                >
                <Text style={styles.slotsTxt}>Available Slots</Text>
            
                </TouchableOpacity>

                <View style={{ marginTop: 20 }} />
                <FlatList
                    keyExtractor={item => item.id}
                    data={data}
                    renderItem={({ item }) => <RenderItemHandler item={item} />}
                />
            </View>
        </SafeAreaView>
    )
}

export default Slots

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
        height: 20

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
    },
    subContainerConsultant: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center'
    },
    heading: {
        color: '#000000',
        fontSize: 24,
        fontWeight: '700'
    },
    subHeading: {
        fontSize: 18,
        color: 'rgba(31, 103, 169, 0.90)',
        fontWeight: '500'
    },
    slotsTxt: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        alignSelf: 'center',
        marginTop: 24
    },
    listStyle: {
        margin: 20,
        
        
    },
    dateContainer:{
        width:93,
        height:37,
        backgroundColor:'#E5E5E5',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        marginRight:20,
        marginBottom:20
    }
})