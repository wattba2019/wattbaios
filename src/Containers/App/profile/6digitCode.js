import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { setUserCredentials } from "./../../../Store/Action/action";

class VerifyCodeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // code: "abddullahshah@gmail.com",
            sendPassword: false,
            loader: false,
            fromApp: true,
        };
    }
    verifyCode = () => {
        let { code, fromApp } = this.state;
        if (code) {
            this.setState({
                loader: true
            })
            let verifyData = {
                email: this.props.email,
                code: code,
                timestampp: new Date().getTime()
            }
            console.log(verifyData, "cloneSignUpData")

            let urlm = `${this.props.bseUrl}/resetpassword/verifycodeEmail/`
            console.log(urlm, "urlm")
            var options = {
                method: 'POST',
                url: urlm,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: verifyData
            };
            axios(options)
                .then((data) => {
                    let updatedUser = data.data.user
                    console.log(data, "VERIFY_CODE_SUCCESSFULLY")
                    this.setState({
                        loader: false
                    })
                    this.props.setUserCredentials(updatedUser, fromApp)
                    alert(data.data.message)
                    Actions.AppContainer()

                }).catch((err) => {
                    console.log(err.response.data.message, "ERROR_ON_VERIFY_CODE_")
                    alert(err.response.data.message)
                    this.setState({
                        loader: false
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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                {/* header */}
                <View style={{
                    flex: 0.8,
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    marginTop:30

                }}>
                    <View style={{ position: "absolute" ,}}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <AntDesign name="arrowleft" style={{ marginLeft: 15, color: "#000000", fontSize: 25 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%", flex: 8, }}>
                    <Text style={{ fontSize: 25, textAlign: "center" }}>You have received an email that is conecting you to a Wattba.</Text>
                    <Text style={{ color: "grey", textAlign: "center", marginTop: "10%" }}>Type 6 digit code</Text>

                    <View
                        style={{ width: "85%", marginTop: 40, borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, justifyContent: "center", alignItems: "center" }}
                    >
                        {/* email input */}
                        <TextInput
                            style={{ height: 50, width: "90%", }}
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
                            <ImageBackground source={require('../../../../assets/buttonBackground.png')} resizeMode="contain"
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
                </View>
            </View>

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
        setUserCredentials: (user, fromApp) => {
            dispatch(setUserCredentials(user, fromApp));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(VerifyCodeEmail);