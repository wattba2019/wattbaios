import React, { Component } from "react";
import { View, Image, ActivityIndicator, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Text, TextInput, ScrollView, Alert } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
//icons import
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from 'react-native-firebase'

class AddPaymenCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            cardNumber: "5160629939209081",
            expiryDateOfCard: "10/22",
            cvv: "675",
        };
    }

    addCard() {
        let { cardNumber, expiryDateOfCard, cvv } = this.state

        if (cardNumber.length === 16 && expiryDateOfCard.length === 5 && cvv.length === 3) {

            // let phoneNumber = this.props.userProfile.phoneNumber;
            let clonedata = {
                cardNumber,
                expiryDateOfCard,
                cvv,
                active: false,
                // userId: this.props.userProfile._id,
                userId: "5e0a5035451393274070616f",
            }

            firebase.auth().signInWithPhoneNumber("+923452153709")
                .then(confirmResult => {
                    this.setState({
                        loader: false
                    })
                    console.log(confirmResult, "CONFIRMATION_RESULT")
                    Actions.CardVerification({ confirmResult: confirmResult, cardDetails: clonedata })
                })
                .catch(error => {
                    this.setState({
                        loader: false
                    })
                    console.log(error)
                    alert(error)
                });
            console.log(clonedata, "PAYMENT_CARD_DATA")

        }

        else {
            Alert.alert("Card details incorrect")
        }


    }

    render() {
        let { cardNumber, expiryDateOfCard, cvv, loader, } = this.state;
        return (
            <View style={{
                flex: 1,
                width: "100%",
                backgroundColor: "white",
            }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                {/* header */}

                <View style={{
                    height: 60,
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    borderBottomColor: "#EAECEF",
                    borderBottomWidth: 0.5
                }}>
                    <View style={{ position: "absolute" }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <AntDesign name="arrowleft" style={{ marginLeft: 15, color: "#000000", fontSize: 25 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{ alignItems: "center", color: "#000000", fontSize: 18 }}>Add Payment Card</Text>
                    </View>
                </View>

                <ScrollView style={{
                    flex: 8, width: "100%", marginTop: 10,
                }}>
                    <View style={{ width: "90%", flexDirection: "row", marginHorizontal: "5%" }}>
                        <Text style={{ alignItems: "center", color: "#4B4B4B", fontSize: 16 }}>
                            Connect a payment card
                        </Text>
                    </View>

                    <View style={{
                        flex: 1, width: "100%", marginTop: 10,
                        alignItems: "center",
                    }}>

                        <View style={{ width: "85%", marginTop: 20, borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                            <TextInput
                                keyboardType={"number-pad"}
                                style={{ height: 50, width: "90%", }}
                                onChangeText={cardNumber => cardNumber.length < 17 ? this.setState({ cardNumber }) : null}
                                value={cardNumber}
                                placeholder={"Card Number"}
                            />
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ width: "40%", borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, margin: "2.5%" }}>
                                <TextInput
                                    keyboardType={"default"}
                                    style={{ marginLeft: 10 }}
                                    onChangeText={expiryDateOfCard => expiryDateOfCard.length < 6 ? this.setState({ expiryDateOfCard }) : null}
                                    value={expiryDateOfCard}
                                    placeholder={"MM/YY"}
                                />
                            </View>

                            <View style={{ width: "40%", borderColor: 'gray', backgroundColor: "#E8E6E7", borderRadius: 25, margin: "2.5%" }}>
                                <TextInput
                                    keyboardType={"number-pad"}
                                    style={{ marginLeft: 10 }}
                                    onChangeText={cvv => cvv.length < 4 ? this.setState({ cvv }) : null}
                                    value={cvv}
                                    placeholder={"CVV"}
                                />
                            </View>
                        </View>

                        <View style={{ width: "85%", height: 80, marginTop: 20, }}>
                            <TouchableOpacity
                                onPress={() => this.addCard()}
                            >
                                <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                    style={{ height: "100%", width: "100%", justifyContent: "center", }}
                                >
                                    {
                                        (loader != true) ? (
                                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Add Payment Card</Text>
                                        ) : <ActivityIndicator style={{ color: "orange" }} />
                                    }
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "90%", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                            <Text style={{ alignItems: "center", color: "#4B4B4B", fontSize: 16 }}>
                                How safe is my card details?
                            </Text>
                        </View>

                    </View>
                </ScrollView>
            </View >
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
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPaymenCard);


const styles = StyleSheet.create({
    contentContainer: {
        // flex: 1,
        paddingBottom: 150,
        backgroundColor: "white",

    },

});