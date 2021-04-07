import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import { setUserCurrentLocation, getNearByShopsUnder5Km } from "./../Store/Action/action";
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import Enablelocation from '../../src/Components/enableLocation';

class MapDirection extends React.Component {
    constructor() {
        super()
        this.state = {
            location: null,
            errorMessage: null,
            markers: [],
            draggable: false,
            tracksViewChanges: true,

        }
    }
    stopTrackingViewChanges = () => {
        this.setState(() => ({
            tracksViewChanges: false,
        }));
    }
    UNSAFE_componentWillMount() {
        if (this.props.currentLocation) {
            this.setState({
                coords: this.props.currentLocation.coords
            })
        }
        if (this.props.markers) {
            this.setState({
                markers: this.props.markers
            })
        }
        if (this.props.draggable) {
            this.setState({
                draggable: this.props.draggable
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.currentLocation) {
            this.setState({
                coords: nextProps.currentLocation.coords
            })
        }
        if (nextProps.markers) {
            this.setState({
                markers: nextProps.markers
            })
        }
    }

    locationSet(coords) {
        let currentLocation = {
            coords: coords
        }
        this.setState({
            coords: coords
        })
        this.props.getNearByShopsUnder5Km(currentLocation)
        this.props.setUserCurrentLocation(currentLocation, true)
    }

    componentWillUnmount() {
        this.setState({
            markers: []
        })
    }


    render() {
        let { coords, markers, draggable, tracksViewChanges } = this.state
        console.log(coords, markers, draggable, "INSIDERENDER")
        return (
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
                            {
                                (markers.length != 0 && !draggable) ? (
                                    markers.map((key, index) =>
                                        (
                                            <Marker key={index} draggable={false}
                                                coordinate={
                                                    {
                                                        latitude: key.latitude,
                                                        longitude: key.longitude,
                                                        latitudeDelta: LATITUDE_DELTA,
                                                        longitudeDelta: LONGITUDE_DELTA,
                                                    }
                                                }
                                                title={key.title}
                                            >
                                                {/* <Image
                                                    onLoad={this.stopTrackingViewChanges}
                                                    source={require('../../assets/Group55346(2).png')} style={{ height: 45, width: 45 }}
                                                /> */}
                                            </Marker>
                                        )
                                    )
                                ) : null
                            }

                            <Marker draggable={draggable}
                                coordinate={
                                    {
                                        latitude: coords.latitude,
                                        longitude: coords.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LONGITUDE_DELTA,
                                    }
                                }
                                onDragEnd={(e) => this.locationSet(e.nativeEvent.coordinate)}
                            >
                                <TouchableOpacity>
                                    <Ionicons name="ios-navigate" style={{ color: '#FD6958', fontWeight: 'bold', fontSize: 35 }} />
                                </TouchableOpacity>

                                {/* <Image
                                    onLoad={this.stopTrackingViewChanges}
                                    source={require('../../assets/mapIcon.png')} style={{ height: 35, width: 35 }}
                                /> */}
                            </Marker>
                        </MapView> :

                        <View style={{ width: "99%", height: 500, justifyContent: "center", alignItems: "center" }} >
                            <Enablelocation />
                        </View>

                    // <MapView style={{ width: "99%", height: 500 }}
                    //     provider={PROVIDER_GOOGLE}
                    //     region={{
                    //         // latitude: 24.8607,
                    //         // longitude: 67.0011,
                    //         latitude: 37.78825,
                    //         longitude: -122.4324,
                    //         latitudeDelta: LATITUDE_DELTA,
                    //         longitudeDelta: LONGITUDE_DELTA,
                    //     }}
                    // >
                    // </MapView>
                }

            </View>
        );
    }

}
const styles = StyleSheet.create({

    container: {
        ...StyleSheet.absoluteFillObject,
        height: 500,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },


});

const mapStateToProps = state => {
    return {
        currentLocation: state.root.currentLocation,
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

export default connect(mapStateToProps, mapDispatchToProps)(MapDirection);



