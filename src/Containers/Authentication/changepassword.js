
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar,
    ScrollView, Picker, Image, SafeAreaView, ActivityIndicator,
    images, Dimensions, ImageBackground, Alert
} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import axios from 'axios';
// import { userSaveInStore } from '../store/action/action';

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true,
            updateLoader: true,
            password: "",
            repPassword: "",

        }
    }
    UNSAFE_componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
    }


    closeModal = () => {
        this.setState({ isModalVisible: false })
        this.props.closeModal(false)

    }

    upDatePassword() {
        if (this.state.password === this.state.repPassword) {
            if (this.state.password.length < 8) {
                alert("password should be 8 characters")
            }
            else {
                this.setState({
                    updateLoader: !this.state.updateLoader
                })
                let cloneData = {
                    email: this.props.email,
                    newPassword: this.state.password,
                }
                console.log(cloneData, "data")
                var options = {
                    method: 'POST',
                    url: `${this.props.bseUrl}/resetpassword/changepassword`,
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                };
                axios(options)
                    .then((data) => {
                        console.log(data, "data")
                        alert(data.data.message)
                        this.closeModal()
                    }).catch((err) => {
                        alert(JSON.stringify(err.response.data.message))
                        this.setState({
                            updateLoader: !this.state.updateLoader
                        })
                    })
            }

        }
        else {
            alert("Password dosent match")
        }
    }

    render() {
        console.log(this.props.email, "email")
        let { password, repPassword } = this.state
        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View
                        style={{ height: this.state.screenHeight / 2, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ backgroundColor: "white", width: "90%", height: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center", }}>
                            <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                {/* Cancel Button*/}
                                <View style={{ width: "95%", alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", marginTop: "8%" }}>
                                    <Text style={{ marginLeft: "2%", fontWeight: "bold" }}>{"Change Password"}</Text>
                                    <TouchableOpacity
                                        style={{ width: 30, marginTop: 10, }}
                                        onPress={this.closeModal}
                                    >
                                        <Entypo name='cross' style={{ textAlign: "right", marginRight: 10, fontSize: 19, fontWeight: "bold", color: "#1E90FF" }} />
                                    </TouchableOpacity>
                                </View>
                                {/* password */}
                                <View style={{ marginTop: 20 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            secureTextEntry
                                            placeholder={"Please type new password"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Please type new password"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={(e) => { this.setState({ password: e }) }}
                                            value={password}
                                        />
                                        <Entypo name='key' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* repeat password */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            secureTextEntry
                                            placeholder={"Repeate password"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Repeate password"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={(e) => { this.setState({ repPassword: e }) }}
                                            value={repPassword}
                                        />
                                        <Entypo name='key' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* Submit Button */}
                                {
                                    (this.state.updateLoader === true) ? (
                                        <TouchableOpacity
                                            onPress={() => this.upDatePassword()}>
                                            <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                                style={{ height: 120, width: 250, justifyContent: "center", }}
                                            >
                                                <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Change Password</Text>
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
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        userSaveInStore: (data) => {
            dispatch(userSaveInStore(data));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const styles = StyleSheet.create({
    input: { justifyContent: 'center', alignItems: 'center', width: '95%', },
});  
