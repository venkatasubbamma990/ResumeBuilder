import {
    Box,
    Grid,
    IconButton,
    Paper,
    Typography,
    SvgIcon,
    Divider,
    Button,
    Link,
} from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import parse from "html-react-parser";
import WindowIcon from '@mui/icons-material/Window';
import ResumeContext from './ResumeContext';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { SketchPicker } from 'react-color';
import chroma from 'chroma-js';
import { useHistory, useNavigate } from "react-router-dom";
import Template3 from './Templates/Template3';
import Template2 from './Templates/Template2';
import Template4 from './Templates/Template4';
import Template5 from './Templates/Template5';
import Template6 from './Templates/Template6';
import Template7 from './Templates/Template7';  
import Template8 from './Templates/Template8';
import Template9 from './Templates/Template9';
import Template10 from './Templates/Template10';
import Template1 from './Templates/Template1';
// import { toast } from "react-toastify";
// import ToastMessage from "../Components/ToastMessage";
import { saveAs } from "@progress/kendo-file-saver";
import moment from "moment";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from '@mui/icons-material/Work';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import {
  drawDOM,
  exportPDF,
  DrawOptions,
  Group,
} from "@progress/kendo-drawing";
import axios from 'axios';

const GradientWindowIcon = (props) => (
    <SvgIcon {...props}>
        <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="30%" style={{ stopColor: '#2282c4', stopOpacity: 1 }} />
                <stop offset="70%" style={{ stopColor: '#406882', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <WindowIcon sx={{ fill: 'url(#gradient1)' }} />
    </SvgIcon>
);

function ResumeMaker(props) {
    const contextObject = useContext(ResumeContext);
    const container = useRef(null);
    const navigate = useNavigate();
    const pdfExportComponent = React.useRef(null);
    const [bgColor, setBgColor] = useState('#519d00');
    const [showPicker, setShowPicker] = useState(false);
    const [ipAddress, setIpAddress] = useState("");
    const [insertedResumeID, setInsertedResumeId] = useState(null);
    const [insertedProjectId, setInsertedProjectId] = useState(null);
    const [insertededucationid, setInsertedEducationId] = useState(null);
   const [insertedCertid, setInsertedCertId] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [educationData, setEducationData] = useState();
    const gradientStart = chroma(bgColor).brighten(1.5).hex();  // Lighter shade
    const gradientEnd = chroma(bgColor).darken(1.5).hex();      // Darker shade
    const gradiantMiddile = chroma.mix(gradientStart, gradientEnd, 0.5).hex();  
    const gradient = `linear-gradient(45deg, ${gradientStart} 30%, ${gradientEnd} 90%)`;

    
    useEffect(() => {
        let newArray = contextObject.education
          .map((e) => {
            // setEducationData([...educationData,{value:`${e.degree} in ${e.university}`}])
    
           return {value : `${e.degree} in ${e.university}`}
        //    educationData.map((d) => (d.));
          })
          
        console.log(educationData, newArray);
        setEducationData(newArray)
        if (contextObject.finishOne === true) {
         // handleSave();
          contextObject.updateFinishOne(false);
        }
        axios.get(`https://api.ipify.org/?format=text`).then(async (response) => {
          let ipaddress = response.data;
          setIpAddress(ipaddress);
        });
        console.log(contextObject.finishOne);
      }, [props, contextObject.finishOne]);


    const handleColorChange = (color) => {
        setBgColor(color.hex);
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };
    const redirectToResumebuilder = () => {
      const currentTemplateData = {
        ...contextObject 
      };
     console.log(("resumeData" , contextObject))
      sessionStorage.setItem("resumeData" , JSON.stringify(contextObject))
      console.log(("resumeData" , contextObject))
      navigate("/");
    };

    

    const getLuminance = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Apply the luminance formula
  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};
    
      const getTextColor = (bgColor) => {
        const luminance = getLuminance(bgColor);
        console.log(luminance)
        return luminance > 0.5 ? '#000' : '#fff';
      };
    
      const exportPDFWithComponent = () => {
        setButtonLoading(true);
    
       // handleSave();
      };

      function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
    
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
    
        return new File([u8arr], filename, { type: mime });
      }

      const paperstyles = {
        width: "95%",
        height: "90vh",
        overflow: "auto",
        boxShadow: `0 0 1px 1px ${bgColor}`,
        mx: 2,
      };
     

    console.log(contextObject.stateLabel.name)
    console.log(contextObject.stateLabel)
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              //border: '2px solid #000',
              borderRadius: '8px',
              padding: '8px',
              background:
                "radial-gradient(circle, #fff, #2282c4 ,#fff,#4899d0,#fff)",
              // Add your desired background color here
            }}
          >
            <Paper
              elevation={2}
              sx={{ width: "100%", height: window.innerHeight }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "40px",
                  //background : "radial-gradient(circle, #fff, #2282c4 ,#fff,#4899d0,#fff)",
                  display: "flex",
                  justifyContent: "space-between",
                  //alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={() => redirectToResumebuilder()}>
                    <GradientWindowIcon sx={{ fontSize: 28 }} />
                  </IconButton>
                  <Typography
                    sx={{
                      background:
                        'linear-gradient(135deg, #2282c4 10%, #406882 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      fontWeight: "bold",
                    }}
                    onClick={() => redirectToResumebuilder}
                  >
                    Select Templates
                  </Typography>
                </Box>
                <Box sx={{ mx: 2, my: 0.5, zIndex: 99 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={togglePicker}
                    sx={{
                      height: "29px",
                      fontSize: "12px",
                      background:
                        'linear-gradient(45deg, #2282c4 10%, #406882 90%)',
                      color: '#fff',
                      '&:hover': {
                        background:
                          'linear-gradient(45deg, #406882 30%, #2282c4 90%)',
                      },
                    }}
                  >
                    🎨
                    {showPicker ? 'Hide Color Picker' : 'Select Desired Theme'}
                  </Button>
                  {showPicker && (
                    <SketchPicker
                      color={bgColor}
                      onChangeComplete={handleColorChange}
                    />
                  )}
                </Box>
              </Box>
              <Box>
                <Paper
                  elevation={2}
                  sx={{
                    ...paperstyles,
                  }}
                >
                  <PDFExport
                    ref={pdfExportComponent}
                    scale={0.6}
                    fileName={"resume_" + contextObject.name}
                    paperSize="A4"
                    margin="1cm"
                  >
                    <Grid
                      container
                      spacing={2}
                      ref={container}
                      component={Paper}
                      sx={{
                        // height: "90vh",
                        background:
                          "radial-gradient(circle, #fff, aliceblue ,#fff,aliceblue,#fff)",

                        // padding: "1cm",
                        boxSizing: "border-box",
                      }}
                    >
                      {contextObject.resumetemplate === "0" ? (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              mx: 2,
                              mt: 1,
                              mb: 2,
                              textAlign: "center",
                              fontWeight: "bold",
                              color: getTextColor(bgColor),
                              background: gradient,
                              pb: 1,
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                              }}
                            >
                              {" "}
                              { contextObject.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                              }}
                            >
                              {" "}
                              {contextObject.jobTitle}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {`${contextObject.email} | ${contextObject.phone} | ${contextObject.portfolio}`}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {" "}
                              {contextObject.address}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: getTextColor(bgColor),
                              }}
                            >
                              <Link
                                href={contextObject.linkedIn}
                                target="_blank"
                                rel="noopener"
                                sx={{
                                  mr: 1,
                                  color: getTextColor(bgColor),
                                  textDecoration: "none",
                                }}
                              >
                                {contextObject.linkedIn}
                              </Link>
                              {contextObject.gitHub && <span>|</span>}
                              <Link
                                href={contextObject.gitHub}
                                target="_blank"
                                rel="noopener"
                                sx={{
                                  mx: 1,
                                  color: getTextColor(bgColor),
                                  textDecoration: "none",
                                }}
                              >
                                {contextObject.gitHub}
                              </Link>
                            </Typography>
                            {/* <Divider /> */}
                          </Box>
                          <Box
                            sx={{
                              mx: 2,
                              fontWeight: "bold",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: gradientEnd,
                                fontWeight: "bold",
                                fontSize: "18px",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                              }}
                            >
                              Objective :
                            </Typography>
                            <Divider
                              sx={{
                                border: `1px solid  ${gradientEnd}`,
                              }}
                            />
                            <Typography
                              sx={{
                                mt: 1,
                                fontSize: "12px",
                                textAlign: "justify",
                              }}
                            >
                              { parse(contextObject.summary)}
                            </Typography>
                            {/* <Divider /> */}
                          </Box>

                          <Typography
                            variant="body1"
                            sx={{
                              mx: 2,
                              color: gradientEnd,
                              fontWeight: "bold",
                              fontSize: "18px",
                              fontFamily: "'Times New Roman', serif !important",
                            }}
                          >
                            Work History :
                          </Typography>
                          <Divider
                            sx={{
                              mx: 2,
                              border: `1px solid  ${bgColor}`,
                            }}
                          />
                          <Box sx={{ mx: 2, fontWeight: "bold" }}>
                            {contextObject.project?.length > 0 ? (
                              <div>
                                {(contextObject.project[0].projectTitle.length >
                                  0 ||
                                  contextObject.project[0].role != "" ||
                                  contextObject.project[0].company != "") && (
                                  <Box>
                                    {contextObject.project.map(
                                      (item, index) => (
                                        <Box
                                          sx={{
                                            width: "100%",
                                            // mx: 2,
                                            fontSize: "12px",
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              width: "100%",

                                              display: "flex",
                                              justifyContent: 'space-between',
                                            }}
                                          >
                                            <Box>
                                              <Typography
                                                sx={{
                                                  fontWeight: "bold",
                                                  fontSize: "14px",
                                                  fontFamily:
                                                    "'Times New Roman', serif !important",
                                                }}
                                              >
                                                {item.company}
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  fontSize: "13px",
                                                  fontFamily: 'sans-serif',
                                                  fontStyle: 'italic',
                                                }}
                                              >
                                                {item.role}
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  fontSize: "13px",
                                                  fontFamily: 'sans-serif',
                                                  fontWeight: 600,
                                                }}
                                              >
                                                {item.projectTitle}
                                              </Typography>
                                            </Box>
                                            <Box sx={{ mx: 2 }}>
                                              <Typography
                                                sx={{ fontSize: "12px" }}
                                              >
                                                {item.startdate}{" "}
                                                -{" "}
                                                {item.enddate}
                                              </Typography>
                                              <Typography
                                                sx={{ fontSize: "12px" }}
                                              >
                                                {item.city}{" "}
                                                ,{" "}
                                                {item.state}
                                              </Typography>
                                            </Box>
                                          </Box>
                                          <Box sx={{ width: "100%", mr: 2 }}>
                                          <Typography
                                              sx={{ fontSize: "12px" , fontWeight:"bold" , color:gradiantMiddile }}
                                            >
                                              Description
                                            </Typography>
                                            <Typography
                                              sx={{ fontSize: "12px" }}
                                            >
                                              {parse(item.description?.slice(0, 400))}
                                            </Typography>
                                            <Typography
                                              sx={{ fontSize: "12px" ,fontWeight:"bold" , color:gradiantMiddile  }}
                                            >
                                             Roles &  Responsibilities :
                                            </Typography>
                                            <Typography
                                              sx={{ fontSize: "12px" }}
                                            >
                                              {parse(item.responsibilities?.slice(0, 500))}
                                            </Typography>
                                          
                                          </Box>
                                          
                                         

                                        </Box>
                                      )
                                    )}
                                  </Box>
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </Box>
                          <Grid container spacing={1}>
                            <Grid item xs={5}>
                              <Box sx={{ width: "100%" }}>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    mx: 2,
                                    my: 0.5,
                                    color: gradientEnd,
                                    fontWeight: "bold",
                                    fontFamily:
                                      "'Times New Roman', serif !important",
                                    // background: gradiantMiddile,
                                    // borderRadius : "50px",
                                    // borderBottom  : `2px solid  ${gradiantMiddile}`,
                                    width: "110px",
                                    fontSize: "18px",
                                    px: 1,
                                  }}
                                >
                                  Skills :
                                </Typography>
                                <Divider
                                  sx={{
                                    mx: 2,
                                    border: `1px solid  ${bgColor}`,
                                  }}
                                />
                             
                                {contextObject.skills?.length > 0 &&
                                  contextObject.skills.map(
                                    (categoryData, categoryIndex) => (
                                      <Box key={categoryIndex} sx={{ mx: 1 }}>
                                        <Typography
                                          sx={{
                                            fontWeight: "bold",
                                            fontSize: "13px",
                                            display: "inline",
                                            backgroundColor: "#f0f0f0",
                                            px: 0.6,
                                          }}
                                        >
                                          {categoryData.category}:{" "}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: "12px",
                                            display: "inline",
                                            color: "black",
                                          }}
                                        >
                                          {categoryData.skills?.join(", ")}
                                        </Typography>
                                      </Box>
                                    )
                                  )}
                              </Box>
                            </Grid>
                            <Grid item xs={7}>
                              <Box>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    mx: 2,
                                    my: 0.5,
                                    color: gradientEnd,
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    fontFamily:
                                      "'Times New Roman', serif !important",
                                  }}
                                >
                                  {contextObject.education[0]?.degree?.length >
                                    0 && "Education :"}
                                </Typography>
                                <Divider
                                  sx={{
                                    mx: 2,
                                    border: `1px solid  ${bgColor}`,
                                  }}
                                />
                                <Box sx={{ mx: 2, fontWeight: "bold" }}>
                                  {contextObject.education?.length > 0 ? (
                                    <div>
                                      {(contextObject.education[0].degree
                                        ?.length > 0 ||
                                        contextObject.education[0].university
                                          ?.length > 0 ||
                                        contextObject.education[0].yearofpassing
                                          ?.length > 0) && (
                                        <div>
                                          {contextObject.education.map(
                                            (item, index) => (
                                              <Box
                                                sx={{
                                                  width: "100%",
                                                  // mx: 2,
                                                  fontSize: "12px",
                                                }}
                                              >
                                                <Box
                                                  sx={{
                                                    width: "100%",

                                                    display: "flex",
                                                    justifyContent:
                                                      'space-between',
                                                  }}
                                                >
                                                  <Box>
                                                    <Typography
                                                      sx={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                        fontFamily:
                                                          "'Times New Roman', serif !important",
                                                      }}
                                                    >
                                                      {item.university}
                                                    </Typography>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "12px",
                                                        fontFamily:
                                                          'sans-serif',
                                                        fontStyle: 'italic',
                                                      }}
                                                    >
                                                      {item.degree}
                                                    </Typography>
                                                  </Box>
                                                  <Box sx={{ mx: 2 }}>
                                                    <Typography
                                                      sx={{ fontSize: "12px" }}
                                                    >
                                                      {item.yearofpassing}{" "}
                                                    </Typography>
                                                  </Box>
                                                </Box>
                                              </Box>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Box>
                              </Box>

                              <Box>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    mx: 2,
                                    my: 0.5,
                                    color: gradientEnd,
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    fontFamily:
                                      "'Times New Roman', serif !important",
                                  }}
                                >
                                  {contextObject.certificate[0].certName
                                    .length > 0 && "Certification :"}
                                </Typography>
                                <Divider
                                  sx={{
                                    mx: 2,
                                    border: `1px solid  ${bgColor}`,
                                  }}
                                />
                                <Box sx={{ mx: 2, fontWeight: "bold" }}>
                                  {contextObject.certificate?.length > 0 ? (
                                    <div>
                                      {(contextObject.certificate[0].certName
                                        .length > 0 ||
                                        contextObject.certificate[0].certYear
                                          .length > 0) && (
                                        <div>
                                          {contextObject.certificate.map(
                                            (item, index) => (
                                              <Box
                                                sx={{
                                                  width: "100%",
                                                  // mx: 2,
                                                  fontSize: "12px",
                                                }}
                                              >
                                                <Box
                                                  sx={{
                                                    width: "100%",

                                                    display: "flex",
                                                    justifyContent:
                                                      'space-between',
                                                  }}
                                                >
                                                  <Box>
                                                    <Typography
                                                      sx={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                        fontFamily:
                                                          "'Times New Roman', serif !important",
                                                      }}
                                                    >
                                                      {item.certName}
                                                    </Typography>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "12px",
                                                        fontFamily:
                                                          'sans-serif',
                                                        //fontStyle: 'italic',
                                                      }}
                                                    >
                                                      {item.certificatelink}
                                                    </Typography>
                                                  </Box>
                                                  <Box sx={{ mx: 2 }}>
                                                    <Typography
                                                      sx={{ fontSize: "12px" }}
                                                    >
                                                      {item.certYear}{" "}
                                                    </Typography>
                                                  </Box>
                                                </Box>
                                              </Box>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Box>
                              </Box>
                              <Box
              sx={{
                width: "100%",
                mt: 0.5,
                mx: -1,
                borderBottom: `3px solid ${gradiantMiddile}`,
                borderTop: `3px solid ${gradiantMiddile}`,
                borderLeft: `1px solid ${gradiantMiddile}`,
                borderRight: `1px solid ${gradiantMiddile}`,
                borderRadius: "25px",
                px:2
              }}
            >
              {contextObject.stateLabel.name  && (
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontFamily: "'Georgia', serif !important",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <HomeIcon
                    style={{ fill: gradiantMiddile, fontSize: "13px" }}
                  />{" "}
                  {contextObject.cityLabel},{contextObject.stateLabel.name}
                </Typography>
              )}
              {contextObject.visaTypeLabel && (
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontFamily: "'Georgia', serif !important",
                    color: "black",
                  }}
                >
                  {" "}
                  <AirplanemodeActiveIcon
                    style={{ fill: gradiantMiddile, fontSize: "13px" }}
                  />{" "}
                  {contextObject.visaTypeLabel.join(", ")}
                </Typography>
              )}
              {contextObject.jobTypeLabel && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontFamily: "'Georgia', serif !important",
                    color: "black",
                  }}
                >
                  {" "}
                  <WorkIcon
                    style={{ fill: gradiantMiddile, fontSize: "13px" }}
                  />{" "}
                  {contextObject.jobTypeLabel.join(", ")}
                </Typography>
              )}
            </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : contextObject.resumetemplate === "2" ? (
                        <Template1 bgColor={bgColor} /> 
                      ) 
                      : contextObject.resumetemplate === "3" ? (
                        <Template2 bgColor={bgColor} />
                      ) : contextObject.resumetemplate === "4" ? (
                        <Template3 bgColor={bgColor} />
                      ) : contextObject.resumetemplate === "5" ? (
                        <Template4 bgColor={bgColor} />
                      ) : contextObject.resumetemplate === "6" ? (
                        <Template5 bgColor={bgColor} />
                      ) : contextObject.resumetemplate === "7" ? (
                        <Template6 bgColor={bgColor} />
                      ) : contextObject.resumetemplate === "8" ? (
                        <Template7 bgColor={bgColor} />
                      ) : contextObject.resumetemplate === "9" ? (
                        <Template8 bgColor={bgColor} />
                      ) : contextObject.resumetemplate === "10" ? ( 
                        <Template9 bgColor={bgColor} /> 
                      ) : contextObject.resumetemplate === "11" ? (
                        <Template10 bgColor={bgColor} />
                      ) 
                      : (
                        ""
                      )}
                    </Grid>
                  </PDFExport>
                </Paper>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    );
}



  export default ResumeMaker;
