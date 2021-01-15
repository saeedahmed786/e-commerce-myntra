import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import axios from 'axios';


const initialState = {

}


/**************************************Constants **********************************************/
const WOMEN_CATEGORY_LIST_REQUEST = 'WOMEN_CATEGORY_LIST_REQUEST';
const WOMEN_CATEGORY_LIST_SUCCESS = 'WOMEN_CATEGORY_LIST_SUCCESS';
const WOMEN_CATEGORY_LIST_FAILURE = 'WOMEN_CATEGORY_LIST_FAILURE';
const MEN_CATEGORY_LIST_REQUEST = 'MEN_CATEGORY_LIST_REQUEST';
const MEN_CATEGORY_LIST_SUCCESS = 'MEN_CATEGORY_LIST_SUCCESS';
const MEN_CATEGORY_LIST_FAILURE = 'MEN_CATEGORY_LIST_FAILURE';

/*********************************Category and Sub-Category Reducers********************************************************/ 


const getMenCategoryListReducer = (state =  {menCategories: []}, action) => {
    switch(action.type) {
        case MEN_CATEGORY_LIST_REQUEST:
            return{
                loading: true,
        };
        case MEN_CATEGORY_LIST_SUCCESS:
            return{
                loading: false,
                menCategories: action.payload,
                success: true
            };
        case MEN_CATEGORY_LIST_FAILURE:
            return{
                loading: false,
                error: action.payload,
            };

        default: return state;


    }
 }
 const getWomenCategoryListReducer = (state =  {womenCategories: []}, action) => {
    switch(action.type) {
        case WOMEN_CATEGORY_LIST_REQUEST:
            return{
                loading: true,
        };
        case WOMEN_CATEGORY_LIST_SUCCESS:
            return{
                loading: false,
                womenCategories: action.payload,
                success: true
            };
        case WOMEN_CATEGORY_LIST_FAILURE:
            return{
                loading: false,
                error: action.payload,
            };

        default: return state;


    }
 }


 export const getMenCategories = () => async (dispatch) => {
     try {
         dispatch({type: MEN_CATEGORY_LIST_REQUEST});
         const  {data}  = await axios.get('/api/categories/men');
         dispatch({type: MEN_CATEGORY_LIST_SUCCESS, payload: data});
     } catch(error) {
         dispatch({type: MEN_CATEGORY_LIST_FAILURE, payload: error.errorMessage});

     }
 }

 export const getWomenCategories = () => async (dispatch) => {
    try {
        dispatch({type: WOMEN_CATEGORY_LIST_REQUEST});
        const {data}   = await axios.get('/api/categories/women');
        dispatch({type: WOMEN_CATEGORY_LIST_SUCCESS, payload: data});
    } catch(error) {
        dispatch({type: WOMEN_CATEGORY_LIST_FAILURE, payload: error.errorMessage});

    }
}


 /*****************************************Combining Redcers******************************************/

 const reducer = combineReducers({
     men: getMenCategoryListReducer,
     women: getWomenCategoryListReducer
 });

 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunkMiddleWare)));
 export default store;