import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  ListItemButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import firstImage from "./ResumeTemplateImages/Template1.png"
import secImage from "./ResumeTemplateImages/Template2.png"
import thirdImage from "./ResumeTemplateImages/Template3.png"
import fourthImage from "./ResumeTemplateImages/Template4.png"
import fifthImage from "./ResumeTemplateImages/Template5.png"
import sixthImage from "./ResumeTemplateImages/Template6.png"
import seventhImage from "./ResumeTemplateImages/Template7.png"
import eighthImage from "./ResumeTemplateImages/Template8.png"
import ninthImage from "./ResumeTemplateImages/Template9.png"
import tenthImage from "./ResumeTemplateImages/Template10.png"
import Slider from "react-slick";
//import FormData from "./FormData";
import ResumeContext from "./ResumeContext";
import resumeSideImg from './Images/resumeBuilderImg.png';
import holdingResume from './Images/holdingResume.jpg';
import resumetemplatesImages from './Images/resumetemplatesimg.jpg';
import downloadedImage from "./Images/downoladImg.png"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';


function ResumeTemplates() {
//   const resumeData = [
//     { id: 1, data: <FormData templateId={1} /> },
//     // {id:1,data:<ResumeOne/>},
//     { id: 2, data: <FormData templateId={1} /> },
//     { id: 3, data: "resumeThree" },
//     { id: 4, data: "resumeFour" },
//     { id: 5, data: "resumeFive" },
//   ];
 
  const avatarRef = useRef(null);
  const navigate = useNavigate()
  const [rotation, setRotation] = useState(0);
 // const [resumes, setResumes] = useState(resumeData);
  const [templateId, setTemplateId] = useState(1);
  const contextObject = useContext(ResumeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); 
  const isDesktopLarge = useMediaQuery(theme.breakpoints.up("lg")); 
  const templateData = [
    { id: 0, image: firstImage, title: "template1" },
    { id: 2, image: secImage, title: "template2" },
    { id: 3, image: thirdImage, title: "template3" },
    { id: 4, image: fourthImage, title: "template4" },
    { id: 5, image: fifthImage, title: "template5" },
    { id: 6, image: sixthImage, title: "template6" },
    { id: 7, image: seventhImage, title: "template7" },
    { id: 8, image: eighthImage, title: "template8" },
    { id: 9, image: ninthImage, title: "template9" },
    { id: 10, image: tenthImage, title: "template10" },
    //{ id: 11, image: eleventhImage, title: "template11" },
  ];
 
   
  var sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: true,
          // dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
   
  
 
  


  const handleImage = (templateId) => {
    setTemplateId(templateId);
    console.log("template" ,templateId)
    contextObject.updateResumetemplate(JSON.stringify(templateId));
   
    // const newResumes = resumes.filter((resume) =>
    //   resume.id === templateId ? resume : null
    // );   
    // setResume(newResumes[0]);
    // history.push({
    //   pathname: "/createResume",
    // });
    navigate("/createResume")
    const savedData = sessionStorage.getItem('resumeData')  && sessionStorage.getItem('resumeData') ;
    if (savedData) {
      const data = JSON.parse(savedData);
      contextObject.updateJobTitle(data.jobTitle);
      contextObject.updateWebsite(data.website);
      contextObject.updateLinkedIn(data.linkedIn);
      contextObject.updateGitHub(data.gitHub);
      contextObject.updateLeetCode(data.leetCode);
      contextObject.updateHackerRank(data.hackerRank);
      contextObject.updatePortfolio(data.portfolio);
      contextObject.updateName(data.name);
      contextObject.updateEmail(data.email);
      contextObject.updatePhone(data.phone);
      contextObject.updateSummary(data.summary);
      contextObject.updateDegree(data.degree);
      contextObject.updateResumeImage(data.resumeImage);
      contextObject.updateResumeImageObject(data.resumeImageObject);
      contextObject.updateInstitute(data.institute);
      contextObject.updateStream(data.stream);
      contextObject.updateYear(data.year);
      contextObject.updateSkills(data.skills);
      contextObject.updateUserId(data.userId);
      contextObject.updatePassword(data.password);
      contextObject.updateConfirmPassword(data.confirmPassword);
      contextObject.updateProjecttitle(data.projecttitle);
      contextObject.updateClient(data.client);
      contextObject.updateRole(data.role);
      contextObject.updateCountry(data.country);
      contextObject.updateCountryLabel(data.countryLabel);
      contextObject.updateState(data.state);
      contextObject.updateStateLabel(data.stateLabel);
      contextObject.updateCity(data.city);
      contextObject.updateVisaType(data.visaType);
      contextObject.updateVisaTypeLabel(data.visaTypeLabel);
      contextObject.updateJobType(data.jobType);
      contextObject.updateJobTypeLabel(data.jobTypeLabel);
      contextObject.updateCityLabel(data.cityLabel);
      contextObject.updateStartdate(data.startdate);
      contextObject.updateEnddate(data.enddate);
      contextObject.updateCertificate(data.certificate);
      contextObject.updateEducation(data.education);
      contextObject.updateProject(data.project);
      contextObject.updateExperience(data.experience);
      contextObject.updateSkillNames(data.skillNames);
      contextObject.updateFinish(data.finish);
      contextObject.updateFinishOne(data.finishOne);
      contextObject.updateCertificateLogo(data.certificateLogo);
      //contextObject.getStates(data.statesList); 
    }

    // setShowForm(true);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 360);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.style.transition = 'transform 1s linear';
      avatarRef.current.style.transform = `rotateY(${rotation}deg)`;
    }
  }, [rotation]);
  
 
  
  const gradientTextStyle = {
    background: "linear-gradient(to right, #FF5722, #FFC107)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <Grid container sx={{ backgroundColor: '#fff' }}>
      <Grid item xs={12} sm={6} md={4}>
        
      </Grid>
      <Grid item xs={12}>
        {/* {currentUser === null ? <Navbar /> : ""} */}
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            background:
              "radial-gradient(circle, #fff, aliceblue ,#fff,#cae0f3,#fff)",
          }}
        >
          <Grid
            item
            xs={isMobile || isTablet ? 12 : isDesktopLarge ? 5.5 : 5.5}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 2,
                mx: 5,
                textAlign: "center",
                width: "100%",
              }}
            >
              
              <Avatar
                ref={avatarRef}
                src={resumeSideImg}
                alt={"ResumeTemplate"}
                sx={{
                  width: "60%",
                  height: "50%",
                  borderRadius: '8px',
                }}
              />
             
            </Box>
          </Grid>
          <Grid item xs={isMobile || isTablet ? 12 : isDesktopLarge ? 5 : 6}>
            <Box
              sx={{
                textAlign: isMobile || isTablet ? "center" : 'justify',
                width: "100%",
              }}
            >
              <Typography
                // variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  color: "#406882",
                  textShadow: '2px 0px 2px #212529',
                  marginRight: 10,
                  fontSize: isDesktopLarge ? "50px" : "40px",
                   fontFamily: "'Times New Roman', serif !important"
                }}
              >
                The Ultimate Resume Creation Tool📝
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                ✨ Easily generate a flawless resume 📝 for any career
                opportunity with our leading resume builder platform. 🌟
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: isMobile || isTablet ? "center" : 'justify',
                width: "100%",
              }}
            >
              <Button
                gutterBottom
                variant="contained"
                onClick={() => handleImage(templateData?.[0].id)}
                sx={{
                  fontSize: 15,
                  color: 'white',
                  backgroundColor: '#406882',
                  '&:hover': {
                    backgroundColor: '#406882',
                  },
                  //marginLeft: 10,
                  marginTop: 3,
                  marginBottom: 3,
                  borderRadius: 5,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  boxShadow: '0 0 5px black',
                  fontFamily: "'Times New Roman', serif !important"
                  // animation: `${rotateLeftToRight} 1s linear infinite`
                }}
              >
                Create Resume<span style={{ color: '#b6d9d9' }}>��️</span>
              </Button>
              <Box
                sx={{
                  display: "flex",
                  //justifyContent: "center",
                  width: isMobile || isTablet ? "100%" : "300px",
                  justifyContent:
                    isMobile || isTablet ? "center" : 'space-between',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "120px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      gutterBottom
                      sx={{
                        ...gradientTextStyle,
                        fontWeight: "bold",
                        fontSize: "30px",
                      }}
                    >
                      2X
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      ...gradientTextStyle,
                    }}
                  >
                    More Interviews
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "120px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100px",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      gutterBottom
                      sx={{
                        ...gradientTextStyle,
                        fontWeight: "bold",
                        fontSize: "30px",
                      }}
                    >
                      25%
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      ...gradientTextStyle,
                    }}
                  >
                    More Job Offers
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          background:
            "radial-gradient(circle, #fff, aliceblue ,#fff,#cae0f3,#fff)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            my :2,
            color : "#406882",
            fontSize : "25px",
            fontFamily: "'Times New Roman', serif !important"
          }}
        >
          A Trio of Essential Steps for an Professional Resume
        </Typography>
        <Box
          sx={{
            mx: 2,
            mb: 2,
            width: "95%",
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
          }}
        >
          <Box></Box>
          <Box sx={{ textAlign: "center", width: "20%",mt:2, }}>
          <Avatar
                        src={holdingResume}
                        alt={"holdingResume"}
                        sx={{
                          width: "90%",
                          height: "30%",
                          borderRadius: '8px',
                          //boxShadow: '0 0 5px black',
                        }}
                      />
            <Typography  gutterBottom
             sx={{ 
              fontSize: "25px",
               fontWeight: "bolder" ,
               mt:2 , 
               fontFamily: "'Times New Roman', serif !important",
    }}>
              Choose a template and complete the prompts.
            </Typography>
            <Typography sx={{ fontSize: "20px",fontFamily: "'Times New Roman', 'Georgia', serif !important" }}>
            Provide your information, and the builder📋 adapts your resume for the role🎯
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", width: "20%" }}>
          <Avatar
                        src={resumetemplatesImages}
                        alt={"resumetemplatesImages"}
                        sx={{
                          width: "90%",
                          height: "30%",
                          borderRadius: '8px',
                          //boxShadow: '0 0 5px black',
                        }}
                      />
            <Typography gutterBottom 
            sx=
            {{ 
              fontSize: "25px",
               fontWeight: "bolder",
               mt:2 ,
               fontFamily: "'Times New Roman', serif !important",
               }}>
              Get customized text that fits your work story.
            </Typography>
            <Typography sx={{ fontSize: "20px",fontFamily: "'Times New Roman', 'Georgia', serif !important" }}>
            Receive personalized ✨ content that aligns with your professional journey 📚 
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", width: "20%" }}>
          <Avatar
                        src={downloadedImage}
                        alt={"downloadedImage"}
                        sx={{
                          width: "90%",
                          height: "30%",
                          borderRadius: '8px',
                          //boxShadow: '0 0 5px black',
                        }}
                      />
            <Typography gutterBottom 
            sx={{ 
              fontSize: "25px",
               fontWeight: "bolder",
               mt:2 ,
               fontFamily: "'Times New Roman', serif !important",
               }}>
              Download and send to employers.
            </Typography>
            <Typography sx={{ fontSize: "20px",fontFamily: "'Times New Roman', 'Georgia', serif !important" }}>
            Save and share your resume as a PDF 📝, Word DOC 📃, or any format the employer needs📤 Create your resume today!
            </Typography>
          </Box>
          <Box></Box>
        </Box>
       
      </Grid>
      {/* <Grid item xs={12} sx={{textAlign :"center"}}>
      <Button
                gutterBottom
                variant="contained"
                onClick={() => handleImage(templateData?.[0].id)}
                sx={{
                  fontSize: 15,
                  color: 'white',
                  backgroundColor: '#406882',
                  '&:hover': {
                    backgroundColor: '#406882',
                  },
                  //marginLeft: 10,
                  // marginTop: 3,
                  // marginBottom: 3,
                  borderRadius: 5,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  boxShadow: '0 0 5px black',
                  // animation: `${rotateLeftToRight} 1s linear infinite`
                }}
              >
                Create Resume<span style={{ color: '#b6d9d9' }}>��️</span>
              </Button>
      </Grid> */}
      <Grid item xs={12}>
        <Paper
          elevation={2}
          sx={{
            // p: 2,
            paddingBottom: 20,
            background:
              'linear-gradient(to right, #fff, #add1e8, #fff, #ead0b6, #fff)',
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              //variant="h6"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", mt: 2, fontSize: "30px" }}
            >
              Explore a selection of premium templates 📄 <br /> craft a
              remarkable resume ✨ quickly and effortlessly ⏳.
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            {console.log(templateData)}
           
            <Slider {...sliderSettings}>
              {templateData?.length > 0 &&
                templateData?.map((template) => (
                  <StyledListItemButton
                    elevation={2}
                    key={template.id}
                    sx={{ mx: 2, width: "70%" }}
                  >
                    <GlassEffectDiv>
                      <Avatar
                        src={template.image}
                        alt={template.title}
                        sx={{
                          width: "90%",
                          height: "80%",
                          borderRadius: '8px',
                          //boxShadow: '0 0 5px black',
                        }}
                      />
                    </GlassEffectDiv>
                    <HoverButton
                      className="hoverButton"
                      variant="contained"
                      size="small"
                      onClick={() => handleImage(template.id)}
                    >
                      Select Template
                    </HoverButton>
                  </StyledListItemButton>
                ))}
            </Slider>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'var(--thumb-bg)',
  overflow: 'hidden',
  width: "80%",

  '&:hover .hoverButton': {
    opacity: 1,
    visibility: 'visible',
  },
}));
const HoverButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
  backgroundColor: "#406882",
  color: theme.palette.primary.contrastText,
  padding: '4px 6px',
  fontSize: '10px',
  '&:hover ': {
    opacity: 1,
    backgroundColor: "#df8e2b",
  },
}));
const GlassEffectDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  padding: '15px 5px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  columnGap: '0px',
  borderRadius: '12px',
  border: '1px solid transparent',
  borderColor: 'rgba(0, 0, 0, 0.2)', // Fallback color if var() is not working
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)', // For Safari
  background: 'rgba(255, 255, 255, 0.8)', // Fallback background if var() is not working
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
}));

export default ResumeTemplates;
