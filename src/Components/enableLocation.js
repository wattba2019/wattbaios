
import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ActivityIndicator,
    images, Dimensions, ImageBackground, Platform, PermissionsAndroid
} from 'react-native';
import { connect } from "react-redux";
import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo';
import { setUserCurrentLocation, getNearByShopsUnder5Km } from "./../Store/Action/action";
import Geolocation from 'react-native-geolocation-service';
class Enablelocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true,
            updateLoader: true,
            loader: false
        }
    }
    UNSAFE_componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
    }

    upDatePassword() {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }
    async requestPermissions() {
        if (Platform.OS === 'ios') {
            // Geolocation.requestAuthorization();
            // Geolocation.setRNConfiguration({
            //     skipPermissionRequests: false,
            //     authorizationLevel: 'whenInUse',
            // });
            Geolocation.requestAuthorization('whenInUse');
        }
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }
    }

    allowLocation = () => {
        this.requestPermissions()
        this.setState({
            loader: true
        })
        // Instead of navigator.geolocation, just use Geolocation.
        Geolocation.getCurrentPosition(
            (position) => {
                if (position) {
                    console.log(position, "USER_CURRENT_LOCATION_AllowAcces")
                    this.props.setUserCurrentLocation(position, true)
                    this.props.getNearByShopsUnder5Km(position)
                    this.setState({
                        loader: false
                    })
                }
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message, "ERROR_ON_GETTING_YOUR_LOCATION_AllowAcces");
                this.setState({
                    loader: false,
                    err: error.message
                })
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
        );
    }

    render() {
        const { loader, err } = this.state

        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>

                    <View style={{ height: this.state.screenHeight / 1.5, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ backgroundColor: "white", width: "90%", height: "100%", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require('../../assets/image.png')} resizeMode="contain"
                                style={{ height: "40%", width: "40%", }}
                            />
                            <Text style={{ textAlign: "center", fontSize: 25 }}>
                                Location Services
                            </Text>
                            <Text style={{ textAlign: "center", marginTop: 20 }}>
                                To help you find Barbershops near you,  {"\n"} WattBa needs to access your location
                            </Text>

                            <View
                                style={{ width: "85%", height: 50, marginTop: 50, }}
                            >
                                <TouchableOpacity
                                    onPress={() => this.allowLocation()}>

                                    <ImageBackground source={require('../../assets/buttonBackground.png')} resizeMode="contain"
                                        style={{ height: "100%", width: "100%", justifyContent: "center", }}
                                    >

                                        {
                                            (loader != true) ? (
                                                <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Enable Location Service</Text>
                                            ) : <ActivityIndicator color="white" />
                                        }
                                    </ImageBackground>
                                </TouchableOpacity>


                                {
                                    err ? <Text style={{ textAlign: "center", fontSize: 15, marginTop: 0, color: "red" }}>{err}</Text> : null
                                }
                            </View>
                        </View>
                    </View>

                </Modal>
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
        setUserCurrentLocation: (position, bolean) => {
            dispatch(setUserCurrentLocation(position, bolean));
        },
        getNearByShopsUnder5Km: (shops) => {
            dispatch(getNearByShopsUnder5Km(shops));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Enablelocation);

