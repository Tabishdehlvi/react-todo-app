import { setDataInLocalStorage } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customers: [],
    },

     reducers: {
        initializeCustomers: (state, action) => {

                state.customers = action.payload;
                setDataInLocalStorage("customers", JSON.stringify(action.payload))
        },
        addCustomer: (state, action) => {
            let updatedList = [...state.customers, action.payload];
            state.customers = updatedList;
            setDataInLocalStorage("customers", JSON.stringify(updatedList))
        },
        updateCustomer: (state, action) => {
            let customerToUpdate = action.payload;

            let updatedList = state.customers.map(customer => {
                if(customer.id === customerToUpdate.id){
                    return customerToUpdate;
                }

                return customer;
            })


            
            
            state.customers = updatedList;
            setDataInLocalStorage("customers", JSON.stringify(updatedList))
        },
        deleteCustomer: (state, action) => {
            const updatedList = state.customers.filter(
                (customer) => customer.id !== action.payload.id
            );
                state.customers = updatedList;
                setDataInLocalStorage("customers", JSON.stringify(updatedList))
            },
        }

})

export const { initializeCustomers, addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;

export default customerSlice.reducer;