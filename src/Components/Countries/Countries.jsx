import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  Grid  from "@mui/material/Grid2";

const Country = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const countryData = await axios.get("https://xcountries-backend.azurewebsites.net/all");
                console.log(countryData.data);
                setData(countryData.data);
            } catch (e) {
                console.error("Error fetching data::", e.message)
            }
        }
        fetchData();
    }, []); // Only run once when the component mounts

    return (
        <>
            {data.length > 0 ? (
                <Grid container spacing={2}>
                {data.map((element, index) => (
                    <Grid size={{ xs: 6, md: 8 ,lg:2}}>
                    <Card sx={{ maxWidth: 345 }} key={index}>
                        <CardMedia
                            component="img"
                            alt={element.abbr} // Assuming each element has a 'name' property
                            height="140"
                            image={element.flag} // Assuming 'image' property exists
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {element.name} {/* Replace with the appropriate property */}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))
            }</Grid>
            ) : (
                <div>Loading...</div> // Show a loading message while fetching data
            )}
        </>
    );
};

export default Country;
