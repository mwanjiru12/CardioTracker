import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUser, newEventDataState } from '../recoil/atoms';

export default function NavBar({handleLogout}) {

    const [anchorEl, setAnchorEl] = React.useState(null)
    const user = useRecoilValue(currentUser)
    const setNewEventData = useSetRecoilState(newEventDataState)
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClear = () => {
        setNewEventData({
            exercise_type: "",
            calories: '',
            activity_length: '',
            distance: '',
            rating: 0,
            active_day_id: null
        })
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
            <Toolbar>
                {!user ? (null) : (
                    <Box>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem 
                                onClick={handleClose}
                                component={Link}
                                to='/home'
                            >
                                Home
                            </MenuItem>
                            <MenuItem 
                                onClick={() => {
                                    handleClose()
                                    handleClear()
                                }}
                                component={Link}
                                to='/calculator'
                            >
                                Calorie Calculator
                            </MenuItem>
                            <MenuItem 
                                onClick={handleClose}
                                component={Link}
                                to='/top_activities'
                            >
                                Your Personal Bests
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
                <img src='https://i.imgur.com/VBxxGqx.png' height={'65vh'}/>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, ml: 4 }}>
                    Cardio Tracker
                </Typography>
                {!user ? (
                    <Box>
                    <Button 
                        color="inherit"
                        component={Link}
                        to='/'
                    >
                        Login
                    </Button>
                    <Button 
                        color="inherit"
                        component={Link}
                        to='/signup'
                    >
                        Sign Up
                </Button>
                </Box>
                ) : (
                    <Box display={'flex'}>
                        <Typography alignSelf={'center'} variant="body" padding={3}>
                            Hello, {user.username}
                        </Typography>
                        <Button 
                            color="inherit"
                            onClick={handleLogout}
                            component={Link}
                            to='/'
                        >
                            Logout
                        </Button>
                    </Box>
                )}
            </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    );
}