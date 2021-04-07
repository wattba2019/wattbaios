import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

class AppointmentCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { appointments, approved, declined } = this.props
        console.log(appointments, "appointments")

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}
            >
                {
                    (appointments && appointments.length != 0) ? (
                        appointments.map((key, index) => {
                            console.log(key, "INSIDE_MAP")
                            return (
                                <TouchableOpacity key={index}
                                    onPress={() => Actions.AppointmentDetails({ service: key, approved: approved ? approved : null, declined, extraService: key.package === false ? key.requiredExtraServices : null })}
                                >
                                    <View style={{
                                        flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10,
                                        backgroundColor: "#F7F7F7"
                                    }} >
                                        <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80 }}>
                                            {
                                                (key.stylistId && key.stylistId.coverImage != null) ? (
                                                    <Image source={{ uri: key.stylistId.coverImage }} resizeMode="cover"
                                                        style={{ width: 80, height: 80, borderRadius: 20 }}
                                                    />
                                                ) : <Image source={require('../../assets/nophoto.jpg')} resizeMode="cover"
                                                    style={{ width: 80, height: 80, borderRadius: 20 }}
                                                    />
                                            }
                                            <View style={{ marginLeft: 20, justifyContent: "center", }}>
                                                <Text style={{ fontSize: 20 }}>{key.stylistId ? key.stylistId.fullname : "N/a"}</Text>
                                                <Text style={{ fontSize: 15 }}>{key.shopId.businessName}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 1, justifyContent: "center", alignItems: "center", marginTop: 0, width: "100%",
                                        backgroundColor: "white"
                                    }} >
                                        <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>
                                            <View style={{ justifyContent: "center", }}>
                                                <Text style={{ color: "grey" }}>Date</Text>
                                                <Text >{moment(key.bookingDateTime).format("dddd, MMMM Do YYYY")}</Text>
                                                <Text style={{ fontWeight: "bold" }}>{moment(key.bookingHour, ["h:mm A"]).format("h:mm A")}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 1, justifyContent: "center", alignItems: "center", marginTop: 0, width: "100%",
                                        backgroundColor: "white"
                                    }} >
                                        <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>
                                            <View style={{ justifyContent: "center", }}>
                                                <Text style={{ color: "grey" }}>Location</Text>
                                                <Text >{key.shopId.addressLine1}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    ) :
                        <View
                            style={{
                                flex: 1,
                                height: 300,
                                justifyContent: "center",
                                alignItems: "center",
                                // backgroundColor: "red"
                            }}
                        >
                            <Text style={{ color: "grey" }}>There is no data</Text>
                        </View>
                }


            </ScrollView >


        );
    }
}


const styles = StyleSheet.create({
    contentContainer: {
        // flex: 1,
        width: "100%",
        paddingBottom: 40,
        backgroundColor: "white",

    },
});

let mapStateToProps = state => {
    return {
        // str: state.root.str,
        // userDetails: state.root.userDetails,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentCard);

