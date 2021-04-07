
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar, AsyncStorage,
    ScrollView, Picker, Image, SafeAreaView, ActivityIndicator,
    images, Dimensions, ImageBackground, Alert
} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import axios from 'axios';
import { setUserCredentials } from '../../../Store/Action/action';
import { ActionConst } from 'react-native-router-flux';

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true,
            updateLoader: true,
            verifyLoader: false,
            verificationModal: true,
            fromApp: true,
        }
    }
    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
        console.log(this.props.userProfile, "USER_PROFILE")
        this.setState({
            email: this.props.userProfile.email,
            userName: this.props.userProfile.fullName,
            phoneNumber: this.props.userProfile.phoneNumber,
            verifiedEmail: this.props.userProfile.verifiedEmail
        })
    }

    closeModal = () => {
        this.setState({ isModalVisible: false })
        this.props.closeModal(false)
    }

    editProfile() {
        let { userName, phoneNumber, fromApp } = this.state

        if (userName, phoneNumber) {
            this.setState({
                updateLoader: !this.state.updateLoader
            })
            let cloneData = {
                _id: this.props.userProfile._id,
                name: userName,
                phoneNumber: phoneNumber,
            }
            console.log(cloneData, "data")
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/editprofile/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneData
            };
            axios(options)
                .then((data) => {
                    console.log(data.data.data[0], "AFTER_UPDATE_PROFILE_RETURN_UPDATED_DATA")
                    alert(data.data.message)
                    this.closeModal()
                    this._storeData(data.data.data[0])
                    this.props.setUserCredentials(data.data.data[0], fromApp)

                }).catch((err) => {
                    alert(JSON.stringify(err.response.data.message))
                    this.setState({
                        updateLoader: !this.state.updateLoader
                    })
                })
        }
        else {
            alert("Name and phone number are required")
        }
    }

    _storeData = async (data) => {
        console.log("Assync", data)
        try {
            await AsyncStorage.setItem('userProfile', JSON.stringify(data));
        } catch (error) {
            // Error saving data
        }
    };

    sendCode() {
        this.setState({
            verifyLoader: !this.state.verifyLoader
        })
        let cloneData = {
            email: this.props.userProfile.email,
            createdAt: new Date().getTime(),
            insideApp: true,
        }
        console.log(cloneData, "data")
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/resetpassword/sendcode`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: cloneData
        };
        axios(options)
            .then((data) => {
                this.setState({
                    verifyLoader: !this.state.verifyLoader,
                    verificationModal: !this.state.verificationModal
                })
                this.closeModal()
                Actions.VerifyCodeEmail({ email: this.props.userProfile.email })
                console.log(data.data, cloneData, "SEND_EMAIL_VERIFICATION_CODE")
                // alert(data.data.message)
            }).catch((err) => {
                this.setState({
                    verifyLoader: !this.state.verifyLoader
                })
                alert(JSON.stringify(err.response.data.message))
            })
    }

    verifyCode() {
        alert("work")
    }

    render() {
        let { email, userName, phoneNumber, verifyLoader, verifiedEmail, verificationModal } = this.state
        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View
                        style={{ height: this.state.screenHeight / 1.8, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ backgroundColor: "white", width: "90%", height: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", }}>
                            <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                {/* Cancel Button*/}
                                <View style={{ width: "95%", alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", marginTop: "8%" }}>
                                    <Text style={{ marginLeft: "2%", fontWeight: "bold" }}>{"Edit Profile"}</Text>
                                    <TouchableOpacity
                                        style={{ width: 30, marginTop: 10, }}
                                        onPress={this.closeModal}
                                    >
                                        <Entypo name='cross' style={{ textAlign: "right", marginRight: 10, fontSize: 19, fontWeight: "bold", color: "#1E90FF" }} />
                                    </TouchableOpacity>
                                </View>


                                {/* user email */}
                                <View style={{ marginTop: 20, width: "90%", }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ color: "grey" }}>Email</Text>

                                        {
                                            (verifiedEmail === false) ? (
                                                <TouchableOpacity onPress={() => {
                                                    this.sendCode()
                                                }} >
                                                    {
                                                        (verifyLoader === false) ? (<Text style={{ color: "red" }}>Unverified</Text>) : <ActivityIndicator style={{ marginRight: 6, }} />
                                                    }
                                                </TouchableOpacity>
                                            ) : <View>
                                                    <Text style={{ color: "green" }}>Verified</Text>
                                                </View>
                                        }

                                    </View>
                                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text>{email}</Text>
                                        <Entypo name='mail' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 6, }} />
                                    </View>
                                </View>
                                {/* user name */}
                                <View style={{ marginTop: 20 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            placeholder={"Please type user name"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Please type user name"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={(e) => { this.setState({ userName: e }) }}
                                            value={userName}
                                        />
                                        <Entypo name='user' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* phone number */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            keyboardTyp={"numaric"}
                                            placeholder={"Please type phone number"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Please type phone number"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={(e) => { this.setState({ phoneNumber: e }) }}
                                            value={phoneNumber}
                                        />
                                        <Entypo name='phone' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* Submit Button */}
                                {
                                    (this.state.updateLoader === true) ? (
                                        <TouchableOpacity
                                            onPress={() => this.editProfile()}>
                                            <ImageBackground source={require('../../../../assets/buttonBackground.png')} resizeMode="contain"
                                                style={{ height: 120, width: 250, justifyContent: "center", }}
                                            >
                                                <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Update</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    ) : <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                                }


                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}


let mapStateToProps = state => {
    return {
        bseUrl: state.root.bseUrl,
        userProfile: state.root.userProfile,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setUserCredentials: (user, fromApp) => {
            dispatch(setUserCredentials(user, fromApp));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
    input: { justifyContent: 'center', alignItems: 'center', width: '95%', },
});  
