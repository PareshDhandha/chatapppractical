import { StyleSheet, Text, View, TextInput, ViewStyle, TextStyle } from 'react-native'
import React, { FC } from 'react'

interface TextInputProps {
    placeholder: string;
    inputStyle: TextStyle;
    onChangeText: (value: any) => void;
}
const Input: FC<TextInputProps> = ({ placeholder, onChangeText, inputStyle }) => {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                style={inputStyle}
                onChangeText={onChangeText}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({})