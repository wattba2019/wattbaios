import React, { Component } from 'react';
import { View, Image, ImageBackground, StatusBar, TouchableOpacity, Text, BackHandler, } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

class Walkthrough extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/background.png')}
                style={{
                    // backgroundColor: '#fd902a',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <StatusBar backgroundColor="#F86078" barStyle="dark-content" />
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        // backgroundColor: "red",
                    }}
                >
                    <ImageBackground source={require('../../../assets/mask.png')} resizeMode="cover"
                        style={{ height: "100%", width: "100%", justifyContent: "center", }}
                    >
                        <View style={{ justifyContent: "center", alignItems: "center", }}>
                            <Image source={require('../../../assets/logo.png')} resizeMode="contain"
                                style={{ height: "65%", width: "65%", }}
                            />
                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white", top: "-25%" }}>Book any style, anywhere</Text>

                        </View>
                        <TouchableOpacity
                            style={{
                                // marginTop: 100,
                                width: "80%",
                                backgroundColor: "white",
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: "10%",
                                borderRadius: 30,
                                borderColor: "white",
                                borderWidth: 1
                            }}

                            onPress={() => Actions.Signin()}
                        >
                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "#FD6958" }}>Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                width: "80%",
                                // backgroundColor: "white",
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: "10%",
                                borderRadius: 30,
                                borderColor: "white",
                                borderWidth: 1
                            }}
                            onPress={() => Actions.Signup()}
                        >
                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Create an Account</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </ImageBackground>
        );
    }
}

let mapStateToProps = state => {
    return {
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
