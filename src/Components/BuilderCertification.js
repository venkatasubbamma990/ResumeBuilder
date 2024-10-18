import React, { useContext, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ResumeContext from './ResumeContext';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MdOutlineDelete } from 'react-icons/md';




const BuilderCertification = (props) => {
    console.log(props)
  const formikRef = useRef();
  const contextObject = useContext(ResumeContext);

  const handleAddCertificattions = () => {
    contextObject.updateCertificate([...contextObject.certificate, { certName: "", certYear: "" }])

  };

  const handleDeleteFunction = idx => {
    contextObject.updateCertificate(contextObject.certificate.filter((year,  index) => index !== idx))
  
   }
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
      const handleInputChange = (index, e) => {
        let Certifications = [...contextObject.certificate]
        var name = e.target.name
        // window.alert(name)
        if (name === "certName") {
            Certifications[index]["certName"] = e.target.value
            contextObject.updateCertificate(Certifications)
        }
        if (name === "certYear") {
            Certifications[index]["certYear"] = e.target.value
            contextObject.updateCertificate(Certifications)
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
            Certification Details
          </Typography>
          <Typography sx={{ color: "grey" }}>
            ✨ Highlight your top education achievements🎓, including any
            programs you're currently pursuing!" 📚
          </Typography>
        </Box>
      </Box>
      <Formik
        innerRef={formikRef}
        initialValues={{
          certName: contextObject.certificate.map(
            (certificate) => certificate.certName
          ),
          certYear: contextObject.certificate.map(
            (certificate) => certificate.certYear
          ),
        }}
        onSubmit={(values) => {
          contextObject.updateCertificate(values.certificate);
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
              {contextObject.certificate.map((education, index) => (
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <label
                      htmlFor="Certification Name"
                      style={{ fontSize: "14px" }}
                    >
                      Certification Name
                    </label>{" "}
                    <br />
                    <input
                      id={`Certification Name-${index}`}
                      name={"certName"}
                      type="text"
                      autoComplete="off"
                      onChange={(e) => handleInputChange(index, e)}
                      onBlur={handleBlur}
                      className={` form-control`}
                      value={contextObject.certificate[index].certName}
                    />
                  </Grid>
                  <Grid item xs={11.5} sm={5.5} lg={5.5}>
                    <label
                      htmlFor={`education.${index}.yearofpassing`}
                      style={{ fontSize: "14px" }}
                    >
                      Year
                    </label>{" "}
                    <br />
                    <input
                      id={`Certification.${index}.year`}
                      name={`certYear`}
                      type="text"
                      className={` form-control`}
                      //placeholder="Job Title"
                      autoComplete="off"
                      onChange={(e) => handleInputChange(index, e)}
                      onBlur={handleBlur}
                      value={contextObject.certificate[index].certYear}
                    />
                  </Grid>
                  <Grid item xs={0.5} sm={0.5} lg={0.2}>
                    <IconButton
                    color='primary'
                      onClick={() => handleDeleteFunction(index)}
                      sx={{ fontSize: '20px', mt: 3  }}
                    >
                      <MdOutlineDelete />
                    </IconButton>
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
                variant="contained"
                onClick={handleAddCertificattions}
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
                onClick={() => props.setValue(3)}
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
                onClick={() => props.setValue(5)}
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

export default BuilderCertification;
