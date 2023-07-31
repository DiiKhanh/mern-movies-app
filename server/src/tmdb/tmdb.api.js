import axiosClient from '../axios/axios.client.js';
import tmdbEndpoints from './tmdb.endpoints.js';
import tmdbConfig from './tmdb.config.js';


const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) => {
    // const res = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${mediaCategory}?page=${page}&api_key=07b70ac4a606c4d5df330e47c9b05fdd`);
    // console.log(res.data.data);
    // return res.data;
    // return await axiosClient.get(tmdbEndpoints.mediaList({ mediaType, mediaCategory, page }));
    const params = { page };
    const endpoint =`${mediaType}/${mediaCategory}`;
    // const qs = new URLSearchParams(params);
    // console.log('qs', { qs });
    // console.log('getUrl', tmdbConfig.getUrl(endpoint, params) );
    // const url = `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
    // console.log('getUrl', url);
    return await axiosClient.get(tmdbConfig.getUrl(endpoint, params));
    // console.log(res.data);
    // console.log('getUrl endpoint', tmdbEndpoints.mediaList({ mediaType, mediaCategory, page }));
    // return response.data;
  },
  mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaDetail({ mediaType, mediaId })
  ),
  mediaGenres: async ({ mediaType }) => {
    const endpoint = `genre/${mediaType}/list`;
    return await axiosClient.get(tmdbConfig.getUrl(endpoint));
  },
  mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaCredits({ mediaType, mediaId })
  ),
  mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaVideos({ mediaType, mediaId })
  ),
  mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaImages({ mediaType, mediaId })
  ),
  mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaRecommend({ mediaType, mediaId })
  ),
  mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
    tmdbEndpoints.mediaSearch({ mediaType, query, page })
  ),
  personDetail: async ({ personId }) => await axiosClient.get(
    tmdbEndpoints.personDetail({ personId })
  ),
  personMedias: async ({ personId }) => await axiosClient.get(
    tmdbEndpoints.personMedias({ personId })
  )
};

export default tmdbApi;