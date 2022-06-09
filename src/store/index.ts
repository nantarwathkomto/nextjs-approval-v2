// import { configureStore } from '@reduxjs/toolkit'

// import email from './email'

// export const store = configureStore({
//     reducer: { email },
//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware({
//             serializableCheck: false
//         })
// })

// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import email from 'src/store/ERP'
import user from 'src/store/apps/user'

export const store = configureStore({
    reducer: {
        email,
        user
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
