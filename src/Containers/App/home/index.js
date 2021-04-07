import React, { Component } from "react";
import {
    View, Image, StyleSheet, TouchableOpacity, Text,
    TextInput, ScrollView, Alert, RefreshControl,
    ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { setNearByShops, } from "../../../Store/Action/action";
import axios from 'axios';
//icons import
import AntDesign from 'react-native-vector-icons/AntDesign';
import InfiniteScroll from 'react-native-infinite-scroll';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloader: false,
            search: [],
            allServicesNames: [],
            nearByShops: [],
            bestBarberShops: [],
            packages: [],
            //barbers
            Haircut: [],
            Style: [],
            Hair_Color: [],
            Shave: [],
            Children_Haircut: [],
            Wax: [],
            //saloon
            Ladies_Haircuts: [],
            Blow_Dry: [],
            Hair_Coloring: [],
            Mens_Haircuts: [],
            Styling: [],
            Treatments: [],
            Bridal_And_Weding: [],
            //spa
            Nails: [],
            Brows_Lashes: [],
            Waxing: [],
            Body_Treatment: [],
            Hair_Treatments: [],
            Tanning: [],
            Mens_Grooming: [],
            More: [],
        };
    }

    UNSAFE_componentWillMount() {
        this.getNeabyShops()
        this.getAllServices()
    }

    distance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        // if (d > 1) return Math.round(d) + " km";
        // else if (d <= 1) return Math.round(d * 1000) + "m";
        return d;
    }

    getNeabyShops() {
        const { currentLocation, businessType } = this.props
        if (currentLocation != null) {
            this.setState({ isloader: true })
            let cloneLocation = {
                lat: currentLocation.coords.latitude,
                long: currentLocation.coords.longitude,
                km: 5,
            }
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/getallshops/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneLocation
            }
            axios(options)
                .then(result => {
                    let nearByShops1 = result.data.data
                    let nearByShops = []
                    let filterdAccordingToBusinessType = []
                    for (let index = 0; index < nearByShops1.length; index++) {
                        const element = nearByShops1[index];
                        const lat = nearByShops1[index].location.coordinates[0];
                        const lng = nearByShops1[index].location.coordinates[1];
                        element.distance = this.distance(lat, lng, currentLocation.coords.latitude, currentLocation.coords.longitude)
                        nearByShops.push(element)
                    }
                    nearByShops = nearByShops.sort((a, b) => a.distance - b.distance)
                    //for business type barberShop soorting
                    if (nearByShops.length && businessType === "barberShop") {
                        for (let index = 0; index < nearByShops.length; index++) {
                            const element = nearByShops[index];
                            const businessTypeClone = nearByShops[index].businessType;
                            if (businessTypeClone === "Barbershop" ||
                                businessTypeClone === "Barbershop + Salon" ||
                                businessTypeClone === "Barbershop + Beauty Salons, Spas & Other" ||
                                businessTypeClone === "Salons + Barbershop + Spa/Other") {
                                filterdAccordingToBusinessType.push(element)
                            }
                        }
                    }
                    //for business type saloon soorting
                    if (nearByShops.length && businessType === "saloon") {
                        for (let index = 0; index < nearByShops.length; index++) {
                            const element = nearByShops[index];
                            const businessTypeClone = nearByShops[index].businessType;
                            if (businessTypeClone === "Salons" ||
                                businessTypeClone === "Barbershop + Salon" ||
                                businessTypeClone === "Salons + Beauty Salons, Spas & Otherr" ||
                                businessTypeClone === "Salons + Barbershop + Spa/Other") {
                                filterdAccordingToBusinessType.push(element)
                            }
                        }
                    }
                    //for business type beautySaloon soorting
                    if (nearByShops.length && businessType === "beautySaloon") {
                        for (let index = 0; index < nearByShops.length; index++) {
                            const element = nearByShops[index];
                            const businessTypeClone = nearByShops[index].businessType;
                            if (businessTypeClone === "Beauty Salons, Spas & Other" ||
                                businessTypeClone === "Salons + Beauty Salons, Spas & Other" ||
                                businessTypeClone === "Barbershop + Beauty Salons, Spas & Other" ||
                                businessTypeClone === "Salons + Barbershop + Spa/Other") {
                                filterdAccordingToBusinessType.push(element)
                            }
                        }
                    }
                    this.props.setNearByShops(filterdAccordingToBusinessType)
                    this.setState({
                        nearByShops: filterdAccordingToBusinessType,
                        isloader: false,
                    })
                    this.getBestBarbershops()
                    this.getNearbyPackages(nearByShops)
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                    this.setState({
                        err: error,
                        isloader: false,
                    })
                })

        }
    }

    getBestBarbershops() {
        let { nearByShops } = this.state
        let sortedShops = []
        if (nearByShops) {
            for (let index = 0; index < nearByShops.length; index++) {
                const element = nearByShops[index];
                const review = nearByShops[index].review;
                if (review != "No rating") {
                    sortedShops.push(element)
                }
            }
            const ratingSorting = sortedShops.sort((a, b) => b.review - a.review)
            this.setState({ bestBarberShops: ratingSorting })
        }
    }


    getNearbyPackages(nearByShops) {
        const { businessType } = this.props
        // const fiveStarRatingShops = nearByShops.filter(nearByShops => nearByShops.review === "5");
        let shopIds = []
        for (let index = 0; index < nearByShops.length; index++) {
            const element = nearByShops[index]._id;
            shopIds.push(element)
        }
        this.setState({ isloader: true })
        let cloneLocation = { shopIds: shopIds }
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/getNearbyShopServices/getNearByPackages/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: cloneLocation
        }
        axios(options)
            .then(result => {
                let packages = result.data.data
                let packageFilterdAccordingToBusinessType = []
                //for business type barberShop soorting
                if (packages.length && businessType === "barberShop") {
                    for (let index = 0; index < packages.length; index++) {
                        const element = packages[index];
                        const businessTypeClone = packages[index].businessType;
                        if (businessTypeClone === "Barbershop") {
                            packageFilterdAccordingToBusinessType.push(element)
                        }
                    }
                }
                //for business type saloon soorting
                if (packages.length && businessType === "saloon") {
                    for (let index = 0; index < packages.length; index++) {
                        const element = packages[index];
                        const businessTypeClone = packages[index].businessType;
                        if (businessTypeClone === "Salons") {
                            packageFilterdAccordingToBusinessType.push(element)
                        }
                    }
                }
                //for business type Spa soorting
                if (packages.length && businessType === "beautySaloon") {
                    for (let index = 0; index < packages.length; index++) {
                        const element = packages[index];
                        const businessTypeClone = packages[index].businessType;
                        if (businessTypeClone === "Beauty Salons, Spas & Other") {
                            packageFilterdAccordingToBusinessType.push(element)
                        }
                    }
                }
                this.setState({
                    packages: packageFilterdAccordingToBusinessType,
                    isloader: false,
                })
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false,
                })
            })
    }

    getShopWithId(_id) {
        console.log(_id, "getShopWithId")
        var options = {
            method: 'GET',
            url: `${this.props.bseUrl}/getallshops/getShopWithId/${_id}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
        }
        axios(options)
            .then(result => {
                let shopwithid = result.data.data
                Actions.Shop({ shop: shopwithid[0] })
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                })
            })
    }

    getMultipleShopWithId(shopid) {
        console.log(shopid, "getMultipleShopWithId")
        if (shopid.length) {
            cloneData = { shopid: shopid }
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
                    // const fiveStarRatingShops = shops.filter(shops => shops.review === "5");
                    Actions.SearchResults({ shops: shops, headerTitle: "Top Services" })
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

    getAllServices() {
        const { currentLocation } = this.props
        if (currentLocation != null) {
            let urlM = `${this.props.bseUrl}/getallshops/getAllService/${currentLocation.coords.latitude}/${currentLocation.coords.longitude}`
            axios({
                method: 'get',
                url: urlM,
            })
                .then(result => {
                    let allServices = result.data.data
                    console.log(allServices, "allServices_getting_home_screen")
                    let Haircut = []
                    let Style = []
                    let Hair_Color = []
                    let Shave = []
                    let Children_Haircut = []
                    let Wax = []

                    let Ladies_Haircuts = []
                    let Blow_Dry = []
                    let Hair_Coloring = []
                    let Mens_Haircuts = []
                    let Styling = []
                    let Treatments = []
                    let Bridal_And_Weding = []

                    let Nails = []
                    let Brows_Lashes = []
                    let Waxing = []
                    let Body_Treatment = []
                    let Hair_Treatments = []
                    let Tanning = []
                    let Mens_Grooming = []
                    let More = []

                    for (let index = 0; index < allServices.length; index++) {
                        const service = allServices[index];
                        const categoryName = allServices[index].categoryName;
                        console.log(service, "Service_Get")
                        // barberShop
                        if (categoryName === "Haircut") {
                            if (Haircut.indexOf(service.userId) == -1) {
                                Haircut.push(service.userId)
                            }
                        }
                        if (categoryName === "Style") {
                            if (Style.indexOf(service.userId) == -1) {
                                Style.push(service.userId)
                            }
                        }
                        if (categoryName === "Hair Color") {
                            if (Hair_Color.indexOf(service.userId) == -1) {
                                Hair_Color.push(service.userId)
                            }
                        }
                        if (categoryName === "Shave") {
                            if (Shave.indexOf(service.userId) == -1) {
                                Shave.push(service.userId)
                            }
                        }
                        if (categoryName === "Children Haircut") {
                            if (Children_Haircut.indexOf(service.userId) == -1) {
                                Children_Haircut.push(service.userId)
                            }
                        }
                        if (categoryName === "Wax") {
                            if (Wax.indexOf(service.userId) == -1) {
                                Wax.push(service.userId)
                            }
                        }
                        // saloon
                        if (categoryName === "Ladies Haircuts") {
                            if (Ladies_Haircuts.indexOf(service.userId) == -1) {
                                Ladies_Haircuts.push(service.userId)
                            }
                        }
                        if (categoryName === "Blow Dry") {
                            if (Blow_Dry.indexOf(service.userId) == -1) {
                                Blow_Dry.push(service.userId)
                            }
                        }
                        if (categoryName === "Hair Coloring") {
                            if (Hair_Coloring.indexOf(service.userId) == -1) {
                                Hair_Coloring.push(service.userId)
                            }
                        }
                        if (categoryName === "Men's Haircuts") {
                            if (Mens_Haircuts.indexOf(service.userId) == -1) {
                                Mens_Haircuts.push(service.userId)
                            }
                        }
                        if (categoryName === "Styling") {
                            if (Styling.indexOf(service.userId) == -1) {
                                Styling.push(service.userId)
                            }
                        }
                        if (categoryName === "Styling") {
                            if (Styling.indexOf(service.userId) == -1) {
                                Styling.push(service.userId)
                            }
                        }
                        if (categoryName === "Treatments") {
                            if (Treatments.indexOf(service.userId) == -1) {
                                Treatments.push(service.userId)
                            }
                        }
                        if (categoryName === "Bridal & Weding") {
                            if (Bridal_And_Weding.indexOf(service.userId) == -1) {
                                Bridal_And_Weding.push(service.userId)
                            }
                        }
                        // spa
                        if (categoryName === "Nails") {
                            if (Nails.indexOf(service.userId) == -1) {
                                Nails.push(service.userId)
                            }
                        }
                        if (categoryName === "Brows & Lashes") {
                            if (Brows_Lashes.indexOf(service.userId) == -1) {
                                Brows_Lashes.push(service.userId)
                            }
                        }
                        if (categoryName === "Waxing") {
                            if (Waxing.indexOf(service.userId) == -1) {
                                Waxing.push(service.userId)
                            }
                        }
                        if (categoryName === "Body Treatment") {
                            if (Body_Treatment.indexOf(service.userId) == -1) {
                                Body_Treatment.push(service.userId)
                            }
                        }
                        if (categoryName === "Hair Treatments") {
                            if (Hair_Treatments.indexOf(service.userId) == -1) {
                                Hair_Treatments.push(service.userId)
                            }
                        }
                        if (categoryName === "Tanning") {
                            if (Tanning.indexOf(service.userId) == -1) {
                                Tanning.push(service.userId)
                            }
                        }
                        if (categoryName === "Men’s Grooming") {
                            if (Mens_Grooming.indexOf(service.userId) == -1) {
                                Mens_Grooming.push(service.userId)
                            }
                        }
                        else {
                            More.push(service)
                        }
                    }
                    this.setState({
                        Haircut,
                        Style,
                        Hair_Color,
                        Shave,
                        Children_Haircut,
                        Wax,

                        Ladies_Haircuts,
                        Blow_Dry,
                        Hair_Coloring,
                        Mens_Haircuts,
                        Styling,
                        Treatments,
                        Bridal_And_Weding,

                        Nails,
                        Brows_Lashes,
                        Waxing,
                        Body_Treatment,
                        Hair_Treatments,
                        Tanning,
                        Mens_Grooming,
                        More,
                    })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                    this.setState({
                        err: error,
                    })
                })
        }

    }

    onFocusSearch() {
        Actions.AppContainer({ rout: "Nearby", openInput: true })
    }

    _onRefreshSearch() {
        this.setState({
            nearByShops: [],
            bestBarberShops: [],
            packages: [],
            isloader: false,
        }, () => {
            this.UNSAFE_componentWillMount()
        })
    }

    render() {
        let { fullName } = this.props.userProfile
        let { nearByShops, bestBarberShops, packages,
            // barberShop
            Haircut,
            Style,
            Hair_Color,
            Shave,
            Children_Haircut,
            Wax,
            // saloon
            Ladies_Haircuts,
            Blow_Dry,
            Hair_Coloring,
            Mens_Haircuts,
            Styling,
            Treatments,
            Bridal_And_Weding,
            // spa
            Nails,
            Brows_Lashes,
            Waxing,
            Body_Treatment,
            Hair_Treatments,
            Tanning,
            Mens_Grooming,
            More,
            isloader,
        } = this.state

        let { businessType } = this.props
        console.log(this.props.currentLocation, Haircut, "currentLocation_in_home")
        return (
            <View style={{ flex: 1, width: "100%", alignItems: "center", }}>
                <InfiniteScroll
                    style={{ width: "100%" }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.activity}
                            onRefresh={this._onRefreshSearch.bind(this)} />
                    }
                >
                    <View style={{
                        marginTop: Platform.OS === 'ios' ? 20 : -15,
                        height: 120,
                        width: "95%",
                        marginHorizontal: "2.5%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <View style={{ width: "100%", marginTop: 5 }}>
                            <Text style={{ fontSize: fullName.length < 12 ? 16 : 12, fontWeight: "bold", textAlign: "left" }}>Hi {fullName}</Text>
                        </View>
                        {
                            (businessType === "barberShop") ? (
                                <View
                                    style={{
                                        flex: 0.45, flexDirection: "row",
                                        width: "100%", height: 40, marginTop: 10,
                                        borderRadius: 10,
                                        justifyContent: "center", alignItems: "center",
                                        backgroundColor: "#EEF7FF",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: "5%",
                                            borderColor: 'gray',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "#EEF7FF",
                                        }}
                                    >
                                        <AntDesign name="search1" style={{ marginLeft: "3%", color: '#909090', fontWeight: 'bold', fontSize: 15 }} />
                                    </View>
                                    <View
                                        style={{
                                            width: "80%", borderColor: 'gray', justifyContent: "center", alignItems: "center",
                                            backgroundColor: "#EEF7FF",
                                        }}
                                    >
                                        <TextInput
                                            style={{ width: "90%", }}
                                            value={this.state.email}
                                            placeholder={"Search"}
                                            onFocus={() => this.onFocusSearch()}
                                            placeholderTextColor="grey"
                                        />
                                    </View>
                                </View>
                            ) : null
                        }

                        {
                            (businessType === "saloon") ? (
                                <View
                                    style={{
                                        flex: 0.45, flexDirection: "row",
                                        width: "100%", height: 40, marginTop: 10,
                                        borderRadius: 10,
                                        justifyContent: "center", alignItems: "center",
                                        backgroundColor: "#FFF2EA",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: "5%",
                                            borderColor: 'gray',
                                            backgroundColor: "#FFF2EA",
                                        }}
                                    >
                                        <AntDesign name="search1" style={{ marginLeft: "3%", color: '#909090', fontWeight: 'bold', fontSize: 15 }} />
                                    </View>

                                    <View
                                        style={{
                                            width: "80%", borderColor: 'gray', justifyContent: "center", alignItems: "center",
                                            backgroundColor: "#FFF2EA",
                                        }}
                                    >
                                        <TextInput
                                            style={{ width: "90%", }}
                                            value={this.state.email}
                                            placeholder={"Search"}
                                            onFocus={() => this.onFocusSearch()}
                                            placeholderTextColor="grey"
                                        />
                                    </View>
                                </View>
                            ) : null
                        }

                        {
                            (businessType === "beautySaloon") ? (
                                <View
                                    style={{
                                        flex: 0.45, flexDirection: "row",
                                        width: "100%", height: 40, marginTop: 10,
                                        borderRadius: 10,
                                        justifyContent: "center", alignItems: "center",
                                        backgroundColor: "#FDE5F3",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: "5%",
                                            borderColor: 'gray',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "#FDE5F3",
                                        }}
                                    >
                                        <AntDesign name="search1" style={{ marginLeft: "3%", color: '#909090', fontWeight: 'bold', fontSize: 15 }} />
                                    </View>

                                    <View
                                        style={{
                                            width: "80%", borderColor: 'gray',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "#FDE5F3",
                                        }}
                                    >
                                        <TextInput
                                            style={{ width: "90%", }}
                                            value={this.state.email}
                                            placeholder={"Search"}
                                            onFocus={() => this.onFocusSearch()}
                                            placeholderTextColor="grey"
                                        />
                                    </View>
                                </View>
                            ) : null
                        }
                    </View>

                    <View style={{ flex: 8, width: "100%", justifyContent: "center", alignItems: "center", }}>
                        <ScrollView style={{ width: "100%" }}>
                            <View style={{ width: "95%", marginTop: 10, marginLeft: 10, }}>
                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Top Services</Text>
                            </View>
                            {
                                (businessType === "barberShop") ? (
                                    <View style={{
                                        width: "100%",
                                        height: 220,
                                        flex: 1,
                                        padding: 4,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#EEF7FF"
                                    }}>
                                        <View style={{
                                            width: "95%",
                                            height: 180,
                                            borderTopLeftRadius: 35,
                                            borderTopRightRadius: 10,
                                            borderBottomRightRadius: 10,
                                            borderBottomLeftRadius: 10,
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            backgroundColor: "white"
                                        }}>
                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Haircut) }}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/haircut.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Style) }}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/styling.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Hair_Color) }}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/coloring.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Shave) }}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/shaving.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Children_Haircut) }}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/childrecutting.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Wax) }}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/waxing.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => Actions.ServiceListing({ More, headerTitle: "More Services" })}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/more.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : null
                            }
                            {
                                (businessType === "saloon") ? (
                                    <View style={{
                                        width: "100%",
                                        height: 220,
                                        flex: 1,
                                        padding: 4,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#FFF2EA"
                                    }}>
                                        <View style={{
                                            width: "95%",
                                            height: 180,
                                            borderTopLeftRadius: 35,
                                            borderTopRightRadius: 10,
                                            borderBottomRightRadius: 10,
                                            borderBottomLeftRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            backgroundColor: "white"
                                        }}>
                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => { this.getMultipleShopWithId(Ladies_Haircuts) }}
                                            >
                                                <Image source={require('../../../../assets/services/saloon/LadiesHaircuts.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => { this.getMultipleShopWithId(Blow_Dry) }}
                                            >
                                                <Image source={require('../../../../assets/services/saloon/BlowDry.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => { this.getMultipleShopWithId(Hair_Coloring) }}
                                            >
                                                <Image source={require('../../../../assets/services/saloon/HairColoring.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => { this.getMultipleShopWithId(Mens_Haircuts) }}
                                            >
                                                <Image source={require('../../../../assets/services/saloon/MensHaircuts.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => { this.getMultipleShopWithId(Styling) }}
                                            >
                                                <Image source={require('../../../../assets/services/saloon/Styling.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => { this.getMultipleShopWithId(Wax) }}
                                            >
                                                <Image source={require('../../../../assets/services/saloon/ChildrenHairCuts.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => { this.getMultipleShopWithId(Treatments) }}
                                            >
                                                <Image source={require('../../../../assets/services/saloon/Treatments.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => { this.getMultipleShopWithId(Bridal_And_Weding) }}
                                            >
                                                <Image source={require('../../../../assets/services/saloon/BridalWeding.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyleSaloon}
                                                onPress={() => Actions.ServiceListing({ More, headerTitle: "More Services" })}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/more.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : null
                            }
                            {
                                (businessType === "beautySaloon") ? (
                                    <View style={{
                                        width: "100%",
                                        height: 220,
                                        flex: 1,
                                        padding: 4,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#FDE5F3"
                                    }}>
                                        <View style={{
                                            width: "95%",
                                            height: 180,
                                            borderTopLeftRadius: 35,
                                            borderTopRightRadius: 10,
                                            borderBottomRightRadius: 10,
                                            borderBottomLeftRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            backgroundColor: "white"
                                        }}>
                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Nails) }}
                                            >
                                                <Image source={require('../../../../assets/services/beautySaloon/1nails.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Brows_Lashes) }}
                                            >
                                                <Image source={require('../../../../assets/services/beautySaloon/2browsandlashed.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Waxing) }}
                                            >
                                                <Image source={require('../../../../assets/services/beautySaloon/3waxing.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Body_Treatment) }}
                                            >
                                                <Image source={require('../../../../assets/services/beautySaloon/4bodytreatment.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Hair_Treatments) }}
                                            >
                                                <Image source={require('../../../../assets/services/beautySaloon/5hairtreatments.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Tanning) }}
                                            >
                                                <Image source={require('../../../../assets/services/beautySaloon/6traning.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => { this.getMultipleShopWithId(Mens_Grooming) }}
                                            >
                                                <Image source={require('../../../../assets/services/beautySaloon/7mensgromming.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.iconsStyle}
                                                onPress={() => Actions.ServiceListing({ More, headerTitle: "More Services" })}
                                            >
                                                <Image source={require('../../../../assets/services/barberShop/more.png')} resizeMode="contain"
                                                    style={{ width: "100%", height: "100%", }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : null
                            }

                            <View>
                                {
                                    (isloader === true) ? (
                                        <View style={{
                                            flex: 1,
                                            height: 170,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                        }}>
                                            <ActivityIndicator size="large" color="#FD6958" />
                                            <Text style={{ marginTop: 10, color: "#FD6958" }} >Loading....</Text>
                                        </View>
                                    ) :
                                        <>
                                            {
                                                (nearByShops && nearByShops != 0) ? (
                                                    <View style={{ width: "95%", marginTop: 10, flex: 1, flexDirection: "row", }}>
                                                        <TouchableOpacity style={{ flex: 1 }}>
                                                            {
                                                                businessType === "barberShop" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Nearby Barbershops</Text>
                                                                    : null
                                                            }
                                                            {
                                                                businessType === "saloon" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Nearby Saloon</Text>
                                                                    : null
                                                            }
                                                            {
                                                                businessType === "beautySaloon" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Nearby Spa</Text>
                                                                    : null
                                                            }
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : null
                                            }

                                            <InfiniteScroll showsHorizontalScrollIndicator={true} horizontal={true}>
                                                {
                                                    (nearByShops && nearByShops != 0) ? (
                                                        nearByShops.map((key, index) => {
                                                            return (
                                                                <TouchableOpacity key={index}
                                                                    style={{
                                                                        margin: 10,
                                                                        flexDirection: "row",
                                                                        marginBottom: 20,
                                                                        height: 170,
                                                                        width: 250,
                                                                    }}
                                                                    onPress={() => Actions.Shop({ shop: key })}
                                                                >
                                                                    <View style={{ width: 250 }}>
                                                                        <View style={{ flex: 2 }}>
                                                                            {(key.coverImage != null) ? (
                                                                                <Image style={{
                                                                                    width: "100%", height: "100%",
                                                                                }}
                                                                                    resizeMode="cover"
                                                                                    source={{ uri: key.coverImage }}
                                                                                />
                                                                            ) : <Image
                                                                                source={require('../../../../assets/nophoto.jpg')}
                                                                                resizeMode="cover"
                                                                                style={{ width: "100%", height: "100%", }}
                                                                            />
                                                                            }
                                                                        </View>
                                                                        <View
                                                                            style={{
                                                                                top: -10,
                                                                                height: 50,
                                                                                padding: "2%",
                                                                                borderColor: "#E8E6E7",
                                                                                borderWidth: 1,
                                                                                flex: 1,
                                                                                flexDirection: "row",
                                                                                backgroundColor: "white",
                                                                            }}
                                                                        >
                                                                            <View style={{ flex: 5, }}>
                                                                                <Text style={styles.card_text}>{key.businessName}</Text>
                                                                                <Text style={{ color: "#7F7F7F" }}>{key.addressLine1}</Text>
                                                                            </View>
                                                                            <View style={{
                                                                                flex: 2,
                                                                                flexDirection: "row",
                                                                                justifyContent: "center",
                                                                                alignItems: "center"
                                                                            }}>
                                                                                <Image source={require('../../../../assets/Path.png')} resizeMode="contain"
                                                                                    style={{ width: "30%", left: -5 }}
                                                                                />
                                                                                <Text style={{ color: "#7F7F7F", marginRight: 10 }}>{key.review}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    ) : null
                                                }
                                            </InfiniteScroll>
                                        </>
                                }
                            </View>

                            <View>
                                {
                                    (isloader === true) ? (
                                        <View style={{
                                            flex: 1,
                                            height: 170,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                        }}>
                                            <ActivityIndicator size="large" color="#FD6958" />
                                            <Text style={{ marginTop: 10, color: "#FD6958" }} >Loading....</Text>
                                        </View>
                                    ) :
                                        <>
                                            {
                                                (bestBarberShops && bestBarberShops != 0) ? (
                                                    <View style={{ width: "95%", marginTop: 10, flex: 1, flexDirection: "row", }}>
                                                        <TouchableOpacity style={{ flex: 1 }}>
                                                            {
                                                                businessType === "barberShop" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Top Rated Barbershops</Text>
                                                                    : null
                                                            }
                                                            {
                                                                businessType === "saloon" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Top Rated Saloon</Text>
                                                                    : null
                                                            }
                                                            {
                                                                businessType === "beautySaloon" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Top Rated Spa</Text>
                                                                    : null
                                                            }
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : null
                                            }
                                            <InfiniteScroll showsHorizontalScrollIndicator={true} horizontal={true}>
                                                {
                                                    (bestBarberShops && bestBarberShops != 0) ? (
                                                        bestBarberShops.map((key, index) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    key={index}
                                                                    style={{
                                                                        margin: 10,
                                                                        flexDirection: "row",
                                                                        marginBottom: 20,
                                                                        height: 170,
                                                                        width: 250,
                                                                    }}
                                                                    onPress={() => Actions.Shop({ shop: key })}
                                                                >
                                                                    <View style={{ width: 250, }}>
                                                                        <View style={{
                                                                            flex: 2,
                                                                        }}>
                                                                            {(key.coverImage != null) ? (
                                                                                <Image
                                                                                    style={{ width: "100%", height: "100%", }}
                                                                                    resizeMode="cover"
                                                                                    source={{ uri: key.coverImage }}
                                                                                />
                                                                            ) : <Image
                                                                                source={require('../../../../assets/nophoto.jpg')}
                                                                                resizeMode="cover"
                                                                                style={{ width: "100%", height: "100%", }}
                                                                            />
                                                                            }
                                                                        </View>
                                                                        <View style={{
                                                                            top: -10,
                                                                            height: 50,
                                                                            padding: "2%",
                                                                            borderColor: "#E8E6E7",
                                                                            borderWidth: 1,
                                                                            flex: 1,
                                                                            flexDirection: "row",
                                                                            backgroundColor: "white",
                                                                        }}>
                                                                            <View style={{ flex: 5 }}>
                                                                                <Text style={styles.card_text}>{key.businessName}</Text>
                                                                                <Text style={{ color: "#7F7F7F" }}>{key.addressLine1}</Text>
                                                                            </View>
                                                                            <View style={{
                                                                                flex: 2,
                                                                                flexDirection: "row",
                                                                                justifyContent: "center",
                                                                                alignItems: "center"
                                                                            }}>
                                                                                <Image source={require('../../../../assets/Path.png')} resizeMode="contain"
                                                                                    style={{ width: "30%", left: -5 }}
                                                                                />
                                                                                <Text style={{ color: "#7F7F7F", marginRight: 10 }}>{key.review}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    {/* {
                                                                        (this.state[`moreloader${index}`] === true) ? (
                                                                            <View style={{
                                                                                justifyContent: 'center',
                                                                                alignItems: "center",
                                                                            }}>
                                                                                <ActivityIndicator size="large" color="#FD6958" />
                                                                            </View>
                                                                        ) : null
                                                                    } */}
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    ) : null
                                                }
                                            </InfiniteScroll>
                                        </>
                                }
                            </View>

                            <View>
                                {
                                    (isloader === true) ? (
                                        <View style={{
                                            flex: 1,
                                            height: 170,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                        }}>
                                            <ActivityIndicator size="large" color="#FD6958" />
                                            <Text style={{ marginTop: 10, color: "#FD6958" }} >Loading....</Text>
                                        </View>
                                    ) :
                                        <>
                                            {
                                                (packages && packages != 0) ? (
                                                    <View style={{ width: "95%", marginTop: 10, flex: 1, flexDirection: "row", }}>
                                                        <View style={{ flex: 1.5 }}>
                                                            {
                                                                businessType === "barberShop" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Special Packages & Offers Barbershops</Text>
                                                                    : null
                                                            }
                                                            {
                                                                businessType === "saloon" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Special Packages & Offers Saloon</Text>
                                                                    : null
                                                            }
                                                            {
                                                                businessType === "beautySaloon" ?
                                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginLeft: 10, }}>Special Packages & Offers Spa</Text>
                                                                    : null
                                                            }
                                                        </View>
                                                    </View>
                                                ) : null
                                            }

                                            <InfiniteScroll showsHorizontalScrollIndicator={true} horizontal={true}>
                                                {
                                                    (packages && packages != 0) ? (
                                                        packages.map((key, index) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    key={index}
                                                                    style={{
                                                                        margin: 10,
                                                                        flexDirection: "row",
                                                                        marginBottom: 20,
                                                                        height: 170,
                                                                        width: 250,
                                                                    }}
                                                                    onPress={() => this.getShopWithId(key.userId)}
                                                                >
                                                                    <View style={{ width: 250, }}>
                                                                        <View style={{ flex: 2, }}>
                                                                            {(key.packageImage != null) ? (
                                                                                <Image
                                                                                    style={{ width: "100%", height: "100%" }}
                                                                                    resizeMode="cover"
                                                                                    source={{ uri: key.packageImage }}
                                                                                />
                                                                            ) : <Image source={require('../../../../assets/nophoto.jpg')} resizeMode="cover"
                                                                                style={{ width: "100%", height: "100%", }} />
                                                                            }
                                                                        </View>

                                                                        <View style={{
                                                                            top: -10,
                                                                            height: 50,
                                                                            padding: "2%",
                                                                            borderColor: "#E8E6E7",
                                                                            borderWidth: 1,
                                                                            flex: 1,
                                                                            flexDirection: "row",
                                                                            backgroundColor: "white",
                                                                        }}>
                                                                            <View style={{ flex: 5, }}>
                                                                                <Text style={styles.card_text}>{key.packageName}</Text>
                                                                                <Text style={{ color: "#7F7F7F" }}>{key.price} GBP</Text>
                                                                            </View>
                                                                            <View style={{
                                                                                flex: 2,
                                                                                flexDirection: "row",
                                                                                justifyContent: "center",
                                                                                alignItems: "center"
                                                                            }}>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    ) : null
                                                }
                                            </InfiniteScroll>
                                        </>
                                }
                            </View>
                        </ScrollView>
                    </View>
                </InfiniteScroll>
            </View>
        );
    }
}

let mapStateToProps = state => {
    return {
        currentLocation: state.root.currentLocation,
        userProfile: state.root.userProfile,
        bseUrl: state.root.bseUrl,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setNearByShops: (shops,) => {
            dispatch(setNearByShops(shops));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingBottom: 150,
        backgroundColor: "green",
    },
    card: {
        width: 250, height: 120,
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    card_text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    },
    iconsStyle: {
        width: "22%", height: "42%", justifyContent: "center", alignItems: "center", margin: 5,
    },
    iconsStyleSaloon: {
        width: "19%", height: "38%", justifyContent: "center", alignItems: "center", marginTop: 15,
    },

});