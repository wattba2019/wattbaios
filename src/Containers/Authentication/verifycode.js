import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, ScrollView
} from 'react-native';

import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import ChangePassword from '../../Containers/Authentication/changepassword';

class VerifyCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // code: "abddullahshah@gmail.com",
            sendPassword: false,
            changePassword: false,
            loader: false
        };
    }
    verifyCode = () => {
        let { code } = this.state;
        if (code) {
            this.setState({
                loader: !this.state.loader
            })
            let cloneSignUpData = {
                email: this.props.email,
                code: code,
                timestampp: new Date().getTime()
            }
            console.log(cloneSignUpData, "cloneSignUpData")
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/resetpassword/verifycode`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneSignUpData
            };
            axios(options)
                .then((data) => {
                    console.log(data, "VERIFY_CODE_SUCCESSFULLY")
                    this.setState({
                        loader: !this.state.loader,
                        changePassword: !this.state.changePassword
                    })
                    Actions.Signin()
                    // Actions.Allowaccesslocation()
                }).catch((err) => {
                    console.log(err.response.data.message, "ERROR_ON_VERIFY_CODE_")
                    alert(err.response.data.message)
                    this.setState({
                        loader: !this.state.loader
                    })
                })
        }
        else {
            alert("Code are required")
        }
    }

    render() {
        let { code, loader } = this.state;

        return (
            <ImageBackground source={require('../../../assets/background.png')}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "100%"
                }}>
                <StatusBar backgroundColor="#F86078" barStyle="dark-content" />

                {/* Change Password Modal*/}
                {
                    (this.state.changePassword === true) ? (
                        <ChangePassword email={this.props.email} closeModal={(data) => {
                            this.setState({
                                changePassword: data
                            })
                        }} />
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
                        <Text style={{ fontSize: 30 }}>Find Your Account</Text>
                        <Text style={{ color: "grey", textAlign: "center" }}>Type 6 digit code</Text>
                        <View
                            style={{ width: "85%", marginTop: 40, borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, justifyContent: "center", alignItems: "center" }}
                        >
                            {/* email input */}
                            <TextInput
                                style={{ height: 50, width: "90%",color:"black" }}
                                onChangeText={(code) => this.setState({ code })}
                                value={code}
                                placeholder={"Verification Code"}
                                placeholderTextColor="grey"

                            />
                        </View>
                        {/* Submit Button */}
                        <View
                            style={{ width: "85%", height: 50, marginTop: 30, }}
                        >
                            <TouchableOpacity
                                onPress={() => this.verifyCode()}
                            >
                                <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                    style={{ height: "100%", width: "100%", justifyContent: "center", }}
                                >
                                    {
                                        (loader != true) ? (
                                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Done</Text>
                                        ) : <ActivityIndicator style={{ color: "orange" }} />
                                    }
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        {/* Resend code */}
                        <TouchableOpacity
                            onPress={() => Actions.Forgotyourpassword()}
                        >
                            <Text style={{ textAlign: "center", fontSize: 15, marginTop: 20, color: "black" }}>Resend Code</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);