import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

class ServiceChild1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { packages, busy } = this.props
        // console.log(packages, "PACKAGES_INSIDE_COMPONENT")
        return (
            <View style={{ paddingHorizontal: 15, padding: 15 }}>
                {
                    (packages) ? (
                        packages.map((key, index) => {
                            return (
                                <TouchableOpacity key={index} style={{ width: "90%", marginHorizontal: "5%", borderBottomColor: "#EEEEEE", borderBottomWidth: 1, margin: 5 }}
                                    onPress={() => Actions.OfferDetails({ offerDetails: key, busy })}
                                >
                                    {(key.packageImage != null) ? (
                                        <Image source={{ uri: key.packageImage }} resizeMode="cover"
                                            style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 5 }}
                                        />
                                    ) : <Image source={require('../../../assets/nophoto.jpg')} resizeMode="cover"
                                        style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 5 }}
                                        />}

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, }}>
                                        <View>
                                            <Text>{key.packageName}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: "#FD6958" }}>Book Now</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2, marginBottom: 10 }}>
                                        <View>
                                            <Text style={{ color: "grey", fontSize: 11 }}>{key.offerTillAvailability}</Text>
                                        </View>
                                        <View>
                                            <Text>GBP {key.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    ) : null
                }
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
export default connect(mapStateToProps, mapDispatchToProps)(ServiceChild1);

