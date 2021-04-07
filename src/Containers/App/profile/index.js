import React, { Component } from "react";
import { View, Image, Platform, StatusBar, TouchableOpacity, AsyncStorage, Text, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { setFavShops } from "../../../Store/Action/action";
import ChangePassword from '../../Authentication/changepassword';
import EditProfile from '../../App/profile/editprofile';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePassword: false,
            editProfile: false,
        };
    }

    UNSAFE_componentWillMount() {
        this.getFavShops()
    }

    getFavShops() {
        let urlm = `${this.props.bseUrl}/favorites/${this.props.userProfile._id}`
        axios({
            method: 'get',
            url: urlm,
        })
            .then(result => {
                let data = result.data.data[0].favrouiteIds
                console.log(data, "FAV_ON_PROFILE")
                this.props.setFavShops(data)
            })
            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_Fav")
                }
                else {
                    alert(err.response.data.message)
                }
            })

    }

    getMultipleShopWithId(shopid) {
        if (shopid.length) {
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
                    console.log(shops, "Fetch_multiple_shops_withID_inside_profile")
                    Actions.FavouritesShops({ shops: shops, headerTitle: "Favourites" })

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

    // logout() { Actions.Signin() }

    logout() { this.clearAssync() }
    clearAssync = async () => {
        try {
            await AsyncStorage.clear();
            Actions.Signin({ logoutApp: true })
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {
        let { changePassword } = this.state
        return (
            <View style={{ flex: 1, width: "100%", backgroundColor: "white", }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                {/* Edit Profile Modal*/}
                {
                    (this.state.editProfile === true) ? (
                        <EditProfile email={this.props.email} closeModal={(data) => {
                            this.setState({
                                editProfile: data
                            })
                        }} />
                    ) : null
                }

                {/* Change Password Modal*/}
                {
                    (this.state.changePassword === true) ? (
                        <ChangePassword email={this.props.userProfile.email} closeModal={(data) => {
                            this.setState({
                                changePassword: data
                            })
                        }} />
                    ) : null
                }

                {/* header */}
                <View style={{
                    marginTop: Platform.OS === 'ios' ? 30 : null,
                    flex: 0.6,
                    height: 60,
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'grey',
                }}>
                    <View style={{ position: "absolute" }}>
                        {/* <TouchableOpacity onPress={() => Actions.pop()}>
                            <AntDesign name="arrowleft" style={{ marginLeft: 15, color: "#000000", fontSize: 25 }} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center", }}>
                        <Text style={{ alignItems: "center", color: "#000000", fontSize: 18 }}>Settings</Text>
                    </View>
                </View>

                <View style={{ flex: 8, width: "100%", marginTop: 10 }}>
                    <ScrollView style={{ width: "100%", }}>
                        <Text style={{ alignItems: "center", color: "#131313", fontSize: 18, marginLeft: "7%", marginTop: 20 }}>Profile</Text>
                        <TouchableOpacity style={{ width: "90%", marginHorizontal: "5%" }}
                            onPress={() => { this.setState({ editProfile: true }) }}>

                            <View style={{ flexDirection: "row", height: 70, alignItems: "center", borderBottomColor: "#F0F2F6", borderBottomWidth: 1, padding: 10 }}>
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 25, height: 25 }}
                                    source={require("../../../../assets/profileicons/User.png")}
                                />
                                <Text style={{ alignItems: "center", color: "#131313", fontSize: 18, marginLeft: "7%" }}>Edit Profile</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: "90%", marginHorizontal: "5%" }}
                            onPress={() => { this.getMultipleShopWithId(this.props.favShops) }}>
                            <View style={{ flexDirection: "row", height: 70, alignItems: "center", borderBottomColor: "#F0F2F6", borderBottomWidth: 1, padding: 10 }}>
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 25, height: 25 }}
                                    source={require("../../../../assets/profileicons/Star.png")}
                                />
                                <Text style={{ alignItems: "center", color: "#131313", fontSize: 18, marginLeft: "7%" }}>Favourites</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: "90%", marginHorizontal: "5%", }}
                            onPress={() => { this.setState({ changePassword: true }) }}>
                            <View style={{ flexDirection: "row", height: 70, alignItems: "center", borderBottomColor: "#F0F2F6", borderBottomWidth: 1, padding: 10 }}>
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 25, height: 25 }}
                                    source={require("../../../../assets/profileicons/Icon.png")}
                                />
                                <Text style={{ alignItems: "center", color: "#131313", fontSize: 18, marginLeft: "7%" }}>Change Password</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={{ alignItems: "center", color: "#131313", fontSize: 18, marginLeft: "7%", marginTop: 20 }}>Support</Text>

                        <TouchableOpacity style={{ width: "90%", marginHorizontal: "5%" }}
                            onPress={() => Actions.TermsAndCondition()}>
                            <View style={{ flexDirection: "row", height: 70, alignItems: "center", borderBottomColor: "#F0F2F6", borderBottomWidth: 1, padding: 10 }}>
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 25, height: 25 }}
                                    source={require("../../../../assets/profileicons/Icon-3.png")}
                                />
                                <Text style={{ alignItems: "center", color: "#131313", fontSize: 18, marginLeft: "7%" }}>Terms & Conditions</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: "90%", marginHorizontal: "5%" }}>
                            <View style={{ flexDirection: "row", height: 70, alignItems: "center", borderBottomColor: "#F0F2F6", borderBottomWidth: 1, padding: 10 }}>
                                <AntDesign name="contacts" style={{ color: "#FD6958", fontWeight: 'bold', fontSize: 28, left: -2 }} />
                                <Text style={{ alignItems: "center", color: "#131313", fontSize: 18, marginLeft: "7%" }}>Contact us at info@wattba.app</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => this.logout()} style={{ width: "90%", marginHorizontal: "5%" }}>
                            <View style={{ flexDirection: "row", height: 70, alignItems: "center", borderBottomColor: "#F0F2F6", borderBottomWidth: 1, padding: 10 }}>
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 25, height: 25 }}
                                    source={require("../../../../assets/profileicons/Icon-4.png")}
                                />
                                <Text style={{ alignItems: "center", color: "#131313", fontSize: 18, marginLeft: "7%" }}>Sign Out</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

let mapStateToProps = state => {
    return {
        userProfile: state.root.userProfile,
        favShops: state.root.favShops,
        bseUrl: state.root.bseUrl,
    };
};

function mapDispatchToProps(dispatch) {
    return ({
        setFavShops: (shops) => {
            dispatch(setFavShops(shops));
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
