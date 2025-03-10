import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'

const index = () => {

  useEffect(() => {
    setTimeout(() => { router.replace('/auth/Login') }, 3000)
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#475656'} />
      <Text
        style={{
          fontSize: 24,
          color: '#fff',
          fontWeight: '600'
        }}
      >
        Chat
      </Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475656',
    alignItems: 'center',
    justifyContent: 'center'
  }
})