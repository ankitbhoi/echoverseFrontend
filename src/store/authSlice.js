import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user: null,
        otp: {
            phone: '',
            hash: '',
            email: ''
        }
    },
    reducers: {
        setAuth: (state, action) => {
            const { user } = action.payload
            state.user = user;
            if (!user) {
                state.isAuth = false;
            } else {
                state.isAuth = true;
            }
        },
        setOtp: (state, action) => {
            const { phone, hash, email } = action.payload;
            state.otp.phone = phone;
            state.otp.hash = hash;
            state.otp.email = email;
        }
    }
})

export const { setAuth, setOtp } = authSlice.actions

export default authSlice.reducer
