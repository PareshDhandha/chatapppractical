import { StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
import Input from '@/component/Input';
import Button from '@/component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Login = () => {
    let uuid = uuidv4();
    const [userName, setUserName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('')
    const addUsername = async () => {
        if (userName === '') {
            setErrorMessage('Please enter name')
            return;
        } else {
            setIsLoading(true)
            const res = await fetch('https://chat-api-k4vi.onrender.com/chat/username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // user_id: crypto.randomUUID(),
                    username: userName,
                })
            })
            setIsLoading(false)
            const newUser = await res.json();
            console.log('res....', newUser)
            router.push('/screens/Home')

            await AsyncStorage.setItem('user', JSON.stringify({
                user: userName,
                user_id: uuid
            }))
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
            <Text
                style={{
                    marginTop: '40%',
                    fontSize: wp('8%'),
                    fontWeight: '600',
                    textAlign: 'center'
                }}
            >
                Let's Start
            </Text>
            <Input
                placeholder='Enter name'
                onChangeText={(value) => setUserName(value)}
                inputStyle={{
                    marginTop: hp('7%'),
                    padding: wp('3%'),
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: wp('4%'),
                    paddingLeft: wp('4%')
                }}
            />
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
            {
                isLoading ? <ActivityIndicator size={'large'} style={{ marginTop: hp(2) }} /> :
                    <Button
                        title='Sign Up'
                        style={{
                            marginTop: hp(2),
                            padding: wp(3),
                            backgroundColor: 'gray',
                            borderRadius: wp(3),
                            width: wp(50),
                            alignSelf: 'center'
                        }}
                        onPress={addUsername}
                    />
            }

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
})