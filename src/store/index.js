import { configureStore, createSlice } from '@reduxjs/toolkit';
const urlSlice = createSlice({
    name: "url",
    initialState: {
        url: "",
        poster: "https://www.nme.com/wp-content/uploads/2021/09/god-of-war-ragnarok-1.jpg",
        title: "God of War Ragnarök",
        descriptions: "God of War Ragnarök is an upcoming action-adventure video game developed by Santa Monica Studio and published by Sony Interactive Entertainment. It is scheduled to be released worldwide on November 9, 2022, for the PlayStation 4 and PlayStation 5.",
        counter1: 0,
        counter2: 0,
        counter3: 0,
        counter4: 0,
        counter5: 0,
        counter6: 0,
        search:"",
        comment: "",
        userComment: "",
        MovieData: "",
        uploadUrl: "https://www.dailymotion.com/video/x8eodba",
        uploadThumbnail: "",
        uploadtitle: "",
        uploaddescription: ""

    },
    reducers: {
        setSearch:(state,action) => {
            state.search = action.payload

        },
        setUserComment: (state, action) => {
            state.userComment = action.payload
        },
        setComment: (state, action) => {
            state.comment = action.payload
        },
        setUrl: (state, action) => {
            state.url = action.payload
        },
        setPoster: (state, action) => {
            state.poster = action.payload
        },
        increment: (state, actions) => {
            state.counter1++;

        },
        decrement: (state, actions) => {
            state.counter2++;
        },
        increment1: (state, actions) => {
            state.counter3++;

        },
        decrement1: (state, actions) => {
            state.counter4++;
        },
        increment2: (state, actions) => {
            state.counter5++;

        },
        decrement2: (state, actions) => {
            state.counter6++;
        },
        setTitle: (state, actions) => {
            state.title = actions.payload
        },
        setDescription: (state, actions) => {
            state.descriptions = actions.payload
        },

        setData: (state, actions) => {
            state.MovieData = actions.payload
        },
        setUrl: (state, actions) => {
            state.uploadUrl = actions.payload
        },
        setThumbnail: (state, actions) => {
            state.uploadThumbnail = actions.payload
        },
        setUploadTitle: (state, actions) => {
            state.uploadtitle = actions.payload

        },
        setUploadDesc: (state, actions) => {
            state.uploaddescription = actions.payload
        }
    }
})
export const actions = urlSlice.actions;
const store = configureStore({
    reducer: urlSlice.reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})
export default store;