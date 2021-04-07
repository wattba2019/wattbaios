import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { connect } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import handleGetDirections from '../getdirectiononmap';

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            readmore: false
        }
    }
    readmore = (data) => {
        this.setState({
            readmore: data
        })
    }

    render() {
        let { shop, workingHours, gallery, busy, currentLocation } = this.props
        let { readmore } = this.state
        return (
            <View>
                <View style={{ paddingHorizontal: 25, paddingVertical: 10, }} >
                    <Text style={{ fontWeight: "bold", marginTop: 10 }}>About</Text>
                    {
                        (readmore == true) ? (
                            <Text style={{ color: "grey" }}>{shop.about}</Text>
                        ) : <>
                                <Text style={{ color: "grey" }}>{shop.about.substring(0, 80)}</Text>
                                <TouchableOpacity style={{ width: "25%", }}
                                    onPress={() => {
                                        this.readmore(true)
                                    }}
                                >
                                    <Text style={{ color: "#FD6958" }}>read more</Text>
                                </TouchableOpacity>
                            </>
                    }
                    <Text style={{ marginTop: 20, fontWeight: "bold" }}>Opening Hours</Text>
                    {
                        (workingHours) ? (
                            workingHours.map((key, index) => {
                                return (
                                    <View style={{ flexDirection: "row", flex: 1 }} key={index}>
                                        {
                                            (key.open) ? (
                                                <>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ color: "green" }}>{'\u2B24'} <Text style={{ color: "black" }}> {key.day}</Text></Text>
                                                    </View>
                                                    <View style={{ flex: 0.5 }}>
                                                        <Text>{key.openTimings}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5 }}>
                                                        <Text>{key.closingTime}</Text>
                                                    </View>
                                                </>
                                            ) : null
                                        }
                                    </View>
                                )
                            })
                        ) : null
                    }
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 6, marginTop: 20, }}>
                            <Text style={{ fontWeight: "bold" }}>Address</Text>
                            <Text style={{ color: "grey" }}>{shop.addressLine1}</Text>
                            <TouchableOpacity style={{ flexDirection: "row", marginTop: 5 }}
                                onPress={() => handleGetDirections(shop, currentLocation)}
                            >
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ marginTop: 20, fontWeight: "bold" }}>Photos</Text>
                        </View>
                        {/* <TouchableOpacity
                            onPress={this.props.viewAll}
                        >
                            <Text style={{ marginTop: 20, fontWeight: "bold" }}>View all</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>

                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            (gallery && gallery[0].galleryImages) ? (
                                gallery[0].galleryImages.map((key, index) => {
                                    return (
                                        <View key={index} style={{
                                            height: 100, width: 80, justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <View style={{
                                                height: 75, width: 75, justifyContent: "center",
                                                alignItems: "center", backgroundColor: "white",
                                            }}>
                                                <Image key={index} style={{ width: "90%", height: "90%", borderRadius: 15 }} resizeMode="stretch"
                                                    source={{ uri: key }}
                                                />
                                            </View>
                                        </View>
                                    )
                                })
                            ) : null
                        }
                    </ScrollView>
                </View>

                {/* {
                    busy ? <View style={{ width: "85%", height: 50, marginTop: 0, marginHorizontal: "7%" }}>
                        <TouchableOpacity
                            // onPress={() => Actions.BarberDetails()}
                            onPress={() => Actions.ChooseService({ shop: shop })}
                        >
                            <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                style={{ height: "100%", width: "100%", justifyContent: "center", }}
                            >
                                <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Book</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View> : null
                } */}

                <View style={{ width: "85%", height: 50, marginTop: 0, marginHorizontal: "7%" }}>
                    <TouchableOpacity
                        // onPress={() => Actions.BarberDetails()}
                        onPress={() => Actions.ChooseService({ shop: shop })}
                    >
                        <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                            style={{ height: "100%", width: "100%", justifyContent: "center", }}
                        >
                            <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Book</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>


            </View >
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
export default connect(mapStateToProps, mapDispatchToProps)(About);

