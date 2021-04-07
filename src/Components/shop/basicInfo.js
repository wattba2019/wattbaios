import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar,
    ScrollView, Picker, Image, SafeAreaView, ActivityIndicator,
    images, Dimensions, ImageBackground
} from 'react-native';
import { connect } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import handleGetDirections from '../getdirectiononmap';

class BasicInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { barberDetails, shop, workingHours, currentLocation } = this.props
        return (
            <View>
                <View style={{ paddingHorizontal: 25, paddingVertical: 10 }} >
                    {/* <Text style={{ marginTop: 20, fontWeight: "bold" }}>Working Hours</Text>
                    {
                        (workingHours) ? (
                            workingHours.map((key, index) => {
                                return (
                                    <View style={{ flexDirection: "row", flex: 1 }} key={index}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: "green" }}>{'\u2B24'} <Text style={{ color: "black" }}> {key.day}</Text></Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text>{key.openTimings}</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text>{key.closingTime}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        ) : null
                    } */}

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 6, marginTop: 20, }}>
                            <Text style={{ fontWeight: "bold" }}>Address</Text>
                            <Text style={{ color: "grey" }}>{shop.addressLine1}</Text>
                            <TouchableOpacity
                                onPress={() => handleGetDirections(shop, currentLocation)}
                                style={{ flexDirection: "row", marginTop: 5 }}>
                                <Entypo name="direction" style={{ color: "#FD6958", fontWeight: 'bold', fontSize: 20 }} />
                                <Text style={{ color: "#FD6958" }}> Get directions</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 4, marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                            <Image
                                resizeMode="contain"
                                style={{ width: 100, height: 100 }}
                                source={require("../../../assets/Rectangle2938.png")}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

let mapStateToProps = state => {
    return {
        currentLocation: state.root.currentLocation,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);

