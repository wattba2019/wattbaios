const INITIAL_STATE = {
  //API's URL
  bseUrl: "https://fathomless-citadel-43321.herokuapp.com",
  // bseUrl: "http://192.168.43.36:3002",
  //user details
  businessType: "",
  userProfile: {},
  currentLocation: null,
  searchLocation: null,
  searchLocationName: null,
  //shop details
  shopServices: null,
  stylists: null,
  workinghours: null,
  gallery: null,
  specialPack: null,
  shop: null,
  nearByShops: null,
  favShops: [],
  shopLocationMarkers: [],
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action, "ACTIONaaaaaaa")
  switch (action.type) {
    case "SAVE_USER":
      return {
        ...state,
        userProfile: action.payload
      };
    case "USER_CURRENT_LOCATION_ACTION":
      return {
        ...state,
        currentLocation: action.payload,
        // isLoader: !state.isLoader
      };
    case "USER_SEARCH_LOCATION_ACTION":
      return {
        ...state,
        searchLocation: action.payload,
      };
    case "USER_SEARCH_LOCATION_NAME_ACTION":
      return {
        ...state,
        searchLocationName: action.payload,
      };
    case "SET_SERVICES":
      return {
        ...state,
        shopServices: action.payload,
      };
    case "SET_STYLISTS":
      return {
        ...state,
        stylists: action.payload,
      };
    case "SET_WORKINGHOURS":
      return {
        ...state,
        workinghours: action.payload,
      };
    case "SET_GALLERY":
      return {
        ...state,
        gallery: action.payload,
      };
    case "SET_SPECIAL_PACK":
      return {
        ...state,
        specialPack: action.payload,
      };
    case "SET_CURRENT_SHOP":
      return {
        ...state,
        shop: action.payload,
      };
    case "SET_NEARBY_SHOP":
      return {
        ...state,
        nearByShops: action.payload,
      };
    case "SET_FAV_SHOPS":
      return {
        ...state,
        favShops: action.payload,
      };
    case "SET_MARKERS":
      return {
        ...state,
        shopLocationMarkers: action.payload,
      };
    case "BUSINESS_TYPE":
      return {
        ...state,
        businessType: action.payload,
      };
    default:
      return state;
  }
};
