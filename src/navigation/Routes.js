import React, { Component } from 'react';
import { Router, Scene, Actions, Tabs } from 'react-native-router-flux'
import SplashScreen from '../Containers/SplashScreen/index'
import Walkthrough from '../Containers/Authentication/index'
import Signin from '../Containers/Authentication/signin'
import Signup from '../Containers/Authentication/signup'
import Forgotyourpassword from '../Containers/Authentication/forgotyourpassword'
import VerifyCode from '../Containers/Authentication/verifycode'
import ActivateAccount from '../Containers/Authentication/activateyouraccount'
import Phoneverification from '../Containers/Authentication/phoneveryfication'
import Veryfiyournumber from '../Containers/Authentication/verifyyournumber'
import BusinessType from '../Containers/Authentication/businessType'
import Allowaccesslocation from '../Containers/Authentication/allowaccesslocation'
import CountryLists from '../Containers/Authentication/countryLists'
import AppContainer from '../Containers/App/appcontainer'
import Filters from '../Containers/App/nearby/filters'
import FilteMap from '../Containers/App/nearby/filterMap'
//shop and booking routs
import Shop from '../Components/shop/index'
import ChooseService from '../Components/shop/chooseService'
import Bookappointment from '../Components/shop/bookappointment'
import Checkout from '../Components/shop/checkout'
import OfferDetails from '../Components/shop/offerDetails'
import SearchResults from '../Containers/App/nearby/searchResult'
import FavouritesShops from '../Containers/App/profile/favourites'
import ServiceDetaild from '../Components/shop/serviceDetails'
import BarberDetails from '../Components/shop/barberDetails'
import Submited from '../Components/shop/submited'
import Appointments from '../Containers/App/appointments/index'
import AppointmentDetails from '../Containers/App/appointments/appointmentsDetails'
import Profile from '../Containers/App/profile/index'
import Googlemapfullview from '../Components/googlemapfullview'
import VerifyCodeEmail from '../Containers/App/profile/6digitCode'
import TermsAndCondition from '../Containers/App/profile/termAndConditions'
import ServiceListing from '../Components/servicsListing'
import MypaymentCard from '../Components/paymentcard/mypaymentsCard'
import AddPaymenCard from '../Components/paymentcard/addpaymentcard'
import CardVerification from '../Components/paymentcard/cardverification'
import GooglePlacesInput from '../Components/autoCompleteForm'

class Route extends Component {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: "#f27500" }}
        titleStyle={{ color: "white" }}
        tintColor="white">
        <Scene>
          {/* <Scene key='GooglePlacesInput' component={GooglePlacesInput} hideNavBar={true} /> */}
          <Scene key='SplashScreen' component={SplashScreen} hideNavBar={true} initial />
          <Scene key='Walkthrough' component={Walkthrough} hideNavBar={true} />
          <Scene key='Signin' component={Signin} hideNavBar={true} />
          <Scene key='Forgotyourpassword' component={Forgotyourpassword} hideNavBar={true} />
          <Scene key='VerifyCode' component={VerifyCode} hideNavBar={true} />
          <Scene key='VerifyCodeEmail' component={VerifyCodeEmail} hideNavBar={true} />
          <Scene key='Signup' component={Signup} hideNavBar={true} />
          <Scene key='ActivateAccount' component={ActivateAccount} hideNavBar={true} />
          <Scene key='Veryfiyournumber' component={Veryfiyournumber} hideNavBar={true} />
          <Scene key='Phoneverification' component={Phoneverification} hideNavBar={true} />
          <Scene key='CountryLists' component={CountryLists} hideNavBar={true} />
          <Scene key='Allowaccesslocation' component={Allowaccesslocation} hideNavBar={true} />
          <Scene key='BusinessType' component={BusinessType} hideNavBar={true} />
          <Scene key='AppContainer' component={AppContainer} hideNavBar={true} />
          <Scene key='Shop' component={Shop} hideNavBar={true} />
          <Scene key='Filters' component={Filters} hideNavBar={true} />
          <Scene key='FilteMap' component={FilteMap} hideNavBar={true} />
          <Scene key='SearchResults' component={SearchResults} hideNavBar={true} />
          <Scene key='FavouritesShops' component={FavouritesShops} hideNavBar={true} />
          <Scene key='ServiceDetaild' component={ServiceDetaild} hideNavBar={true} />
          <Scene key='OfferDetails' component={OfferDetails} hideNavBar={true} />
          <Scene key='BarberDetails' component={BarberDetails} hideNavBar={true} />
          <Scene key='ChooseService' component={ChooseService} hideNavBar={true} />
          <Scene key='Bookappointment' component={Bookappointment} hideNavBar={true} />
          <Scene key='Checkout' component={Checkout} hideNavBar={true} />
          <Scene key='Submited' component={Submited} hideNavBar={true} />
          <Scene key='Appointments' component={Appointments} hideNavBar={true} />
          <Scene key='AppointmentDetails' component={AppointmentDetails} hideNavBar={true} />
          <Scene key='Profile' component={Profile} hideNavBar={true} />
          <Scene key='Googlemapfullview' component={Googlemapfullview} hideNavBar={true} />
          <Scene key='ServiceListing' component={ServiceListing} hideNavBar={true} />
          <Scene key='MypaymentCard' component={MypaymentCard} hideNavBar={true} />
          <Scene key='AddPaymenCard' component={AddPaymenCard} hideNavBar={true} />
          <Scene key='CardVerification' component={CardVerification} hideNavBar={true} />
          <Scene key='TermsAndCondition' component={TermsAndCondition} hideNavBar={true} />
        </Scene>
      </Router>
    )
  }
}

export default Route;