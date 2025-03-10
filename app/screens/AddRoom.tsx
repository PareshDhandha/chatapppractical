import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter, Stack } from 'expo-router'
import Arrow from '@expo/vector-icons/MaterialCommunityIcons'
import Input from '@/component/Input'
import Button from '@/component/Button'
import Header from '@/component/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const AddRoom = () => {
    const router = useRouter();
    let uuid = uuidv4();
    const [room, setRoom] = useState<string>('')
    const [isRoomExits, setIsRoomExits] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const createRoom = async () => {
        if (room === '') {
            setErrorMessage('Please enter room name')
            return;
        } else {
            const res = await fetch('https://chat-api-k4vi.onrender.com/chat/rooms', {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: room
                })
            })
            const result = await res.json()
            console.log('addroom....', result)
            if (result === '') {
                setIsRoomExits('Room already exits')
                // return;
            } else {
                console.log('successfully')
                // router.replace('/screens/Home')
            }
        }
        const res = await fetch('https://chat-api-k4vi.onrender.com/chat/rooms', {
            method: "Post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: room
            })
        })
        const result = await res.json()
        console.log('addroom....', result)
        if (result === '') {
            setIsRoomExits('Room already exits')
            // return;
        } else {
            console.log('successfully')
            // router.replace('/screens/Home')
        }
        await AsyncStorage.setItem('room', JSON.stringify({
            room: room,
            room_id: uuid
        }))
    }
    return (
        <View style={styles.container}>
            <Header
                leftIcon={<Arrow name="arrow-left" size={24} color="white" onPress={() => router.back()} />}
                title='Add Room'
            />
            <Text
                style={{
                    marginTop: hp(10),
                    textAlign: 'center',
                    fontSize: hp(4),
                    fontWeight: '500'
                }}
            >
                Create Room
            </Text>
            <Input
                placeholder='Room Name'
                onChangeText={(value) => setRoom(value)}
                inputStyle={styles.input}
            />
            <Text style={{
                color: 'red',
                textAlign: 'center'
            }}>{errorMessage}</Text>
            <Button
                title='Create Room'
                onPress={createRoom}
                style={styles.button}
            />
        </View>
    )
}

export default AddRoom

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        marginTop: hp(4),
        padding: wp(3),
        backgroundColor: 'gray',
        borderRadius: wp(3),
        width: wp(50),
        alignSelf: 'center'
    },
    input: {
        marginTop: hp('5%'),
        width: wp('90%'),
        padding: wp('3%'),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: wp('4%'),
        paddingLeft: wp('4%'),
        marginHorizontal: wp('5%')
    }
})