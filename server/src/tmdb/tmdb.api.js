import axiosClient from '../axios/axios.client.js';
import tmdbEndpoints from './tmdb.endpoints.js';
import tmdbConfig from './tmdb.config.js';


const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) => {
    const params = { page };
    const endpoint =`${mediaType}/${mediaCategory}`;
    return await axiosClient.get(tmdbConfig.getUrl(endpoint, params));
  },
  mediaDetail: async ({ mediaType, mediaId }) => {
    const endpoint = `${mediaType}/${mediaId}`;
    return await axiosClient.get(tmdbConfig.getUrl(endpoint));
  },
  mediaGenres: async ({ mediaType }) => {
    const endpoint = `genre/${mediaType}/list`;
    return await axiosClient.get(tmdbConfig.getUrl(endpoint));
  },
  mediaCredits: async ({ mediaType, mediaId }) => {
    const endpoint = `${mediaType}/${mediaId}/credits`;
    return await axiosClient.get(tmdbConfig.getUrl(endpoint));
  },
  mediaVideos: async ({ mediaType, mediaId }) => {
    const endpoint = `${mediaType}/${mediaId}/videos`;
    return await axiosClient.get(tmdbConfig.getUrl(endpoint));
  },
  mediaImages: async ({ mediaType, mediaId }) => {
    const endpoint = `${mediaType}/${mediaId}/images`;
    return await axiosClient.get(tmdbConfig.getUrl(endpoint));
  },
  mediaRecommend: async ({ mediaType, mediaId }) => {
    const endpoint = `${mediaType}/${mediaId}/recommendations`;
    return await axiosClient.get(tmdbConfig.getUrl(endpoint));
  },
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