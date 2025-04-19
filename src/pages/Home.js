import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import AuthContext from '../context/AuthContext';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0, 6),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <HeroSection>
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Fresh Harvest
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Quality Vegetables & Fruits for Bulk Orders
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/products"
              sx={{ mx: 1 }}
            >
              Browse Products
            </Button>
            {isAuthenticated ? (
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={RouterLink}
                to="/place-order"
                sx={{ mx: 1 }}
              >
                Place Order
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={RouterLink}
                to="/register"
                sx={{ mx: 1 }}
              >
                Sign Up
              </Button>
            )}
          </Box>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1542838132-92c53300491e"
                alt="Fresh Produce"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Fresh Produce
                </Typography>
                <Typography>
                  We source our products directly from farms to ensure maximum freshness.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0"
                alt="Bulk Orders"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Bulk Orders
                </Typography>
                <Typography>
                  Specialized in handling large orders for businesses and events.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1526367790999-0150786686a2"
                alt="Fast Delivery"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Fast Delivery
                </Typography>
                <Typography>
                  Quick and reliable delivery service to meet your schedule.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;