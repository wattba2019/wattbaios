import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Linking, Platform,
    ScrollView, Image, SafeAreaView, ActivityIndicator, Modal, BackHandler
} from 'react-native';
import { connect } from "react-redux";
import { Tabs, Tab, TabHeading } from 'native-base';
import About from '../shop/about';
import Services from '../shop/services';
import Gallery from '../shop/gallery';
import Review from '../shop/Review';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import { setShopServices, setStylists, setWorkingHour, setGallery, setSpecialPack, setShop, setFavShops } from '../../Store/Action/action';
import axios from 'axios';
import moment from 'moment';
import handleGetDirections from '../getdirectiononmap';
import ImageViewer from 'react-native-image-zoom-viewer';

class shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialPage: 0,
            activeColor: "about",
            workingtime: false,
            favroiteShops: [],
            favroite: false,
            favroiteLoader: true,
            busy: true,
            fullImage: false
        }
    }

    componentDidMount() {
        this.getWorkingHours()
        this.getGallery()
        this.getStylists()
        this.getServices()
        this.getSpecialPack()
        this.getFavShops()
        this.props.setShop(this.props.shop)
    }

    getMultipleShopWithId(shopid) {
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
                Actions.AppContainer()
                this.setState({
                    err: error,
                })
            })

    }

    getFavShops(update) {
        let urlm = `${this.props.bseUrl}/favorites/${this.props.userProfile._id}`
        axios({
            method: 'get',
            url: urlm,
        })
            .then(result => {
                let data = result.data.data[0].favrouiteIds
                this.props.setFavShops(data)
                this.setState({ favroiteShops: data })
                console.log(data, "DATA_FROM_API_FAVORITES")
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if (element === this.props.shop._id) {
                        this.setState({ favroite: true, favroiteLoader: false })
                        console.log(element, "Current_Shope")
                    }
                    else {
                        this.setState({ favroiteLoader: false })
                    }
                }
                this.setState({ favroiteLoader: false })
                if (this.props.route === "favroites" && update) {
                    console.log(data, "data")
                    this.getMultipleShopWithId(data)
                }
            })
            .catch(err => {
                this.setState({ favroiteLoader: false })
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_Fav")
                }
                else {
                    alert(err.response.data.message)
                }
            })

    }

    favroiteAdd() {
        const { favroite, favroiteShops } = this.state
        let clonefavshop = favroiteShops

        if (clonefavshop.indexOf(this.props.shop._id) == -1) {
            clonefavshop.push(this.props.shop._id)
            this.setState({ favroiteShops: clonefavshop })
        }
        else {
            var indexNumber = clonefavshop.indexOf(this.props.shop._id);
            console.log(indexNumber, "INDEX")
            clonefavshop.splice(indexNumber, 1);
            this.setState({ favroiteShops: clonefavshop })
        }
        this.setState({ favroite: !favroite })
        let favData = {
            favrouiteIds: clonefavshop,
            userId: this.props.userProfile._id,
        }
        console.log(favData, "CLONEDATA")
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/favorites/addFavroite`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: favData
        };
        axios(options)
            .then(result => {
                let data = result.data
                console.log(data, "save_favrouites")
                this.getFavShops("add")
            })
            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_SAVE_FAV")
                }
                else {
                    alert(err.response.data.message)
                }
            })

    }

    getStylists() {
        let urlm = `${this.props.bseUrl}/stylist/${this.props.shop._id}`
        axios({ method: 'get', url: urlm, })
            .then(result => {
                let data = result.data.data
                // console.log(data, "DATA_FROM_API_STYLISTS")
                this.setState({
                    stylists: data
                })
                this.props.setStylists(data)
            })

            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_GALLERY")
                }
                else {
                    alert(err.response.data.message)
                }
            })

    }

    getGallery() {
        let urlMgalleryget = `${this.props.bseUrl}/galleryget/${this.props.shop._id}`
        axios({
            method: 'get',
            url: urlMgalleryget,
        })
            .then(result => {
                let data = result.data.data
                // console.log(data, "DATA_FROM_API_GALLERY")
                this.setState({
                    gallery: data,
                })
                this.props.setGallery(data)
            })
            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_GALLERY")
                }
                else {
                    alert(err.response.data.message)
                }
            })
    }

    getTimeAccordingToRequiredFormat(start, end) {
        var startTime = moment(start, 'HH:mm a');
        var endTime = moment(end, 'HH:mm a');
        var timeStops = [];
        var startFormat = new moment(startTime).format('HH:mm a')
        startFormat = startFormat.substring(0, startFormat.length - 3)
        var endFormat = new moment(endTime).format('HH:mm a')
        endFormat = endFormat.substring(0, endFormat.length - 3)
        timeStops.push(startFormat);
        timeStops.push(endFormat);
        return timeStops;
    }

    getWorkingHours() {
        let urlMgetworkinghours = `${this.props.bseUrl}/workinghours/${this.props.shop._id}`
        axios({
            method: 'get',
            url: urlMgetworkinghours,
        })
            .then(result => {
                let data = result.data.workingHours
                var d = new Date();
                var weekday = new Array(7);
                weekday[0] = "sunday";
                weekday[1] = "monday";
                weekday[2] = "tuesday";
                weekday[3] = "wednesday";
                weekday[4] = "thursday";
                weekday[5] = "friday";
                weekday[6] = "saturday";
                let day = weekday[d.getDay()];

                let shopStatus = data[day].open;
                let shopOpenTime = data[day].openTimings;
                let shopCloseTime = data[day].closingTime;
                var time = new Date().toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: false });
                let returnValue = this.getTimeAccordingToRequiredFormat(shopOpenTime, shopCloseTime);
                let workingtime = false;

                if (shopStatus === true) {
                    if (returnValue[0] < time && returnValue[1] > time) {
                        console.log("STATUS_OPEN", data.switchButton)
                        workingtime = true
                        this.setState({
                            busy: data.switchButton
                        })
                    }
                    else {
                        console.log("STATUS_CLOSE", data)
                        workingtime = false
                    }
                }

                let workingHoursArr = []
                workingHoursArr.push(data.monday)
                workingHoursArr.push(data.tuesday)
                workingHoursArr.push(data.wednesday)
                workingHoursArr.push(data.thursday)
                workingHoursArr.push(data.friday)
                workingHoursArr.push(data.saturday)
                workingHoursArr.push(data.sunday)

                console.log(workingtime, shopStatus, "workingtime")

                this.setState({
                    workingtime: workingtime,
                    workingHours: workingHoursArr,
                })
                this.props.setWorkingHour(data)
            })
            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_WORKING_HOURS")
                }
                else {
                    alert(err.response.data.message)
                }
            })

    }

    getServices() {
        let urlm = `${this.props.bseUrl}/servicesget/${this.props.shop._id}`
        axios({
            method: 'get',
            url: urlm,
        })
            .then(result => {
                let data = result.data.data
                // console.log(data, "DATA_FROM_API_SERVICES")
                this.setState({
                    services: data,
                })
                this.props.setShopServices(data)
            })
            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_SERVICES")
                    this.props.setShopServices([])
                }
                else {
                    alert(err.response.data.message)
                }
            })
    }

    getSpecialPack() {
        let urlMpackagesget = `${this.props.bseUrl}/packagesandoffersget/${this.props.shop._id}`
        axios({
            method: 'get',
            url: urlMpackagesget,
        })
            .then(result => {
                let data = result.data.data
                // console.log(data, "DATA_FROM_API_SPECIAL_PACK")
                this.setState({
                    packages: data,
                })
                this.props.setSpecialPack(data)
            })
            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_PACKAGES")
                }
                else {
                    alert(err.response.data.message)
                }
            })
    }

    activeColor(key) {
        if (key.ref.key == ".0") {
            this.setState({
                activeColor: "about"
            })
        }
        if (key.ref.key == ".1") {
            this.setState({
                activeColor: "services"
            })
        }
        if (key.ref.key == ".2") {
            this.setState({
                activeColor: "gallery"
            })
        }
        if (key.ref.key == ".3") {
            this.setState({
                activeColor: "review"
            })
        }
    }

    render() {
        const { fullImage, activeColor, workingtime, workingHours, services, packages, stylists, gallery, favroite, favroiteLoader, initialPage } = this.state
        let { shop, currentLocation } = this.props
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.container} >
                    {
                        (shop && shop.coverImage != null) ? (
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    fullImage: !fullImage
                                })
                            }}>
                                <Image source={{ uri: shop.coverImage }} resizeMode="cover"
                                    // style={{ width: "100%", height: "250" }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                        ) :
                            <TouchableOpacity>
                                <Image source={require('../../../assets/nophoto.jpg')}
                                    resizeMode="cover"
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                    }

                    {
                        (shop.coverImage != null && fullImage) ? (
                            <Modal visible={fullImage} transparent={true}>
                                <ImageViewer imageUrls={[{
                                    url: shop.coverImage,
                                }
                                ]} />
                                <TouchableOpacity style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => {
                                    this.setState({
                                        fullImage: !fullImage
                                    })
                                }}>
                                    <Text>BACK TO SHOP</Text>
                                </TouchableOpacity>
                            </Modal>
                        ) : null
                    }

                    <TouchableOpacity onPress={() => Actions.pop()}
                        style={{ width: 35, position: 'absolute', top: 0, left: 30, right: 0, bottom: 130, justifyContent: "center", }}>
                        <Ionicons name="ios-arrow-back" style={{
                            color: "#fff", fontWeight: 'bold', fontSize: 28, marginLeft: "5%",
                            shadowColor: "#000",
                            shadowColor: "#000",
                            textShadowColor: 'black',
                            textShadowOffset: { width: 5, height: 2 },
                            textShadowRadius: 10, left: 0,
                        }} />
                    </TouchableOpacity>

                    <View style={{
                        width: 230,
                        position: 'absolute', top: Platform.OS === 'ios' ? "65%" : "35%", left: 30, right: 0, bottom: 0, justifyContent: "center",
                        // padding: 10,
                        // backgroundColor: "red"
                    }}>
                        <Text style={{
                            color: "#fff", fontSize: 18, marginLeft: "3%",
                            shadowColor: "#000",
                            textShadowColor: 'black',
                            textShadowOffset: { width: -1, height: 0 },
                            textShadowRadius: 5,
                        }}>{shop.businessName}</Text>
                        <Text style={{
                            color: "#fff", fontSize: 14, marginLeft: "3%",
                            shadowColor: "#000",
                            textShadowColor: 'black',
                            textShadowOffset: { width: -1, height: 0 },
                            textShadowRadius: 5,
                        }}>{shop.addressLine1}</Text>
                    </View>

                    <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? "100%" : "80%", left: 30, bottom: 0, marginTop: 5, justifyContent: "center", flexDirection: "row", marginLeft: "1%", }}>
                        {[1, 2, 3, 4, 5].map((v, i) => {
                            return (
                                <View key={i}>
                                    <Entypo
                                        name={shop.review > i ? "star" : "star-outlined"}
                                        style={{
                                            color: "#EBAC43", fontSize: 16,
                                            shadowColor: "#000",
                                            textShadowColor: 'black',
                                            textShadowOffset: { width: -1, height: 0 },
                                            textShadowRadius: 5,
                                        }} />
                                </View>
                            )
                        })}
                    </View>

                    <TouchableOpacity
                        onPress={
                            () => {
                                this.favroiteAdd()
                            }
                        }
                        style={{
                            borderColor: "#FD6958",
                            borderWidth: 1,
                            borderRadius: 4,
                            justifyContent: "center",
                            alignItems: "center", position: 'absolute', right: 20, bottom: 20, height: 30, width: 65, justifyContent: "center",
                            shadowColor: "#000",
                            shadowColor: "#000",
                            textShadowColor: 'black',
                            textShadowOffset: { width: -1, height: 0 },
                            textShadowRadius: 5,
                            // bottom: "25%"
                        }}
                    >
                        {
                            (favroiteLoader === false) ? (
                                (favroite) ?
                                    (
                                        <Entypo name="heart" style={{ color: "#FD6958", fontWeight: 'bold', fontSize: 28 }} />
                                    )
                                    :
                                    <Entypo name="heart-outlined" style={{ color: "#FD6958", fontWeight: 'bold', fontSize: 28 }} />

                            ) : <ActivityIndicator color="#FD6958" />
                        }
                    </TouchableOpacity>

                    {/* {
                        (workingtime === true) ? (
                            (this.state.busy === false) ? (
                                <View style={{ borderColor: "#FFF600", borderWidth: 1, borderRadius: 4, justifyContent: "center", alignItems: "center", position: 'absolute', right: 20, bottom: 20, height: 30, width: 65, justifyContent: "center" }}>
                                    <Text style={{ color: "#FFF600", fontSize: 14 }}>Busy</Text>
                                </View>
                            ) :
                                <View style={{ borderColor: "#16BE4E", borderWidth: 1, borderRadius: 4, justifyContent: "center", alignItems: "center", position: 'absolute', right: 20, bottom: 20, height: 30, width: 65, justifyContent: "center" }}>
                                    <Text style={{ color: "#16BE4E", fontSize: 14 }}>Open</Text>
                                </View>
                        ) :
                            // (this.state.busy) ? (
                            //     <View style={{ borderColor: "#FFF600", borderWidth: 1, borderRadius: 4, justifyContent: "center", alignItems: "center", position: 'absolute', right: 20, bottom: 20, height: 30, width: 65, justifyContent: "center" }}>
                            //         <Text style={{ color: "#FFF600", fontSize: 14 }}>Busy</Text>
                            //     </View>
                            // ) :
                            <View style={{ borderColor: "red", borderWidth: 1, borderRadius: 4, justifyContent: "center", alignItems: "center", position: 'absolute', right: 20, bottom: 20, height: 30, width: 65, justifyContent: "center" }}>
                                <Text style={{ color: "red", fontSize: 14 }}>Close</Text>
                            </View>
                    } */}

                </SafeAreaView>

                <View style={{ flex: 0.65, backgroundColor: "#fff" }}>

                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {/* <View > */}

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: "10%",
                            paddingVertical: "5%",
                            // backgroundColor: "red"
                        }}>
                            <TouchableOpacity
                                style={{ height: 50, }}
                                onPress={() => Linking.openURL("https://" + shop.websiteUrl)}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../assets/Group55286.png")}
                                    style={{ width: 45, height: 45 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: 50, }}
                                onPress={() => handleGetDirections(shop, currentLocation)}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../assets/Group55287.png")}
                                    style={{ width: 45, height: 45 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: 50, }}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../assets/Group55288.png")}
                                    style={{ width: 45, height: 45 }}
                                />
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                                style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}
                            >
                                <Ionicons name="ios-heart" style={{ color: "#FD6958", fontWeight: 'bold', fontSize: 28 }} />
                                <Text style={{ color: "#707070", fontSize: 12 }}>Favorite</Text>
                            </TouchableOpacity> */}
                        </View>
                        {
                            (stylists) ? (
                                <View style={{
                                    paddingHorizontal: 35
                                }}>
                                    <View>
                                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Stylist</Text>
                                    </View>
                                </View>
                            ) : null
                        }

                        <ScrollView horizontal
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsHorizontalScrollIndicator={false}
                            style={{
                                marginVertical: 15,
                                width: "100%",
                                // backgroundColor: "orange"
                            }}>

                            {
                                (stylists) ? (
                                    stylists.map((key, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={{
                                                height: 120,
                                                width: 110,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                                onPress={() => Actions.BarberDetails({ barberDetails: key, shop: shop, workingHours: workingHours })}
                                            >
                                                <View style={{
                                                    height: 75,
                                                    width: 75,
                                                    borderRadius: 50,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: "white",
                                                    borderColor: "#FD6958",
                                                    borderWidth: 1.80,
                                                    overflow: "hidden"
                                                }}>
                                                    {(key.coverImage != null) ? (
                                                        <Image source={{ uri: key.coverImage }} resizeMode="cover"
                                                            style={{
                                                                width: "90%", height: "90%",
                                                                borderRadius: 50
                                                            }}
                                                        />
                                                    ) : <Image source={require('../../../assets/nophoto.jpg')} resizeMode="cover"
                                                        style={{
                                                            width: "90%", height: "90%",
                                                            borderRadius: 50
                                                        }}
                                                        />}
                                                </View>
                                                <Text style={{ marginTop: 5, fontSize: 10, color: "#000000", textAlign: "right", }}>{key.fullname}</Text>
                                                <Text style={{ marginTop: 0, fontSize: 10, color: "#8E8E93", textAlign: "right", }}>{key.designation}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                ) :
                                    <TouchableOpacity style={{
                                        height: 120,
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // backgroundColor: "red"
                                    }}
                                    >
                                        <ActivityIndicator size="large" color="#FD6958" />
                                        <Text style={{ marginTop: 5, fontSize: 10, color: "#000000", textAlign: "right", }}>Loading...</Text>
                                    </TouchableOpacity>
                            }
                        </ScrollView>

                        <Tabs
                            // initialPage={initialPage}
                            // page={initialPage}
                            // page={initialPage}
                            // ref="mytabs"
                            tabContainerStyle={{ height: 60 }}
                            onChangeTab={(key) => this.activeColor(key)}
                            locked={true}
                            tabBarUnderlineStyle={{ backgroundColor: '#FD6958' }}
                        >
                            {/* //About// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: "white" }}
                                    >
                                        <Text style={{ color: activeColor === "about" ? "#FD6958" : "black" }}>About</Text>
                                    </TabHeading>}
                            >
                                <About shop={shop} busy={this.state.busy} workingHours={workingHours} gallery={gallery} viewAll={this.viewAll} />
                            </Tab>

                            {/* //Services// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: "white" }}
                                    >
                                        <Text style={{ color: activeColor === "services" ? "#FD6958" : "black" }}>Services</Text>
                                    </TabHeading>
                                }
                            >
                                <View>
                                    <Services shop={shop} busy={this.state.busy} services={services} packages={packages} />
                                </View>
                            </Tab>

                            {/* //Gallery// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: "white" }}
                                    >
                                        <Text style={{ color: activeColor === "gallery" ? "#FD6958" : "black" }}>Photos</Text>
                                    </TabHeading>
                                }
                            >
                                <View>
                                    <Gallery shop={shop} gallery={gallery} />
                                </View>
                            </Tab>

                            {/* //Review// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: "white" }}
                                    >
                                        <Text style={{ color: activeColor === "review" ? "#FD6958" : "black" }}>Review</Text>
                                    </TabHeading>
                                }
                            >
                                <View>
                                    <Review shop={shop} />
                                </View>
                            </Tab>
                        </Tabs>



                    </ScrollView>



                </View>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 60,
        backgroundColor: "white",

    },
    container: {
        flex: 0.35,
        backgroundColor: "white"
    },
});



let mapStateToProps = state => {
    return {
        bseUrl: state.root.bseUrl,
        userProfile: state.root.userProfile,
        currentLocation: state.root.currentLocation,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setShopServices: (services) => {
            dispatch(setShopServices(services))
        },
        setStylists: (stylist) => {
            dispatch(setStylists(stylist))
        },
        setWorkingHour: (workingHours) => {
            dispatch(setWorkingHour(workingHours))
        },
        setGallery: (gallery) => {
            dispatch(setGallery(gallery))
        },
        setSpecialPack: (specialPack) => {
            dispatch(setSpecialPack(specialPack))
        },
        setShop: (shop) => {
            dispatch(setShop(shop))
        },
        setFavShops: (shop) => {
            dispatch(setFavShops(shop))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(shop);

