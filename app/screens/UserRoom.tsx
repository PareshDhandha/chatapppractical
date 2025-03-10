import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import Arrow from '@expo/vector-icons/MaterialCommunityIcons'
import Input from '@/component/Input'
import Button from '@/component/Button'
import Header from '@/component/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import WS from 'react-native-websocket'

const UserRoom = () => {
  const [serverState, setServerState] = useState('Loading...');
  const [messageText, setMessageText] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  const [serverMessages, setServerMessages] = useState([]);
  const [roomID, setRoomId] = useState('');
  const [user, setUserName] = useState('');
  const [userName, setMessageUserName] = useState('')
  const [currentUser, setCurrentUserName] = useState('');
  const { room_id, name } = useLocalSearchParams<{ room_id: string, name: string }>();

  const baseURL = 'https://chat-api-k4vi.onrender.com'

  const getUser = async () => {
    const res = await fetch(`${baseURL}/chat/rooms/${room_id}`)
    const user = await res.json();
    setUserName(user.name);
    setRoomId(user.id)
    // console.log('api....user', user.id)
  }
  const getRoomsMessages = async () => {
    const res = await fetch(`${baseURL}/chat/rooms/${room_id}/messages`)
    const messages = await res.json();
    setServerMessages(messages);
  }
  const getCurrentUser = async () => {
    const userName = await AsyncStorage.getItem('user')
    if (userName !== null) {
      const user = JSON.parse(userName)
      setCurrentUserName(user)
      console.log('currentuser....', user.user)
    }
  }
  useEffect(() => {
    getUser();
    getRoomsMessages();
    getCurrentUser();
  }, [])

  // const ws = React.useRef(new WebSocket(`ws://chat-api-k4vi.onrender.com/ws/${roomID}/${currentUser}`)).current;
  const ws = new WebSocket(`ws://chat-api-k4vi.onrender.com/ws/${roomID}/${currentUser}`)
  // useEffect(() => {
  //   const serverMessagesList: any = [];
  //   ws.onopen = () => {
  //     setServerState('Connected to the server')
  //     setDisableButton(false);
  //     // };
  //     ws.onclose = (e) => {
  //       setServerState('Disconnected. Check internet or server.')
  //       setDisableButton(true);
  //       // };
  //       ws.onerror = (e) => {
  //         setServerState(e.message);
  //       };
  //       ws.onmessage = (e) => {
  //         serverMessagesList.push(e.data);
  //         // setServerMessages([...serverMessagesList])
  //       };
  //     }, []);
  // const submitMessage = () => {
  //   ws.send(messageText);
  //   setMessageText('')
  //   setInputFieldEmpty(true)
  // }

  return (

    <View style={styles.container}>
      <Header
        leftIcon={<Arrow name='arrow-left' size={24} color={'#fff'} onPress={() => router.back()} />}
        title={user}
      />
      <View style={{
        padding: wp(1),
        flexGrow: 1
      }}>
        <FlatList
          data={serverMessages}
          renderItem=
          {({ item, index }: any) =>
            <MessageList item={item}
              index={index}
              currentUser={currentUser}
            />}
        />
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
        <TouchableOpacity style={styles.button} >
          <Arrow name='arrow-right-bold-circle' size={30} color='gray' />
          {/* // disabled={disableButton || inputFieldEmpty} */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const MessageList = ({ item, index, currentUser }: any) => {
  if (item.username !== currentUser) {
    // console.log('username.....', item.username)
    return (
      <View style={{ padding: wp(3), }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: wp(4),
              backgroundColor: '#fff',
              padding: wp(2),
              borderRadius: wp(2.5),
            }}
          >
            {item.content}
          </Text>
          <Text
            style={{
              marginLeft: wp(2),
              fontSize: wp(3),
              alignSelf: 'center'
            }}
          >
            ( {item.username} )
          </Text>
        </View>
      </View>
    )
  } else {
    <View style={{ padding: wp(3), }}>
      <Text
        style={{
          textAlign: 'right',
          fontSize: wp(4),
          backgroundColor: '#98ff98',
          padding: wp(2),
          borderRadius: wp(2.5),
        }}
      >
        {item.content}
      </Text>
    </View>
  }

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
    paddingLeft: wp(4),
    // padding: 10,
    paddingTop: hp(1.5),
    marginBottom: hp(2),
  }
})