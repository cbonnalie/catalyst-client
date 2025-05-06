import React from "react";
import {AppBar, Toolbar, Button, Box} from "@mui/material";
import {Link} from "react-router-dom";
import "./styles.css";
import logo from "../../../assets/logo.png"

const LOGO = logo;

export const Header: React.FC = () => {
    return (
        <header className="header">
            <AppBar
                position="static"
                elevation={1}
                sx={{
                    minWidth: "100%",
                    height: "var(--header-height)",
                    background: "white"
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "100%", // Take full height of AppBar
                    }}
                >
                    {/* Logo */}
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <img
                            src={LOGO}
                            alt="Logo"
                            className="header-logo"
                            onClick={() => (window.location.href = "/")}

                        />
                    </Box>

                    {/* Navigation */}
                    <Box sx={{display: "flex", gap: 2}}>
                        <Button component={Link} to="/" color="primary">
                            Home
                        </Button>
                        <Button component={Link} to="/about" color="primary">
                            About
                        </Button>
                        <Button component={Link} to="/play" color="primary">
                            Play
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
};

export default Header;
