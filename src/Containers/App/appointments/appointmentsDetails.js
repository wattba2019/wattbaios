import React, { Component } from "react";
import { View, Image, StatusBar, TouchableOpacity, Text, ScrollView, StyleSheet, ActivityIndicator, ImageBackground, Alert, Platform } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import axios from 'axios';
import Textarea from 'react-native-textarea';
import CancledBooking from '../../../Components/cancledBooking';

class AppointmentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedService: [],
            loader: false,
            totalCost: 0,
            star: 4,
            Message: "",
            review: false,
            cancledBooking: false,
        };
    }

    UNSAFE_componentWillMount() {
        const { service } = this.props
        if (service.package === true) {
            this.getBookedPackage(service.requiredServiceId)
        }
        else {
            this.getBookedService(service.requiredServiceId)
        }
        this.checkAlreadyRewiew(service._id)
        this.getVatAndServiceCharge()

    }

    getVatAndServiceCharge() {
        var options = {
            method: 'GET',
            url: `${this.props.bseUrl}/vatandservicecharges/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
        }
        axios(options)
            .then(result => {
                let charges = result.data.data[0]
                console.log(charges, "consoleconsoleconsole")
                this.setState({
                    serviceCharge: Number(charges.serviceCharges),
                    vatCharges: Number(charges.vatCharges),
                })

            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'error_on_getting_vat_and_service_charges', err)
                this.setState({
                    err: error,
                })
            })
    }

    checkAlreadyRewiew(bookingId) {
        // console.log(bookingId, "bookingId")
        let { service } = this.props
        let idsCloneData = { bookingId }
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/review/checkUserBeforeSubmitReview/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: idsCloneData
        }
        axios(options)
            .then(result => {
                let sumbitReview = result.data.submit
                console.log(sumbitReview, result.data, "sumbitReview_console")
                if (sumbitReview) {
                    let onHoursMiliSeconds = 3600000

                    let bookingHour = Number(service.bookingHour)

                    let bookingDate = service.bookingDateTime - 100000

                    let totalHours = bookingHour * onHoursMiliSeconds

                    let dateAndTimeAfter1hours = totalHours + bookingDate + 3600000

                    var currentTimeInMiliSeconds = new Date().getTime();

                    if (currentTimeInMiliSeconds > dateAndTimeAfter1hours) {
                        this.setState({ review: sumbitReview })
                    }
                    else {
                        this.setState({ review: false })
                    }
                    // console.log(bookingDate, dateAndTimeAfter1hours, bookingHour, totalHours, "TIME")
                }
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
            })
    }

    getBookedService(serviceId) {
        let { totalCost } = this.state
        let { service, extraService } = this.props
        console.log(totalCost, service, extraService, "Create_costing")

        // let price = totalCost
        // for (let index = 0; index < service.length; index++) {
        //     let servicePrice = service[index].price;
        //     price = price + Number(servicePrice)
        // }

        // if (extraService.length != 0) {
        //     for (let index = 0; index < extraService.length; index++) {
        //         let extraServicePrice = extraService[index].price;
        //         price = price + Number(extraServicePrice)
        //     }
        // }

        // this.setState({
        //     totalCost: price
        // })


        if (serviceId != undefined) {
            let idsCloneData = { serviceId: serviceId }
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/getNearbyShopServices/NearbyAllShopServicesGetWithId/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: idsCloneData
            }
            axios(options)
                .then(result => {
                    let bookedService = result.data.data
                    console.log(bookedService, "Fetch_Booked_Services")
                    let price = totalCost
                    for (let index = 0; index < bookedService.length; index++) {
                        // const extraServices = bookedService[index].extraServices;
                        const servicePrice = bookedService[index].price;
                        price = price + Number(servicePrice)
                        // console.log(servicePrice, price, "ELEMENT")



                        // if (extraService.length != 0) {
                        //     for (let index = 0; index < extraService.length; index++) {
                        //         const extraPrice = extraService[index].price;
                        //         console.log(extraPrice,"extraPrice")
                        //         price = price + Number(extraPrice)
                        //     }

                        //     // this.setState({
                        //     //     totalCost: price
                        //     // })
                        // }
                        // else {
                        //     this.setState({
                        //         totalCost: price
                        //     })
                        // }
                    }

                    if (extraService.length != 0) {
                        for (let index = 0; index < extraService.length; index++) {
                            const extraPrice = extraService[index].price;
                            price = price + Number(extraPrice)
                            console.log(extraPrice, "extraPrice")
                        }
                    }

                    console.log(price, "Total_Price")
                    this.setState({
                        selectedService: bookedService,
                        totalCost: price

                    })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                })
        }

    }

    getBookedPackage(packageId) {
        let { totalCost } = this.state
        if (packageId != undefined) {
            let idsCloneData = { packageId: packageId }
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/getNearbyShopServices/PackageFindWithId/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: idsCloneData
            }
            axios(options)
                .then(result => {
                    let bookedPackage = result.data.data
                    let price = totalCost
                    // console.log(bookedPackage, "Fetch_Booked_Package")
                    price = price + Number(bookedPackage[0].price)
                    this.setState({
                        selectedService: bookedPackage,
                        totalCost: price
                    })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                })
        }
    }

    deleteBooking(_id) {
        // if (_id != undefined) {
        //     this.setState({
        //         loader: !this.state.loader
        //     })
        //     let idsCloneData = { _id: _id }
        //     var options = {
        //         method: 'POST',
        //         url: `${this.props.bseUrl}/bookings/deleteBooking/`,
        //         headers:
        //         {
        //             'cache-control': 'no-cache',
        //             "Allow-Cross-Origin": '*',
        //         },
        //         data: idsCloneData
        //     }
        //     axios(options)
        //         .then(result => {
        //             let data = result.data
        //             console.log(data, "Delete_Booking")
        //             this.setState({
        //                 loader: !this.state.loader
        //             })
        //             Actions.AppContainer({ rout: "Appointments" })
        //         })
        //         .catch(err => {
        //             let error = JSON.parse(JSON.stringify(err))
        //             console.log(error, 'ERRROR', err)
        //             this.setState({
        //                 loader: !this.state.loader
        //             })
        //         })
        // }

        this.setState({
            cancledBooking: true
        })


        // if (_id != undefined) {
        //     this.setState({
        //         loader: !this.state.loader
        //     })
        //     let idsCloneData = {
        //         _id: _id,
        //         bookingStatus: "Cancled",
        //         bookingCancledTime: new Date().getTime(),
        //         cancledFromCustomer: true
        //     }
        //     var options = {
        //         method: 'POST',
        //         url: `${this.props.bseUrl}/bookings/cancledBookingFromCustomer/`,
        //         headers:
        //         {
        //             'cache-control': 'no-cache',
        //             "Allow-Cross-Origin": '*',
        //         },
        //         data: idsCloneData
        //     }
        //     axios(options)
        //         .then(result => {
        //             let data = result.data
        //             console.log(data, "Delete_Booking")
        //             this.setState({
        //                 loader: !this.state.loader
        //             })
        //             Actions.AppContainer({ rout: "Appointments" })
        //         })
        //         .catch(err => {
        //             let error = JSON.parse(JSON.stringify(err))
        //             console.log(error, 'ERRROR', err)
        //             this.setState({
        //                 loader: !this.state.loader
        //             })
        //         })
        // }
    }

    submitReview() {
        const { Message, star } = this.state
        const { service, userProfile } = this.props
        if (Message != "") {
            this.setState({
                loader: !this.state.loader
            })
            let idsCloneData = {
                userId: userProfile._id,
                serviceId: service.requiredServiceId,
                shopId: service.shopId._id,
                bookingId: service._id,
                rating: star,
                comment: Message,
            }
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/review/addReview/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: idsCloneData
            }
            axios(options)
                .then(result => {
                    let submitReview = result.data
                    console.log(submitReview, "Submit_rewiew")
                    this.updateReviewInShops(service.shopId._id)
                })
                .catch(err => {
                    this.setState({
                        loader: !this.state.loader
                    })
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                })
        }
        else {
            Alert.alert("Please type review")
        }
    }

    updateReviewInShops(shopId) {
        console.log(shopId, "shopId")
        let urlm = `${this.props.bseUrl}/review/getAllReviewsAndUpdateInShop/${shopId}`
        axios({
            method: 'get',
            url: urlm,
        })
            .then(result => {
                let data = result.data.result
                console.log(data, "DATA_FROM_API_REVIEW")
                Alert.alert("Review Submited")
                this.setState({ loader: !this.state.loader })
                Actions.AppContainer({ rout: "Appointments" })
            })
            .catch(err => {
                this.setState({ loader: !this.state.loader })
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_REVIEW")
                }
                else {
                    alert(err.response.data.message)
                }

            })
    }

    render() {
        const { service, approved, extraService } = this.props
        const { selectedService, totalCost, loader, star, Message, review, serviceCharge, vatCharges } = this.state
        console.log(serviceCharge, vatCharges, totalCost, "Srvice_Charges")
        return (
            <View style={{
                flex: 1,
                width: "100%",
                // alignItems: "center",
                backgroundColor: "white",
            }} >
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                {/* {
                    (this.state.cancledBooking === true) ? (
                        <CancledBooking />
                    ) : null
                } */}

                {
                    (this.state.cancledBooking === true) ? (
                        <CancledBooking _id={service._id} closeModal={(data) => {
                            this.setState({
                                cancledBooking: data
                            })
                        }} />
                    ) : null
                }

                {/* header */}

                < View style={{
                    flex: 0.6,
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    marginTop: Platform.OS === 'ios' ? 30 : 0
                }}>
                    <View style={{ position: "absolute", zIndex: 1 }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <AntDesign name="arrowleft" style={{ marginLeft: 15, color: "#000000", fontSize: 25 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{ alignItems: "center", color: "#000000", fontSize: 18 }}>Appointment Details</Text>
                    </View>

                </View >


                <View style={{
                    flex: 8,
                    width: "100%",
                    marginTop: 10
                }}>
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                    >

                        <View style={{ width: "90%", marginHorizontal: "5%" }}>
                            <View style={{
                                flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10,
                                backgroundColor: "#F7F7F7"
                            }} >
                                <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80 }}>
                                    {
                                        (service.stylistId && service.stylistId.coverImage != null) ? (
                                            <Image source={{ uri: service.stylistId.coverImage }} resizeMode="cover"
                                                style={{ width: 80, height: 80, borderRadius: 20 }}
                                            />
                                        ) : <Image source={require('../../../../assets/nophoto.jpg')} resizeMode="cover"
                                            style={{ width: 80, height: 80, borderRadius: 20 }}
                                            />
                                    }
                                    <View style={{ marginLeft: 20, justifyContent: "center", }}>
                                        <Text style={{ fontSize: 20 }}>{service.stylistId ? service.stylistId.fullname : "N/a"}</Text>
                                        <Text style={{ fontSize: 15 }}>{service.shopId.businessName}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20, width: "100%",
                                backgroundColor: "white"
                            }} >
                                <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 30, height: 30 }}
                                            source={require("../../../../assets/calendar.png")}
                                        />
                                        <View style={{ marginLeft: 20 }}>
                                            <Text >{moment(service.bookingDateTime).format("dddd, MMMM Do YYYY")}</Text>
                                            <View style={{ flexDirection: "row", }}>
                                                <Text style={{ fontWeight: "bold" }}>{moment(service.bookingHour, ["h:mm A"]).format("h:mm A")}</Text>
                                                {
                                                    (service.bookingStatus === "Complete") ? (
                                                        <Text style={{ fontWeight: "bold", marginLeft: 10, color: "green" }}>{service.bookingStatus}</Text>
                                                    ) : null
                                                }
                                                {
                                                    (service.bookingStatus === "Approved") ? (
                                                        <Text style={{ fontWeight: "bold", marginLeft: 10, color: "green" }}>{service.bookingStatus}</Text>
                                                    ) : null
                                                }
                                                {
                                                    (service.bookingStatus === "Cancled") ? (
                                                        <Text style={{ fontWeight: "bold", marginLeft: 10, color: "red" }}>{service.bookingStatus}</Text>
                                                    ) : null
                                                }
                                                {
                                                    (service.bookingStatus === "Pending") ? (
                                                        <Text style={{ fontWeight: "bold", marginLeft: 10, color: "orange" }}>{service.bookingStatus}</Text>
                                                    ) : null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20, width: "100%",
                                backgroundColor: "white"
                            }} >
                                <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 30, height: 30 }}
                                            source={require("../../../../assets/Path27909.png")}
                                        />
                                        <View style={{ marginLeft: 20 }}>
                                            <Text >{service.shopId.addressLine1}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20, width: "100%",
                                backgroundColor: "white"
                            }} >
                                <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 30, height: 30 }}
                                            source={require("../../../../assets/iconPrice.png")}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 20, flex: 7, flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                        {/* <Text >Fees</Text> */}
                                        <Text style={{ alignItems: "center", fontWeight: "bold", fontSize: 16 }}>{Number((totalCost / 100 * (serviceCharge + vatCharges)) + Number(totalCost)).toFixed(2)} GBP</Text>
                                        {/* <Text >{totalCost} GBP</Text> */}
                                    </View>
                                </View>
                            </View>

                            <Text style={{ marginTop: 20 }}>Service Details</Text>

                            {
                                (selectedService.length) ? (
                                    selectedService.map((key, index) => {
                                        return (
                                            <View key={index}
                                                style={{
                                                    flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20, width: "100%",
                                                    backgroundColor: "white"
                                                }}
                                            >
                                                {
                                                    service.package != true ?
                                                        <>
                                                            <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>
                                                                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                                                    <View style={{ marginLeft: 0 }}>
                                                                        <Text style={{ fontWeight: "bold", color: "#A3B8CB" }}>Service</Text>
                                                                        <Text >{key.serviceName}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>

                                                            {/* {
                                                                (key.extraServices.length != 0) ? (
                                                                    <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>
                                                                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                                                            <View style={{ marginLeft: 0 }}>
                                                                                <Text style={{ fontWeight: "bold", color: "#A3B8CB" }}>Extra Service</Text>
                                                                                {
                                                                                    key.extraServices.map((keys, index) => {
                                                                                        return (
                                                                                            <Text key={index} >{keys.serviceName}</Text>
                                                                                        )
                                                                                    })}
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                ) : null
                                                            } */}

                                                            {
                                                                (extraService.length != 0) ? (
                                                                    <View style={{ flex: 1, width: "90%", flexDirection: "row", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>
                                                                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                                                            <View style={{ marginLeft: 0 }}>
                                                                                <Text style={{ fontWeight: "bold", color: "#A3B8CB" }}>Extra Service</Text>
                                                                                {
                                                                                    extraService.map((keys, index) => {
                                                                                        return (
                                                                                            <Text key={index} >{keys.serviceName}</Text>
                                                                                        )
                                                                                    })}
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                ) : null
                                                            }

                                                        </>
                                                        : <View style={{ flex: 1, width: "90%", flexDirection: "row", borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5, padding: 8 }}>
                                                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                                                <View style={{ marginLeft: 0 }}>
                                                                    <Text style={{ fontWeight: "bold", color: "#A3B8CB" }}>Package</Text>
                                                                    <Text>{key.packageName}</Text>
                                                                    <Text>{key.packageDescription}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                }
                                            </View>
                                        )
                                    })
                                ) : <ActivityIndicator color="orange" />
                            }
                            {
                                approved && review && <>
                                    <Text style={{ marginTop: 20 }}>Review</Text>
                                    <View
                                        style={{
                                            flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20, width: "100%", height: 200,
                                            backgroundColor: "white"
                                        }}
                                    >
                                        <View style={{ flex: 1, width: "90%", justifyContent: "center", alignItems: "center", height: 80, borderBottomColor: "#EFEFF4", borderBottomWidth: 0.5 }}>

                                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                                {[1, 2, 3, 4, 5].map((v, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.setState({ star: i + 1 })}
                                                            key={i}>
                                                            <AntDesign
                                                                name={star > i ? "star" : "staro"}
                                                                size={25}
                                                                style={{ margin: 8, color: "#FFA601", fontSize: 25 }} />
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>


                                            <View style={{ flexDirection: "row", marginBottom: 10, height: 120, justifyContent: "space-between", marginTop: 10, borderColor: "#D4D4E0", borderWidth: 0.5, borderRadius: 5 }}>
                                                <View style={{ flex: 1, borderTopRightRadius: 5, borderBottomRightRadius: 5, justifyContent: "center", }}>
                                                    <View style={styles.container}>
                                                        <Textarea
                                                            containerStyle={styles.textareaContainer}
                                                            style={styles.textarea}
                                                            onChangeText={(Message) => this.setState({ Message })}
                                                            defaultValue={Message}
                                                            maxLength={100}
                                                            placeholder={'Write Review'}
                                                            underlineColorAndroid={'transparent'}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            }
                            {
                                !approved && loader != true ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.deleteBooking(service._id)
                                        }}
                                        style={{
                                            backgroundColor: "red",
                                            height: 40, marginTop: 20,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 35
                                        }}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>Cancel Booking</Text>
                                    </TouchableOpacity> :

                                    (!approved) ? (
                                        <View
                                            style={{
                                                backgroundColor: "red",
                                                height: 35, marginTop: 20,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 35
                                            }}>
                                            <ActivityIndicator color="white" />
                                        </View>
                                    ) :
                                        review && <TouchableOpacity style={{
                                            marginTop: 10,
                                            // backgroundColor: "red",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                            onPress={() => this.submitReview()}
                                        >
                                            <ImageBackground source={require('../../../../assets/buttonBackground.png')} resizeMode="contain"
                                                style={{ height: 50, width: 300, justifyContent: "center", alignItems: "center" }}
                                            >
                                                {
                                                    !loader ? <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Submit Review</Text> :
                                                        <ActivityIndicator color="white" />
                                                }
                                            </ImageBackground>
                                        </TouchableOpacity>
                            }
                        </View>
                    </ScrollView>
                </View>
            </View >
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
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetails);

const styles = StyleSheet.create({
    contentContainer: {
        // flex: 1,
        width: "100%",
        paddingBottom: 40,
        // backgroundColor: "white",
        backgroundColor: "#F6F6F6"

    },
    textareaContainer: {
        height: 100,
        padding: 5,
        // backgroundColor: 'rgba(52, 52, 52, .1)',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: 'black',
    },
});