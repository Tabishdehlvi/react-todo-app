import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";

// export default configureStore({
//     reducer: {
//         customer: customerSlice,
//     },
// });


export const store = configureStore({
    reducer: {
        customer: customerSlice,

    },
    devTools: true,
  });
  