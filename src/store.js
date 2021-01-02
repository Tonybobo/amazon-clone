import { createStore,compose} from 'redux';




export const getBasketTotal = (basket) => 
basket?.reduce((amount,item)=>
    item.price + amount ,0)



const InitialState = {
    basket:[],
    user:null
}

const rootReducer = (state= InitialState, action) =>{
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket,action.item],
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem)=>basketItem.id === action.id);
            let newBasket = [...state.basket];
            if(index>= 0){
                newBasket.splice(index,1)

            }else{
                console.warn(`Can't remove product(id:${action.id})as it is not in basket!`)
            }
            return{
                ...state,
                basket:newBasket
            }
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            }    
        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }    
        
        default:
            return state;
    }
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =  createStore(rootReducer, InitialState, composeEnhancer());
export default store