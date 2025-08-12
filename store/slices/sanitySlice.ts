import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog, Category, Dolar } from "@/app/lib/interface";

export interface SanityState {
  blogs: Blog[];
  categories: Category[];
  dolar: Dolar | null;
  loading: boolean;
  error: string | null;
}

const initialState: SanityState = {
  blogs: [],
  categories: [],
  dolar: null,
  loading: false,
  error: null,
};

const sanitySlice = createSlice({
  name: "sanity",
  initialState,
  reducers: {
    setPreloadedData: (state, action: PayloadAction<SanityState>) => {
      return { ...state, ...action.payload, loading: false, error: null };
    },
  },
});

export const { setPreloadedData } = sanitySlice.actions;
export default sanitySlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { Blog, Category, Dolar } from "@/app/lib/interface";

// interface SanityState {
//   blogs: Blog[];
//   categories: Category[];
//   dolar: Dolar | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: SanityState = {
//   blogs: [],
//   categories: [],
//   dolar: null,
//   loading: false,
//   error: null,
// };

// // Async thunks
// export const fetchBlogs = createAsyncThunk<Blog[]>(
//   "sanity/fetchBlogs",
//   async () => {
//     const res = await fetch("/api/blogs");
//     if (!res.ok) throw new Error("Error cargando blogs");
//     return await res.json();
//   }
// );

// export const fetchCategories = createAsyncThunk<Category[]>(
//   "sanity/fetchCategories",
//   async () => {
//     const res = await fetch("/api/category");
//     if (!res.ok) throw new Error("Error cargando blogs");
//     return await res.json();
//   }
// );

// export const fetchDolar = createAsyncThunk<Dolar>(
//   "sanity/fetchDolar",
//   async () => {
//     const res = await fetch("/api/dolar");
//     if (!res.ok) throw new Error("Error cargando blogs");
//     return await res.json();
//   }
// );

// // Slice
// const sanitySlice = createSlice({
//   name: "sanity",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Blogs
//       .addCase(fetchBlogs.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchBlogs.fulfilled, (state, action) => {
//         state.loading = false;
//         state.blogs = action.payload;
//       })
//       .addCase(fetchBlogs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Error cargando blogs";
//       })

//       // Categorías
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Error cargando categorías";
//       })

//       // Dólar
//       .addCase(fetchDolar.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDolar.fulfilled, (state, action) => {
//         state.loading = false;
//         state.dolar = action.payload;
//       })
//       .addCase(fetchDolar.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Error cargando valor del dólar";
//       });
//   },
// });

// export default sanitySlice.reducer;
