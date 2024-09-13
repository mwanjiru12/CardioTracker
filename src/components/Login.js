import { Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUser, ENDPOINT }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        const userObj = { username, password };

        try {
            const response = await fetch(`${ENDPOINT}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',  // Send credentials with request
                body: JSON.stringify(userObj),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.user && data.access_token) {
                localStorage.setItem('token', data.access_token);  // Store JWT in localStorage
                setUser(data.user);
                setUsername('');
                setPassword('');
                navigate('/home');
            } else {
                alert('Invalid username/password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <Container maxWidth="false">
            <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                style={{ minHeight: '95vh' }}
            >
                <Grid item xs={12} align="center">
                    <FormControl sx={{ m: 2 }}>
                        <Typography variant='h4'>Login</Typography>
                        <TextField
                            sx={{ m: 2 }}
                            required
                            id="username"
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
                        <Button sx={{ m: 2 }} onClick={handleLogin} variant="contained">Login</Button>
                        <Button variant='contained' component={Link} to="/signup">Sign Up Instead</Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;
