import ImageHeader from '../components/common/ImageHeader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';
import mediaApi from '../apis/modules/media.api';
import { toast } from 'react-toastify';
import tmdbConfigs from '../apis/configs/tmdb.configs';
import { Box, Button, Stack, Typography, Divider, Chip } from '@mui/material';
import uiConfigs from '../configs/ui.configs';
import CircularRate from '../components/common/CircularRate';
import { LoadingButton } from '@mui/lab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Container from '../components/common/Container';
import CastSlide from '../components/common/CastSlide';

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const dispatch = useDispatch();
  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));
      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }
      if (err) toast.error(err.message);
    };
    getMedia();
  }, [mediaType, mediaId, dispatch]);

  return (
    media ? (
      <>
        <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} />
        <Box sx={{ color: 'primary.contrastText',
          ...uiConfigs.style.mainContent }} >
          {/* media content */}
          <Box sx={{
            marginTop: { xs: '-10rem', md: '-15rem', lg: '-20rem' }
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' }
            }}>
              {/* poster */}
              <Box sx={{
                width: { xs: '70%', sm: '50%', md: '40%' },
                margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' }
              }}>
                <Box sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                }} />
              </Box>
              {/* poster */}
              {/* media info */}
              <Box sx={{
                width: { xs: '100%', md: '60%' },
                color: 'text.primary'
              }}>
                <Stack spacing={5}>
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                    fontWeight="700"
                    sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
                  >
                    {`${media.title || media.name} ${mediaType === tmdbConfigs.mediaType.movie ? media.release_date.split('-')[0] : media.first_air_date.split('-')[0]}`}
                  </Typography>
                  {/* title */}

                  {/* rate and genres */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rate */}
                    <CircularRate value={media.vote_average} />
                    {/* rate */}
                    <Divider orientation="vertical" />
                    {/* genres */}
                    {genres.map((genre, index) => (
                      <Chip
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={index}
                      />
                    ))}
                    {/* genres */}
                  </Stack>
                  {/* rate and genres */}

                  {/* overview */}
                  <Typography
                    variant="body1"
                    sx={{ ...uiConfigs.style.typoLines(5) }}
                  >
                    {media.overview}
                  </Typography>
                  {/* overview */}
                  {/* buttons */}
                  <Stack direction="row" spacing={1}>
                    <LoadingButton
                      variant="text"
                      sx={{
                        width: 'max-content',
                        '& .MuiButon-starIcon': { marginRight: '0' }
                      }}
                      size="large"
                      startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                      loadingPosition="start"
                      loading={onRequest}
                      // onClick={onFavoriteClick}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: 'max-content' }}
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      onClick={() => videoRef.current.scrollIntoView()}
                    >
                      watch now
                    </Button>
                  </Stack>
                  {/* buttons */}
                  {/* cast */}
                  {media.credits?.cast < 1 ? (
                    <Container header="Cast">
                      <div className="swiper-wrapper">
                        {' '}
                      There is no cast for this content.{' '}
                      </div>
                    </Container>
                  ) : (
                    <Container header="Cast">
                      <CastSlide casts={media.credits?.cast} />
                    </Container>
                  )}
                  {/* cast */}
                </Stack>
              </Box>
            </Box>
            {/* media content */}
          </Box>
        </Box>
      </>
    ) : null
  );
};

export default MediaDetail;