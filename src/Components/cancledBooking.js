
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import axios from 'axios';

class CancledBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true,
            loader: false,
        }
    }

    UNSAFE_componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
    }

    closeModal = () => {
        this.setState({ isModalVisible: false })
        this.props.closeModal(false)
    }

    deleteBooking(_id) {
        console.log(_id, "IDddddddddddddd")
        if (_id != undefined) {
            this.setState({
                loader: !this.state.loader
            })
            let idsCloneData = {
                _id: _id,
                bookingStatus: "Cancled",
                bookingCancledTime: new Date().getTime(),
                cancledFromCustomer: true
            }
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/bookings/cancledBookingFromCustomer/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: idsCloneData
            }
            axios(options)
                .then(result => {
                    let data = result.data
                    console.log(data, "Delete_Booking")
                    this.setState({
                        loader: !this.state.loader
                    })
                    this.props.closeModal(false)
                    Actions.AppContainer({ rout: "Appointments" })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                    this.setState({
                        loader: !this.state.loader
                    })
                })
        }
    }


    render() {
        const { loader } = this.state
        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>
                    {/* <View style={{ height: this.state.screenHeight / 1.5, justifyContent: 'center', alignItems: "center", }}> */}
                    <View style={{ height: Platform.OS === 'ios' ? "60%" : "70%", justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ backgroundColor: "white", width: "90%", height: "100%", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                            <AntDesign name="delete" style={{ color: 'red', fontWeight: 'bold', fontSize: 50, }} />
                            <Text style={{ textAlign: "center", fontSize: 25 }}>
                                Are you sure?
                            </Text>
                            <Text style={{ textAlign: "center", marginTop: 5, marginHorizontal: "10%", fontSize: 12 }}>
                                If you are cancelling within 24 hours of the time your booking is scheduled for then you will only receive 50% refund of your payment. If you are cancelling outside of 24 hours then we will refund you your payment in full. If you are cancelling within 2 hours you won't be liable for any refund. For any issues contact info@wattba.app
                            </Text>
                            <View
                                style={{ width: "85%", height: 50, marginTop: 25, }}
                            >
                                <View style={{
                                    // backgroundColor: "red",
                                    height: 60,
                                    width: "90%",
                                    marginHorizontal: "5%",
                                    padding: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <TouchableOpacity style={{
                                        width: "35%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#ffff",
                                        borderColor: "#44C062",
                                        borderWidth: 0.5
                                    }}
                                        onPress={() => this.closeModal()}
                                    >
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                                            <Text style={{ fontSize: 12 }}>No, keep it</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{
                                        width: "55%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#ffff",
                                    }}>
                                        <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "flex-end", }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.deleteBooking(this.props._id)
                                                }}
                                                style={{ width: "100%", height: 42, justifyContent: "center", alignItems: "center", backgroundColor: "red", borderRadius: 0 }}>

                                                {
                                                    (loader != true) ? (
                                                        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#ffffff" }}>Yes, cancel it</Text>
                                                    ) : <ActivityIndicator color="#ffffff" />
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
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
        bseUrl: state.root.bseUrl,
        userProfile: state.root.userProfile,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(CancledBooking);

