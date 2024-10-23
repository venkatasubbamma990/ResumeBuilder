import React, { useContext, useRef, useState } from 'react';
import * as Yup from 'yup';
import ResumeContext from './ResumeContext';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SocialLinks from './Others/SocialMediaLinks';
import Specifications from './Others/Specifications';





const Others = (props) => {
  console.log(props)
  const formikRef = useRef();
  const contextObject = useContext(ResumeContext);
  const [buttonLoadingOne, setButtonLoadingOne] = useState(false);
  const [finish,setFinish] = useState(false);

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
  const validationSchema = Yup.object().shape({
    education: Yup.array().of(
      Yup.object().shape({
        university: Yup.string().required('This field is required'),
        yearofpassing: Yup.string().required('This field is required'),
        degree: Yup.string().required('This field is required'),
      })
    )
  });
      // }
      const handleInputChange=(index, e)=>{
        let Educations=[...contextObject.education]
        var name = e.target.name
            // window.alert(name)
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
    const handlefinish = () => {
      setFinish(true)
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
            Other Details
          </Typography>
          <Typography sx={{ color: "grey" }}>
            ✨ Highlight your top education achievements🎓, including any
            programs you're currently pursuing!" 📚
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SocialLinks />
        </Grid>
        <Grid item xs={12}>
          <Specifications/>
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
                onClick={() => {
                  props.setValue(4);
                  console.log(props.value);
                }}
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
                onClick={() => {
                  contextObject.updateFinish(true);
                  handlefinish();
                }}
              >
                Finish <ArrowForwardIcon style={{ fontSize: "15px" }} />
              </Button>
            </Box>
          
          </Box>
          <Box>
              {finish ? (
                <div class="alert alert-light" role="alert">
                  Resume has been completed ! Click on
                  {buttonLoadingOne === true ? (
                    <Button style={{ textTransform: "capitalize" }} disabled>
                      Downloading...
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        contextObject.updateFinishOne(true);
                        setButtonLoadingOne(true);
                      }}
                      style={{
                        textTransform: "capitalize",
                        textDecoration: "underline",
                      }}
                    >
                      Download
                    </Button>
                  )}
                </div>
              ) : (
                ''
              )}
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Others;

