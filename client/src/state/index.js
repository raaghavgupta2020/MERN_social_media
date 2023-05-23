import { createSlice } from "@reduxjs/toolkit";

const initialState = { //all the states possible in our code with their initial values
    mode : "light",
    user : null, //for users 
    token : null, //for authentication and stuff
    posts :[], // for posts 
    // ->hence all the 3 stuffs are included , we just created variables for it 
}

export const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers:{
        setMode : (state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin : (state , action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout : (state)=>{
            state.user = null;
            state.token = null;
        },
        setFriends : (state , action)=>{
            if (state.user) {
                state.user.friends = action.payload.friends;
              } else {
                console.error("user friends non-existent :(");
              }
            },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
              const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
              });
              state.posts = updatedPosts;
        },
    },
});
        
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;

//this is all the code required for setting up redux in this code 