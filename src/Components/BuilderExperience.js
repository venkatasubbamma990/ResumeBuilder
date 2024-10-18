import React, { useContext, useState, useEffect, useRef,useCallback } from 'react';
import ResumeContext from './ResumeContext';
import axios from 'axios';
import { debounce } from 'lodash';
import Autocomplete from '@mui/material/Autocomplete';
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
  Select,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Alert,
  AlertTitle,
  LinearProgress,
 
} from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MdOutlineDelete } from 'react-icons/md';
import { BsArrowLeftCircle } from "react-icons/bs";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import Key from '../clientVariables.json';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from "html-react-parser";
//import Select from "react-select";
import * as Yup from "yup";
//import { openAI } from "../Components/OpenAIComponent";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { toast } from "react-toastify";
// import ToastMessage from '../Components/ToastMessage';

const BuilderExperience = (props) => {
  const formikRef = useRef();
  const contextObject = useContext(ResumeContext);
  const [projectSuggestions, setProjectSuggestions] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [ipAddress, setIpAddress] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [suggestionsLoading , setSuggestionsLoading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState([]);
  const [projectindex , setProjectIndex] = useState("");
  const [projectDescription ,setProjectDescription ] = useState([])
  const [isChecked, setIsChecked] = useState(true);
  
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const theme = useTheme(); 

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    axios.get(`https://api.ipify.org/?format=text`).then(async (response) => {
      let ipaddress = response.data;
      setIpAddress(ipaddress);
    });
    // axios
    //   .get(`${Key.domain}/commonAPIs/get_all_countries`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     },
    //   })
    //   .then((resdata) => {
    //     console.log(resdata);
    //     setCountries(
    //       resdata.data.data.map((country) => ({
    //         value: country.id,
    //         label: country.name,
    //       }))
    //     );
    //     getStates(233, null);
    //   });
  }, []);

  const getStates = (countryid) => {
    // axios
    //   .post(`${Key.domain}/commonAPIs/get_states_by_countryid`, {
    //     country_id: countryid,
    //   })
    //   .then((response) => {
    //     setStates(
    //       response.data.data.map((state) => ({
    //         value: state.id,
    //         label: state.name,
    //       }))
    //     );
    //   });
  };

  const getCities = (state) => {
    // var stateid = state.value;
    // console.log(stateid);
    // axios
    //   .post(`${Key.domain}/commonAPIs/get_cities_by_stateid`, {
    //     state_id: stateid,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     setCities(
    //       response.data.data.map((city) => ({
    //         value: city.id,
    //         label: city.cityName,
    //       }))
    //     );
    //   });
  };

  const handleAddProjects = () => {
    contextObject.updateProject([
      ...contextObject.project,
      {
        projectTitle: '',
        country: '',
        country_id: '',
        state: '',
        state_id: '',
        city: '',
        city_id: '',
        responsibilities: '',
        startdate: '',
        company: '',
        enddate: '',
        role: '',
        description: '',
        checked: false
      },
    ]);
  };

  const handleDeleteFunction = (idx) => {
    contextObject.updateProject(
      contextObject.project.filter((project, index) => index !== idx)
    );
  };

  const Submit = () => props.setValue(3);

  const handleInputChange = (index, e) => {
    let Certifications = [...contextObject.project]
    var name =  e.target !== undefined  ? e.target?.name : "";
    //const fieldName = name?.split('.')[2]; 

    if (name === "company") {
        Certifications[index]["company"] = e.target?.value
        contextObject.updateProject(Certifications)
        formikRef.current.setFieldValue("company" ,e.target.value)
    }
    if (name === "role") {
        Certifications[index]["role"] = e.target?.value
        formikRef.current.setFieldValue("role" ,e.target.value)
        contextObject.updateProject(Certifications)
    }
    if (name === "country") {
        Certifications[index]["country"] = e.target?.value
        contextObject.updateProject(Certifications)
    }
    if (name === "state") {
        Certifications[index]["state"] = e.target?.value
        contextObject.updateProject(Certifications)
    }
    if (name === "city") {
        Certifications[index]["city"] = e.target?.value
        contextObject.updateProject(Certifications)
    }
    if (name === "startdate") {
        Certifications[index]["startdate"] = e.target?.value
        formikRef.current.setFieldValue("startdate" ,e.target?.value)
        contextObject.updateProject(Certifications)
    }
    if (name === "enddate") {
        Certifications[index]["enddate"] = e.target?.value
        formikRef.current.setFieldValue("enddate" ,e.target?.value)
        contextObject.updateProject(Certifications)
    }
    if (name === "projectTitle") {
        Certifications[index]["projectTitle"] = e.target?.value
        contextObject.updateProject(Certifications)
    }
    if (name === "responsibilities") {
        Certifications[index]["responsibilities"] = e
        contextObject.updateProject(Certifications)
    }
if (name === "description") {
  Certifications[index]["description"] = e;
  contextObject.updateProject(Certifications);
}
// //let Certifications = [...contextObject.project]
//     setIsChecked(!isChecked);
//     formikRef.current.setFieldValue("checked" , true)
//     Certifications[index]["checked"] = true
//     console.log(Certifications)
};

 
  const onTextEditorchanged = (value, index) => {
    var projects = [...contextObject.project];
    projects[index]['responsibilities'] = value;
    contextObject.updateProject(projects);
  };



  const onTextEditorchangedOne = (value, index) => {
    var projects = [...contextObject.project];
    projects[index]['description'] = value;
    contextObject.updateProject(projects);
  };
 

  const updateCities = (event, value, index, name) => {
    console.log(event);
    var projects = [...contextObject.project];
    if (name === 'cities') {
      projects[index]['city'] = value.label;
      projects[index]['city_id'] = value.value;
      contextObject.updateProject(projects);
      console.log(projects);
    }
  };

  const updateCountry = (event, value, index, name) => {
    console.log("event", event);
    console.log("country", value);
    var projects = [...contextObject.project];
    if (name === 'country') {
      projects[index]['country'] = value?.label;
      projects[index]['country_id'] = value?.value;
      contextObject.updateProject(projects);
      console.log(projects);
    }
  };

  const updateState = (event, value, index, name) => {
    console.log(event);
    var projects = [...contextObject.project];
    if (name === 'state') {
      projects[index]['state'] = value.label;
      projects[index]['state_id'] = value.value;
      contextObject.updateProject(projects);
      console.log(projects);
    }
  };

 
  const getProjectSuggestions = (index) => {
    setProjectIndex(index)
    // if (
    //       contextObject.project[index]?.role !== '' &&
    //       contextObject.project[index]?.role !== undefined &&
    //       contextObject.project[index]?.role !== 'null' &&
    //       contextObject.project[index]?.role !== 'undefined'
    //     ) {
    //       setCopiedIndex([]);
    //       setOpen(true);
    //       setSuggestionsLoading(true);
    //       // const msg = `The following is the role of a project. Based on this project role, please provide suggestions for the roles and responsibilities. Ensure that the output is in JSON format, with each suggestion listed as a separate item. The project role is for a ${contextObject.project[index].role}.

    //       // Format the output as:
    //       // {
    //       //   "suggestions": [
    //       //     "Suggestion 1",
    //       //     "Suggestion 2",
    //       //     "Suggestion 3",
    //       //     ...
    //       //   ]
    //       // }
    //       // Only include relevant information that is specific to the job role and experience. Focus on actionable, role-specific responsibilities and tasks.`;
          
    //       const msg = `The following is the role of a project. Based on this project role, please provide comprehensive suggestions for the roles and responsibilities. Ensure that the output is in JSON format, with each suggestion being a well-developed, in-depth point. The project role is for a ${contextObject.project[index].role}.

    //       Format the output as:
    //       {
    //         "suggestions": [
    //           "A thorough explanation of the responsibility with specific tasks or deliverables.",
    //           "An actionable point related to the role with examples of tasks or outcomes.",
    //           "An in-depth point that focuses on role-specific actions or responsibilities.",
    //           ...
    //         ]
    //       }
    //       Only include relevant information that is specific to the job role and experience. Focus on providing detailed, actionable, and role-specific responsibilities and tasks without including placeholder phrases like 'Detailed suggestion'.`;
    //       openAI(msg, (error, results) => {
    //         if (error) {
    //           setSuggestionsLoading(false);
    //         } else {
    //           var data = results;
    //           console.log("data", data);
    //           let combinedData = [];
      
             
    //           setProjectSuggestions(data?.suggestions);
    //           setSuggestionsLoading(false);
    //         }
    //       });

    //     }
    //     else {
    //       let msg = "Please Enter Project Role";
    //       toast(<ToastMessage message={msg} />);
    //     }
   
  };
  const handleMouseEnter = (index) => {
    console.log("index", index);
    setHoveredIndex(index);
    if (copiedIndex.includes(index)) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleSuggestionsClick = (index, data) => {
    console.log("indexc", index);
    handleSummaryClick(data);
    if (!copiedIndex.includes(index)) {
      setCopiedIndex([...copiedIndex, index]);
      console.log("indexco", [...copiedIndex, index]);
    }
  };

  const handleSummaryClick = (summary) => {
    const projects = [...contextObject.project];
    projects[projectindex]['responsibilities'] = (projects[projectindex]['responsibilities'] || "") + summary;
    contextObject.updateProject(projects);
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const validationSchema = Yup.object({
    projectTitle: Yup.string().required("Project Title is required"),
    role: Yup.string().required("Role is required"),
    startdate: Yup.string().required("Start Date is required"),
    company: Yup.string().required("Company is required"),
    //enddate: Yup.string().required("End Date is required"),
  });

  
  const handleRolesClose = () => {
    setOpen(false);
  }
  const handleChange = (index) => {
    let Certifications = [...contextObject.project]
    setIsChecked(!isChecked);
    formikRef.current.setFieldValue("checked" , isChecked)
    Certifications[index]["checked"] = isChecked
    console.log(isChecked)
    contextObject.updateProject(Certifications)
    console.log(Certifications)
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
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6">Project Details</Typography>
          <Typography sx={{ color: "grey" }}>
            ✨ Boost your resume by highlighting your outstanding projects!.
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
              width: "140px",
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
              Quick Tips to add projects
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
              <Typography variant="body2" sx={{ pb: 1 }}>
                Select projects that are relevant to the job you're applying
                for. Highlight those that demonstrate skills and experience
                related to the position.
              </Typography>
              <List
                sx={{
                  fontSize: "12px",
                  textAlign: "justify",
                  bgcolor: "#eff2f9",
                }}
              >
                <ListItem>
                  Describe what you accomplished with each project. Quantify
                  results if possible (e.g., improved efficiency by X%,
                  implemented a feature that increased user engagement).
                </ListItem>
                <ListItem>
                  Explain your specific contributions and responsibilities
                  within the project team.Focus on the most significant projects
                  and keep descriptions concise and clear
                </ListItem>
                <ListItem>
                  Customize your project descriptions to match the job
                  requirements. Emphasize skills and experiences that are most
                  relevant.
                </ListItem>
                <ListItem>
                  List the technologies, tools, and frameworks you used for each
                  project. This showcases your technical skills.
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
          projectTitle:
            contextObject.project.map((project) => project.projectTitle) || "",
          role: contextObject.project.map((project) => project.role) || "",
          company:
            contextObject.project.map((project) => project.company) || "",
          country: contextObject.project.map((project) => project.country),
          state: contextObject.project.map((project) => project.state),
          city: contextObject.project.map((project) => project.city),
          startdate:
            contextObject.project.map((project) => project.startdate) || "",
          enddate:
            contextObject.project.map((project) => project.enddate) || "",
          description: contextObject.project.map(
            (project) => project.description
          ),
          responsibilities: contextObject.project.map(
            (project) => project.responsibilities
          ),
          checked : contextObject.project.map((project) => project.checked)
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          Submit();
        }}
        render={({
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {contextObject.project.map((project, index) => (
                <Grid item xs={12} key={index}>
                  <Accordion
                    expanded={expanded === `panel${index}`}
                    onChange={handleChangeAccordion(`panel${index}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography># Project {index + 1}</Typography>
                      <Button
                        onClick={() => handleDeleteFunction(index)}
                        style={{ float: 'right', fontSize: '20px' }}
                      >
                        <MdOutlineDelete />{" "}
                      </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <label htmlFor={`projectTitle-${index}`}>
                            Project Title{" "}
                          </label>
                          <input
                            type="text"
                            id={`projectTitle-${index}`}
                            name={`projectTitle`}
                            value={
                              contextObject.project[index] !== undefined
                                ? contextObject.project[index].projectTitle
                                : ""
                            }
                            onChange={(e) => {
                              handleInputChange(index, e);
                            }}
                            className={`form-control `}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label htmlFor={`role-${index}`}>
                            Role <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            id="role"
                            name="role"
                            value={
                              contextObject.project[index] !== undefined
                                ? contextObject.project[index].role
                                : ""
                            }
                            onChange={(e) => {
                              handleInputChange(index, e);
                            }}
                            // onBlur={() => getProjectSuggestions(index)}
                            onBlur={ handleBlur}
                            className={`form-control ${
                              touched.role && errors.role ? "is-invalid" : ""
                            }`}
                          />
                          <ErrorMessage
                            name={`role`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label htmlFor={`company-${index}`}>
                            Client <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            id={`company`}
                            name={`company`}
                            value={
                              contextObject.project[index] !== undefined
                                ? contextObject.project[index].company
                                : ""
                            }
                            onChange={(e) => {
                              handleInputChange(index, e);
                            }}
                            onBlur={handleBlur}
                            className={`form-control ${
                              touched.company && errors.company
                                ? "is-invalid"
                                : ""
                            }`}
                            //placeholder="Client"
                          />
                          <ErrorMessage
                            name="company"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label htmlFor={`country-${index}`}>
                            Country
                            {/* <span style={{ color: "red" }}>*</span> */}
                          </label>
                          <Autocomplete
                            disablePortal
                            ref={ref1}
                            name="country"
                            id="combo-box-demo"
                            options={countries}
                            value={
                              contextObject.project[index].country === ""
                                ? "United States"
                                : contextObject.project[index] !== undefined
                                ? contextObject.project[index].country
                                : ""
                            }
                            defaultValue={{
                              label: "United States",
                              value: 223,
                            }}
                            sx={{
                              "& .MuiInputBase-input::placeholder": {
                                color: alpha(theme.palette.text.primary, 0.5),
                              },
                              "& .MuiAutocomplete-inputRoot": {
                                padding: "1px",
                                height: '38px',
                              },
                              "& .MuiAutocomplete-popover": {
                                width: '100%',
                              },
                            }}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth />
                            )}
                            onChange={(e, val) => {
                              const name = ref1.current.getAttribute("name");
                              updateCountry(e, val, index, name);
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label htmlFor={`state-${index}`}>
                            State
                            {/* <span style={{ color: "red" }}>*</span> */}
                          </label>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            ref={ref2}
                            name="state"
                            options={states}
                            value={
                              contextObject.project[index] !== undefined
                                ? contextObject.project[index].state
                                : ""
                            }
                            sx={{
                              "& .MuiInputBase-input::placeholder": {
                                color: alpha(theme.palette.text.primary, 0.5),
                              },
                              "& .MuiAutocomplete-inputRoot": {
                                padding: "1px",
                                height: '38px',
                              },
                              "& .MuiAutocomplete-popover": {
                                width: '100%',
                              },
                            }}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth />
                            )}
                            onChange={(e, val) => {
                              getCities(val);
                              const name =
                                ref2.current !== "null" && ref2.current !== null
                                  ? ref2.current.getAttribute("name")
                                  : "state";

                              updateState(e, val, index, name);
                              // handleInputChange(index, e, "state", val);
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label htmlFor={`city-${index}`}>
                            City
                            {/* <span style={{ color: "red" }}>*</span> */}
                          </label>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            name="cities"
                            options={cities}
                            ref={ref0}
                            getOptionLabel={(option) => option.label}
                            value={
                              contextObject.project[index] !== undefined
                                ? contextObject.project[index].cities
                                : ""
                            }
                            sx={{
                              "& .MuiInputBase-input::placeholder": {
                                color: alpha(theme.palette.text.primary, 0.5),
                              },
                              "& .MuiAutocomplete-inputRoot": {
                                padding: "1px",
                                height: '38px',
                              },
                              "& .MuiAutocomplete-popover": {
                                width: '100%',
                              },
                            }}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth />
                            )}
                            onChange={(e, val) => {
                              const name =
                                ref0.current !== "null" && ref0.current !== null
                                  ? ref0.current.getAttribute("name")
                                  : "cities";
                              updateCities(e, val, index, name);
                              //  handleInputChange(index, e, "cities", val);
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label htmlFor={`startdata-${index}`}>
                            Start Date <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            id={`startdate-${index}`}
                            name={`startdate`}
                            value={
                              contextObject.project[index] !== undefined
                                ? contextObject.project[index].startdate
                                : ""
                            }
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            onBlur={handleBlur}
                            className={`form-control ${
                              touched.startdate && errors.startdate
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="startdate"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label htmlFor={`enddate-${index}`}>
                            End Date 
                            {/* <span style={{ color: "red" }}>*</span> */}
                          </label>
                          <input
                            type="text"
                            id={`enddate-${index}`}
                            name={`enddate`}
                            value={
                              contextObject.project[index] !== undefined
                                ? contextObject.project[index].enddate
                                : ""
                            }
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            onBlur={handleBlur}
                            className={`form-control` }
                            disabled={contextObject.project[index] !== undefined
                            &&  contextObject.project[index].checked
                               === true}
                            //   ${
                            //   touched.enddate && errors.enddate
                            //     ? "is-invalid"
                            //     : ""
                            // }`}
                          />
                          {/* <ErrorMessage
                            name="enddate"
                            component="div"
                            className="invalid-feedback"
                          /> */}
                           <input
                    type="checkbox"
                    id="checkboxField"
                    //checked={isChecked}
                    name = "checked"
                    onChange={() =>  handleChange(index)}
                    value ={ contextObject.project[index] !== undefined
                    ? contextObject.project[index].checked === true
                    : false}
                  /> {" "}
                  <label htmlFor="checkboxField" style={{fontSize:"13px"}}>Currently Working</label>
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <label>Description</label>
                          </Box>
                          <ReactQuill
                            theme="snow"
                            name="description"
                            value={
                              contextObject.resumetemplate !== "10" &&
                              contextObject.resumetemplate !== "11"
                                ? contextObject.project[index] !== undefined
                                  ? contextObject.project[index].description
                                  : ""
                                : contextObject.project[index] !== undefined
                                ? contextObject.project[
                                    index
                                  ].description.slice(0, 400)
                                : ""
                            }

                            // value={
                            //   contextObject.project[index] !== undefined 
                            //     ? contextObject.project[index].description.slice(0, 400) 
                            //     : ""
                            // }
                            // onChange={event => handleInputChange(index, event)}
                            onChange={(e, editor) => {
                              console.log(e);
                              onTextEditorchangedOne(e, index);
                              handleInputChange(e, index);
                            }}
                          />
                          <div>{charCount} / 400 characters</div>
                          {contextObject.project[index].description?.length >
                        400 ? (
                            <p style={{ color: "#d32f2f", fontSize: "12px" }}>
                              You can add up to 400 characters only*
                            </p>
                          ) : (
                            ""
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              mb:1
                            }}
                          >
                            <label>Roles & Responsibilities</label>
                            <Button
                              variant="outlined"
                              size="small"
                               onClick={()=> getProjectSuggestions(index)}
                              startIcon={<AddCircleRoundedIcon />}
                              style={{
                                cursor: "pointer",
                                textTransform: "none",
                                marginRight: "2px",
                                borderRadius: "50px",
                                width: "170px",
                                height: "28px",
                              }}
                            >
                              SuggestedPhrases
                            </Button>
                          </Box>
                          <ReactQuill
                            theme="snow"
                            name="responsibilities"
                            value={
                              contextObject.resumetemplate !== "10" &&
                              contextObject.resumetemplate !== "11"
                                ? contextObject.project[index] !== undefined
                                  ? contextObject.project[index]    
                                      .responsibilities
                                  : ""
                                : contextObject.project[index] !== undefined
                                ? contextObject.project[
                                    index
                                  ].responsibilities?.slice(0, 500)
                                : ""
                            }
                            //onChange={event => handleInputChange(index, event)}
                            onChange={(e, editor) => {
                              console.log(e);
                              onTextEditorchanged(e, index);
                              handleInputChange(e, index);
                            }}
                          />
                           <div>{charCount} / 500 characters</div>
                          {contextObject.project[index].responsibilities?.length >
                          500 ? (
                            <p style={{ color: "#d32f2f", fontSize: "12px" }}>
                              You can add up to 500 characters only*
                            </p>
                          ) : (
                            ""
                          )}
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </form>
        )}
      />
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Button
                // color="primary"
                variant="contained"
                onClick={handleAddProjects}
                // disabled={
                //   contextObject.resumetemplate !== "10" &&
                //   contextObject.resumetemplate !== "11"
                //     ? false
                //     : true  
                // }
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#406882",
                }}
              >
                Add
              </Button>{" "}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "180px",
              }}
            >
              <Button
                //type="submit"
                variant="contained"
                //color="primary"
                size="small"
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#406882",
                }}
                onClick={() => props.setValue(1)}
              >
                <ArrowBackIcon style={{ fontSize: "15px" }} />
                Previous
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                style={{
                  float: "right",
                  textTransform: "capitalize",
                  backgroundColor: "#406882",
                }}
                onClick={() => Submit()}
                //onClick={() => props.setValue(3)}
              >
                Next <ArrowForwardIcon style={{ fontSize: "15px" }} />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog
            open={open}
            onClose={handleRolesClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "15px" }}>
              AI-crafted Roles & Responsibilities 
              {/*-  (
              <span style={{ textTransform: "capitalize" }}>
                {contextObject.project[projectindex].role}
              </span>
              ) */}
              <IconButton
                aria-label="close"
                onClick={handleRolesClose}
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
            <DialogContent dividers>
              {suggestionsLoading ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt={2}
                  p={5}
                >
                  <Alert
                    severity="info"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Box p={3}>
                      <AlertTitle>⏳Suggestions in Progress</AlertTitle>
                      Fetching Suggestions from AI. Please wait...
                    </Box>
                    <LinearProgress style={{ width: '100%' }} />
                  </Alert>
                </Box>
              ) : (
                <>
                  <Typography
                    sx={{ mb: 2, fontWeight: "bold", fontSize: "12px" }}
                  >
                    Click on the Suggestions to add to your Project
                  </Typography>
                  {projectSuggestions?.length > 0 ? (
                    <List
                      sx={{
                        fontSize: "12px",
                        textAlign: "justify",
                        bgcolor: "#eff2f9",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "#000",
                          paddingLeft: "10px",
                        }}
                      >
                        {`${contextObject.jobTitle} with ${contextObject.experience} years of experience`}
                      </Typography>
                      {projectSuggestions?.length > 0 && projectSuggestions?.map((data, index) => (
                        <ListItem
                          key={index}
                          style={{ paddingBottom: "2px", color: "#000" }}
                        
                        >
                          <ListItemText style={{ cursor: "pointer" }}>
                            <Typography sx={{ fontSize: "12px" }}>
                              {" "}
                              {parse(data)}
                              <Tooltip
                                title={
                                  copiedIndex?.includes(index)
                                    ? 'Copied'
                                    : 'Copy'
                                }
                                open={hoveredIndex === index}
                                arrow
                              >
                               
                                <IconButton
                                  size="small"
                                  sx={{
                                    color: copiedIndex?.includes(index)
                                      ? 'green'
                                      : 'inherit',
                                  }}
                                  onMouseEnter={() => handleMouseEnter(index)}
                                  onMouseLeave={handleMouseLeave}
                                  onClick={() => handleSuggestionsClick(index, data)}
                                  // disabled = {copiedIndex?.includes(index) }
                                >
                                  <ContentCopyIcon
                                    sx={{ fontSize: '12px', marginLeft: '5px' }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      <BsArrowLeftCircle size={20} color="lightgrey" />
                      &nbsp;Resume Summary Suggestions
                    </Typography>
                  )}
                </>
              )}

            
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRolesClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
    </Box>
  );
};

export default BuilderExperience;
