import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, ScrollView
} from 'react-native';

import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import UpdatePassword from '../../Components/updatePassword';

class Forgotyourpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // email: "abddullahshah@gmail.com",
            sendPassword: false,
            loader: false
        };
    }
    sendEmail = () => {
        let { email, } = this.state;

        if (email) {
            this.setState({
                loader: !this.state.loader
            })
            let cloneSignUpData = {
                email,
                createdAt: new Date().getTime()
            }
            console.log(cloneSignUpData, "cloneSignUpData")
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/resetpassword/sendcode`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneSignUpData
            };
            axios(options)
                .then((data) => {
                    console.log(data, "SEND_EMAIL_SUCCESSFULLY")
                    this.setState({
                        loader: !this.state.loader,
                        sendPassword: !this.state.sendPassword
                    })
                    Actions.VerifyCode({ email: email, })
                }).catch((err) => {
                    console.log(err.response.data.message, "ERROR_ON_SEND_EMAIL_")
                    alert(err.response.data.message)
                    this.setState({
                        loader: !this.state.loader
                    })
                })
        }
        else {
            alert("Email are required")
        }
    }

    render() {
        let { email, loader } = this.state;

        return (
            <ImageBackground source={require('../../../assets/background.png')}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "100%"
                }}>
                <StatusBar backgroundColor="#F86078" barStyle="dark-content" />
                {/* Email send alert */}
                {
                    (this.state.sendPassword === true) ? (
                        <UpdatePassword />
                    ) : null
                }
                <View
                    style={{
                        flex: 1.4,
                        width: "100%",
                    }}
                >
                    <ImageBackground source={require('../../../assets/halfmask.png')} resizeMode="stretch"
                        style={{ height: "100%", width: "100%", justifyContent: "center", }}
                    >
                        <View style={{ justifyContent: "center", alignItems: "center", }}>
                            <Image source={require('../../../assets/lock.png')} resizeMode="contain"
                                style={{ height: "70%", width: "70%", }}
                            />
                        </View>

                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "-14%"
                        }}>
                            <View style={{
                                borderStyle: 'solid',
                                borderLeftWidth: 20,
                                borderRightWidth: 20,
                                borderBottomWidth: 25,
                                borderLeftColor: 'transparent',
                                borderRightColor: 'transparent',
                                borderBottomColor: 'white',
                            }}>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <ScrollView
                    style={{
                        height: "30%",
                        backgroundColor: "white",
                        width: "100%",
                    }}
                >
                    <View style={{ justifyContent: "center", alignItems: "center", width: "100%", marginTop: "4%" }}>
                        <Text style={{ fontSize: 30 }}>Forgot password?</Text>
                        <Text style={{ color: "grey", textAlign: "center" }}>No worries! Password reset instructions {"\n"} will be send to your email</Text>
                        <View
                            style={{ width: "85%", marginTop: 40, borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, justifyContent: "center", alignItems: "center" }}
                        >
                            {/* email input */}
                            <TextInput
                                style={{ height: 50, width: "90%",color:"black" }}
                                onChangeText={(email) => this.setState({ email })}
                                value={email}
                                placeholder={"Email"}
                                placeholderTextColor="grey"

                            />
                        </View>
                        {/* Submit Button */}
                        <View
                            style={{ width: "85%", height: 50, marginTop: 30, }}
                        >
                            <TouchableOpacity
                                onPress={() => this.sendEmail()}
                            >
                                <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                    style={{ height: "100%", width: "100%", justifyContent: "center", }}
                                >
                                    {
                                        (loader != true) ? (
                                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Send Instructions</Text>
                                        ) : <ActivityIndicator style={{ color: "orange" }} />
                                    }
                                </ImageBackground>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            onPress={() => Actions.Signin()}
                        >
                            <Text style={{ textAlign: "center", fontSize: 15, marginTop: 20, color: "black" }}>Back to sign in</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>


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
export default connect(mapStateToProps, mapDispatchToProps)(Forgotyourpassword);