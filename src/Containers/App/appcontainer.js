import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Text, StatusBar, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Footer, FooterTab, } from 'native-base';
import Home from '../App/home/index';
import Nearby from '../App/nearby/index';
import Appointments from '../App/appointments/index';
import Profile from '../App/profile/index'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setUserCurrentLocation, setNearByShops, getNearByShopsUnder5Km } from "./../../Store/Action/action";

class AppContainer extends Component {
    constructor() {
        super()
        this.state = {
            rout: "Home",
            // rout: "Profile",
            focus: false
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.rout) {
            this.setState({
                rout: this.props.rout
            })
        }

        if (this.props.openInput) {
            this.setState({
                focus: this.props.openInput
            })
        }
    }

    getShopWithPlaceName(name, location) {
        let searchLocation = {
            coords: {
                latitude: location.lat,
                longitude: location.lng
            }
        }
        this.props.setUserCurrentLocation(searchLocation, true)
        this.props.getNearByShopsUnder5Km(searchLocation)
    }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
    // }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                {/* //body// */}
                {
                    (this.state.rout === "Nearby") ? (
                        <View style={{ width: "100%", position: "absolute", zIndex: 1, marginTop: Platform.OS === 'ios' ? "13%" : "8%", backgroundColor: "white" }}>
                            <View style={{ width: "95%", marginHorizontal: "2.5%" }}>
                                <GooglePlacesAutocomplete
                                    placeholder='Enter Location'
                                    minLength={2}
                                    onPress={(data, details = null) => {
                                        // 'details' is provided when fetchDetails = true
                                        // console.log(data, details, "Console");
                                        let location = details.geometry.location
                                        this.getShopWithPlaceName(details.name, location)
                                    }}
                                    query={{
                                        key: 'AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk',
                                        language: 'en',
                                    }}
                                    autoFocus={this.state.focus}
                                    // returnKeyType={'default'}
                                    returnKeyType='next'
                                    fetchDetails={true}
                                    styles={{
                                        textInputContainer: {
                                            backgroundColor: 'white',
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                        },
                                        listView: { backgroundColor: "white", height: 100 },
                                        textInput: {
                                            backgroundColor: '#F2F2F2',
                                            marginLeft: 0,
                                            marginRight: 0,
                                            color: '#5d5d5d',
                                            fontSize: 16,
                                        },
                                        predefinedPlacesDescription: {
                                            color: '#1faadb',
                                        },
                                    }}
                                />
                            </View>
                        </View>
                    ) : null
                }

                {
                    (this.state.rout === "Home") ? (
                        <ScrollView style={{ flex: 6, backgroundColor: "white" }}>
                            <Home businessType={this.props.businessType} />
                        </ScrollView>
                    ) : null
                }
                {
                    (this.state.rout === "Nearby") ? (
                        <View style={{ flex: 6, backgroundColor: "white" }}>
                            <Nearby focusInput={this.state.focus} businessType={this.props.businessType} />
                        </View>
                    ) : null
                }
                {
                    (this.state.rout === "Appointments") ? (
                        <ScrollView style={{ flex: 6, backgroundColor: "white" }}>
                            <Appointments businessType={this.props.businessType} />
                        </ScrollView>

                    ) : null
                }
                {
                    (this.state.rout === "Profile") ? (
                        <ScrollView style={{ flex: 6, backgroundColor: "white" }}>
                            <Profile businessType={this.props.businessType} />
                        </ScrollView>
                    ) : null
                }

                <Footer style={{ backgroundColor: "#F8F8F8", borderTopColor: "#8E8E93", borderTopWidth: 0.5 }}>
                    <FooterTab style={{ backgroundColor: "#F8F8F8", marginHorizontal: 12 }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => { this.setState({ rout: "Home" }) }} >
                            {
                                (this.state.rout === "Home") ? (
                                    <Image source={require('../../../assets/footericons/homeOrange.png')} resizeMode="contain"
                                        style={{ width: "40%", height: "40%", }}
                                    />
                                ) : <Image source={require('../../../assets/footericons/homeGrey.png')} resizeMode="contain"
                                    style={{ width: "40%", height: "40%", }}
                                    />
                            }
                            <Text style={{ textAlign: "center", marginTop: 0, color: this.state.rout === "Home" ? "#FD6958" : "#8E8E93", fontSize: 10 }}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => { this.setState({ rout: "Nearby", focus: false }) }}  >
                            {
                                (this.state.rout === "Nearby") ? (
                                    <Image source={require('../../../assets/footericons/nearbyOrange.png')} resizeMode="contain"
                                        style={{ width: "40%", height: "40%", }}
                                    />
                                ) : <Image source={require('../../../assets/footericons/nearbyGrey.png')} resizeMode="contain"
                                    style={{ width: "40%", height: "40%", }}
                                    />
                            }
                            <Text style={{ textAlign: "center", marginTop: 0, color: this.state.rout === "Nearby" ? "#FD6958" : "#8E8E93", fontSize: 10 }}>Nearby shops</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => { this.setState({ rout: "Appointments" }) }}>
                            {
                                (this.state.rout === "Appointments") ? (
                                    <Image source={require('../../../assets/footericons/appointmentOrange.png')} resizeMode="contain"
                                        style={{ width: "40%", height: "40%", }}
                                    />
                                ) : <Image source={require('../../../assets/footericons/appointmentGrey.png')} resizeMode="contain"
                                    style={{ width: "40%", height: "40%", }}
                                    />
                            }
                            <Text style={{ textAlign: "center", marginTop: 0, color: this.state.rout === "Appointments" ? "#FD6958" : "#8E8E93", fontSize: 10 }}>Appointments</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => { this.setState({ rout: "Profile" }) }}>
                            {
                                (this.state.rout === "Profile") ? (
                                    <Image source={require('../../../assets/footericons/profileOrange.png')} resizeMode="contain"
                                        style={{ width: "40%", height: "40%", }}
                                    />
                                ) : <Image source={require('../../../assets/footericons/profileGrey.png')} resizeMode="contain"
                                    style={{ width: "40%", height: "40%", }}
                                    />
                            }
                            <Text style={{ textAlign: "center", marginTop: 0, color: this.state.rout === "Profile" ? "#FD6958" : "#8E8E93", fontSize: 10 }}>Profile</Text>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        businessType: state.root.businessType
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        setUserCurrentLocation: (position, bolean) => {
            dispatch(setUserCurrentLocation(position, bolean));
        },
        setNearByShops: (shops) => {
            dispatch(setNearByShops(shops));
        },
        getNearByShopsUnder5Km: (shops) => {
            dispatch(getNearByShopsUnder5Km(shops));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(AppContainer);
