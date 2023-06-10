import { combineReducers, configureStore } from '@reduxjs/toolkit';
/*import { loginAPI } from './services/LoginService';*/
import moviesSliceReducer from './slices/moviesSlice';
import actorsSliceReducer from './slices/actorsSlice';
import staticDataSliceReducer from './slices/staticDataSlice';
import userSliceReducer from './slices/userSlice';
import commentsSlice from './slices/commentsSlice';

const rootReducer = combineReducers({
    /*[loginAPI.reducerPath]: loginAPI.reducer,*/
    movies: moviesSliceReducer,
    actors: actorsSliceReducer,
    staticData: staticDataSliceReducer,
    user: userSliceReducer,
    comments: commentsSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer /*,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(loginAPI.middleware);
        },*/,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
