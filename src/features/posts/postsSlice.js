import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions


export const selectAllPosts = state => state.posts


export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)


export default postsSlice.reducer




//createEntityAdapter ki madad se postSlice



// import {
//   createEntityAdapter
//   // omit other imports
// } from '@reduxjs/toolkit'

// const postsAdapter = createEntityAdapter({
//   sortComparer: (a, b) => b.date.localeCompare(a.date)
// })

// const initialState = postsAdapter.getInitialState({
//   status: 'idle',
//   error: null
// })

// // omit thunks

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     reactionAdded(state, action) {
//       const { postId, reaction } = action.payload
//       const existingPost = state.entities[postId]
//       if (existingPost) {
//         existingPost.reactions[reaction]++
//       }
//     },
//     postUpdated(state, action) {
//       const { id, title, content } = action.payload
//       const existingPost = state.entities[id]
//       if (existingPost) {
//         existingPost.title = title
//         existingPost.content = content
//       }
//     }
//   },
//   extraReducers(builder) {
//     // omit other reducers

//     builder
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = 'succeeded'
//         // Add any fetched posts to the array
//         // Use the `upsertMany` reducer as a mutating update utility
//         postsAdapter.upsertMany(state, action.payload)
//       })
//       // Use the `addOne` reducer for the fulfilled case
//       .addCase(addNewPost.fulfilled, postsAdapter.addOne)
//   }
// })

// export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// export default postsSlice.reducer

// // Export the customized selectors for this adapter using `getSelectors`
// export const {
//   selectAll: selectAllPosts,
//   selectById: selectPostById,
//   selectIds: selectPostIds
//   // Pass in a selector that returns the posts slice of state
// } = postsAdapter.getSelectors(state => state.posts)

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter(post => post.user === userId)
// )