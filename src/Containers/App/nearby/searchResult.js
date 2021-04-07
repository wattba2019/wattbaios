import React, { Component } from "react";
import { View, Image, StatusBar, TouchableOpacity, Text, ScrollView, Platform } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    distance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        if (d > 1) return Math.round(d) + " km";
        else if (d <= 1) return Math.round(d * 1000) + "m";
        return d;
    }

    render() {
        const { shops, currentLocation, headerTitle } = this.props
        return (
            <View style={{
                flex: 1,
                width: "100%",
                backgroundColor: "white",
            }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <View style={{ flex: 0.7, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: 'grey', marginTop: Platform.OS === 'ios' ? 25 : 0 }}>
                    <View style={{ flex: 1, justifyContent: "center", }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Ionicons name="ios-arrow-back" style={{ marginLeft: 25, color: "black", fontWeight: 'bold', fontSize: 28 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <Text style={{ alignItems: "center", }}>{headerTitle}</Text>
                    </View>
                    <View style={{ flex: 1, }}>
                    </View>
                </View>

                <View style={{ flex: 8, }}>
                    <ScrollView>
                        {
                            (shops && shops.length != 0) ? (
                                shops.map((key, index) => {
                                    return (
                                        <TouchableOpacity key={index}
                                            onPress={() => Actions.Shop({ shop: key })}
                                            style={{ flexDirection: "row", height: 100, marginTop: 10, marginLeft: 10, borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                                            <View style={{ flex: 3, }}>
                                                {
                                                    (key.coverImage != null) ? (
                                                        <Image source={{ uri: key.coverImage }} resizeMode="cover"
                                                            style={{ width: "100%", height: 85 }} />
                                                    ) : <Image source={require('../../../../assets/nophoto.jpg')} resizeMode="cover"
                                                        style={{ width: "100%", height: 85 }} />
                                                }
                                            </View>
                                            <View style={{ flex: 7, marginLeft: 20, padding: 5, }}>
                                                <Text style={{ fontWeight: "bold", }}>{key.businessName}</Text>
                                                <Text style={{ color: "grey", fontSize: 14 }}>{key.addressLine1}</Text>
                                                <View style={{ flex: 1, flexDirection: "row", }}>
                                                    <View style={{ flex: 3, }}>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            // backgroundColor: "red"
                                                        }}>
                                                            <Image source={require('../../../../assets/Path.png')} resizeMode="contain"
                                                                style={{ height: 15, width: 15, }}
                                                            />
                                                            <Text style={{ color: "grey", marginLeft: 7, fontSize: 13, }}>{key.review}</Text>

                                                            <Image source={require('../../../../assets/Group.png')} resizeMode="contain"
                                                                style={{ height: 14, width: 14, marginTop: 2, marginLeft: 5 }}
                                                            />
                                                            {
                                                                currentLocation && key.location ?
                                                                    <Text style={{ marginLeft: 7, fontSize: 13 }}>{this.distance(currentLocation.coords.latitude, currentLocation.coords.longitude, key.location.coordinates[0], key.location.coordinates[1])} </Text> :
                                                                    null
                                                            }
                                                        </View>
                                                        {/* <Text style={{ color: "grey", fontSize: 12, color: "#ff4500" }}>8:30 am - 8:00 pm</Text> */}
                                                        <Text style={{ color: "grey", fontSize: 12, color: "#ff4500" }}>{key.telePhone}</Text>
                                                    </View>

                                                    <View style={{ flex: 2, flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                                                        <TouchableOpacity style={{ backgroundColor: "#FD6958", width: '100%', height: 35, borderRadius: 25, marginRight: "15%", justifyContent: "center", alignItems: "center" }}
                                                            onPress={() => Actions.Shop({ shop: key })}
                                                        >
                                                            <Text style={{ color: "#ffffff", fontSize: 10, textAlign: "center" }}>Book an Appointment</Text>
                                                            {/* <Image source={require('../../../../assets/book.png')} resizeMode="contain"
                                                                style={{ height: 30, width: 80, }}
                                                            /> */}
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            ) : null
                        }
                    </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
