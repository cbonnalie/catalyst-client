import {Header} from "../../components/common/Header/Header.tsx";
import {
    Typography,
    Paper,
    Container,
    Box,
    useTheme,
    useMediaQuery
} from "@mui/material";

function About() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Header/>
            <Container maxWidth="md" sx={{py: 4}}>
                <Paper elevation={3} sx={{p: isMobile ? 3 : 5, mb: 4}}>
                    <Box sx={{mb: 4}}>
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                fontSize: isMobile ? '2rem' : '2.5rem',
                                color: theme.palette.primary.main
                            }}

                        >
                            Catalyst Team
                        </Typography>
                    </Box>

                    <Box sx={{mb: 4}}>
                        <Typography
                            variant="h6"
                            component="h2"
                            gutterBottom
                        >
                            Evan Garner, Founder
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontStyle: 'italic',
                                color: theme.palette.text.secondary,
                                fontSize: isMobile ? '.9rem' : '1rem'
                            }}
                        >
                            Junior at UWT, Finance major.
                        </Typography>
                    </Box>

                    <Box sx={{mb: 4}}>
                        <Typography
                            variant="h6"
                            component="h2"
                            gutterBottom
                        >
                            Christian Bonnalie, Developer
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontStyle: 'italic',
                                color: theme.palette.text.secondary,
                                fontSize: isMobile ? '.9rem' : '1rem'
                            }}
                        >
                            Senior at UWT, Computer Science major.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body1">
                            As co-workers and students at UWT we thought it would be a fun and exciting idea to
                            brainstorm and execute a business idea together and see how far we could take an idea into
                            the real
                            world. Using this as an opportunity to apply what we've learned and gain experience in
                            entrepreneurship.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default About;