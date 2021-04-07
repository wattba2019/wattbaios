import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, ScrollView, Platform

} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import firebase from 'react-native-firebase'

class Phoneverification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
        };
        this.verifyPhone = this.verifyPhone.bind(this);
    }

    componentDidMount() {
        let that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                that.verifyPhone();

            } else {
                // No user is signed in.
            }
        });
    }

    verifyPhone() {
        let cloneData = {
            phoneNumber: this.props.newNumber
        }
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/signup/activateaccount`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: cloneData
        };
        axios(options)
            .then((data) => {
                console.log(data.data, "USER_VERIFY_SUCCESSFULLY")
                this.setState({
                    loader: false
                })
                alert(data.data.message)
                Actions.Signin()
                // firebase.logout();
                firebase.auth().signOut().then(function () {
                    // alert("Sign-out successful.")
                    // Sign-out successful.
                }).catch(function (error) {
                    // An error happened.
                });
            }).catch((err) => {
                console.log(err.response.data.message, "ERROR_ON_VERIFICATION")
                alert(err.response.data.message)
                this.setState({
                    loader: false
                })
            })
    }

    verify = () => {
        let { input1, input2, input3, input4, input5, input6, code } = this.state
        // let sixDigitCode = input1 + input2 + input3 + input4 + input5 + input6
        let sixDigitCode = code
        if (sixDigitCode && sixDigitCode.length == 6) {
            this.setState({
                loader: true
            })
            console.log(sixDigitCode, this.props.confirmResult, "6_Digit_Code")
            this.props.confirmResult.confirm(sixDigitCode)
                .then(user => {
                    console.log(user)
                    // let cloneData = {
                    //     phoneNumber: this.props.newNumber
                    // }
                    // var options = {
                    //     method: 'POST',
                    //     url: `${this.props.bseUrl}/signup/activateaccount`,
                    //     headers:
                    //     {
                    //         'cache-control': 'no-cache',
                    //         "Allow-Cross-Origin": '*',
                    //     },
                    //     data: cloneData
                    // };
                    // axios(options)
                    //     .then((data) => {
                    //         console.log(data.data, "USER_VERIFY_SUCCESSFULLY")
                    //         this.setState({
                    //             loader: false
                    //         })
                    //         alert(data.data.message)
                    //         Actions.Signin()
                    //     }).catch((err) => {
                    //         console.log(err.response.data.message, "ERROR_ON_VERIFICATION")
                    //         alert(err.response.data.message)
                    //         this.setState({
                    //             loader: false
                    //         })
                    //     })
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                    this.setState({
                        loader: false
                    })
                });
        }
        else {
            alert("Please type 6 digit code")
        }
    }


    render() {
        let { loader } = this.state
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
            >
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <View style={{ flex: 1, width: "100%", backgroundColor: "red" }}>
                </View>

                {/* //header// */}

                <View style={{ height: "13%", flexDirection: "row", width: "100%", marginTop: Platform.OS === 'ios' ? 15 : 0 }}>
                    <TouchableOpacity
                        style={{ flex: 2, }}
                        onPress={() => Actions.pop()}
                    >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                            <Image source={require('../../../assets/ArrowLeft.png')}
                                style={{ height: "35%", width: "38%", }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 8, }}>
                    </View>

                </View>

                {/* //body// */}

                <View style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>Phone Verification</Text>
                    <Text style={{}}>Enter your OTP code below</Text>


                    <View style={styles.mainContainer}>
                        <OTPInputView
                            style={{ width: '80%', height: 200 }}
                            pinCount={6}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            onCodeChanged={code => { this.setState({ code }) }}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => { console.log(`Code is ${code}, you are good to go!`) })}
                        />
                    </View>


                    {/* <View style={{
                        marginTop: 40,
                        flexDirection: "row",
                        height: "18%",
                    }}>
                        <View
                            style={{ width: "14%", height: "80%", borderColor: 'gray', backgroundColor: this.state.input1 ? "#FD6958" : "#E8E6E7", borderRadius: 80, justifyContent: "center", alignItems: "center", margin: "0.5%" }}
                        >
                            <TextInput
                                keyboardType={"numeric"}
                                style={{ top: -5, fontSize: 30, color: "white", justifyContent: "center", alignItems: "center", textAlign: "center" }}
                                onChangeText={input1 => input1.length < 2 ? this.setState({ input1 }) : null}
                                value={this.state.input1}
                            />
                        </View>
                        <View
                            style={{ width: "14%", height: "80%", borderColor: 'gray', backgroundColor: this.state.input2 ? "#FD6958" : "#E8E6E7", borderRadius: 80, justifyContent: "center", alignItems: "center", margin: "0.5%" }}
                        >
                            <TextInput
                                keyboardType={"numeric"}
                                style={{ top: -5, fontSize: 30, color: "white", justifyContent: "center", alignItems: "center", textAlign: "center" }}
                                onChangeText={input2 => input2.length < 2 ? this.setState({ input2 }) : null}
                                value={this.state.input2}
                            />
                        </View>
                        <View
                            style={{ width: "14%", height: "80%", borderColor: 'gray', backgroundColor: this.state.input3 ? "#FD6958" : "#E8E6E7", borderRadius: 80, justifyContent: "center", alignItems: "center", margin: "0.5%" }}
                        >
                            <TextInput
                                keyboardType={"numeric"}
                                style={{ top: -5, fontSize: 30, color: "white", justifyContent: "center", alignItems: "center", textAlign: "center" }}
                                onChangeText={input3 => input3.length < 2 ? this.setState({ input3 }) : null}
                                value={this.state.input3}
                            />
                        </View>
                        <View
                            style={{ width: "14%", height: "80%", borderColor: 'gray', backgroundColor: this.state.input4 ? "#FD6958" : "#E8E6E7", borderRadius: 80, justifyContent: "center", alignItems: "center", margin: "0.5%" }}
                        >
                            <TextInput
                                keyboardType={"numeric"}
                                style={{ top: -5, fontSize: 30, color: "white", justifyContent: "center", alignItems: "center", textAlign: "center" }}
                                onChangeText={input4 => input4.length < 2 ? this.setState({ input4 }) : null}
                                value={this.state.input4}
                            />
                        </View>
                        <View
                            style={{ width: "14%", height: "80%", borderColor: 'gray', backgroundColor: this.state.input5 ? "#FD6958" : "#E8E6E7", borderRadius: 80, justifyContent: "center", alignItems: "center", margin: "0.5%" }}
                        >
                            <TextInput
                                keyboardType={"numeric"}
                                style={{ top: -5, fontSize: 30, color: "white", justifyContent: "center", alignItems: "center", textAlign: "center" }}
                                onChangeText={input5 => input5.length < 2 ? this.setState({ input5 }) : null}
                                value={this.state.input5}
                            />
                        </View>
                        <View
                            style={{ width: "14%", height: "80%", borderColor: 'gray', backgroundColor: this.state.input6 ? "#FD6958" : "#E8E6E7", borderRadius: 80, justifyContent: "center", alignItems: "center", margin: "0.5%" }}
                        >
                            <TextInput
                                keyboardType={"numeric"}
                                style={{ top: -5, fontSize: 30, color: "white", justifyContent: "center", alignItems: "center", textAlign: "center" }}
                                onChangeText={input6 => input6.length < 2 ? this.setState({ input6 }) : null}
                                value={this.state.input6}
                            />
                        </View>
                    </View> */}





                    <View style={{ marginTop: "25%" }}>
                        <Text style={{ textAlign: "center", fontSize: 15, color: "#B7B7C0" }}>Didn't receive a code?</Text>
                    </View>

                    <TouchableOpacity
                        // onPress={() => Actions.Veryfiyournumber({ email: this.props.email })}
                        // onPress={() => Actions.pop()}
                        onPress={() => Actions.ActivateAccount()}
                    >
                        <Text style={{ color: "#FD6958", textAlign: "center", }}>Resend a new code </Text>
                    </TouchableOpacity>

                    <View
                        style={{ width: "85%", height: 50, marginTop: 50, }}
                    >
                        <TouchableOpacity
                            onPress={() => this.verify()}
                        >
                            <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                style={{ height: "100%", width: "100%", justifyContent: "center", }}
                            >
                                {
                                    (loader != true) ? (
                                        <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Complete Verification</Text>
                                    ) : <ActivityIndicator color="white" />
                                }
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Phoneverification);

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 250,
        backgroundColor: "white",
    },
    mainContainer: {
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    borderStyleBase: {
        width: 30,
        height: 45,
    },
    borderStyleHighLighted: {
        borderColor: "#FD6958",
        color: "#FD6958"
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 3,
        color: "#FD6958",
        // backgroundColor: "red",

    },
    underlineStyleHighLighted: {
        borderColor: "#FD6958",
        color: "#000000"
    },
});