import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Plus from '@expo/vector-icons/MaterialCommunityIcons'
import { Link, router } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import Header from '@/component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Home = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getRooms = async () => {
        setIsLoading(true)
        const res = await fetch('https://chat-api-k4vi.onrender.com/chat/rooms')
        setIsLoading(false)
        const rooms = await res.json();
        setData(rooms)
    }
    useEffect(() => {
        getRooms();
    }, [])
    return (
        <View style={styles.container}>
            <Header
                title='Chats'
                image={require('../../assets/images/user.png')}
                style={{ justifyContent: 'space-between' }}
            />
            {
                isLoading ? (
                    <ActivityIndicator size={'large'} style={{ flex: 1, alignItems: 'center' }} />
                ) : (
                    <>
                        <FlatList
                            data={data}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }: any) => <RoomCards item={item} index={index} />}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/AddRoom')}>
                            <Plus name="plus" size={wp('10%')} color="white" />
                        </TouchableOpacity>
                    </>
                )
            }
        </View>
    )
}

export default Home

const RoomCards = ({ item, index }: any) => {
    return (
        <TouchableOpacity style={{
            padding: wp('3%'),
            // borderWidth: 1,
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            // marginTop: 10
        }}
            key={index}
            onPress={() => router.push({
                pathname: '/screens/UserRoom',
                params: {
                    room_id: item.id,
                    name: item.name
                }
            })}
        >
            <Image source={require('@/assets/images/user.png')} style={styles.image} />
            <Text style={{ margin: hp('2%') }}>{item.name}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 30
    },
    image: {
        width: wp('13%'),
        height: hp('6%'),
        resizeMode: 'contain',
    },
    button: {
        width: wp('16%'),
        height: hp('8%'),
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('4%'),
        position: 'absolute',
        bottom: hp('5%'),
        right: wp('6%'),
    }
})