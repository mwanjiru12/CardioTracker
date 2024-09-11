import { Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { errorMessageState, loggedInState, passwordState, usernameState } from '../recoil/atoms';

function SignUp({ setUser, ENDPOINT }) {
    const [username, setUsername] = useRecoilState(usernameState)
    const [password, setPassword] = useRecoilState(passwordState)
    const setLoggedIn = useSetRecoilState(loggedInState)
    const setErrorMessage = useSetRecoilState(errorMessageState)

    const navigate = useNavigate()

    function handleSignup(e) {
        e.preventDefault();

        const userObj = {
            user: {
                username,
                password
            }
        }


        fetch(`${ENDPOINT}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        })
        .then((r) => r.json())
        .then((r) => {
            if ((r).status ==="created") {
                fetch(`${ENDPOINT}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userObj),
                })
                .then((r) => r.json())
                .then((r) => {
                    localStorage.setItem('token', r.jwt)
                    setUser(r.user)
                    setUsername('')
                    setPassword('')
                    setLoggedIn(true)
                })
                setErrorMessage("")
                navigate('/home')
            }
        })
        .catch((r) => 
            setErrorMessage("Signup failed")
        )
    }

    return (
        <Grid >
            <Grid 
            container
            direction='column'
            alignItems={'center'}
            justifyContent={'center'}
            style={{ minHeight: '95vh'}}
        
        >
                <Grid item xs={12} align="center">
                    <FormControl sx={{ m: 2 }} >
                        <Typography variant='h4' justifySelf={'center'}>
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
                        <Button
                            sx={{ m: 2 }}
                            onClick={handleSignup}
                            variant="contained"
                        >
                            Sign Up
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

export default SignUp