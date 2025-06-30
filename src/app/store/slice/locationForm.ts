import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RootState {
  locationForm: LocationFormState // твой срез
}
interface LocationFormState {
  form: {
    city?: string
    method?: number
  } | null
}

const initialState: LocationFormState = {
  form: null,
}

const locationFormSlice = createSlice({
  name: 'locationForm',
  initialState,
  reducers: {
    setLocationForm(
      state,
      action: PayloadAction<{ city: string; method?: number }>
    ) {
      state.form = {
        city: action.payload.city,
        method: action.payload.method || 4,
      }
    },
  },
})

export const { setLocationForm } = locationFormSlice.actions
export default locationFormSlice.reducer
// import { createSlice } from '@reduxjs/toolkit'

// const initialState= {
//    form: { city: '', method: ''},
// //    user: JSON.parse(localStorage.getItem('user') || 'null'),
// }
// const locationFormSlice = createSlice({
//    name: 'locationForm',
//    initialState,
//    reducers: {
//       setLocationForm: (state, action) => {

//          state.form = action.payload

//       },

//    },
// })

// export const { setLocationForm } = locationFormSlice.actions

// export default locationFormSlice.reducer
