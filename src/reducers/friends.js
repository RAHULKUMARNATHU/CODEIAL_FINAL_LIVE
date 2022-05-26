import { ADD_FRIEND, FETCH_FRIEND_SUCCESS } from "../actions/actionTypes";

const defaultProfileState =[];

export default function friends(state = defaultProfileState ,action){
    switch(action.type){
        case FETCH_FRIEND_SUCCESS:
            return[...action.friends];

        case ADD_FRIEND:
            return  state.concat(action.friendship);

        default :
        return state;
    }
}