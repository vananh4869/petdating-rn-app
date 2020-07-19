import { SAVE_USER, UPDATE_USER, ADD_PET, UPDATE_PET, SAVE_PETS } from "../actions/type"

const initialState = {
    user: {},
    pets: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                user: action.user
            }
        case UPDATE_USER:
            const newUser = { ...state.user, ...action.user };
            return {
                ...state,
                user: newUser
            }
        case SAVE_PETS:
            return {
                ...state,
                pets: action.pets
            }
        case ADD_PET:
            const newPets = [...state.pets];
            newPets.unshift(action.pet);
            return {
                ...state,
                pets: newPets
            }
        case UPDATE_PET:
            const newPets2 = [...state.pets];
            let updatedPet = newPets2.filter(pet => pet.id == action.pet.id);
            updatedPet = { ...updatedPet, ...action.pet };

            return {
                ...state,
                pets: newPets2
            }
        default:
            return state
    }
}
export default authReducer;