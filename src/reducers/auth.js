import { SAVE_USER, UPDATE_USER, ADD_PET, UPDATE_PET, SAVE_PETS, DELETE_PET } from "../actions/type"

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
        case DELETE_PET:
            console.log('A', action.petId)
            const newPets3 = [...state.pets];
            // const  = newPets3.filter(pet => pet.id !== action.petId)
            // console.log(newPets3)

            return {
                ...state,
                pets: newPets3.filter(pet => pet.id !== action.petId)
            }
        default:
            return state
    }
}
export default authReducer;