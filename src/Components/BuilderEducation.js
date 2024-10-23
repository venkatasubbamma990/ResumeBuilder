import React, { useContext, useRef } from 'react';
import { Formik } from 'formik';
import ResumeContext from './ResumeContext';
import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MdOutlineDelete } from 'react-icons/md';


const BuilderEducation = (props) => {
  console.log(props)
  const formikRef = useRef();
  const contextObject = useContext(ResumeContext);

  const handleAddEducation = () => {
    contextObject.updateEducation([
      ...contextObject.education,
      { university: "", yearofpassing: "", degree: "" }
    ]);
  };

  const handleDeleteFunction = (idx) => {
    contextObject.updateEducation(
      contextObject.education.filter((_, index) => index !== idx)
    );
  };
 
      const handleInputChange=(index, e)=>{
        let Educations=[...contextObject.education]
        var name = e.target.name
        if (name === "university") {
          Educations[index]["university"] = e.target.value
           
            contextObject.updateEducation(Educations)
          }
          if (name === "yearofpassing") {
            Educations[index]["yearofpassing"] = e.target.value
         
            contextObject.updateEducation(Educations)
          }
          if (name === "degree") {
            Educations[index]["degree"] = e.target.value
          
            contextObject.updateEducation(Educations)
          }
    }
    

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
          <Typography
            variant="h6"
            sx={{
              background: 'linear-gradient(-90deg, #89bcdf 10%, #406882 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontWeight: "bold",
            }}
          >
            Education Details
          </Typography>
          <Typography sx={{ color: "grey" }}>
          ✨ Highlight your top education achievements🎓, including any programs you're currently pursuing!" 📚
          </Typography>
        </Box>
      </Box>
      <Formik
        innerRef={formikRef}
        initialValues={{
          university: contextObject.education.map(
            (education) => education.university
          ),
          yearofpassing: contextObject.education.map(
            (education) => education.yearofpassing
          ),
          degree: contextObject.education.map((education) => education.degree),
        }}
        onSubmit={(values) => {
          contextObject.updateEducation(values.education);
          props.setValue(5);
        }}
        >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {contextObject.education.map((education, index) => (
              <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <label htmlFor="Degree" style={{ fontSize: "14px" }}>
                      Degree
                    </label> <br/>
                    <input
                      id={`degree-${index}`}
                      name={"degree"}
                      type="text"
                      autoComplete="off"
                      onChange={(e) => handleInputChange(index, e)}
                      onBlur={handleBlur}
                       className={` form-control`}
                      value={contextObject.education[index].degree}
                     
                      
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <label
                      htmlFor={`education.${index}.yearofpassing`}
                      style={{ fontSize: "14px" }}
                    >
                      Year
                    </label> <br/>
                    <input
                      id={`education.${index}.yearofpassing`}
                      name={`yearofpassing`}
                      type="text"
                      className={` form-control`}
                      //placeholder="Job Title"
                      autoComplete="off"
                      onChange={(e) =>
                        handleInputChange(index, e)
                      }
                      onBlur={handleBlur}
                      value={contextObject.education[index].yearofpassing}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6} style={{ fontSize: "14px" }}>
                    <label htmlFor={`education.${index}.university`}>
                      Institute
                    </label> <br/>
                    <input
                      id="email"
                      name={`university`}
                      type="text"
                      autoComplete="off"
                      className={` form-control`}
                      onChange={(e) =>
                        handleInputChange(index, e)
                      }
                      onBlur={handleBlur}
                      value={contextObject.education[index].university}
                    />
                  </Grid>
                  <Grid item xs={1}>
                          <Button
                            onClick={() => handleDeleteFunction(index)}
                            sx={{ float: 'right', fontSize: '20px',mt:3 }}
                          >
                            <MdOutlineDelete />
                          </Button>
                        </Grid>
                  </Grid>
            ))}
          </Grid>
        </form>
        )}
      </Formik>
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
                onClick={handleAddEducation}
                disabled={
                  contextObject.resumetemplate !== "10" &&
                  contextObject.resumetemplate !== "11"
                    ? false
                    : true
                }
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
                onClick={() => props.setValue(2)}
              >
                <ArrowBackIcon style={{ fontSize: "15px" }} />
                Previous
              </Button>
              <Button
                //type="submit"
                variant="contained"
                // color="primary"
                size="small"
                style={{
                  float: "right",
                  textTransform: "capitalize",
                  backgroundColor: "#406882",
                }}
                onClick={() => props.setValue(4)}
              >
                Next <ArrowForwardIcon style={{ fontSize: "15px" }} />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuilderEducation;
