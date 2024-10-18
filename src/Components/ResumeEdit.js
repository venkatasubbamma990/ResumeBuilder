import React, { useEffect, useContext } from "react";
import { Box, Grid, Typography } from '@mui/material';
import ResumeContext from "./ResumeContext";
import ResumeMaker from "./ResumeMaker";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BasicTabs from "./BasicTabs";

function Resumedit(props) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [profileData, setProfileData] = React.useState([]);
  const contextObject = useContext(ResumeContext);
  const [currentIndex, setCurrentIndex] = React.useState(0);


  const handleSaveToPDF = (event) => {
    event.preventDefault();
    window.print();
  };
  const makeContextEmpty = () => {
    contextObject.updateJobTitle("");
    contextObject.updateWebsite("");
    contextObject.updatePortfolio("");
    contextObject.updateLinkedIn("");
    contextObject.updateGitHub("");
    contextObject.updatePortfolio("");
    contextObject.updateLeetCode("");
    contextObject.updateHackerRank([]);
    contextObject.updateEmail("");
    contextObject.updatePhone("");

    contextObject.updateDegree("");
    contextObject.updateResumeImage("");
    contextObject.updateResumeImageObject({});
    contextObject.updateInstitute("");
    contextObject.updateStream("");
    contextObject.updateYear("");
    contextObject.updateUserId("");
    contextObject.updatePassword("");
    contextObject.updateConfirmPassword("");
    contextObject.updateProjecttitle("");
    contextObject.updateClient("");
    contextObject.updateRole("");
    contextObject.updateCountry("");
    contextObject.updateCountryLabel("United States");
    contextObject.updateState("");
    contextObject.updateStateLabel("");
    contextObject.updateCity("");
    contextObject.updateVisaType("");
    contextObject.updateVisaTypeLabel("");
    contextObject.updateJobType("");
    contextObject.updateJobTypeLabel("");
    contextObject.updateCityLabel("");
    contextObject.updateStartdate("");
    contextObject.updateEnddate("");
    contextObject.updateCertificateLogo("");

    contextObject.updateExperience("");
    contextObject.updateSkillNames([]);
    contextObject.updateResumetemplate("0");
    contextObject.updateFinish(false);
    contextObject.updateFinishOne(false);
  };
  useEffect(() => {
    return () => {
      contextObject.updateSummary("");
      contextObject.updateCertificate([{ certName: "", certYear: "" }]);

      contextObject.updateEducation([
        { university: "", yearofpassing: "", degree: "" },
      ]);
      contextObject.updateProject([
        {
          projectTitle: "",
          country: "",
          country_id: "",
          state: "",
          state_id: "",
          city: "",
          city_id: "",
          responsibilities: "",
          description: "",
          date_start: "",
          organization: "",
          date_end: "",
          jobtitle: "",
        },
      ]);
      contextObject.updateSkills([
        { category :"", skills: [] },
      ]);
      makeContextEmpty();
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const getCredentials = (userName, password) => {
    console.log(userName, password);
    setPassword(password);
    setUserName(userName);
  };

  const getProfileData = (profileData) => {
    setProfileData(profileData);
  };


  const items = [
    '50% , Increase in dream job prospects',
    "30% , Higher chance of getting a job",
    "42% , Higher response rate from recruiters"
  ];
  const parseItem = (item) => {
    const [percentage, text] = item.split(' ,');
    return { percentage, text };
  };

  const { percentage, text } = parseItem(items[currentIndex]);
  const gradientTextStyle = {
    background: "linear-gradient(to right, #FF5722, #FFC107)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <Grid container spacing={2}  sx={{
      background:
        "radial-gradient(circle, #fff, aliceblue ,#fff,aliceblue,#fff)",
    }}>
      <Grid
        container
      >
        <Grid item md={2}></Grid>
        <Grid item md={2}></Grid>
        <Grid item md={3}></Grid>
        <Grid item md={5}>
          <Box
            sx={{
              textAlign: 'center',
              width: "400px",
              padding: "5px",
              mt: 5,
              border: "1px solid #408862",
              borderRadius : "50px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
             // background : "linear-gradient(45deg, #fff, #aecae1 ,#fff,#aecae1,#fff)",
              animation: 'moveUp 1s ease-in-out',
              '@keyframes moveUp': {
                '0%': {
                  transform: 'translateY(20px)',
                  opacity: 0,
                },
                '100%': {
                  transform: 'translateY(0)', 
                  opacity: 1,
                },
              },
             
            }}
          >
            <TrendingUpIcon sx={{ color: 'green' }} /> 
            <Typography variant="h6" sx={{ ...gradientTextStyle , fontWeight: 'bold' }}>
              {percentage}
            </Typography>
            <Typography  sx={{ 
              color : "#406882",
              fontWeight : "bold",
              fontSize : "17px",
              transition: 'top 1s ease-in-out'}}>{text}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          mt:0.5,
          background:
            "radial-gradient(circle, #fff, aliceblue ,#fff,aliceblue,#fff)",
        }}
      >
        <Grid item sm={0.7} lg={0.5}></Grid>
        <Grid item lg={5.6} md={5.5} sm={12} xs={12} className="form-container">
          <BasicTabs
            getCredentials={getCredentials}
            getProfileData={getProfileData}
          />
        </Grid>

        <Grid item lg={5.6} md={5.6} sm={12} xs={12} >
          <ResumeMaker
            userName={userName}
            password={password}
            profileData={profileData}
           
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Resumedit
