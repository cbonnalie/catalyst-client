import {Header} from "../../components/common/Header/Header.tsx";
import {Link} from "react-router-dom";
import {
    Typography,
    Paper,
    Container,
    Box,
    useTheme,
    useMediaQuery,
    Button,
    Grid
} from "@mui/material";

function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Header/>
            <Container maxWidth="md" sx={{py: 4}}>
                <Paper
                    elevation={3}
                    sx={{
                        p: isMobile ? 3 : 5,
                        mb: 4,
                        borderRadius: 2,
                        backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.95))',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <Box sx={{mb: 4}}>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: isMobile ? '1.75rem' : '2.5rem',
                                color: theme.palette.primary.main,
                                mb: 2
                            }}
                        >
                            Welcome to Catalyst
                        </Typography>

                        {/*<Typography*/}
                        {/*    variant="h6"*/}
                        {/*    sx={{*/}
                        {/*        mb: 2,*/}
                        {/*        fontWeight: 400,*/}
                        {/*        color: theme.palette.text.secondary*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    Learn investing through experience*/}
                        {/*</Typography>*/}

                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    lineHeight: 1.5
                                }}
                            >
                                Catalyst is an intuitive web-based investing game developed to promote
                                and encourage the education of the US Equity Market. Designed to introduce
                                basic, yet fundamental theories of equity investing quickly and efficiently.
                                Such as Risk, Time-Value of Money, Time Horizons, and Catalyst events.
                                While providing a safe, trusted, and controlled environment to learn.
                            </Typography>
                    </Box>

                    <Grid container spacing={2} sx={{mt: 4}}>
                        <Grid size={isMobile ? 12 : 6} sx={{mb: isMobile ? 2 : 0}}>
                            <Button
                                component={Link}
                                to="/play"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                sx={{py: 1.5}}
                            >
                                Start Playing
                            </Button>
                        </Grid>
                        <Grid size={isMobile ? 12 : 6}>
                            <Button
                                component={Link}
                                to="/about"
                                variant="outlined"
                                color="primary"
                                size="large"
                                fullWidth
                                sx={{py: 1.5}}
                            >
                                Learn More
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
}

export default Home;