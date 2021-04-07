import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar, TouchableOpacity, Text, ScrollView, Alert, Platform } from 'react-native';
import { connect } from "react-redux";
import { setNearByShops } from "../../../Store/Action/action";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import RangeSlider from 'rn-range-slider';
//icons import
import Entypo from 'react-native-vector-icons/Entypo';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // service: "Haircut",
            rangeLow: 5,
            sortedby: "highToLow",
            selectedService: "",
            allServicesNames: [],
            isloader: false,
            err: "",

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
        const { businessType } = this.props
        this.getAllServices()
        // console.log(this.props.businessType, "businessType")
        let serviceList;
        if (businessType === "barberShop") {
            serviceList = ["Haircut", "Style", "Hair_Color", "Shave", "Children_Haircut", "Wax", "More"]
        }
        if (businessType === "saloon") {
            serviceList = ["Ladies_Haircuts", "Blow_Dry", "Hair_Coloring", "Mens_Haircuts", "Styling", "Treatments", "Bridal_And_Weding", "More"]
        }
        if (businessType === "beautySaloon") {
            serviceList = ["Nails", "Brows_Lashes", "Waxing", "Body_Treatment", "Hair_Treatments", "Tanning", "Mens_Grooming", "More"]
        }
        this.setState({ allServicesNames: serviceList })
    }

    getAllServices() {
        const { currentLocation } = this.props
        if (currentLocation != null) {
            // let urlM = `${this.props.bseUrl}/getallshops/getAllService1/${currentLocation.coords.latitude}/${currentLocation.coords.longitude}`
            let urlM = `${this.props.bseUrl}/getallshops/getAllService1/`
            axios({
                method: 'get',
                url: urlM,
            })
                .then(result => {
                    let allServices = result.data.data
                    // console.log(allServices, "allServices_getting_Filter_screen")
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
                        // console.log(service, "Service_Get")
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
                        if (categoryName != "Haircut" &&
                            categoryName != "Style" &&
                            categoryName != "Hair Color" &&
                            categoryName != "Shave" &&
                            categoryName != "Children Haircut" &&
                            categoryName != "Wax" &&
                            categoryName != "Ladies Haircuts" &&
                            categoryName != "Blow Dry" &&
                            categoryName != "Hair Coloring" &&
                            categoryName != "Men's Haircuts" &&
                            categoryName != "Styling" &&
                            categoryName != "Treatments" &&
                            categoryName != "Bridal & Weding" &&
                            categoryName != "Nails" &&
                            categoryName != "Brows & Lashes" &&
                            categoryName != "Waxing" &&
                            categoryName != "Body Treatment" &&
                            categoryName != "Hair Treatments" &&
                            categoryName != "Tanning" &&
                            categoryName != "Men’s Grooming") {
                            if (More.indexOf(service.userId) == -1) {
                                More.push(service.userId)
                            }
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
                    }, () => {
                        // console.log(this.state.More, "AFTER_SET_STATES")
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

    selectService(key, index) {
        this.setState({ selectedService: key })
        // console.log(key, "selectService")
    }

    getNearbyShopsServices(nearbyShopIDs, shops,) {
        const { selectedService, sortedby, } = this.state

        // console.log(nearbyShopIDs, shops, selectedService, "sortedShops")

        let idsCloneData = { shopid: nearbyShopIDs }
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/getNearbyShopServices/NearbyAllShopServices/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: idsCloneData
        }
        axios(options)
            .then(result => {
                let allShopsServices = result.data.data
                // console.log(allShopsServices, "allShopsServices")
                if (sortedby === "highToLow") {
                    allShopsServices.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                }
                else {
                    allShopsServices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                }
                if (selectedService != "") {
                    let sortedService = []
                    for (let index = 0; index < allShopsServices.length; index++) {
                        const element = allShopsServices[index];
                        if (element.categoryName === selectedService.replace("_", " ")) {
                            sortedService.push(element)
                        }
                    }
                    let sortedShops = []
                    for (let index = 0; index < sortedService.length; index++) {
                        for (let i = 0; i < shops.length; i++) {
                            if (sortedService[index].userId === shops[i]._id) {
                                sortedShops.push(shops[i])
                            }
                        }
                    }
                    // console.log(sortedShops, "sortedShops")
                    Actions.SearchResults({ shops: sortedShops.length ? sortedShops : shops, headerTitle: "Search Result" })
                    this.setState({ isloader: false })
                }
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            err: ""
                        })
                    }, 10000)

                })
            })
    }

    saveSearch() {
        const { rangeLow, selectedService } = this.state
        const { currentLocation } = this.props
        if (currentLocation != null) {
            if (selectedService != "") {
                this.setState({ isloader: true })
                cloneData = {
                    shopid: this.state[`${selectedService}`],
                    lat: currentLocation.coords.latitude,
                    long: currentLocation.coords.longitude,
                    km: rangeLow,
                }
                var options = {
                    method: 'POST',
                    url: `${this.props.bseUrl}/getallshops/getMultipleShopWithIdAndLocation/`,
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                }
                axios(options)
                    .then(result => {
                        // this.setState({ isloader: false })
                        let shops = result.data.data
                        let idsShp = this.state[`${selectedService}`]
                        // Actions.SearchResults({ shops: shops, headerTitle: "Top Services" })
                        // console.log(shops, idsShp, "idsShp")
                        this.getNearbyShopsServices(idsShp, shops)
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, 'ERRROR', err)
                        Actions.SearchResults({ shops: [], headerTitle: "Top Services" })
                        this.setState({ isloader: false })
                        // this.setState({ err: error, isloader: false })
                    })
            }
            else {
                Alert.alert("Please select service")
            }
        }
        else {
            Alert.alert("Please open your location")
            this.setState({ isloader: true })
        }
    }

    render() {
        const { rangeLow, allServicesNames, selectedService, isloader, err, } = this.state
        console.log(rangeLow, "RenderFunction")
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={{
                    marginTop: Platform.OS === 'ios' ? 12 : null,
                    height: 60,
                    flexDirection: "row",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#8E8E93",
                }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Entypo name="cross" style={{ marginTop: 12, marginRight: "25%", fontSize: 25 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <TouchableOpacity >
                            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Filters</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        {
                            isloader === false ?
                                <TouchableOpacity onPress={() => this.saveSearch()}>
                                    <Text style={{ marginTop: 10, color: "#FD6958" }}>Save</Text>
                                </TouchableOpacity>
                                :
                                <ActivityIndicator color="#FD6958" />
                        }
                    </View>
                </View>

                <View style={{ flex: 8, alignItems: "center", width: "100%", marginTop: 0, }}>
                    <View style={{ width: "90%", marginTop: 10, flexDirection: "row", marginTop: 20 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "#4A4A4A", fontSize: 16, }}>Distance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: "#8E8E93", textAlign: "right", }}>{rangeLow}.0 Km</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", top: -20, }}>
                        <RangeSlider
                            style={{ width: "90%", height: 80 }}
                            gravity={'center'}
                            min={0}
                            max={25}
                            initialLowValue={5}
                            step={1}
                            rangeEnabled={false}
                            selectionColor="#FD6958"
                            blankColor="#E8E6E7"
                            thumbColor="#FD6958"
                            thumbBorderColor="#F1EBEB"
                            onValueChanged={(low, high, fromUser) => { this.setState({ rangeLow: low, rangeHigh: high }) }} />
                    </View>

                    <View style={{ width: "90%", flexDirection: "row", }}>
                        <Text style={{ color: "#4A4A4A", fontSize: 16, }}>Services</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 5, flexWrap: "wrap", flexDirection: "row", }}>
                        {
                            (allServicesNames.length != 0) ? (
                                allServicesNames.map((key, index) => {
                                    return (
                                        (key === selectedService) ? (
                                            <TouchableOpacity key={index} style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: 150,
                                                height: 35,
                                                margin: 5,
                                                borderRadius: 25,
                                                borderWidth: 0.5,
                                                borderColor: "grey",
                                                backgroundColor: selectedService === key ? "#FD6958" : null,
                                            }}
                                                onPress={() => { this.setState({ selectedService: "" }) }}
                                            >
                                                <Text style={{
                                                    color: "black", fontSize: 12,
                                                    marginHorizontal: 25, marginVertical: 5,
                                                    color: selectedService === key ? "#ffff" : null,
                                                }}>{key.replace("_", " ").replace("More", "Others")}</Text>
                                            </TouchableOpacity>
                                        ) :
                                            <TouchableOpacity
                                                key={index}
                                                style={{
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: 150,
                                                    height: 35,
                                                    margin: 5,
                                                    borderRadius: 25,
                                                    borderWidth: 0.5,
                                                    borderColor: "grey",
                                                    backgroundColor: selectedService === key ? "#FD6958" : null,
                                                }}
                                                onPress={() => { this.selectService(key, index) }}
                                            >
                                                <Text style={{
                                                    color: "black", fontSize: 12,
                                                    marginHorizontal: 25, marginVertical: 5,
                                                    color: selectedService === key ? "#ffff" : null,
                                                }}>{key.replace("_", " ").replace("More", "Others")}</Text>
                                            </TouchableOpacity>
                                    )
                                })

                            ) : <ActivityIndicator color="#FD6958" size={"large"} />
                        }
                    </View>

                    <View style={{ width: "90%", marginTop: 20, marginBottom: 50 }}>
                        <Text style={{ color: "#4A4A4A", fontSize: 16, }}>Sortby</Text>
                        {
                            (selectedService != "") ? (
                                <>
                                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { this.setState({ sortedby: "lowToHigh" }) }}>
                                        <Text style={{ color: "black", fontSize: 16, color: this.state.sortedby === "lowToHigh" ? "#FD6958" : null, }}>Ascending price</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { this.setState({ sortedby: "highToLow" }) }}>
                                        <Text style={{ color: "black", fontSize: 16, color: this.state.sortedby === "highToLow" ? "#FD6958" : null, }}>Descending price</Text>
                                    </TouchableOpacity>
                                </>
                            ) : <>
                                <TouchableOpacity disabled style={{ marginTop: 10, }}>
                                    <Text style={{ color: "grey", fontSize: 16, }}>Ascending price</Text>
                                </TouchableOpacity>

                                <TouchableOpacity disabled style={{ marginTop: 10, }}>
                                    <Text style={{ color: "grey", fontSize: 16, }}>Descending price</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                    <View style={{ width: "90%", justifyContent: "center", alignItems: "center", }}>
                        {
                            err != "" ? <Text style={{ top: -10, color: "red" }}>{err}</Text> : null
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

let mapStateToProps = state => {
    return {
        bseUrl: state.root.bseUrl,
        currentLocation: state.root.currentLocation,
        searchLocationName: state.root.searchLocationName,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setNearByShops: (shops,) => {
            dispatch(setNearByShops(shops));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Filters);

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 70,
        backgroundColor: "white",
    },
});