import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/app/lib/sanity";
import { Blog } from "@/app/lib/interface";

// Tipos
// interface Blog {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   publishedAt?: string;
//   mainImage?: any;
//   excerpt?: string;
//   body?: any;
//   categories?: any[];
// }

interface Category {
  _id: string;
  title: string;
  description?: string;
  slug: { current: string };
}

interface Dolar {
  _id: string;
  valor: number;
  fecha: string;
}

interface SanityState {
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

// Async thunks
export const fetchBlogs = createAsyncThunk<Blog[]>(
  "sanity/fetchBlogs",
  async () => {
    return await client.fetch(`*[_type == "blog"]{
    _id,
    title,
    focusTitle,
    continueTitle,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    body,
    categories[]->{
      _id,
      title,
      slug
    }
  } | order(publishedAt desc)`);
  }
);

export const fetchCategories = createAsyncThunk<Category[]>(
  "sanity/fetchCategories",
  async () => {
    return await client.fetch(`*[_type == "category"]{
    _id,
    title,
    description,
    slug
  } | order(title asc)`);
  }
);

export const fetchDolar = createAsyncThunk<Dolar>(
  "sanity/fetchDolar",
  async () => {
    return await client.fetch(`*[_type == "dolar"] | order(fecha desc)[0]`);
  }
);

// Slice
const sanitySlice = createSlice({
  name: "sanity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error cargando blogs";
      })

      // Categorías
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error cargando categorías";
      })

      // Dólar
      .addCase(fetchDolar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDolar.fulfilled, (state, action) => {
        state.loading = false;
        state.dolar = action.payload;
      })
      .addCase(fetchDolar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error cargando valor del dólar";
      });
  },
});

export default sanitySlice.reducer;
