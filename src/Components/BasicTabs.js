import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "./BuilderHeader";
import Education from "./BuilderEducation";
import Certification from "./BuilderCertification";
import Skills from "./BuilderSkills";
import Experience from "./BuilderExperience";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    style: {
      fontWeight: "500",
      color: "#406882",
    },
  };
}

const steps = [
  "Header",
  //"Skills",
  "Experience",
  "Education",
  "Certification",
];

export default function BasicTabs(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    //alert(value)
    console.log(value);
    //  if(value >= 0 && value < 6)  {

    //      setValue(value+1)
    //  }

    //   let newSkipped = skipped;
    //   if (isStepSkipped(activeStep)) {
    //     newSkipped = new Set(newSkipped.values());
    //     newSkipped.delete(activeStep);
    //   }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //setSkipped(newSkipped);
  };

  const handleBack = (value) => {
    console.log("value:", value);
    if (value >= 0 && value < 6) {
      setValue(value);
      setActiveStep(value);

    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createUser = (userName, password, profileData) => {
    setValue(1);
    console.log(userName, password);
    props.getCredentials(userName, password);
    props.getProfileData(profileData);
  };

  React.useEffect(() => {
    return () => {
      console.log(value);
      let newValue = value + 1;
      if (value + 1 === newValue) {
        handleNext();
      }

    };
  }, [value]);


  React.useEffect(() => {
    return () => {
      //console.log(value);
     
      setActiveStep(value);

    };
  }, [activeStep]);

  console.log("activeStep:", activeStep);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} className="stepper-scrool">
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption"></Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps} className="stepper-styles" >
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                {/*  <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset} style={{  backgroundColor:"#f0f0f0"  }} >Reset</Button>
            </Box>  */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {console.log("value" , value)}
                  {value === 0 ? (
                    <Header
                      handleNext={handleNext}
                      createUser={createUser}
                      value={value}
                      setValue={setValue}
                    />
                  ) : (
                    ""
                  )}
                 
                  {value === 1 ? (
                    <Skills
                      handleBack={handleBack}
                      handleNext={handleNext}
                      createUser={createUser}
                      value={value}
                      setValue={setValue}
                    />
                  ) : (
                    ""
                  )}
                  {value === 2 ? (
                    <Experience
                      handleBack={handleBack}
                      handleNext={handleNext}
                      createUser={createUser}
                      value={value}
                      setValue={setValue}
                    />
                  ) : (
                    ""
                  )}
                  {value === 3 ? (
                    <Education
                      handleBack={handleBack}
                      handleNext={handleNext}
                      createUser={createUser}
                      value={value}
                      setValue={setValue}
                    />
                  ) : (
                    ""
                  )}
                  {value ===  4 ? (
                    <Certification
                      handleBack={handleBack}
                      handleNext={handleNext}
                      createUser={createUser}
                      value={value}
                      setValue={setValue}
                    />
                  ) : (
                    ""
                  )}
                </Typography>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
