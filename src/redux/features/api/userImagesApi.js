import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userImagesApi = createApi({
  reducerPath: "userImagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getUserImage: builder.query({
      queryFn: async (photoURL) => {
        try {
          if (!photoURL) {
            return {
              data: "https://ui-avatars.com/api/?name=User&background=random",
            };
          }

          // Try to fetch the image
          const response = await fetch(photoURL);
          if (!response.ok) throw new Error("Image load failed");

          return { data: photoURL };
        } catch (error) {
          // If the image fails to load, return a default image
          return {
            data: "https://ui-avatars.com/api/?name=User&background=random",
          };
        }
      },
      // Keep cached for 5 minutes
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetUserImageQuery } = userImagesApi;
