import React, { Component } from "react";
import { View, Image, ActivityIndicator, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Text, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
//icons import
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class TermsAndCondition extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        let { } = this.state;
        return (
            <View style={{
                flex: 1,
                width: "100%",
                backgroundColor: "white",
            }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                {/* header */}
                <View style={{
                    height: 60,
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    borderBottomColor: "#EAECEF",
                    borderBottomWidth: 0.5,
                    marginTop: Platform.OS === 'ios' ? 25 : 0
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
                        <Text style={{ alignItems: "center", color: "#000000", fontSize: 12 }}>TERMS & CONDITIONS</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={{
                        height: 120,
                        marginLeft: 10,
                        justifyContent: "center",
                    }}>
                        <Image source={require('../../../../assets/welcome.jpg')} resizeMode="contain"
                            style={{ height: 200, width: 200, }}
                        />
                    </View>

                    <View style={{ marginHorizontal: "5%", top: -10 }}>
                        <Text style={{ color: "grey", }}>
                            THIS TERMS OF SERVICE WILL GOVERN YOUR USE OF THIS MOBILE APPLICATION (HEREIN REFERRED TO AS “WATTBA”, “WE”, “US”, OR “OUR”) AND ALL RELATED SERVICES AND TOOLS MADE AVAILABLE TO YOU REGARDLESS OF HOW YOU ACCESS OR USE THE SERVICE. THIS MOBILE APP AND SERVICES IS OWNED AND MANAGED BY WATTBA LTD (HEREIN REFERRED TO AS THE “COMPANY”), A COMPANY ORGANISED AND EXISTING UNDER THE ENGLISH LAWS.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            WE EXPRESSLY RESERVE THE ENTIRE RIGHT, AT OUR SOLE DISCRETION, TO DENY FURTHER OR CONTINUOUS ACCESS TO THE SERVICE TO ANY USER OR USERS THAT VIOLATES OR ATTEMPTS TO VIOLATE ANY ASPECT OF THE TERMS OF SERVICE
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            PLEASE READ THESE TERMS OF SERVICE CAREFULLY. THE TERMS CONTAINED HEREIN CONSTITUTE A LEGALLY BINDING AGREEMENT BETWEEN WATTBA AND YOU. YOUR CONTINUOUS USE OF THIS MOBILE APP IS SUBJECT TO YOUR ACCEPTANCE WITHOUT MODIFICATION OF ALL OF THE TERMS CONTAINED HEREIN AND ALL OTHER OPERATING RULES, POLICIES (INCLUDING, WITHOUT LIMITATION, OUR PRIVACY POLICY).
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            If you are accepting these Terms of Service and using the Services on behalf of a company, or other entity, you represent and warrant that you have full power and authority to do so.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            INTRODUCTION
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            WATTBA is an online mobile platform designed specifically to connect Vendor salons, merchants, stylists and Vendors (hereon referred to as “Vendors”) providing hair and beauty services (the "Services") with clients seeking such services ("Clients").
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            THE SERVICE
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            This Mobile App has been made available solely for Vendors and Clients to connect and serves only as a medium to facilitate the provision of hair and beauty service. We do not provide or contract for Service, and Vendors and Clients contract independently for the provision of Service. The selection of a Vendor is solely at the discretion of the Client, the Service to be provided and the location at which Service will be performed, whether on the premises of a Vendor or at a site designated by the Client. Any decision by a Client to receive Service or by a Vendor to provide Service is a decision made in such person's sole discretion and at their own risk. Users understand and acknowledge that (i) We do not conduct background checks on Clients and (ii) any provision of Services in a private location inherently increases the risks involved for both Clients, Vendors and any personnel of Vendors, as applicable. Each Vendor must decide whether a Client is suited to such Vendor's services and should exercise caution and common sense to protect the personal safety and property of such Vendor and its personnel, as applicable, just as they would when interacting with anyone they don’t know. NEITHER COMPANY, ITS AFFILIATES, AGENTS, CONTRACTORS OR LICENSORS SHALL BE LIABLE FOR THE CONDUCT, WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE SERVICES AND YOU HEREBY AGREE TO INDEMNIFY AND HOLD HARMLESS THE COMPANY AND ITS AFFILIATES OR LICENSORS FROM ANY LIABILITY RELATED THERETO. COMPANY AND ITS AFFILIATES AND LICENSORS WILL NOT BE LIABLE FOR ANY CLAIM, INJURY OR DAMAGE ARISING IN CONNECTION WITH YOUR USE OF THE SERVICES.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            PAYMENT THROUGH THE MOBILE APP
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            For certain services provided to you on this platform. Vendors may require you to provide a valid payment information, and such Vendors may charge fees for reservations, including cancelled and missed appointments. By entering your payment information when requested, you authorise WATTBA and its payment processors to charge and process the fees and charges assessed in connection with your reservations in accordance with the policy described on the Vendor's page at the time of your reservation. While we take reasonable efforts to ensure secure transmission of your information to third parties who assess and process payments We will not be liable for any fees or charges placed by third parties or any errors in the processing of payments, including errors arising out of such third party’s negligence, improper transmission of payment details or an error on the end of a Client.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            If for some reasons you’re unavailable and unable to show up for the booked appointment, you may still be charged through the payment information provided by you.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            In the event of changes to your reservation, you understand that you’ll be responsible for notifying the vendor in a timely manner. You also understand that making a reservation on this Mobile App is not a guarantee that the Vendor will honour your reservation. We do not make any guarantee of the quality of the services provided to you.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            WATTBA does not independently confirm that Vendors are licensed to perform the Styling Services offered by them on our Mobile App. However, when Vendors create accounts with WATTBA, Vendors certify to WATTBA that they are a licensed Vendor, or if the Vendor is a salon, merchant or other business entity, all of such Vendor's employees, independent contractors or agents who are providing Styling Services each are a licensed Vendor, that they are legally able to provide the Styling Services they offer to Clients on our Mobile App, and that their business information is correctly represented on WATTBA. WATTBA reserves the right to remove or hide any incorrect, out of date, or illegal information from profiles, as well as remove or hide the entire profile itself at any time.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            ACCOUNT REGISTRATION
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            To use this service, you will be required to create an account. You may create an account by linking any of your social media profiles including Facebook, Google, via email or any social media platform made available during registration. By creating an account on the Mobile App, you will be granted the rights to use the service subject to the Terms of Services contained herein. Our registration process will ask you for information including your name, phone number (which will require a verification process) and other personal information. It is necessary to complete this information and other processes to access our Vendors and make reservations. While registering your account, you expressly agree that the information provided by you are true, accurate, current and complete information about yourself as prompted by the Services' registration process and as requested from time to time by WATTBA (such information, "Registration Data"). You further agree that, in providing such Registration Data, you warrant that you have not knowingly omitted or misrepresented any material facts or information. In the event of any changes to the information earlier provided by you, you understand that you’ll be responsible for providing timely update of such changes on your account.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            YOUR ACCOUNT
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            You understand that you will be responsible for any authorised or unauthorised use of your account. You are advised to keep your login credential at all times. We are not responsible for any loss, damages done to your account through unauthorised entities.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Notwithstanding, you are solely and entirely responsible for any and all activities that occur under your Account including any charges incurred relating to the Services. Should you notice any unauthorised use of your account, please contact us at soon as possible.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            TERMINATION
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            We reserve the right, in our sole discretion, to completely terminate your Account, or use of the Services, if you breach this Terms of Service, or for any reason whatsoever. We may also suspend your access to the Services and your Account (including the funds in your account) if you (a) provide any false, incomplete, inaccurate, or misleading information or otherwise be involved in fraudulent or illegal conduct or (b) for any other reason in WATTBA's sole discretion.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            You may terminate these Terms of Service and/or the EULA by terminating your Account at any time. Upon closure of an Account, any pending transactions will be cancelled.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            EFFECT OF TERMINATION
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            In the event your account is terminated for any reason whatsoever, you understand and agree that this Terms of Service shall continue to be binding on you. Notwithstanding, you agree (i) to immediately stop using this service, (ii) that any permission granted to you under these Terms of Service is terminated, You agree that WATTBA may retain and use your information and account data as needed to comply with investigations and applicable law.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            We will not be liable to you for loss, compensation/reimbursement, or damages in connection with your use of the Services, or in connection with any termination or suspension of the Services. Any termination of these Terms of Service does not relieve you of any obligations to pay any Fees or costs accrued prior to the termination and any other amounts owed by you to us as provided in these Terms of Service.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            THIRD-PARTY PAYMENT SERVICE PROVIDER
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            The Services allow Clients to pay and Vendors to accept payments for Stylist Services, including Card-based payments through a payment service provider retained by the Company.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            You authorise WATTBA to process payments in accordance with the Services, using the payment information you supplied. Users of the Service will be required to provide their credit card or bank account details to Company and the third party payment processor.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Users may be required to register with the PSP, agree to a PSP Account Agreement and the
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            UNAUTHORISED OR ILLEGAL USE
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            At our sole discretion, we may choose not to process a payment you submit if we believe such payment is in violation of this Terms of Service, is fraudulent, and is unverifiable. Should we suspect that your activities are questionable or inconsistent with the approved use of this Mobile App, we may terminate your account.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Notwithstanding, you grant us the rights to provide your information to law enforcement agencies or any government bodies upon request.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            USE OF THE SERVICES
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            We may change, modify, suspend, or discontinue all or any part of the Services at any time, with or without reason. You acknowledge that the operation of the Services may from time to time encounter technical or other problems and may not necessarily continue uninterrupted or without technical or other errors and WATTBA shall not be responsible to you or others for any such interruptions, errors or problems or an outright discontinuance of the Services. WATTBA has no obligation to maintain or update the Services or to continue producing or releasing new versions of the Services.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            We will make reasonable efforts to keep the Services operational 24 hours a day/7 days a week, except for (i) planned downtime (of which we will endeavour to provide at least 8 hours prior notice); or (ii) any unavailability caused by circumstances beyond our control, including but not limited to, acts of God, acts of government, flood, fire, earthquakes, civil unrest, acts of terror, strikes or other labour problems or Internet service provider failures or delays.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            As a User of the Services, you agree to follow all applicable rules and laws and take full responsibility for any promotion you offer via the Services.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            When you publish content or information using the "public" setting, it means that everyone, including people outside of the WATTBA community, will have access to that information, and we may not have control over what they do with it, including limiting their ability to repost or re-publish such information.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            We always appreciate your feedback or other suggestions about WATTBA, but you understand that we may use them and you hereby grant us all rights to such suggestions without any obligation to compensate you for them (just as you have no obligation to offer them).
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            We do our best to keep WATTBA safe and spam-free, but can't guarantee it. In order to help us do so, you agree not to:
                        </Text>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Send or otherwise post unauthorised commercial communications (such as spam) on the Services.
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Collect Users' content or information, or otherwise access the Services, using automated means (such as harvesting bots, robots, spiders, or scrapers) without our permission.
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Engage in unlawful multi-level marketing, such as a pyramid scheme, on the Services.
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Upload viruses or other malicious code.
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Solicit login information or Account IDs or access an account belonging to someone else.
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Bully, intimidate or harass any user.
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Post content that is hateful, threatening, pornographic or that contains nudity or graphic or gratuitous violence.
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Develop, advertise or otherwise market alcohol-related or other mature content.
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Use WATTBA to do anything unlawful, misleading, malicious, or discriminatory.
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Do anything that could disable, overburden, or impair the proper working of WATTBA or the Services, such as a denial of service attack.
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Facilitate or encourage any violations of these Terms of Service.
                                </Text>
                            </View>
                        </View>


                        <Text style={{ color: "grey", marginTop: 10 }}>
                            To make sure we are able to provide a service to our users and customers, we need to make sure our pages are accurate and up-to-date. To help us do so, you agree to:
                        </Text>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Keep your Registration Data and contact information accurate and up-to-date.
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 10,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <FontAwesome name="circle" style={{ fontSize: 8 }} />
                            </View>

                            <View style={{ flex: 8, }}>
                                <Text style={{ color: "grey", }}>
                                    Keep your Account IDs and Account information confidential and to not share your login information or Account IDs, let anyone else access your account, or do anything else that might jeopardize the security of your Account.
                                </Text>
                            </View>
                        </View>


                        <Text style={{ color: "grey", marginTop: 10 }}>
                            INTELLECTUAL PROPERTY RIGHTS
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            The Services contains content and technology of the Company that is protected by copyright, trademark, patent, trade secret and other laws. The Company owns intellectual property rights to any protectable part of the Services, including but not limited to the design, artwork, logos, functionality, and documentation (collectively, the "Company Property"). You may not copy, modify, or reverse engineer any part of the Services or the Company Property.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            In order to operate the Services, the Company needs to make certain use of your publicly posted Content. Therefore, by posting, uploading or submitting to WATTBA, or making available for inclusion in publicly accessible areas of WATTBA, any text, images, photos, graphics, audio or video, including any content protected by intellectual property rights (collectively, "Content"), you represent that you have full authorisation to do so. You also hereby grant WATTBA a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, distribute, reproduce, modify, adapt, publicly perform, publicly display and make derivative works of such Content in connection with the Services and any services or products affiliated with the Services, regardless of the form of media used or of whether such services or products now exist or are developed in the future. This license exists only for as long as you elect to continue to include such Content on WATTBA and will terminate at the time such Content is hidden or removed from the Services by you or by WATTBA; provided that the license will not terminate and will continue notwithstanding any removal of the Content or termination of your use of the Services to the extent WATTBA needs to use such Content in connection with any investigation or compliance with any laws.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            DISCLAIMERS
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. YOU ARE FULLY AND SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS AND YOU AGREE THAT IT IS SOLELY YOUR RESPONSIBILITY TO TAKE REASONABLE PRECAUTIONS IN ALL ACTIONS AND INTERACTIONS WITH VENDORS AND IN THE PROVISION OR RECEIPT OF SERVICE. WATTBA IS NOT RESPONSIBLE FOR THE CONDUCT, WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE SERVICES. WATTBA IS UNDER NO OBLIGATION TO, AND DOES NOT ROUTINELY, SCREEN ITS USERS, INQUIRE INTO THE BACKGROUND OF ITS USERS OR ATTEMPT TO VERIFY INFORMATION PROVIDED BY ANY USER. WE RESERVE THE RIGHT, BUT HAVE NO OBLIGATION, TO MONITOR DISPUTES BETWEEN YOU AND OTHER USERS. PLEASE CAREFULLY SELECT THE TYPE OF INFORMATION THAT YOU POST ON THE SERVICES OR THROUGH THE SERVICES OR RELEASE TO OTHERS. WE DISCLAIM ALL LIABILITY, REGARDLESS OF THE FORM OF ACTION, FOR THE ACTS OR OMISSIONS OF OTHER PARTICIPANTS OR USERS.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            IT IS POSSIBLE FOR OTHERS TO OBTAIN PERSONAL INFORMATION ABOUT YOU DUE TO YOUR USE OF THE SERVICES OR SERVICE, AND THAT THE RECIPIENT MAY USE SUCH INFORMATION TO HARASS OR INJURE YOU. WE ARE NOT RESPONSIBLE FOR THE USE OF ANY PERSONAL INFORMATION THAT YOU DISCLOSE ON THE SERVICES OR THROUGH THE SERVICES. YOU UNDERSTAND THAT IN USING THE SERVICES, SENSITIVE INFORMATION WILL TRAVEL THROUGH THIRD-PARTY INFRASTRUCTURE THAT IS NOT UNDER WATTBA'S CONTROL (SUCH AS THIRD-PARTY SERVERS). WATTBA MAKES NO WARRANTY WITH RESPECT TO THE SECURITY OF SUCH THIRD-PARTY INFRASTRUCTURE.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WATTBA AND ITS SUBSIDIARIES, AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, AND LICENSORS EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            WATTBA MAKES NO WARRANTY THAT (I) THE SERVICES WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS, (II) THAT YOUR ACCESS TO OR USE OF THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE, (III) THAT ANY DEFECTS IN THE SERVICES WILL BE CORRECTED, OR (IV) THAT THE SERVICES OR ANY SERVER THROUGH WHICH YOU ACCESS THE SERVICES IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            WATTBA MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE QUALITY, SUITABILITY, RELIABILITY, TIMING, DURABILITY, LEGALITY, OR ANY OTHER ASPECT OF SERVICE OFFERED OR PROVIDED BY VENDORS OR REQUESTED BY CLIENTS THROUGH USE OF THE SERVICES WHETHER IN PUBLIC, PRIVATE, OR OFFLINE INTERACTIONS OR ABOUT THE ACCREDITATION, REGISTRATION OR LICENSE OF ANY VENDOR.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICES IS ACCESSED AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM WATTBA OR THROUGH OR FROM THE SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS OF SERVICE.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            LIMITATION OF LIABILITY AND RELEASE
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WATTBA OR ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS AND LICENSORS BE LIABLE FOR ANY DAMAGES WHATSOEVER, WHETHER DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR BODILY INJURY OR EMOTIONAL DISTRESS AND DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), RESULTING FROM: (I) THE USE OR THE INABILITY TO USE THE SERVICES; (II) SERVICE FACILITATED BY THE SERVICES OR ANY INTERACTIONS BETWEEN USERS, INCLUDING WITHOUT LIMITATION ANY LIABILITIES ARISING IN CONNECTION WITH THE CONDUCT, ACT OR OMISSION OF ANY USER (INCLUDING WITHOUT LIMITATION STALKING, HARASSMENT THAT IS SEXUAL OR OTHERWISE, ACTS OF PHYSICAL VIOLENCE, AND DESTRUCTION OF PERSONAL PROPERTY) OR ANY DISPUTE WITH ANY USER; (III) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE; (IV) ANY UNAUTHORIZED ACCESS TO OR ALTERATION OF THE SERVICES OR YOUR DATA OR TRANSMISSIONS; OR (V) ANY OTHER MATTER RELATING TO THE SERVICES.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            APPLICABLE LAW; ARBITRATION
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            The Interpretation of this Agreement and any dispute between you and Company will be governed by the English and Welsh laws, without giving effect to any conflict of laws principles that may provide for the application of the law of another jurisdiction. Any dispute arising out of this Agreement shall be resolved in courts of competent jurisdiction in the United Kingdom
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            You expressly waive the right to commence a Class Action, class arbitration or representative action or proceeding against WATTBA whether the dispute is heard in arbitration or in court.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            PRIVACY POLICY
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            WATTBA may announce and amend its privacy policy on the platform of WATTBA from time to time and the privacy policy shall be an integral part of this Usage Agreement. Please refer to our Privacy Policy for information about how we collect, use and share your information.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            MISCELLANEOUS
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Entire Agreement. These Terms contain the entire agreement and supersede all prior and contemporaneous understandings between the parties regarding the Services.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Severability: If, for any reason; any part, term or provision contained herein is held by a court of competent jurisdiction to be illegal, void or unenforceable, the validity of the remaining provisions shall not be affected, and the rights and obligations of the parties shall be construed and enforced as if the Agreement did not contain the particular provision held to be invalid.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Indemnity: YOU INDEMNIFY AND HOLD WATTBA HARMLESS AGAINST ANY CLAIMS, DEMANDS, AND DAMAGES, WHETHER DIRECT, INDIRECT, CONSEQUENTIAL OR SPECIAL, OR ANY OTHER DAMAGES OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, LOSS OF USE, LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE) OR OTHERWISE, ORIGINATED FROM OR IN ANY WAY CONNECTED WITH INVALIDITY OR BREACH OF ANY OF THE WARRANTIES, REPRESENTATIONS AND COVENANTS OF THIS SECTION AND THE ENTIRE TERMS.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Any amended Terms will apply prospectively to use of the Services after such changes become effective. If you do not agree to any amended Terms, you must discontinue using our Services and contact us to terminate your account.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            No Waiver. Our failure or delay in exercising any right, power or privilege under these Terms shall not operate as a waiver thereof.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Assignment. You may not assign or transfer any of your rights or obligations under these Terms without prior written consent from WATTBA, including by operation of law or in connection with any change of control. WATTBA may assign or transfer any or all of its rights under these Terms, in whole or in part, without obtaining your consent or approval.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            Headings. Headings of sections are for convenience only and shall not be used to limit or construe such sections.
                        </Text>
                        <Text style={{ color: "grey", marginTop: 10 }}>
                            For more information, questions, complaints or concern regarding your use of this Mobile App, please feel free to contact us at: info@wattba.app
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
let mapStateToProps = state => {
    return {
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCondition);

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 70,
        backgroundColor: "white",
    },

});