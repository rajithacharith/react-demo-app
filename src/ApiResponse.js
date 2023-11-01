import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';

import React, { useState } from "react";
import { performGetWithRetry } from './api/ApiClient';
import './App.css';

const apiUrl = window.config.apiPrefix + window.config.itemsEndpoint;

function ApiResponse() {
    const [response, setResponse] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const fetchResponse = () => {
        setIsFetching(true);
        setError(null);
        performGetWithRetry(apiUrl)
            .then(response => {
                // Handle the successful response
                setResponse(JSON.parse(response));
            })
            .catch(error => {
                // Handle the error
                setResponse(null);
                setError(error);
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    return (
        <>
            <Typography level='body1'>
                Click the Try API Call button to try out an API call to the Items API.
            </Typography>
            <br />
            {isFetching ?
                <CircularProgress variant="plain" />
                :
                <>
                    <Button color="primary" variant="outlined" onClick={fetchResponse}>
                        Try
                    </Button>
                    {
                        response &&
                        <Button color="danger" variant="outlined" onClick={() => setResponse(null)}>
                            Clear
                        </Button>
                    }
                    <br />
                    <pre style={{ maxWidth: '100%', overflowX: 'auto' }}>{response}</pre>
                </>
            }
            {
                error && 
                <Typography  color="danger" variant="solid">
                    API call failed:
                    <br />
                    {error.message}
                </Typography>
            }
        </>
    );
}

export default ApiResponse;