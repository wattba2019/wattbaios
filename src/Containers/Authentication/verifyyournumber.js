import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, Platform
} from 'react-native';
//icons import
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'
import axios from 'axios';

class Veryfiyournumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            phoneNumber: "",
            dialCode: "44",
            imgPath: require(`../../services/resources/flags/images/gb.png`),
        };
    }

    UNSAFE_componentWillMount() {
        if (this.props.selectedCountry != undefined && this.props.imgPath != undefined) {
            console.log(this.props.selectedCountry, this.props.imgPath, "ITEM")
            this.setState({
                dialCode: this.props.selectedCountry.dialCode,
                imgPath: this.props.imgPath
            })
        }
        if (this.props.route === "signup") {
            this.setState({
                dialCode: this.props.dialCode,
                phoneNumber: this.props.phoneNumber,
                imgPath: this.props.imgPath
            })
        }
    }

    clearNumber = () => {
        this.setState({
            phoneNumber: ""
        })
    }

    changePhoneCode() {
        Actions.CountryLists({ route: "verify", phoneNumberWithCode: this.props.phoneNumberWithCode })
    }

    sendCode = () => {
        let { dialCode, phoneNumber, } = this.state
        let newNumber = "+" + dialCode + phoneNumber;
        let oldNumber = this.props.phoneNumberWithCode
        // console.log(newNumber, oldNumber, "PHONE_NUMBER")
        this.setState({ loader: true })
        let cloneNumbers = {
            phoneNumber: oldNumber,
            newNumber
        }
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/signup/phoneUpdate/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: cloneNumbers
        };
        axios(options)
            .then((data) => {
                firebase.auth().signInWithPhoneNumber(newNumber)
                    .then(confirmResult => {
                        this.setState({
                            loader: false
                        })
                        // console.log(confirmResult, "CONFIRMATION_RESULT")
                        Actions.Phoneverification({ confirmResult: confirmResult, email: this.props.email, newNumber: newNumber })
                    })
                    .catch(error => {
                        this.setState({ loader: false })
                        console.log(error, 'errorerror')
                        alert(error)
                    });
            }).catch((err) => {
                console.log(err.response.data.message, "ERROR_ON_UPDATE_PHONE")
                alert(err.response.data.message)
                this.setState({ loader: false })
            })
    }

    render() {
        let { dialCode, phoneNumber, imgPath, loader } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                {/* //header// */}
                <View style={{ flex: 0.8, flexDirection: "row", width: "100%", marginTop: Platform.OS === 'ios' ? 30 : 0 }}>
                    <TouchableOpacity style={{ flex: 0.2, }} onPress={() => Actions.Signin()}>
                        <View style={{ flex: 2, justifyContent: "center", alignItems: "center", }}>
                            <Image source={require('../../../assets/ArrowLeft.png')}
                                style={{ height: "40%", width: "40%", }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* //body// */}
                <View style={{ flex: 8, width: "100%", alignItems: "center", }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", marginTop: 50 }}>Phone Verification </Text>
                    <Text style={{ marginTop: 40, textAlign: "center" }}>To verify your phone, an OTP code will be{"\n"} send to your  number {"+" + dialCode + " " + phoneNumber} via SMS </Text>
                    {/* main container */}
                    <View style={{ flexDirection: "row", width: "85%", height: 50, marginTop: 40, borderRadius: 50, backgroundColor: "#E8E6E7", }}>

                        {/* picker container */}
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
                                    <Text style={{ fontWeight: "bold" }}>{"+" + dialCode}</Text>
                                    <AntDesign name="caretdown" style={{ marginLeft: 5, color: '#909090', fontWeight: 'bold', fontSize: 15 }} />
                                </View>
                            </View>
                        </View>
                        {/* input phone container */}
                        <View style={{ backgroundColor: "yellow", flex: 2.8, }}>
                            <View style={{ borderColor: 'gray', backgroundColor: "#E8E6E7", justifyContent: "center", alignItems: "center" }}>
                                <TextInput
                                    keyboardType={"numeric"}
                                    style={{ height: 50, width: "90%", color: "black" }}
                                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                    value={phoneNumber}
                                    placeholder={"Number"}
                                    placeholderTextColor="grey"
                                />
                            </View>
                        </View>
                        {/* cancele container */}
                        <TouchableOpacity
                            onPress={() => { this.clearNumber() }}
                            style={{ flex: 0.8, width: "100%", justifyContent: "center", alignItems: "center", }}>
                            <Image source={require('../../../assets/Shape.png')} resizeMode="contain"
                                style={{ height: "40%", width: "40%", }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                    </View>
                    <View style={{ width: "85%", height: 50, marginTop: 60, }}>
                        <TouchableOpacity onPress={() => this.sendCode()}>
                            <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                style={{ height: "100%", width: "100%", justifyContent: "center", }}
                            >
                                {
                                    (loader != true) ? (
                                        <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Send OTP code</Text>
                                    ) : <ActivityIndicator color="white" />
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
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Veryfiyournumber);

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 500,
        backgroundColor: "white",
    },
    input: { justifyContent: 'center', alignItems: 'center', width: '90%' },
});
