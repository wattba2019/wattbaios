import React, { Component } from "react";
import { View, Image, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, AsyncStorage, Text, ScrollView, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { setUserCurrentLocation } from "./../../Store/Action/action";
import Geolocation from 'react-native-geolocation-service';

class Allowaccesslocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allowLocation: false,
            loader: false
        };
    }

    async requestPermissions() {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('whenInUse');
        }
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        }
    }

    allowLocation = () => {
        this.requestPermissions()
        this.setState({ loader: true })
        Geolocation.getCurrentPosition(
            (position) => {
                if (position) {
                    // console.log(position, "USER_CURRENT_LOCATION_AllowAcces")
                    this.props.setUserCurrentLocation(position)
                    this._storeData(position)
                    this.setState({ loader: false })
                }
            },
            (error) => {
                // See error code charts below.
                // console.log(error.code, error.message, "ERROR_ON_GETTING_YOUR_LOCATION_AllowAcces");
                this.setState({
                    loader: false,
                    err: error.message
                })
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
        );
    }

    _storeData = async (data) => {
        console.log("Assync", data)
        try {
            await AsyncStorage.setItem('locationAllow', JSON.stringify(true));
        } catch (error) {
            // Error saving data
        }
    };

    render() {
        const { loader, err } = this.state
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                {/* //body// */}
                <View style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white"
                }}>
                    <Image
                        source={require('../../../assets/image.png')}
                        resizeMode="contain"
                        style={{ left: 0, height: "40%", width: "40%", marginTop: 40 }} />
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
                        Find nearby Barbershops!
                    </Text>
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        To find Barbershops near you, allow
                        {"\n"}
                        app access to your location
                    </Text>
                    <View style={{ width: "85%", height: 50, marginTop: 100, flexDirection: "column", }}>
                        <TouchableOpacity onPress={() => this.allowLocation()}>
                            <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                style={{ height: "100%", width: "100%", justifyContent: "center", }}>
                                {
                                    (loader != true) ? (
                                        <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Allow location access</Text>
                                    ) : <ActivityIndicator color="white" />
                                }
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ width: "100%" }}
                        // onPress={() => Actions.AppContainer()}
                        onPress={() => Actions.BusinessType()}
                    >
                        <Text
                            // onPress={() => Actions.AppContainer()}
                            onPress={() => Actions.BusinessType()}
                            style={{ textAlign: "center", fontSize: 15, marginTop: 12, }}>
                            Restrict location access
                        </Text>
                    </TouchableOpacity>
                    {
                        err ? <Text style={{ textAlign: "center", fontSize: 15, marginTop: 12, color: "red" }}>{err}</Text> : null
                    }
                </View>
            </ScrollView>
        );
    }
}

let mapStateToProps = state => {
    return {
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setUserCurrentLocation: (position,) => {
            dispatch(setUserCurrentLocation(position));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Allowaccesslocation);

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingBottom: 0,
        backgroundColor: "white",
    },
});