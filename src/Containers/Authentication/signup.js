import React, { Component } from "react";
import {
    Platform, View, Image, ActivityIndicator, StyleSheet,
    Linking, ImageBackground, StatusBar,
    TouchableOpacity, Text, TextInput, ScrollView
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
//icons import
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showPassword: true,
            // dialCode: "92",
            // fullName: "Abdullah Shah",
            // email: "Abddullahshah1@gmail.com",
            // password: "12345678",
            // phoneNumber: "3368990497", //ufone
            // phoneNumber: "3368990498", //ufone
            // phoneNumber: "3450558623", //bug
            // phoneNumber: "3452153709", //white list
            // phoneNumber: "3040200538", //zeshan
            dialCode: "44",
            imgPath: require(`../../services/resources/flags/images/gb.png`),
            fullName: "",
            email: "",
            password: "",
            phoneNumber: "",
        };
    }

    UNSAFE_componentWillMount() {
        const { fullName, email, phoneNumber, password, selectedCountry, imgPath } = this.props

        if (selectedCountry != undefined && imgPath != undefined) {
            console.log(selectedCountry, imgPath, "ITEM")
            this.setState({
                dialCode: selectedCountry.dialCode,
                imgPath: imgPath
            })
        }
        if (fullName || email || phoneNumber || password) {
            this.setState({
                fullName, email, phoneNumber, password,
            })
        }

    }

    changePhoneCode() {
        const { fullName, email, phoneNumber, password, } = this.state
        Actions.CountryLists({ route: "signup", fullName, email, phoneNumber, password, })
    }

    clearNumber = () => {
        this.setState({
            phoneNumber: ""
        })
    }

    signup = () => {
        let { fullName, email, phoneNumber, password, dialCode, imgPath } = this.state;
        let phoneNumberWithCode = "+" + dialCode + phoneNumber
        if (fullName && email && phoneNumber && password) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === false) {
                alert("invalid email type")
            }
            else {
                if (this.state.password.length < 8) {
                    alert("password should be 8 characters")
                }
                else {
                    this.setState({
                        loader: !this.state.loader
                    })
                    let cloneSignUpData = {
                        fullName,
                        email: email.toLowerCase(),
                        phoneNumber: phoneNumberWithCode,
                        password,
                        createdAt: Date.now(),
                    }
                    console.log(cloneSignUpData, "cloneSignUpData")
                    var options = {
                        method: 'POST',
                        url: `${this.props.bseUrl}/signup`,
                        headers:
                        {
                            'cache-control': 'no-cache',
                            "Allow-Cross-Origin": '*',
                        },
                        data: cloneSignUpData
                    };
                    axios(options)
                        .then((data) => {
                            console.log(data, "USER_CREATE_SUCCESSFULLY")
                            this.setState({
                                loader: !this.state.loader
                            })
                            // Actions.Signin({ email: email })
                            console.log(phoneNumberWithCode, "phoneNumberWithCode")
                            Actions.Veryfiyournumber({ email: email, dialCode: dialCode, imgPath, phoneNumber: phoneNumber, phoneNumberWithCode: phoneNumberWithCode, route: "signup" })
                        }).catch((err) => {
                            console.log(err.response.data, "ERROR_ON_SIGN_UP")
                            // console.log(err.response.data.message, "ERROR_ON_SIGN_UP")
                            alert(err.response.data.message)
                            this.setState({
                                loader: !this.state.loader
                            })
                        })
                }
            }
        }
        else {
            alert("All fields are required")
        }
    }

    render() {
        let { fullName, email, password, loader, dialCode, phoneNumber, imgPath, showPassword } = this.state;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                {/* //header// */}
                <View style={{ height: "10%", flexDirection: "row", width: "100%", marginTop: Platform.OS === 'ios' ? 30 : 0 }}>
                    <TouchableOpacity
                        style={{ flex: 1.5, }}
                        onPress={() => Actions.pop()}
                    >
                        <View style={{ flex: 2, justifyContent: "center", alignItems: "center", }}>
                            <Image source={require('../../../assets/ArrowLeft.png')}
                                style={{ height: "40%", width: "40%", }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 8, }}>
                    </View>
                </View>
                {/* //body// */}
                <View style={{ width: "100%", justifyContent: "center", alignItems: "center", }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>Create an account</Text>
                    <View style={{ width: "85%", marginTop: 40, borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                        <TextInput
                            style={{ height: 50, width: "90%", color: "black" }}
                            onChangeText={(fullName) => this.setState({ fullName })}
                            value={fullName}
                            placeholder={"Full Name"}
                            placeholderTextColor="grey"
                            returnKeyType='send'
                        />
                    </View>
                    <View style={{ width: "85%", marginTop: 20, borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                        <TextInput
                            style={{ height: 50, width: "90%", color: "black" }}
                            onChangeText={(email) => this.setState({ email })}
                            value={email}
                            placeholder={"Email"}
                            placeholderTextColor="grey"
                            returnKeyType='send'
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", width: "85%", height: 50, marginTop: 25, backgroundColor: "#E8E6E7", borderRadius: 50 }}>
                        {/* picker container */}
                        <View style={{ borderRightColor: "grey", borderRightWidth: 0.5, flex: 2.2, flexDirection: "row", }}>
                            <View style={{ borderRightColor: "grey", borderRightWidth: 0.5, flex: 2.5, flexDirection: "row", }}>
                                <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center", }}>
                                    <View style={{ marginLeft: 30 }}>
                                        <Image
                                            source={imgPath}
                                            style={{ height: 20, width: 30, }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 3, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <View
                                        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: 5 }}>
                                        <Text style={{ fontWeight: "bold", }}>{"+" + dialCode}</Text>
                                        <AntDesign name="caretdown" style={{ marginLeft: 5, color: '#909090', fontWeight: 'bold', fontSize: 15 }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* input phone container */}
                        <View style={{ backgroundColor: "yellow", flex: 3, }}>
                            <View style={{ borderColor: 'gray', backgroundColor: "#E8E6E7", justifyContent: "center", alignItems: "center" }}>
                                <TextInput
                                    keyboardType={"numeric"}
                                    style={{ height: 50, width: "90%", color: "black" }}
                                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                    value={phoneNumber}
                                    placeholder={"Number"}
                                    placeholderTextColor="grey"
                                    returnKeyType='send'
                                />
                            </View>
                        </View>
                        {/* cancele container */}
                        <TouchableOpacity
                            onPress={() => {
                                this.clearNumber()
                            }}
                            style={{ flex: 0.8, width: "100%", justifyContent: "center", alignItems: "center", }}>
                            <Image source={require('../../../assets/Shape.png')} resizeMode="contain"
                                style={{ height: "40%", width: "40%", }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: "85%", flexDirection: "row",
                            marginTop: 20, borderColor: 'gray',
                            borderRadius: 25,
                            justifyContent: "center", alignItems: "center",
                            backgroundColor: "#E8E6E7",
                        }}
                    >
                        <TextInput
                            secureTextEntry={showPassword}
                            style={{ height: 50, width: "80%", color: "black" }}
                            onChangeText={(password) => this.setState({ password })}
                            value={password}
                            placeholder={"Password"}
                            placeholderTextColor="grey"
                            returnKeyType='send'
                        />
                        <Entypo
                            onPress={() => {
                                this.setState({ showPassword: !showPassword })
                            }}
                            name={showPassword ? "eye" : "eye-with-line"}
                            style={{ marginLeft: 10, color: '#909090', fontWeight: 'bold', fontSize: 18 }}
                        />
                    </View>
                    <View style={{ width: "85%", height: 50, marginTop: 50, }}>
                        <TouchableOpacity
                            onPress={() => this.signup()} >
                            <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                style={{ height: "100%", width: "100%", justifyContent: "center", }}
                            >
                                {
                                    (loader != true) ? (
                                        <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Create Account</Text>
                                    ) : <ActivityIndicator color="white" />
                                }
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: "10%", height: 60, }}
                        onPress={() => Linking.openURL("https://www.wattba.app/TAndC")}>
                        <Text style={{ color: "black", textAlign: "center", top: 20 }}>By proceeding, I accept the </Text>
                        <Text style={{ color: "black", textAlign: "center", top: 20, fontWeight: "bold" }}>Terms & Conditions of WattBa </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
let mapStateToProps = state => {
    return {
        bseUrl: state.root.bseUrl,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 150,
        backgroundColor: "white",
    },
});