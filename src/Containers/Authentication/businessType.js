import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text, BackHandler } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { setBusinessType } from "./../../Store/Action/action";

class BusinessType extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    setBussinessType(type) {
        console.log(type, "type")
        this.props.setBusinessType(type)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{
                    flex: 0.8,
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: "#FE4B72",
                }}>
                    <View
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        {/* <Text style={{ alignItems: "center", color: "#ffffff", fontWeight: "bold", fontSize: 18 }}>Business Type</Text> */}
                    </View>
                </View>

                <View style={{ flex: 8, marginTop: 10, marginBottom: 10, justifyContent: "center", }}>
                    <View style={{ flex: 0.3, }}>
                        <TouchableOpacity
                            // onPress={() => Actions.AppContainer({ businessType: "barberShop" })}
                            onPress={() => this.setBussinessType("barberShop")}
                        >
                            <Image
                                source={require('../../../assets/businessType/barberShop.png')}
                                resizeMode="contain"
                                style={{ height: "100%", width: "90%", marginLeft: "-8%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.3, marginTop: 20, }}>
                        <TouchableOpacity
                            // onPress={() => Actions.AppContainer({ businessType: "saloon" })}
                            onPress={() => this.setBussinessType("saloon")}
                        >
                            <Image
                                source={require('../../../assets/businessType/saloon.png')}
                                resizeMode="contain"
                                style={{ height: "100%", width: "90%", marginLeft: "-8%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.3, marginTop: 20, }}>
                        <TouchableOpacity
                            // onPress={() => Actions.AppContainer({ businessType: "beautySaloon" })}
                            onPress={() => this.setBussinessType("beautySaloon")}
                        >
                            <Image
                                source={require('../../../assets/businessType/beautysaloon.png')}
                                resizeMode="contain"
                                style={{ height: "100%", width: "90%", marginLeft: "-8%" }}
                            />
                        </TouchableOpacity>
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
        setBusinessType: (type) => {
            dispatch(setBusinessType(type));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessType);
