import { Button, Grid, TextField, Typography, FormControl, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { errorMessageState, loggedInState, passwordState, usernameState } from '../recoil/atoms';

function SignUp({ setUser, ENDPOINT }) {
    const [username, setUsername] = useRecoilState(usernameState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const setLoggedIn = useSetRecoilState(loggedInState);
    const setErrorMessage = useSetRecoilState(errorMessageState);
    const navigate = useNavigate();

    function handleSignup(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const userObj = {
            username,
            password,
            name,
            location,
        };

        fetch(`${ENDPOINT}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "User created successfully") {
                return fetch(`${ENDPOINT}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
            } else {
                throw new Error('Signup failed');
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.user && data.access_token) {
                localStorage.setItem('token', data.access_token); // Store JWT in localStorage
                setUser(data.user);
                setUsername('');
                setPassword('');
                setName('');
                setLocation('');
                setLoggedIn(true);
                navigate('/home');
            } else {
                throw new Error('Login failed after signup');
            }
        })
        .catch(error => {
            setError(error.message);
            setErrorMessage(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <Grid>
            <Grid 
                container
                direction='column'
                alignItems={'center'}
                justifyContent={'center'}
                style={{ minHeight: '95vh' }}
            >
                <Grid item xs={12} align="center">
                    <FormControl sx={{ m: 2 }} component="form" onSubmit={handleSignup}>
                        <Typography variant='h4'>
                            Sign Up!
                        </Typography>
                        <TextField
                            sx={{ m: 2 }}
                            required
                            id="username"
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Username"
                        />
                        <TextField
                            sx={{ m: 2 }}
                            required
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                        />
                        <TextField
                            sx={{ m: 2 }}
                            required
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                        />
                        <TextField
                            sx={{ m: 2 }}
                            required
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            label="Location"
                        />
                        {error && <FormHelperText error>{error}</FormHelperText>}
                        <Button
                            sx={{ m: 2 }}
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                        <Button
                            variant='contained'
                            component={Link}
                            to="/"
                        >
                            Log In Instead
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SignUp;