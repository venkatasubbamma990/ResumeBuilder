import React, { useContext, useEffect, useRef, useState } from 'react';
import ResumeContext from './ResumeContext';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MdOutlineDelete } from 'react-icons/md';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
//import Key from '../clientVariables.json'
import { Box, Grid, IconButton, List, ListItem, Typography ,MenuItem,FormControl, FormLabel , InputLabel, 
  Select, 
   Chip, TextField ,InputAdornment, CircularProgress} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Tab } from '@mui/material/Tab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { openAI } from "../Components/OpenAIComponent";
//import Select from "react-select";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { toast } from 'react-toastify';
// import ToastMessage from "../../src/Components/ToastMessage";
import { styled, alpha } from '@mui/material/styles';



const BuilderSkills = (props) => {
  const contextObject = useContext(ResumeContext);
  const [skillsList, setSkillsList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [skillsLoading , setSkillsLoading] = useState([])
  //const [categories ,setCategories] = useState([])
  const [open, setOpen] = useState(false);  // State to control the dialog open/close
  const [skillName, setSkillName] = useState('');
  const formikRef = useRef();
  const [category ,setCategory] = useState("")

  const categories = [
    { id: 1, label: "Amazon Web Services" },
    { id: 2, label: "API Interfaces" },
    { id: 3, label: "AWS" },
    { id: 4, label: "Banking" },
    { id: 5, label: "Big Data Tools" },
    { id: 6, label: "Build Tools" },
    { id: 7, label: "Bus Protocols" },
    { id: 8, label: "Cloud" },
    { id: 9, label: "Cloud Services" },
    { id: 10, label: "Databases" },
    { id: 11, label: "Debugging Tools" },
    { id: 12, label: "Defect Tracking Tools" },
    { id: 13, label: "Designing Tools/Editors" },
    { id: 14, label: "Devops" },
    { id: 15, label: "ETL Tools" },
    { id: 16, label: "FICO" },
    { id: 17, label: "Financial Management" },
    { id: 18, label: "Frameworks" },
    { id: 19, label: "IDE" },
    { id: 20, label: "Java Technologies" },
    { id: 21, label: "Methodologies" },
    { id: 22, label: "Microsoft Technologies" },
    { id: 23, label: "Networking" },
    { id: 24, label: "OS (Operating Systems)" },
    { id: 25, label: "Other Tools and Technologies" },
    { id: 26, label: "Programming Languages" },
    { id: 27, label: "Proxy and Firewall" },
    { id: 28, label: "Reporting and Analytics" },
    { id: 29, label: "Salesforce Technologies" },
    { id: 30, label: "Salesforce Tools" },
    { id: 31, label: "SAP" },
    { id: 32, label: "Scripting" },
    { id: 33, label: "SD,MM" },
    { id: 34, label: "SDLC Methodologies" },
    { id: 35, label: "Security" },
    { id: 36, label: "Servers" },
    { id: 37, label: "Test" },
    { id: 38, label: "Testing Tools" },
    { id: 39, label: "Tools & Framework" },
    { id: 40, label: "UI Designer" },
    { id: 41, label: "Version Control" },
    { id: 42, label: "Virtualization Tools" },
    { id: 43, label: "Web Servers" },
    { id: 44, label: "Web Technologies" },
  ];
  

  const toggleLoading = (index, isLoading) => {
    setSkillsLoading((prevState) => {
      const updatedLoading = [...prevState]; 
      updatedLoading[index] = isLoading; 
      return updatedLoading; 
    });
  };



  const ref0 = useRef();
  const ref1 = useRef()
 
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

//   const handleAddSkillCategory = () => {
//     axios
//     .post(`${Key.domain}/commonAPIs/add_skill_category`, {
//       categoryName: skillName,
//     })
//     .then((response) => {
//       console.log(response)
//       if(response.data?.data?.insertId){
//        // toast(<ToastMessage message="Skill Category added successfully" />);
//         getSkillsCategories()
//       }
//     })
//     .catch((error) => {
//      // toast(<ToastMessage message="Failed to add Skill Category, Duplicates are not Allowed" />);
//     });
    
//     setOpen(false);  
//   };

const handleAddSkillCategory = () => {
    if (skillName.trim()) {
      const newId = skillsList.length + 1; 
      const newSkillObj = { id: newId, label: skillName };
      setCategory([...skillsList, newSkillObj]);
      setSkillName(""); 
      handleCloseDialog()
    }
  };

  
//  const getSkillsCategories =  () => {
//   axios
//   .get(`${Key.domain}/commonAPIs/get_skills_categories`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     },
//   })
//   .then((resdata) => {
//     setCategories(
//       resdata.data.data.map((skill) => ({
//         id: skill.id,
//         label: skill.cat_title,
//       }))
//     );
  
//   });
//  }

//   useEffect(() => {
//     getSkillsCategories()
//   }, []);

 
   const handleAddCategory = () => {
    contextObject.updateSkills([
      ...contextObject.skills,
      { category: "", skills: [] },
    ]);
  };
  const handleDeleteFunction = (idx) => {
    contextObject.updateSkills(
      contextObject.skills.filter((skill, index) => index !== idx)
    );
  };

const Submit = () => props.setValue(2);
const handleClick = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  }
 

//   const getSkillsbyCategory = (category ,index) => {
//     toggleLoading(index, true);
//    // setSkillsLoading(true)
//     const msg = `
//     List all relevant skills for the category: "${category}". For instance, if the category is "Programming Languages," provide a list of programming languages such as Python and JavaScript. If the category is "Database," list databases like MySQL and MongoDB.
    
//     Please follow these instructions:
//     - Provide only the list of skills, without any additional text or information.
//     - Ensure that the list is in JSON format with a single key "skills" that contains an array of skill names.
//     - Exclude any categories that do not have skills listed (i.e., do not include empty skill categories).
//     - The response should always be structured as follows:
//       {
//         "skills": ["skill1", "skill2", "skill3"]
//       }
    
//     Example for "Programming Languages":
//     {
//       "skills": ["Python", "JavaScript"]
//     }
    
//     Example for "Database":
//     {
//       "skills": ["MySQL", "MongoDB"]
//     }
    
//     Do not include any empty skill lists or categories with no skills. Ensure the response is strictly in the format described above, without additional keys or information.
//     `;
//     openAI(msg, (error, results) => {
//       if (error) {
//         toggleLoading(index, true);
//         console.log(error)
//       } else {
//         var data = results?.skills || []
//         console.log("Skills Data:", data);
//         const transformedSkills = data.map((skill, index) => ({
//           id: index + 1,
//           skill: skill,
//         }));
//         console.log(transformedSkills)
//         setSkillsList(transformedSkills)
//         toggleLoading(index, false);
//       }
//     });
//   }
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
       // getSkillsbyCategory(e.target.value ,index);
      }
    };
    
    const handleInputChange=(index, e , name ,value)=>{
      console.log(value)

      console.log(e)
      let Skills=[...contextObject.skills]
      if (name === "category") {
        Skills[index]["category"] = value.label
          contextObject.updateSkills(Skills)
         // getSkillsbyCategory(value.label ,index);
         // formikRef.current.setFieldValue(`Skills[${index}].category`, value.label);

        }
        if (name === "skills") {
          const selectedSkills = value.map(skill => skill.skill); 
          Skills[index]["skills"] = selectedSkills;
          contextObject.updateSkills(Skills);
          console.log("Skills", Skills);
        }
  }
  const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
    "& .MuiInputBase-input::placeholder": {
        color: alpha(theme.palette.text.primary, 0.5),
    },
    "& .MuiAutocomplete-inputRoot": {
        // height: '38px',
        padding: "1px",
    },
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input::placeholder": {
        color: alpha(theme.palette.text.primary, 0.5),
    },
    "& .MuiInputBase-root": {
        height: "40px",
    },
}));



 

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
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: "18px" }}>Explore Skill Set</Typography>
          <Typography sx={{ color: "grey" }}>
            🚀🎯Enhance your resume by showcasing your essential skills.
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
              Quick Tips for SkillSet
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
                Tailor your skills to match the job description and the industry
                you're applying for.
              </Typography>
              <List
                sx={{
                  fontSize: "12px",
                  textAlign: "justify",
                  bgcolor: "#eff2f9",
                }}
              >
                <ListItem>
                  Provide evidence or examples of how you've used these skills
                  effectively (e.g., achievements, projects).
                </ListItem>
                <ListItem>
                  Maintain a balance between technical/hard skills (e.g.,
                  programming languages, software proficiency) and soft skills
                  (e.g., communication, teamwork).
                </ListItem>
                <ListItem>
                  Incorporate relevant keywords related to your skills to
                  enhance visibility in automated resume screening systems.
                </ListItem>
                <ListItem>
                  Focus on skills that demonstrate your ability to contribute
                  effectively to the role and organization.
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

     
            <Grid container>
              <br />
             
                  <Grid container spacing={1}>
                    {contextObject.skills?.map((skill, index) => (
                      <Grid
                        container
                        spacing={2}
                        key={index}
                        alignItems="center"
                      >
                         
                         <Grid item xs={12} sm={4} md={4} lg={4}>
                        <label htmlFor={`skills-${index}`}>Categories</label>
                            <Autocomplete
                              id={`category-${index}`}
                              options={categories}
                              name ="category"
                              ref={ref1}
                             // value={skill.category}
                              getOptionLabel={(option) => option.label}
                              onChange={(e ,value) => {
                                handleInputChange(index, e, "category" ,value)
                              }}
                            
                              onKeyDown={handleKeyDown}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Select Category"
                                />
                              )}
                              fullWidth
                            />
                         
                        </Grid> 

                        <Grid
                          item
                          xs={12}
                          sm={7}
                          md={7}
                          lg={skillsLoading ? 6 : 7}
                        >
                          <label htmlFor={`skills-${index}`}>Skills</label>
                         
                           <Autocomplete
                            multiple
                            ref={ref0}
                            id={`skills-${index}`}
                            name="skills"
                            options={skillsList}
                            getOptionLabel={(option) => option.skill}
                           //  value={contextObject.skills[index]?.skills || []}
                            onChange={(e, val) =>{
                              const name = (ref0.current.getAttribute("name")); 
                              handleInputChange(index, e, name, val)
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Add Skills"
                                fullWidth
                                InputProps={{
                                  ...params.InputProps,
                                  disabled: skillsLoading[index],
                                }}
                              />
                            )} 
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option.skill}
                                  {...getTagProps({ index })}
                                  sx={{
                                    height: "27px",
                                    fontSize: "11px",
                                  }}
                                />
                              ))
                            }
                          />
                        </Grid>
                        {skillsLoading[index] && (
                          <Grid item xs={1}>
                            <CircularProgress
                              size={24}
                              sx={{ float: 'right' }}
                            />
                          </Grid>
                        )}

                        <Grid item xs={1} sx={{ml: skillsLoading[index] ? 0 : 2}}>
                          <Button
                            onClick={() => handleDeleteFunction(index)}
                            style={{ float: 'right' ,fontSize:"20px" }}
                          >
                            <MdOutlineDelete />
                          </Button>
                        </Grid>
                       

                        <br />
                      </Grid>
                    ))}
                  </Grid>
             
            </Grid>
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
                      onClick={handleAddCategory}
                      style={{
                        textTransform: "capitalize",
                        backgroundColor: "#406882",
                      }}
                    >
                      Add
                    </Button>{" "}
                    <Button
                      variant="contained"
                      onClick={handleOpenDialog}
                      style={{
                        textTransform: "capitalize",
                        backgroundColor: "#406882",
                      }}
                    >
                      Add Category
                    </Button>
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
                      variant="contained"
                      //color="primary"
                      size="small"
                      style={{
                        textTransform: "capitalize",
                        backgroundColor: "#406882",
                      }}
                      onClick={() => props.setValue(0)}
                    >
                      <ArrowBackIcon style={{ fontSize: "15px" }} />
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        float: "right",
                        textTransform: "capitalize",
                        backgroundColor: "#406882",
                      }}
                      onClick={()=> Submit()}
                    >
                      Next <ArrowForwardIcon style={{ fontSize: "15px" }} />
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
         
         
     
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add a New Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSkillCategory} 
          color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BuilderSkills;
