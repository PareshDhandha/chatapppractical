import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import Arrow from '@expo/vector-icons/MaterialCommunityIcons'
import Input from '@/component/Input'
import Button from '@/component/Button'
import Header from '@/component/Header'
// import WS from 'react-native-websocket'

const UserRoom = () => {
  const [serverState, setServerState] = React.useState('Loading...');
  const [messageText, setMessageText] = React.useState('');
  const [disableButton, setDisableButton] = React.useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true);
  const [serverMessages, setServerMessages] = React.useState([]);
  // var ws = React.useRef(new WebSocket('ws://https://chat-api-k4vi.onrender.com/chat/rooms/{room_id}/messages')).current;
  const { room_id, name } = useLocalSearchParams<{ room_id: string, name: string }>();
  console.log('passsss..', room_id)
  // const room_id = '01f8cbfb-f452-45cf-bfee-f425aacdf154';
  const getUser = async () => {
    const res = await fetch(`https://chat-api-k4vi.onrender.com/chat/rooms/${room_id}`)
    const user = await res.json();
    console.log('user....', user)
  }
  useEffect(() => {
    getUser();
  }, [])
  useEffect(() => {
    // const serverMessagesList = [];
    // ws.onopen = () => {
    //   setServerState('Connected to the server')
    //   setDisableButton(false);
    // };
    // ws.onclose = (e) => {
    //   setServerState('Disconnected. Check internet or server.')
    //   setDisableButton(true);
    // };
    // ws.onerror = (e) => {
    //   setServerState(e.message);
    // };
    // ws.onmessage = (e) => {
    //   serverMessagesList.push(e.data);
    //   setServerMessages([...serverMessagesList])
    // };
  }, []);
  const submitMessage = () => {
    // ws.send(messageText);
    setMessageText('')
    setInputFieldEmpty(true)
  }
  return (

    <View style={styles.container}>
      <Header
        leftIcon={<Arrow name='arrow-left' size={24} color={'#fff'} onPress={() => router.back()} />}
      />
      <View style={{
        height: 30,
        backgroundColor: '#eeceff',
        padding: 5
      }}>
        <Text>{serverState}</Text>
      </View>
      <View style={{
        backgroundColor: '#ffeece',
        padding: 5,
        flexGrow: 1
      }}>
        <ScrollView>
          {
            serverMessages.map((item, ind) => {
              return (
                <Text key={ind}>{item}</Text>
              )
            })
          }
        </ScrollView>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.4,
        borderColor: '#ccc',
        borderRadius: 16,
      }}>
        <Input
          placeholder='Add Message'
          onChangeText={text => {
            setMessageText(text)
            setInputFieldEmpty(text.length > 0 ? false : true)
          }}
          inputStyle={styles.input}
        />
        {/* <Button
          onPress={submitMessage}
          // title={'Submit'}
          style={styles.button}
        // disabled={disableButton || inputFieldEmpty}
        /> */}
        <TouchableOpacity style={styles.button} onPress={submitMessage}>
          <Arrow name='arrow-right-bold-circle' size={30} color='gray' />
        </TouchableOpacity>

      </View>

    </View>
    // <View style={styles.container}>
    // <View>
    //     <Arrow name="arrow-left" size={24} color="black" onPress={() => router.back()} />
    // </View>
    // </View>

  )
}

export default UserRoom

const styles = StyleSheet.create({
  container: {
    // padding: 20
    flex: 1
  },
  button: {
    color: 'grey',
    // padding: 10,
    borderRadius: 10,
    paddingRight: 10,
    padding: 8,

  },
  input: {
    paddingLeft: 12,
    // padding: 10,
    paddingTop: 12,
  }
})