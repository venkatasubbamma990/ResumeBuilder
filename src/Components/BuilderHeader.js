import React, { useState, useContext, useEffect, useRef } from "react";
import ResumeContext from "./ResumeContext";
import {
  Button,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Formik, Field } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";
import axios from "axios";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import BuilderSummary from "./BuilderSummary";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const BuilderHeader = (props) => {
  const formikRef = useRef();
  const contextObject = useContext(ResumeContext);
  const [ipAddress, setIpAddress] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [currentUserdetails, setCurrentuserDetails] = useState(null);
  const [showPassword , setShowPassword] = useState(false)


 

  useEffect(() => {
    // Fetching IP address and updating context
    axios.get(`https://api.ipify.org/?format=text`).then(
      async (response) => {
        let ipaddress = response.data;
        setIpAddress(ipaddress);
      },
      [props.value]
    );

   
  }, []);

  


  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    setPhoneNo(String(phoneNumber));
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };
  const handlePhoneNumberChange = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setPhoneNo(formattedPhoneNumber);
    contextObject.updatePhone(formattedPhoneNumber);
    formikRef.current.setFieldValue("phone", formattedPhoneNumber);
  };

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (field, value) => {
    console.log(field , value)
    if (field === 'name') {
      contextObject.updateName(value);
      console.log(contextObject)
      formikRef?.current?.setFieldValue('name', value);
    } else if (field === 'jobTitle') {
      formikRef?.current?.setFieldValue('jobTitle', value);
      contextObject.updateJobTitle(value);
      console.log("title", contextObject.jobTitle);
    } else if (field === 'email') {
      formikRef.current.setFieldValue('email', value);
      contextObject.updateEmail(value);
    }  else if (field === 'password') {
      formikRef.current.setFieldValue('password', value);
      contextObject.updatePassword(value);
    }else if (field === 'experience') {
      formikRef.current.setFieldValue('experience', value);
      contextObject.updateExperience(value);
      console.log("exper", contextObject.experience);
    }
  };

  const submitForm = () => {
    // console.log(fields)
    // const { name, jobTitle, email, phone, experience } = fields;
  
    const usertype = sessionStorage.getItem("usertype");
    const userId = sessionStorage.getItem("id");
  
    if (contextObject.name !== "" && contextObject.jobTitle !== "" && contextObject.email !== "" &&
      contextObject.phone !== "" && contextObject.password !== "" && contextObject.experience !== "") {
      if (usertype === "5" || usertype === "3") {
        props.setValue(1)
      } 
    } else {
      alert("Please fill all the Required Fields")
    }
  
   
  };
  

  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #e6e1e1",
        borderRadius: "10px",
        borderTop: "3px solid #406682",
        boxShadow: "0 0 2px grey",
      }}
    >
      {/* {
                JSON.stringify(contextObject)
            } */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              background: 'linear-gradient(-90deg, #89bcdf 10%, #406882 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontWeight: "bold",
            }}
          >
            Personal Details
          </Typography>
          <Typography sx={{ color: "grey" }}>
            🌟 Furnish your name and contact details to initiate!.
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={handleClick}
            variant="outlined"
            color="primary"
            startIcon={<TipsAndUpdatesIcon />}
            style={{
              borderRadius: "50px",
            }}
          >
            Quick Tips
          </Button>
          <Dialog
            open={openDialog}
            onClose={handleClose}
            sx={{ boxShadow: "0 0 2px black" }}
          >
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "15px" }}>
              Quick Tips for Job Seekers
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <AiOutlineCloseCircle />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" sx={{ pb: 2, fontSize: "13px" }}>
                Ensure your contact information is prominently placed at the top
                of your resume. Include your name, email, phone number, city,
                and state using a header with an appropriate text size for
                optimal presentation.
              </Typography>
              <List
                sx={{
                  fontSize: "12px",
                  textAlign: "justify",
                  bgcolor: "#eff2f9",
                }}
              >
                <ListItem>
                  Summarize your professional background, skills, and career
                  goals. Tailor it to the job you're applying for.
                </ListItem>
                <ListItem>
                  Use a professional email address that includes your name if
                  possible (e.g., john.doe@email.com).Ensure your LinkedIn
                  profile is up-to-date and complements your resume.
                </ListItem>
                <ListItem>
                  Showcase a professional portfolio or industry-relevant website
                  with a hyperlink or URL in your contact information.
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>

      <Formik
        innerRef={formikRef}
        initialValues={{
          name: contextObject.name || "",
          jobTitle: contextObject.jobTitle || "",
          email: contextObject.email || "",
          phone: contextObject.phone || "",
          experience: contextObject.experience || "",
          jobTypeId: contextObject.jobType || [],
          visaTypeId: contextObject.visaType || [],
          selectedFile: null,
          password: contextObject.password || "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Full Name is required"),
          jobTitle: Yup.string().required("Job Title is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Please enter a valid Email")
            .matches(
              /^[a-zA-Z0-9_.+-]+@((gmail|yahoo|hotmail|outlook|myyahoo|icloud))/,
              " Business emails are not allowed "
            ),
            password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password must not exceed 20 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(
              /[!@#$%^&*(),.?":{}|<>]/,
              "Password must contain at least one special character"
            ),
          phone: Yup.string().required("Phone number is required"),
          experience: Yup.number()
            .typeError("Experience must be a number")
            .required("Experience is required")
            .positive("Experience must be a positive number")
            .integer("Experience must be an integer"),
        })}
        onSubmit={(fields, { setSubmitting }) => {
          setSubmitting(true);
          submitForm(fields, { setSubmitting });
        }}
        render={({ errors, touched, values, handleSubmit, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <label htmlFor="name" style={{ fontSize: "14px" }}>
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  //placeholder="Full Name"
                  autoComplete="off"
                  className={` form-control ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <label htmlFor="jobTitle" style={{ fontSize: "14px" }}>
                  Job Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  //placeholder="Job Title"
                  autoComplete="off"
                  className={`form-control ${
                    touched.jobTitle && errors.jobTitle ? "is-invalid" : ""
                  }`}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  onBlur={handleBlur}
                  value={contextObject.jobTitle}
                />
                {touched.jobTitle && errors.jobTitle && (
                  <div className="invalid-feedback">{errors.jobTitle}</div>
                )}
              </Grid>

              <Grid item xs={12} md={6} style={{ fontSize: "14px" }}>
                <label htmlFor="email">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  //placeholder="Email"
                  autoComplete="off"
                  className={` form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={handleBlur}
                  value={contextObject?.email}
                />
                {touched.email && errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </Grid>

              <Grid item xs={12} md={6} style={{ fontSize: "14px" }}>
                <label htmlFor="phone">
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    className={`form-control ${
                      touched.password && errors.password ? "is-invalid" : ""
                    }`}
                    value={contextObject.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={handleBlur}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? <VisibilityOff sx={{fontSize:"17px"}} /> : <Visibility  sx={{fontSize:"17px"}}/>}
                  </span>
                </div>
                {touched.password && errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </Grid>

              <Grid item xs={12} md={6} style={{ fontSize: "14px" }}>
                <label htmlFor="phone">
                  Phone <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  // placeholder="Phone Number"
                  autoComplete="off"
                  className={` form-control ${
                    touched.phone && errors.phone ? "is-invalid" : ""
                  }`}
                  onChange={(event) =>
                    handlePhoneNumberChange(event.target.value)
                  }
                  onBlur={handleBlur}
                  value={contextObject.phone}
                />
                {touched.phone && errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <label htmlFor="experience" style={{ fontSize: "14px" }}>
                  Experience <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  // placeholder="Experience"
                  autoComplete="off"
                  className={` form-control ${
                    touched.experience && errors.experience ? "is-invalid" : ""
                  }`}
                  value={contextObject.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  onBlur={handleBlur}
                />
                {touched.experience && errors.experience && (
                  <div className="invalid-feedback">{errors.experience}</div>
                )}
              </Grid>

            
              {/* <Grid item xs={12}>
                <BuilderSummary />
              </Grid> */}

              <Grid item xs={12}>
                <Button 
                  //type="submit"
                  variant="contained"
                  size="small"
                  style={{
                    float: "right",
                    backgroundColor: "#406882",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                  //onClick={submitForm}
                  onClick={()=>props.setValue(1)}
                >
                  Next <ArrowForwardIcon style={{ fontSize: "15px" }} />
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Box>
  );
};

export default BuilderHeader;
