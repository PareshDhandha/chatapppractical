import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter, Stack } from 'expo-router'
import Arrow from '@expo/vector-icons/MaterialCommunityIcons'
import Input from '@/component/Input'
import Button from '@/component/Button'
import Header from '@/component/Header'

const AddRoom = () => {
    const router = useRouter();
    const [room, setRoom] = useState<string>('')
    const [isRoomExits, setIsRoomExits] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const createRoom = async () => {
        if (room === '') {
            setErrorMessage('Please enter room name')
            return;
        }else{
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
    }
    return (
        <View style={styles.container}>
            <Header
                leftIcon={<Arrow name="arrow-left" size={24} color="white" onPress={() => router.back()} />}
                title='Add Room'
            />
            <Text
                style={{
                    marginTop: 40,
                    textAlign: 'center',
                    fontSize: 24,
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
        marginTop: 40,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
        width: 200,
        alignSelf: 'center'
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc'
    }
})