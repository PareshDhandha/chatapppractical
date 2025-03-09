import { Image, StatusBar, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface HeaderProps {
    title: string,
    style: ViewStyle,
    leftIcon: ReactNode,
    image: any,
}
const Header: FC<HeaderProps> = ({ style, title, leftIcon, image }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <View style={[styles.textContainer, style]}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <Text style={styles.txt}>{title}</Text>
                {image &&
                    <Image
                        source={image}
                        style={{
                            width: wp('10%'),
                            height: wp('10%'),
                            borderRadius: wp('5%')
                        }}
                    />
                }
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#726eff',
        // width:'100%',
        height: hp('11%'),
        borderBottomLeftRadius: wp('5%'),
        borderBottomRightRadius: wp('5%'),
    },
    textContainer: {
        margin: wp('5%'),
        marginTop: hp('5%'),
        flexDirection: 'row',
        // justifyContent: 'space-between',

    },
    txt: {
        color: 'white',
        fontSize: wp('6%'),
        fontWeight: 'bold',
    },
    leftIcon: {
        alignSelf: 'flex-start',
        paddingHorizontal: wp('2%'),
        marginTop: hp('0.5%')
    }
})