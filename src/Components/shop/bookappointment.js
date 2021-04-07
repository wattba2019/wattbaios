import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar,
    ScrollView, Image, ActivityIndicator, Alert, 
} from 'react-native';
import { connect } from "react-redux";
import Fontisto from 'react-native-vector-icons/Fontisto'
import DatePicker from 'react-native-datepicker'
import Entypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import axios from 'axios';
import { Appearance } from 'react-native';

class BookAppointment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "",
            // date: new Date(),
            slots: [],
            selectedSlotTime: "",
            selectedBarberBolean: false,
        }
    }

    componentDidMount() {
        let { stylists, workinghours, gendre, renderSelectedService } = this.props
        let { date } = this.state
        let barberList = []
        let soortedBarberList = []
        if (gendre) {
            for (let index = 0; index < stylists.length; index++) {
                const element = stylists[index];
                const elementGender = stylists[index].gender.toLowerCase();
                if (elementGender === gendre) {
                    barberList.push(element)
                }
            }

            for (let index = 0; index < renderSelectedService.length; index++) {
                const selectedServiceName = renderSelectedService[index].serviceName;
                for (let k = 0; k < barberList.length; k++) {
                    const stylist = barberList[k];
                    const serviceProvided = barberList[k].serviceProvided;
                    for (let j = 0; j < serviceProvided.length; j++) {
                        const services = serviceProvided[j];
                        if (services === selectedServiceName) {
                            // soortedBarberList.push(stylist)
                            var d;
                            if (date != "") {
                                d = new Date(date);
                            }
                            else {
                                d = new Date();
                            }
                            var weekday = new Array(7);
                            weekday[0] = "Sunday";
                            weekday[1] = "Monday";
                            weekday[2] = "Tuesday";
                            weekday[3] = "Wednesday";
                            weekday[4] = "Thursday";
                            weekday[5] = "Friday";
                            weekday[6] = "Saturday";
                            let day = weekday[d.getDay()];

                            for (let i = 0; i < stylist.workingDays.length; i++) {
                                const element = stylist.workingDays[i];
                                const elementDay = stylist.workingDays[i].day;
                                // const openTime = stylist.workingDays[i].brStart;
                                // const closeTIme = stylist.workingDays[i].brEnd;
                                const openTime = moment(stylist.workingDays[i].brStart, ["h:mm A"]).format("hh:mm A");
                                const closeTIme = moment(stylist.workingDays[i].brEnd, ["h:mm A"]).format("hh:mm A");
                                if (day === elementDay) {
                                    if (element.working === true) {
                                        // let getTimeAmPm = this.formatAMPM(new Date);
                                        // var timeCorrectFormat = moment(getTimeAmPm, ["h:mm A"]).format("hh:mm A");
                                        // let OTime = this.getTimeMilliseconds(openTime);
                                        // let CTime = this.getTimeMilliseconds(closeTIme);
                                        // let currentTime = this.getTimeMilliseconds(timeCorrectFormat);
                                        // console.log(OTime, CTime, currentTime, openTime, closeTIme, "TimingCheck")
                                        // if (currentTime > OTime && currentTime < CTime) {
                                        //     null
                                        // }
                                        // else {
                                        //     soortedBarberList.push(stylist)
                                        // }
                                        soortedBarberList.push(stylist)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        console.log(soortedBarberList, "soortedBarberList")

        var d;
        if (date != "") {
            d = new Date(date);
        }
        else {
            d = new Date();
        }
        var weekday = new Array(7);
        weekday[0] = "sunday";
        weekday[1] = "monday";
        weekday[2] = "tuesday";
        weekday[3] = "wednesday";
        weekday[4] = "thursday";
        weekday[5] = "friday";
        weekday[6] = "saturday";
        let day = weekday[d.getDay()];

        let currentDayShopOpen = workinghours[day].open;
        if (currentDayShopOpen === true) {
            let currentDate = moment(new Date().getTime()).format('YYYY-MM-DD');
            if (currentDate === date) {
                let start = workinghours[day].openTimings;
                let end = workinghours[day].closingTime;
                let currentTime = this.formatAMPM(new Date);
                let returnValue = this.getTimeStops(start, end, currentTime);
                this.setState({
                    slots: returnValue,
                    stylists: soortedBarberList,
                    day: day,
                })
            }
            else {
                let start = workinghours[day].openTimings;
                let end = workinghours[day].closingTime;
                let returnValue = this.getTimeStopsAnotherDate(start, end);
                this.setState({
                    slots: returnValue,
                    stylists: soortedBarberList,
                    day: day,
                })
            }
            // console.log(dateFormat, date, "weekdayAndCurrentDay")
        }
        else {
            this.setState({
                day: day,
                slots: [],
                stylists: soortedBarberList,
            })
        }

    }

    getTimeMilliseconds(timeString) {
        var t = timeString.match(/(\d{1,2}):(\d{2}) ([AP]M)/),
            h = parseInt(t[1], 10),
            isAm = t[3] === 'AM',
            isMidnight = h === 12 && isAm,
            isNoon = h === 12 && !isAm;
        return new Date(0).setUTCHours(isMidnight ? 0 : h + (isAm || isNoon ? 0 : 12), parseInt(t[2], 10));
    }

    makeDateStr(dateStr) {
        //5:14 am
        var splittedDateStr = dateStr.split(":");
        var hour = splittedDateStr[0]
        var minuteAndAMPM = splittedDateStr[1]
        var splittedMinuteAndAMPM = minuteAndAMPM.split(" ");
        var minute = splittedMinuteAndAMPM[0];
        var amPm = splittedMinuteAndAMPM[1];
        // console.log(amPm, hour)
        if (amPm === 'pm') {
            hour = Number(hour) + 12
        }
        var bookingDate = new Date(this.state.date);
        var bookingDateandTime = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate(), hour, minute, 0);
        return bookingDateandTime.getTime();
    }

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    getTimeStops(start, end, ampmCurrent) {
        // console.log(start, end, ampmCurrent, "ampmCurrent")
        var startTime = moment(start, 'h:mm a');
        var endTime = moment(end, 'h:mm a');
        var currentTime = moment(ampmCurrent, 'h:mm a');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        // console.log(startTime, "startTime")
        var timeStops = [];
        while (startTime <= endTime) {
            // console.log(startTime, currentTime, "currentTime", startTime > currentTime)
            if (startTime > currentTime) {
                timeStops.push(new moment(startTime).format('h:mm a'));
            }
            startTime.add(60, 'minutes');
        }
        return timeStops;
    }

    getTimeStopsAnotherDate(start, end) {
        var startTime = moment(start, 'h:mm a');
        var endTime = moment(end, 'h:mm a');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];
        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('h:mm a'));
            startTime.add(60, 'minutes');
        }
        return timeStops;
    }

    getFreeBarber(slotTIme) {
        var { selectedSlotTime, date, stylists } = this.state
        var { renderSelectedService } = this.props
        var shopId = this.props.shopId
        var hour = moment(selectedSlotTime, ["h:mm A"]).format("HH");
        var options = {
            method: 'GET',
            url: `${this.props.bseUrl}/bookings/findBarberStatus/${date}/${shopId}/${hour}/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
        }
        axios(options)
            .then(result => {
                let freeStylist = result.data
                let barberList = []
                let soortedBarberList = []
                if (this.props.gendre) {
                    for (let index = 0; index < this.props.stylists.length; index++) {
                        const stylist = this.props.stylists[index];
                        const elementGender = this.props.stylists[index].gender.toLowerCase();
                        if (elementGender === this.props.gendre) {
                            // barberList.push(stylist)
                            var d;
                            if (date != "") {
                                d = new Date(date);
                            }
                            else {
                                d = new Date();
                            }
                            var weekday = new Array(7);
                            weekday[0] = "Sunday";
                            weekday[1] = "Monday";
                            weekday[2] = "Tuesday";
                            weekday[3] = "Wednesday";
                            weekday[4] = "Thursday";
                            weekday[5] = "Friday";
                            weekday[6] = "Saturday";
                            let day = weekday[d.getDay()];

                            for (let i = 0; i < stylist.workingDays.length; i++) {
                                const element = stylist.workingDays[i];
                                const elementDay = stylist.workingDays[i].day;
                                // const openTime = stylist.workingDays[i].brStart;
                                // const closeTIme = stylist.workingDays[i].brEnd;
                                const openTime = moment(stylist.workingDays[i].brStart, ["h:mm A"]).format("hh:mm A");
                                const closeTIme = moment(stylist.workingDays[i].brEnd, ["h:mm A"]).format("hh:mm A");
                                if (day === elementDay) {
                                    if (element.working === true) {
                                        // console.log(stylist, "stylistBookAppointment")
                                        // soortedBarberList.push(stylist)
                                        // barberList.push(stylist)
                                        // let getTimeAmPm = this.formatAMPM(new Date);
                                        // var timeCorrectFormat = moment(getTimeAmPm, ["h:mm A"]).format("hh:mm A");
                                        var timeCorrectFormat = moment(selectedSlotTime, ["h:mm A"]).format("hh:mm A");
                                        let OTime = this.getTimeMilliseconds(openTime);
                                        let CTime = this.getTimeMilliseconds(closeTIme);
                                        // let currentTime = this.getTimeMilliseconds(timeCorrectFormat);
                                        let selectedSlotMilisec = this.getTimeMilliseconds(timeCorrectFormat);
                                        // console.log(OTime, CTime, selectedSlotMilisec, openTime, closeTIme, timeCorrectFormat, "TimingCheck")
                                        if (selectedSlotMilisec >= OTime && selectedSlotMilisec <= CTime) {
                                            null
                                        }
                                        else {
                                            barberList.push(stylist)
                                        }
                                    }
                                }
                            }

                        }
                    }
                    for (let index = 0; index < renderSelectedService.length; index++) {
                        const selectedServiceName = renderSelectedService[index].serviceName;
                        for (let k = 0; k < barberList.length; k++) {
                            const stylist = barberList[k];
                            const serviceProvided = barberList[k].serviceProvided;
                            for (let j = 0; j < serviceProvided.length; j++) {
                                const services = serviceProvided[j];
                                if (services === selectedServiceName) {
                                    if (soortedBarberList.indexOf(stylist) === -1) {
                                        soortedBarberList.push(stylist);
                                    }
                                }
                            }
                        }
                    }
                }
                if (freeStylist.stylistIds) {
                    for (let index = 0; index < freeStylist.stylistIds.length; index++) {
                        const freeStylistId = freeStylist.stylistIds[index];
                        for (let k = 0; k < soortedBarberList.length; k++) {
                            const element = soortedBarberList[k];
                            if (freeStylistId === element._id) {
                                soortedBarberList.splice(k, 1)
                            }
                        }
                    }
                    this.setState({
                        stylists: soortedBarberList
                    })
                }
                else {
                    this.setState({
                        stylists: soortedBarberList,
                        // err: "No stylist available in this time slot"
                    })
                }

            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                })
            })

        // console.log(date, hour, shopId, "date")
    }

    slotSelect(key, index) {
        console.log(key, "SLOT_TIME")
        this.setState({
            selectedSlotTime: key
        }, () => {
            this.getFreeBarber(key)
        })
    }

    chooseBarber(key, index) {
        let { stylists } = this.state
        let selectedBarber = stylists[index]
        for (var i = 0; i < stylists.length; i++) {
            stylists[i].active = false
        }
        selectedBarber.active = true
        this.setState({
            stylists: stylists,
            selectedBarberBolean: true,
            selectedBarber: selectedBarber
        })
    }

    setDate(date) {
        // console.log(date, "SETDATE")
        this.setState({
            date: date
        })
        this.componentDidMount(date)
        this.getFreeBarber()
    }

    Checkout() {
        let { chosenItems, extraServicesSelected, gendre, totalCost, pack, renderSelectedService } = this.props
        let { date, selectedSlotTime, selectedBarber, selectedBarberBolean, stylists } = this.state

        // console.log(selectedBarber, stylists, stylists.length, "selectedBarber")

        var dt = moment(selectedSlotTime, ["h:mm A"]).format("HH");
        var dateMiliSecond = moment(date).format("x");

        let randomStylist = stylists[Math.floor(Math.random() * stylists.length)]

        if (date === "") {
            Alert.alert("Please select date")
        }
        else if (selectedSlotTime === "") {
            Alert.alert("Please select slot")
        }
        // else if (selectedBarberBolean === false) {
        //     Alert.alert("Please select barber")
        // }
        else {
            let cloneObj = {
                chosenItems: chosenItems,
                extraServicesSelected: extraServicesSelected,
                gendre: gendre,
                cost: totalCost,
                bookingHour: dt,
                selectedSlotTime: selectedSlotTime,
                // selectedBarber: selectedBarber ? selectedBarber._id : randomStylist._id,
                // selectedBarberfullname: selectedBarber ? selectedBarber.fullname : randomStylist.fullname,
                selectedBarber: selectedBarber ? selectedBarber._id : null,
                selectedBarberfullname: selectedBarber ? selectedBarber.fullname : null,
                bookingDateTime: dateMiliSecond,
                bookingDate: date,
                bookerId: this.props.bookerId,
                shopId: this.props.shopId,
                package: pack,
                renderSelectedService: renderSelectedService
            }
            if (pack === true) {
                cloneObj.package = true
            }
            else {
                cloneObj.package = false
            }
            // console.log(cloneObj, "cloneObj")
            Actions.Checkout({ booking: cloneObj })
        }
    }

    render() {
        let { totalCost, gendre, renderSelectedService } = this.props
        let { stylists, slots, selectedSlotTime, day, date, err, soortedBarberList } = this.state
        let colorScheme;
        if (Platform.OS === 'ios') {
            colorScheme = Appearance.getColorScheme();
        }

        return (
            <View style={{ paddingHorizontal: 10, flex: 1, backgroundColor: "#fff" }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                {
                    Platform.OS === 'ios' ?
                        <View style={{ position: "absolute", top: 35, zIndex: 1 }}>
                            <TouchableOpacity onPress={() => Actions.pop()}>
                                <Entypo name="cross" style={{ marginLeft: 15, top: 10, color: "black", fontSize: 25 }} />
                            </TouchableOpacity>
                        </View> : null
                }

                <View style={{
                    flex: 0.7,
                    flexDirection: "row",
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'grey',
                    marginTop: Platform.OS === 'ios' ? 25 : 0
                }}>
                    {
                        Platform.OS === 'android' ?
                            <View style={{ position: "absolute", }}>
                                <TouchableOpacity onPress={() => Actions.pop()}>
                                    <Entypo name="cross" style={{ marginLeft: 15, top: 10, color: "black", fontSize: 25 }} />
                                </TouchableOpacity>
                            </View> : null
                    }
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{ alignItems: "center", fontSize: 15, marginTop: Platform.OS === 'ios' ? 18 : 0, marginBottom: Platform.OS === 'ios' ? 10 : 0 }}>Book An Appointment</Text>
                    </View>
                </View>

                <View style={{ flex: 8, }}>
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{
                            width: "90%", marginHorizontal: "5%"
                        }}>
                            <View style={{ paddingVertical: "5%" }}>

                                <Text style={{ fontSize: 22, color: "#4B534F" }}>Choose Date</Text>
                            </View>
                            <View style={{
                                justifyContent: "center", alignItems: "center",
                                marginTop: 10, width: "97%", marginHorizontal: "1%",
                                borderRadius: 100, height: 50,

                                flexDirection: "row", backgroundColor: "#F1EDED"
                            }}>

                            

                                <DatePicker showIcon={false}
                                    minDate={moment().toDate()}
                                    style={{
                                        width: 280,
                                    }}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="Date"
                                    format="YYYY-MM-DD"
                                    // format="Do MMMM YYYY"
                                    // format="DD-MM-YYYY"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        placeholderText: {
                                            marginRight: "40%", color: "#9b9b9b"
                                        },
                                        dateInput: {
                                            height: 52,
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                            marginRight: "40%"
                                        },

                                        datePicker: {
                                            backgroundColor: Platform.OS === 'ios' ? colorScheme === "dark" ? "white" : "white" : "white",
                                            ios_backgroundColor: 'white',
                                            color: Platform.OS === 'ios' ? colorScheme === "dark" ? "black" : "black" : "black",
                                            justifyContent:"center"
                                        },
                                        datePickerCon: {
                                            color: 'black',
                                            ios_backgroundColor: 'white',
                                            backgroundColor: 'white',
                                        },
                                        // ... You can check the source to find the other keys.
                                    }}
                                    // onDateChange={(date) => { this.setState({ date: date }) }}
                                    onDateChange={(date) => this.setDate(date)}
                                />
                                <Fontisto style={{ marginRight: "10%", color: "#4B534F" }} size={16} name={"date"} />
                            </View>

                            {
                                (date != "") ? (
                                    <>
                                        <View style={{ paddingVertical: "5%" }}>
                                            <Text style={{ fontSize: 22, color: "#4B534F" }}>Availble Slots</Text>
                                        </View>
                                        <View style={{
                                            flexWrap: "wrap",
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            // backgroundColor: "red"
                                        }}>
                                            {
                                                (slots.length != 0) ? (
                                                    slots.map((key, index) => {
                                                        // console.log(key, index, "INSIDE_MAP")
                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => this.slotSelect(key, index)}
                                                                key={index}
                                                                style={{
                                                                    // backgroundColor: "#F3E7E3",
                                                                    backgroundColor: selectedSlotTime === key ? "#FD6958" : "#F3E7E3",
                                                                    margin: "1.5%", height: 45, width: "30%",
                                                                    justifyContent: "center",
                                                                    alignItems: "center"
                                                                }}>
                                                                <Text style={{
                                                                    color: selectedSlotTime === key ? "#ffffff" : "#4B534F",
                                                                    fontWeight: selectedSlotTime === key ? "bold" : "normal"
                                                                }}>{key}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                ) : <Text style={{ color: "red" }}>{'No slots available on ' + day + ' please change date'}</Text>

                                            }
                                        </View>

                                        {
                                            (stylists && stylists.length != 0) ? (
                                                <View style={{ paddingVertical: "5%" }}>
                                                    <Text style={{ fontSize: 22, color: "#4B534F" }}>Choose Your Stylist</Text>
                                                </View>
                                            ) : null
                                        }

                                    </>
                                ) : null
                            }


                        </View>
                        {
                            (date != "") ? (
                                <>
                                    <ScrollView
                                        contentContainerStyle={{ flexGrow: 1 }}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal style={{ marginVertical: 15, marginTop: -15, }}
                                    >
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
                                                            onPress={() => this.chooseBarber(key, index)}
                                                        >
                                                            <View style={{
                                                                height: 75,
                                                                width: 75,
                                                                borderRadius: 50,
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                backgroundColor: "white",
                                                                // borderColor: "#FD6958",
                                                                borderColor: key.active == true ? "#FD6958" : "#E6E6E6",
                                                                borderWidth: 1.80,
                                                                overflow: "hidden"
                                                            }}>
                                                                {(key.coverImage != null) ? (
                                                                    <Image source={{ uri: key.coverImage }} resizeMode="cover"
                                                                        style={{ width: "90%", height: "90%", borderRadius: 100 }}
                                                                    />
                                                                ) : <Image source={require('../../../assets/nophoto.jpg')} resizeMode="cover"
                                                                    style={{ width: "90%", height: "90%", borderRadius: 100 }}
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
                                        {
                                            (stylists && stylists.length === 0) ? (
                                                <TouchableOpacity style={{
                                                    height: 30,
                                                    width: "100%",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    // backgroundColor: "red"
                                                }}>
                                                    {
                                                        (err) ? (
                                                            // <Text style={{ marginTop: 5, fontSize: 10, color: "red", textAlign: "right", }}>{err}</Text>
                                                            <Text style={{ marginTop: 5, fontSize: 10, color: "red", textAlign: "right", }}>""</Text>
                                                        ) :
                                                            // <Text style={{ marginTop: 5, fontSize: 10, color: "red", textAlign: "right", }}>There is no {gendre} stylists</Text>
                                                            <Text style={{ marginTop: 5, fontSize: 10, color: "red", textAlign: "right", }}></Text>
                                                    }
                                                </TouchableOpacity>
                                            ) : null
                                        }
                                    </ScrollView>
                                </>
                            ) : null
                        }

                    </ScrollView>
                </View>

                <View style={{
                    flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", borderTopColor: "grey", borderTopWidth: 0.5,
                }}>
                    <View style={{
                        flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "90%", marginHorizontal: "5%",
                    }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", }}>
                            <Text style={{ fontWeight: "normal", }}>Total</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>GBP {totalCost}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", }}>
                            <TouchableOpacity
                                onPress={() => this.Checkout()}
                                style={{ width: "70%", height: 42, justifyContent: "center", alignItems: "center", backgroundColor: "#FD6958", borderRadius: 8 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 12, color: "#ffffff", textAlign: "center" }}>Proceed to Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 30,
    },
});

let mapStateToProps = state => {
    return {
        stylists: state.root.stylists,
        workinghours: state.root.workinghours,
        shopId: state.root.shop._id,
        bookerId: state.root.userProfile._id,
        bseUrl: state.root.bseUrl,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(BookAppointment);

