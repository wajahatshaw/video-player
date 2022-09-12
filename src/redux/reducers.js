import { SAVE_VIDEO_LIST } from "./types";

   const initialState = {
    videos: []
    };

    function videoReducer  (state = initialState , action)  {
    switch(action.type) {
    case SAVE_VIDEO_LIST:
    return{
         ...state,
         videos: action?.payload

      }
    default:
    return state;
    }
    }
    export default videoReducer;

    