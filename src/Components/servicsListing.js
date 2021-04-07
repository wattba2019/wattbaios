import React, { Component } from "react";
import { View, Image, StatusBar, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

//7 icons import//
import womenHairstyling from '../../assets/women-hairstyling.png';
import surface from '../../assets/surface-1.png';
import surface2 from '../../assets/surface-2.png';
import dye from '../../assets/dye.png';
import makeup from '../../assets/makeup.png';
import mascara from '../../assets/mascara.png';
import iconForServices from '../../assets/iconForServices.png';

class ServiceListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    test(parm) {
        const { More, } = this.props
        return More
    }

    // UNSAFE_componentWillMount() {
    //     const { More } = this.props
    //     let obj = {}

    //     for (let index = 0; index < More.length; index++) {
    //         const element = More[index];
    //         let local = obj[element.serviceName]
    //         if (local) {
    //             if (local.indexOf(element.userId) == -1) {
    //                 local.push(element.userId)
    //             }
    //             // local.push(element.userId)
    //         }
    //         else {
    //             local = [element.userId]
    //         }
    //         obj[element.serviceName] = local
    //     }

    //     console.log(obj, "setObject")
    //     this.setState({
    //         MoreAfterSort: obj
    //     })
    // }


    getMultipleShopWithId(shopid) {
        if (shopid.length) {
            console.log(shopid, "shopid")
            cloneData = {
                shopid: shopid
            }
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/getallshops/getMultipleShopWithId/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneData
            }
            axios(options)
                .then(result => {
                    let shops = result.data.data
                    console.log(shops, "Fetch_multiple_shops_withID")
                    Actions.SearchResults({ shops: shops, headerTitle: "Top Services More" })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                    this.setState({
                        err: error,
                    })
                })
        }
        else {
            Alert.alert("There is no data")
        }

    }
    render() {
        const { headerTitle, More, } = this.props
        const { MoreAfterSort } = this.state
        console.log(More, "More_services")
        // let images = [womenHairstyling, surface, surface2, dye, makeup, mascara]

        return (
            // <View>
            //     <Text>Hello World</Text>
            // </View>
            <View style={{
                flex: 1,
                width: "100%",
                backgroundColor: "white",
            }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <View style={{ flex: 0.7, marginTop: Platform.OS === 'ios' ? 25 : 0, flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: 'grey', }}>
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
                        <View style={{ paddingVertical: 5, paddingHorizontal: 15, width: "90%", marginHorizontal: "5%" }}>

                            {/* {
                                (MoreAfterSort) ? (
                                    Object.keys(MoreAfterSort).map((key, index) => {
                                        return (
                                            <TouchableOpacity key={index}
                                                onPress={() => this.getMultipleShopWithId(MoreAfterSort[key])}
                                                style={{ marginTop: 25, flexDirection: "row", flex: 1 }}>
                                                <View style={{ flex: 2 }}>
                                                    <Image
                                                        resizeMode="contain"
                                                        style={{ width: 35, height: 35 }}
                                                        source={iconForServices}
                                                    />
                                                </View>
                                                <View style={{ flex: 7 }}>
                                                    <Text>{key}</Text>
                                                    <Text style={{ fontSize: 11, color: "grey" }}>{MoreAfterSort[key].length ? MoreAfterSort[key].length : null} Shops</Text>
                                                </View>
                                                <TouchableOpacity style={{ flex: 1 }}
                                                    onPress={() => Actions.ServiceDetaild({ serviceDetails: key, })}
                                                >
                                                    <Text style={{ fontSize: 11, color: "#FD6958" }}>View</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    })
                                ) : null
                            } */}


                            {/* {
                                (MoreAfterSort) ? (
                                    Object.keys(MoreAfterSort).map((key, index) => {
                                        console.log(key, MoreAfterSort[key], "MoreAfterSort")
                                        // return (

                                        // )
                                    })
                                ) : null
                            } */}

                            {
                                (More) ? (
                                    More.map((key, index) => {
                                        // console.log(key, 'keykeykey')
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => this.getMultipleShopWithId(key.userId._id)}
                                                style={{ marginTop: 25, flexDirection: "row", flex: 1 }}
                                            >
                                                <View style={{ flex: 2 }}>
                                                    <Image
                                                        resizeMode="contain"
                                                        style={{ width: 35, height: 35 }}
                                                        source={iconForServices}
                                                    />
                                                </View>
                                                <View style={{ flex: 7 }}>
                                                    <Text>{key.categoryName}</Text>
                                                    <Text style={{ fontSize: 11, color: "grey" }}>{key.extraServices[0] ? key.extraServices[0].serviceName : null}</Text>
                                                </View>
                                                {/* <TouchableOpacity
                                                    style={{ flex: 1 }}
                                                    onPress={() => Actions.ServiceDetaild({ serviceDetails: key, })}
                                                >
                                                    <Text style={{ fontSize: 11, color: "#FD6958" }}>View</Text>
                                                </TouchableOpacity> */}
                                            </TouchableOpacity>
                                        )
                                    })

                                ) : null
                            }

                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
let mapStateToProps = state => {
    return {
        bseUrl: state.root.bseUrl,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceListing);
