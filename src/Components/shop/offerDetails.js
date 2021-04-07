import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, ScrollView

} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

//icons import
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

class OfferDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    next = () => {
        let { offerDetails } = this.props
        console.log(offerDetails, "OFFERDETAILS")
        let packId = [offerDetails._id]
        Actions.Bookappointment({ chosenItems: packId, totalCost: offerDetails.price, pack: true })
    }

    render() {
        let { offerDetails, busy } = this.props
        // console.log(offerDetails, "OFFER_DETAILS")
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%"
            }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View
                    style={{
                        flex: 1.4,
                        width: "100%",
                    }}
                >
                    {/* <Image source={require('../../../assets/servicedetails.png')} resizeMode="cover"
                        style={{ height: "110%", width: "100%", }}
                    /> */}
                    {(offerDetails.packageImage != null) ? (
                        <Image source={{ uri: offerDetails.packageImage }} resizeMode="cover"
                            style={{ width: "100%", height: "110%", }}
                        />
                    ) : <Image source={require('../../../assets/nophoto.jpg')} resizeMode="cover"
                        style={{ width: "100%", height: "110%", }}
                        />}

                    <TouchableOpacity onPress={() => Actions.pop()}
                        style={{ width: 25, position: 'absolute', top: -30, left: 30, right: 0, bottom: 130, justifyContent: "center" }}>
                        <Ionicons name="ios-arrow-back" style={{ color: "#fff", fontWeight: 'bold', fontSize: 28 }} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={{
                        height: "30%",
                        backgroundColor: "white",
                        width: "100%",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: "90%", marginTop: 15
                        }}>
                            <Text style={{ marginLeft: 10, color: "black", fontSize: 18, }}>{offerDetails.packageName}</Text>
                            <Text style={{ marginLeft: 10, color: "#858585", fontSize: 18, }}>{offerDetails.offerTillAvailability}</Text>
                        </View>

                        <View style={{
                            width: "90%", marginTop: 15, flexDirection: "row", justifyContent: "space-between"
                        }}>
                            <Text style={{ color: "#858585", fontSize: 16, }}>{offerDetails.packageDescription}</Text>
                        </View>

                        <View style={{
                            width: "90%", marginTop: 15, flexDirection: "row", justifyContent: "space-between"
                        }}>
                            {/* <Text style={{ color: "#000000", fontSize: 16, }}>Services</Text> */}
                            <Text style={{ color: "#FD6958", fontSize: 16, fontWeight: "bold" }}>Total: GBP {offerDetails.price}</Text>
                        </View>

                        <View style={{
                            width: "90%", flexDirection: "row",
                            marginTop: 15,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <View style={{
                                flexDirection: "row", margin: 10, flexWrap: "wrap",
                            }}>
                                {
                                    (offerDetails) ? (
                                        offerDetails.services.map((key, index) => {
                                            return (
                                                <View key={index} style={{ flexDirection: "row", margin: 5 }}>
                                                    <AntDesign name="check" style={{ color: '#FD6958', fontSize: 20 }} />
                                                    <Text style={{ color: "#000000", fontSize: 16, marginLeft: 10 }}>{key}</Text>
                                                </View>
                                            )
                                        })
                                    ) : null
                                }
                            </View>
                        </View>

                        {
                            busy ?
                                <View
                                    style={{ width: "85%", height: 50, marginTop: 30, }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this.next()}
                                    >
                                        <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                            style={{ height: "100%", width: "100%", justifyContent: "center", flexDirection: "row" }}
                                        >
                                            {/* <Text style={{ textAlign: "left", fontSize: 15, margin: 12, color: "white" }}> Total: GBP {offerDetails.price} </Text> */}
                                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Book</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View> : null
                        }

                    </View>
                </ScrollView>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);