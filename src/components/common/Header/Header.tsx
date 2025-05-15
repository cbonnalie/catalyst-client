import React from "react";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";
import "./styles.css";
import logo from "../../../assets/logo.png"

const AppBarContainer: React.FC = () => {
    return (
        <AppBar
            position="static"
            elevation={1}
            sx={{
                minWidth: "100%",
                height: "var(--header-height)",
                background: "white"
            }}
        >
            <ToolbarContainer/>
        </AppBar>
    )
}

const ToolbarContainer: React.FC = () => {
    return (
        <Toolbar
            disableGutters
            sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
            }}
        >
            <LogoContainer/>
            <NavContainer/>
        </Toolbar>
    )
}

const LogoContainer: React.FC = () => {
    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <img
                src={logo}
                alt="Logo"
                className="header-logo"
                onClick={() => (window.location.href = "/")}

            />
        </Box>
    )
}

const NavContainer: React.FC = () => {
    return (
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
    )
}

export const Header: React.FC = () => {
    return (
        <header className="header">
            <AppBarContainer/>
        </header>
    );
};

export default Header;
