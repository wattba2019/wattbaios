import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, ScrollView

} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CardAddSuccessfully from '../paymentcard/cardaddSuccecfully';

class CardVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            isModalVisible: false,
        };
    }

    verify = () => {
        // this.setState({
        //     isModalVisible: true,
        // })
        let { code } = this.state
        let sixDigitCode = code
        if (sixDigitCode && sixDigitCode.length == 6) {
            this.setState({
                loader: true
            })
            console.log(sixDigitCode, this.props.confirmResult, "6_Digit_Code")
            this.props.confirmResult.confirm(sixDigitCode)
                .then(user => {
                    console.log(user, "USER")
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


    closeModal() {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    render() {
        let { loader, isModalVisible } = this.state
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
            >

                <CardAddSuccessfully isModalVisible={isModalVisible} closeModal={() => { this.closeModal() }} />
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <View style={{ flex: 1, width: "100%", backgroundColor: "red" }}>
                </View>

                {/* //header// */}

                <View style={{ height: "13%", flexDirection: "row", width: "100%", }}>
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
                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "#0A1F44" }}>Card Verification</Text>
                    <Text style={{ textAlign: "center", marginHorizontal: "5%", marginTop: 10, color: "#0A1F44" }}>
                        An OTP code has been sent{"\n"}
                        to the email/phone number connectedto the card.
                    </Text>

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

                    <View style={{ marginTop: "10%" }}>
                        <Text style={{ textAlign: "center", fontSize: 15, color: "#B7B7C0" }}>Didn't receive a code?</Text>
                    </View>

                    <TouchableOpacity
                    // onPress={() => Actions.pop()}
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
                                        <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Next</Text>
                                    ) : <ActivityIndicator style={{ color: "orange" }} />
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
export default connect(mapStateToProps, mapDispatchToProps)(CardVerification);

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