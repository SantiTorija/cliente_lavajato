import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {},
  reducers: {
    addClient(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.marca = action.payload.car.marca;
      state.modelo = action.payload.car.modelo;
      state.carType = action.payload.car.carType;
      state.carTypeId = action.payload.car.carTypeId
        ? action.payload.car.carTypeId
        : action.payload.carTypeId;
      state.clientId = action.payload.id;
    },
    removeClient(state) {
      Object.keys(state).forEach((key) => delete state[key]);
    },
    updateClientField: (state, action) => {
      const { field, value } = action.payload;

      if (["firstname", "lastname", "email", "phone"].includes(field)) {
        state[field] = value;
      }

      if (["marca", "modelo", "carType", "carTypeId"].includes(field)) {
        state[field] = value;
      }
    },
  },
});

const { actions, reducer } = clientSlice;
export const { addClient, removeClient, updateClientField } = actions;

export default reducer;
