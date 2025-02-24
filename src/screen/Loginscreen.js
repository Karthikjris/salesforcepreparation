import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button, InputAdornment, Snackbar, Alert } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import salesforcesimg from "../assets/salesforceimg.png";
import rislogo from "../assets/rislogo.png";
import userLoginData from "../services/userlogin.json";

const LoginScreen = () => {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const [successSnackbar, setSuccessSnackbar] = useState(false);

    // Formik for form handling & validation
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "Username must be at least 3 characters")
                .required("Username is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: (values) => {
            // Check if the entered credentials match any user in the JSON file
            const user = userLoginData.users.find(
                (user) =>
                    user.username === values.username &&
                    user.password === values.password
            );

            if (user) {
                setSuccessSnackbar(true); 
        setTimeout(() => {
            navigate("/pdf-viewer"); 
        }, 500);
            } else {
                setOpenSnackbar(true); 
            }
        },
    });

    // Function to close the Snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return; // Do not close Snackbar if the user clicks away
        }
        setOpenSnackbar(false); // Close Snackbar
    };

    const handleCloseSuccessSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessSnackbar(false);
    };

    return (
        <Grid container style={{ height: "100vh", justifyContent: "center", alignItems: "center", background: "#7bb0c9" }}>
            <Grid container style={{ height: "80%", width: "90%", borderRadius: "20px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>

                {/* Left Side - Background Image & Info */}
                <Grid
                    item
                    xs={15}
                    md={7}
                    style={{
                        backgroundImage: `url(${salesforcesimg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                    }}
                >
                    <Typography variant="h5" gutterBottom style={{ color: "#03122b", fontWeight: "bold", marginTop: "-100px" }}>
                        Welcome to RIS Interview Preparation Portal
                    </Typography>
                    <Typography variant="body1" style={{ maxWidth: "80%", textAlign: "center", marginBottom: "16px",marginTop:"150px", fontWeight: "bold", color: "#8a1c55" }}>
                        Access expert guidelines, tips, and resources designed to help you succeed in your interview journey.
                    </Typography>
                    <Typography variant="body1" style={{ maxWidth: "80%", textAlign: "center", fontWeight: "bold", color: "#8a1c55" }}>
                        Get all the tools, mock questions, and insights you need to shine in your next interview.
                    </Typography>
                </Grid>

                {/* Right Side - Login Form */}
                <Grid item xs={9} md={5} style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#bde1f2" }}>
                    <Paper
                        elevation={5}
                        style={{
                            padding: "2rem",
                            width: "70%",
                            height: "70%",
                            maxWidth: "400px",
                            borderRadius: "20px",
                            backgroundColor: "#f7f9fa",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            textAlign: "center",
                        }}
                    >
                        {/* Company Logo */}
                        <img src={rislogo} alt="Company Logo" style={{ width: "100px", marginBottom: "1rem" }} />

                        {/* Login Form */}
                        <form onSubmit={formik.handleSubmit}>
                            {/* Username Field */}
                            <TextField
                                fullWidth
                                placeholder="Username"
                                margin="normal"
                                variant="outlined"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle style={{ color: "#0061F2" }} />
                                        </InputAdornment>
                                    ),
                                    style: {
                                        backgroundColor: "#e1f1ff",
                                        borderRadius: "25px",
                                        border: "none",
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                    },
                                    disableUnderline: true,
                                }}
                            />

                            {/* Password Field */}
                            <TextField
                                fullWidth
                                placeholder="Password"
                                type="password"
                                margin="normal"
                                variant="outlined"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock style={{ color: "#0061F2" }} />
                                        </InputAdornment>
                                    ),
                                    style: {
                                        backgroundColor: "#e1f1ff",
                                        borderRadius: "25px",
                                        border: "none",
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                    },
                                    disableUnderline: true,
                                }}
                            />

                            {/* Login Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                style={{
                                    marginTop: "1.5rem",
                                    background: "linear-gradient(135deg, #0061F2, #4f85e4)",
                                    color: "white",
                                    borderRadius: "25px",
                                    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
                                    fontWeight: "bold",
                                }}
                            >
                                LOGIN
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

            {/* Snackbar for Error Message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Snackbar will close after 6 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position of the Snackbar
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error" // Use "error" for invalid credentials
                    sx={{ width: "100%" }}
                >
                    Invalid username or password!
                </Alert>
            </Snackbar>

            <Snackbar
    open={successSnackbar}
    autoHideDuration={3000} // Snackbar will close after 3 seconds
    onClose={handleCloseSuccessSnackbar}
    anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position of the Snackbar
>
    <Alert
        onClose={handleCloseSuccessSnackbar}
        severity="success" // Success alert style
        sx={{ width: "100%" }}
    >
        Login Successful! Redirecting...
    </Alert>
</Snackbar>
        </Grid>
    );
};

export default LoginScreen;