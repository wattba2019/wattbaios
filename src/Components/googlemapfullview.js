
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    // StatusBar, ScrollView, Picker, Image, SafeAreaView, ActivityIndicator, images, Dimensions, Share
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
import { connect } from "react-redux";
import MapDirection from '../Components/maps'
import Ionicons from 'react-native-vector-icons/Ionicons';

class googlemapfullview extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { draggable } = this.props
        return (
            <View style={{
                flex: 1,
                backgroundColor: "white"
            }}>
                <View style={{
                    flex: 0.8,
                    flexDirection: "row",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#8E8E93",
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        // alignItems: "center",
                        // backgroundColor: "red"
                        // borderBottomColor: "grey",
                        // borderBottomWidth: 0.5
                    }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Ionicons name="ios-arrow-back" style={{ marginLeft: 25, color: "black", fontWeight: 'bold', fontSize: 28 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "flex-end",
                        // backgroundColor: "gray"
                    }}>
                        <TouchableOpacity
                        // onPress={() => this.saveSearch()}
                        >
                            <Text style={{ marginTop: 0, marginRight: 30, color: "#FD6958" }}>Your Location</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flex: 8, backgroundColor: "red" }}>
                    <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC", marginTop: 0, backgroundColor: "yellow" }} >
                        <View
                            style={{
                                width: "100%",
                                borderColor: "#1E90FF",
                                borderRadius: 0,
                                justifyContent: "center",
                                backgroundColor: "#EDEDED",
                            }}
                        >
                            <MapDirection draggable={draggable} />
                        </View>
                    </View>
                </View>


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
export default connect(mapStateToProps, mapDispatchToProps)(googlemapfullview);
