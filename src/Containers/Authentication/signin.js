import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, ImageBackground, StatusBar,
    TouchableOpacity, Text, TextInput, ScrollView,
    BackHandler, AsyncStorage, PermissionsAndroid
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { setUserCredentials, setUserCurrentLocationWithUserCredentials } from "./../../Store/Action/action";
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from 'react-native-geolocation-service';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            activateAccount: false,
            showPassword: true,
            // email: "abddullahshah@gmail.com",
            // password: "12345678",
            // email: "aa-khan@hotmail.co.uk",
            // password: "Password123",
            email: "",
            password: "",
        };
    }

    signin = () => {
        let { email, password, } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            alert("invalid email type")
        }
        else {
            this.setState({ loader: !this.state.loader })
            let cloneSignUpData = {
                email: email.toLowerCase(),
                password
            }
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/signin`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneSignUpData
            };
            axios(options)
                .then((data) => {
                    console.log(data.data, "USER_LOGIN_SUCCESSFULLY")
                    this.setState({
                        loader: !this.state.loader
                    })
                    this._storeData(data.data)
                    if (this.props.logoutApp) {
                        this.allowLocation(data.data)
                        this._storeDataLocation()
                    }
                    else {
                        this.props.setUserCredentials(data.data)
                    }
                }).catch((err) => {
                    console.log(err.response.data.message, "ERROR_ON_SIGN_IN")
                    alert(err.response.data.message)
                    this.setState({
                        loader: !this.state.loader,
                    })
                    if (err.response.data.message != "Invalid password") {
                        this.setState({
                            activateAccount: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    activateAccount: false
                                })
                            }, 10000)
                        })
                    }
                })
        }
    }

    async requestPermissions() {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('whenInUse');
        }
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }
    }

    allowLocation = (userProfile) => {
        this.requestPermissions()
        // Instead of navigator.geolocation, just use Geolocation.
        Geolocation.getCurrentPosition(
            (position) => {
                if (position) {
                    console.log(position, "USER_CURRENT_LOCATION_AllowAcces")
                    this.props.setUserCurrentLocationWithUserCredentials(position, userProfile)
                }
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message, "ERROR_ON_GETTING_YOUR_LOCATION_AllowAcces");
                this.setState({
                    loader: false,
                    err: error.message
                })
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
        );
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('userProfile', JSON.stringify(data));
        } catch (error) {
            // Error saving data
        }
    };

    _storeDataLocation = async (data) => {
        console.log("Assync", data)
        try {
            await AsyncStorage.setItem('locationAllow', JSON.stringify(true));
        } catch (error) {
            // Error saving data
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
    }

    render() {
        let { email, password, loader, activateAccount, showPassword } = this.state;
        return (
            <ImageBackground source={require('../../../assets/background.png')}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "100%"
                }}>
                <StatusBar backgroundColor="#F86078" barStyle="dark-content" />
                <View style={{ flex: 1.4, width: "100%" }}>
                    <ImageBackground
                        source={require('../../../assets/halfmask.png')}
                        resizeMode="stretch"
                        style={{ height: "100%", width: "100%", justifyContent: "center", }}>
                        <View style={{ justifyContent: "center", alignItems: "center", }}>
                            <Image source={require('../../../assets/logo.png')}
                                resizeMode="contain"
                                style={{ height: "60%", width: "60%", }} />
                        </View>
                    </ImageBackground>
                </View>

                <ScrollView
                    style={{
                        height: "30%",
                        backgroundColor: "white",
                        width: "100%",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{ fontSize: 30, marginTop: 10 }}>Welcome back,</Text>
                        <Text style={{ color: "grey" }}>Sign in to book appointments</Text>
                        <View style={{ width: "85%", marginTop: 10, borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                            <TextInput
                                style={{ height: 50, width: "90%", color: "black" }}
                                onChangeText={(email) => this.setState({ email })}
                                value={email}
                                placeholder={"Email"}
                                placeholderTextColor="grey"
                                returnKeyType='send'
                            />
                        </View>

                        <View style={{ width: "85%", flexDirection: "row", marginTop: 10, borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
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
                                onPress={() => { this.setState({ showPassword: !showPassword }) }}
                                name={showPassword ? "eye" : "eye-with-line"}
                                style={{ marginLeft: 10, color: '#909090', fontWeight: 'bold', fontSize: 18 }}
                            />
                        </View>

                        <View style={{ width: "85%", height: 50, marginTop: 30, }}>
                            <TouchableOpacity onPress={() => this.signin()}>
                                <ImageBackground source={require('../../../assets/buttonBackground.png')}
                                    resizeMode="contain"
                                    style={{ height: "100%", width: "100%", justifyContent: "center", }}>
                                    {
                                        (loader != true) ? (
                                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Sign In</Text>
                                        ) : <ActivityIndicator color="white" />
                                    }
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        {
                            activateAccount ?
                                <TouchableOpacity onPress={() => Actions.ActivateAccount()}>
                                    <Text style={{ textAlign: "center", fontSize: 15, marginTop: 20, color: "red" }}>Activate your account?</Text>
                                </TouchableOpacity> : null
                        }

                        <TouchableOpacity onPress={() => Actions.Forgotyourpassword()}>
                            <Text style={{ textAlign: "center", fontSize: 15, marginTop: activateAccount ? 5 : 20, color: "black" }}>Forgot password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: "row", marginTop: 10, }} onPress={() => Actions.Signup()}>
                            <Text style={{ textAlign: "center", fontSize: 15, color: "#B7B7C0" }}>New user? </Text>
                            <Text style={{ textAlign: "center", fontSize: 15, color: "#F28602" }}>Create an account now!</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground >
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
        setUserCredentials: (user) => {
            dispatch(setUserCredentials(user));
        },
        setUserCurrentLocationWithUserCredentials: (position, userProfile) => {
            dispatch(setUserCurrentLocationWithUserCredentials(position, userProfile));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);