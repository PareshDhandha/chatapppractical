import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native'
import React, { FC } from 'react'

interface ButtonProps {
    title: string;
    onPress: () => void;
    style: ViewStyle;

}
const Button: FC<ButtonProps> = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            {title &&
                <Text style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: '600',
                }}>
                    {title}
                </Text>
            }
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({})