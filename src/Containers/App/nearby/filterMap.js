import React, { Component } from "react";
import { View, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import MapDirection from '../../../Components/maps'
import { setSearchLocation } from "../../../Store/Action/action";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class FilteMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    UNSAFE_componentWillMount() {
        let location = this.props.searchLocation != null ? this.props.searchLocation.coords : this.props.currentLocation.coords
        this.setState({
            coords: location
        })
    }

    getShopWithPlaceName(name, location) {
        console.log(name, "namenamename")
        let searchLocation = {
            coords: {
                latitude: location.lat,
                longitude: location.lng
            }
        }
        this.setState({
            coords: searchLocation.coords,
            locationName: name
        })
    }

    saveLocation() {
        let searchLocation = {
            coords: this.state.coords
        }
        this.props.setSearchLocation(searchLocation, this.state.locationName)
        Actions.pop()
    }
    cancle() {
        this.props.setSearchLocation(null, null)
        Actions.pop()
    }

    render() {
        let { coords } = this.state

        // console.log(searchLocation, "searchLocation")
        return (
            <View style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                backgroundColor: "white",
            }}>
                <View style={{
                    width: "95%",
                    alignItems: "center",
                }}>
                    <View style={{
                        width: "100%",
                        marginTop: 10,
                        position: "absolute",
                        zIndex: 1, backgroundColor: "white"
                    }}>
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
                                returnKeyType={'default'}
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
                </View>

                <View style={{ flex: 8, width: "100%", height: "100%", justifyContent: "center", alignItems: "center", }}>
                    <View
                        style={{
                            marginTop: "30%",
                            marginBottom: 0,
                            width: "100%",
                            height: "100%",
                            marginHorizontal: "0%",
                            backgroundColor: "#EDEDED",
                        }}
                    >
                        {/* <MapDirection /> */}

                        <View>
                            {
                                (coords && coords.latitude && coords.longitude) ?
                                    <MapView style={{ width: "100%", height: 500 }}
                                        provider={PROVIDER_GOOGLE}
                                        region={{
                                            latitude: coords.latitude,
                                            longitude: coords.longitude,
                                            latitudeDelta: LATITUDE_DELTA,
                                            longitudeDelta: LONGITUDE_DELTA,
                                        }}
                                    >
                                        <Marker
                                            coordinate={
                                                {
                                                    latitude: coords.latitude,
                                                    longitude: coords.longitude,
                                                    latitudeDelta: LATITUDE_DELTA,
                                                    longitudeDelta: LONGITUDE_DELTA,
                                                }
                                            }
                                        >
                                            <TouchableOpacity>
                                                <Ionicons name="ios-navigate" style={{ color: '#FD6958', fontWeight: 'bold', fontSize: 35 }} />
                                            </TouchableOpacity>
                                        </Marker>
                                    </MapView> : null
                            }
                        </View>
                    </View>

                    <View
                        style={{
                            position: "absolute",
                            zIndex: 1,
                            bottom: 10,
                            flex: 1,
                            width: "100%",
                            height: 90,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#F2F2F2"
                            // backgroundColor: "red"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                marginTop: 10,
                                width: "80%",
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "white"
                            }}
                            onPress={() => this.saveLocation()}
                        >
                            <Text style={{ fontWeight: "bold" }}>Save Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginTop: 10,
                                width: "80%",
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "red"
                            }}
                            onPress={() => this.cancle()}
                        >
                            <Text style={{ fontWeight: "bold", color: "white" }}>Cancled</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}

let mapStateToProps = state => {
    return {
        userProfile: state.root.userProfile,
        currentLocation: state.root.currentLocation,
        searchLocation: state.root.searchLocation,
        bseUrl: state.root.bseUrl,
        nearByShops: state.root.nearByShops,
        shopLocationMarkers: state.root.shopLocationMarkers,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setSearchLocation: (position, locationName) => {
            dispatch(setSearchLocation(position, locationName));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(FilteMap);

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingBottom: 150,
        backgroundColor: "green",
    },
    card: {
        width: 250, height: 115,
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6, overflow: 'hidden'
    },
    card_text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    },
    iconsStyle: {
        width: "22%", height: "42%", justifyContent: "center", alignItems: "center", margin: 5,
    },
});