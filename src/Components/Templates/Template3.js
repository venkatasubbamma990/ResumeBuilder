import React, { useContext, useRef, useState } from 'react'
import ResumeContext from '../ResumeContext'
import parse from "html-react-parser";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Box, Chip, Grid, Link, Typography } from '@mui/material';
import chroma from 'chroma-js';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from '@mui/icons-material/GitHub';



const Template3 = (props) => {
    const contextObject = useContext(ResumeContext)
    const pdfExportComponent = useRef(null);
    const [bgColor, setBgColor] = useState(props.bgColor);
    const gradientStart = chroma(props.bgColor).brighten(1.5).hex();  // Lighter shade
    const gradientEnd = chroma(props.bgColor).darken(1.5).hex(); 
    const gradiantMiddile = chroma.mix(gradientStart, gradientEnd, 0.5).hex();     // Darker shade
    const gradient = `linear-gradient(45deg, ${gradientStart} 30%, ${gradientEnd} 90%)`
    const getLuminance = (hex) => {
        const r = parseInt(hex?.slice(1, 3), 16) / 255;
        const g = parseInt(hex?.slice(3, 5), 16) / 255;
        const b = parseInt(hex?.slice(5, 7), 16) / 255;
  
        // Apply the luminance formula
        const a = [r, g, b].map((v) => {
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
  
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
      };
  
      const getTextColor = (bgColor) => {
        const luminance = getLuminance(bgColor);
        console.log(luminance);
        return luminance > 0.5 ? '#000' : '#fff';
      };

     


    return (
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Box
                sx={{
                  m: 1,
                  textAlign: "left",
                  fontWeight: "bold",
                  color: getTextColor(bgColor),
                  background: gradient,
                  pb: 1,
                  p: 1,
                  width: "100%",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "'Garamond', serif !important",
                  }}
                >
                  {" "}
                  {contextObject.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    mb: 2,
                    fontFamily:
                      "'Palatino Linotype', 'Book Antiqua', Palatino, serif !important",
                  }}
                >
                  {" "}
                  {contextObject.jobTitle}
                </Typography>

                {contextObject.email && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: getTextColor(bgColor),
                      fontFamily: "'Georgia', serif !important",
                    }}
                  >
                    {" "}
                    <EmailIcon  style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }} />{" "}
                     {contextObject.email}
                  </Typography>
                )}
                {contextObject.phone && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: getTextColor(bgColor),
                      fontFamily: "'Georgia', serif !important",
                    }}
                  >
                    {" "}
                    <PhoneIcon
                     style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }}
                    />{" "}
                    {contextObject.phone}
                    
                  </Typography>
                )}
                {(contextObject.cityLabel || contextObject.stateLabel.name) && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontFamily: "'Georgia', serif !important",
                      color: getTextColor(bgColor),
                    }}
                  >
                    {" "}
                   
                    <HomeIcon
                     style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }}
                    />{" "}
                    {contextObject.cityLabel},{contextObject.stateLabel.name}
                  </Typography>
                )}
                {contextObject.linkedIn && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: getTextColor(bgColor),
                      fontFamily: "'Georgia', serif !important",
                    }}
                  >
                    <Link
                      href={contextObject.linkedIn}
                      target="_blank"
                      rel="noopener"
                      sx={{  color: "inherit", textDecoration: "none" }}
                    >
                      <LinkedInIcon
                        style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }}
                      />{" "}
                      {contextObject.linkedIn}
                    </Link>
                  </Typography>
                )}
                 {contextObject.gitHub && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontFamily: "'Georgia', serif !important",
                        color: getTextColor(bgColor),
                      }}
                    >
                      <Link
                        href={contextObject.gitHub}
                        target="_blank"
                        rel="noopener"
                        sx={{ mr: 1, color: "inherit", textDecoration: "none" }}
                      >
                        <GitHubIcon style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }} />{" "}
                        {contextObject.gitHub}
                      </Link>
                    </Typography>
                  )}
                {contextObject.portfolio && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontFamily: "'Georgia', serif !important",
                      color: getTextColor(bgColor),
                    }}
                  >
                    <Link
                      href={contextObject.portfolio}
                      target="_blank"
                      rel="noopener"
                      sx={{ mr: 1, color: "inherit", textDecoration: "none" }}
                    >
                      <LanguageIcon
                       style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }}
                      />{" "}
                      {contextObject.portfolio}
                    </Link>
                  </Typography>
                )}
              </Box>

              <Box sx={{ width: "100%", mx: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 0.5,
                    color: gradiantMiddile,
                    fontWeight: "bold",
                    fontFamily: "'Trebuchet MS', sans-serif !important",

                    // background: gradiantMiddile,
                    width: "100px",
                    px: 1,
                    //   borderRadius : "50px",
                       borderBottom  : `2px solid  ${gradiantMiddile}`,
                  }}
                >
                  {contextObject.education[0]?.degree?.length > 0 &&
                    "Education"}
                </Typography>
                {/* <Divider
                sx={{
                  mx: 2,
                  border: `1px solid  ${gradiantMiddile}`,
                }}
              /> */}
                <Box>
                  {contextObject.education?.length > 0 ? (
                    <div>
                      {(contextObject.education[0]?.degree?.length > 0 ||
                       contextObject.education[0]?.university?.length > 0 ||
                       contextObject.education[0]?.yearofpassing?.length >
                          0) && (
                        <div>
                          {contextObject.education.map((item, index) => (
                            <Box
                              sx={{
                                width: "100%",
                                // mx: 2,
                                mb: 2,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  fontFamily:
                                    "'Trebuchet MS', sans-serif !important",
                                }}
                              >
                                {item.degree}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontFamily:
                                    "'Trebuchet MS', sans-serif !important",
                                }}
                              >
                                {item.university}
                              </Typography>

                              <Typography
                                sx={{
                                  fontSize: "15px",
                                  fontFamily:
                                    "'Trebuchet MS', sans-serif !important",
                                }}
                              >
                                {item.yearofpassing}{" "}
                              </Typography>
                            </Box>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                {/* Title for Skills Section */}
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    mb: 1,
                    color: gradiantMiddile,
                    fontWeight: "bold",
                    fontFamily: "'Trebuchet MS', sans-serif !important",
                    borderBottom: `2px solid ${gradiantMiddile}`,
                    width: "80px",
                    px: 1,
                  }}
                >
                  Skills
                </Typography>

                {/* Iterate over each category in skillsData */}
                {contextObject.skills?.length > 0 && contextObject.skills.map((categoryData, categoryIndex) => (
                  <Box key={categoryIndex} sx={{ mx: 1 }}>
                    <Typography
                    sx={{
                        display: "inline-block", 
                        padding: "2px 5px",
                        backgroundColor: "#f0f0f0",
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "bold",
                        border: `1px solid ${gradiantMiddile}`,
                        borderRadius: "6px",
                        mb: "4px",
                        fontFamily: "'Trebuchet MS', sans-serif !important",
                      }}

                    >
                      {categoryData.category}:
                    </Typography>
                    {/* Display skills in comma-separated format */}
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontFamily: "'Georgia', serif",
                      }}
                    >
                      {categoryData.skills?.join(", ")}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 0.5,
                    color: gradiantMiddile,
                    fontWeight: "bold",
                    fontFamily: "'Trebuchet MS', sans-serif !important",
                    width: "150px",
                    px: 1,
                    //borderRadius : "50px",
                    borderBottom: contextObject.certificate[0]?.certName?.length > 0 && `2px solid  ${gradiantMiddile}`,
                  }}
                  // onClick={handleClickOpen}
                >
                  {contextObject.certificate[0]?.certName?.length > 0 &&
                    "Certification"}
                </Typography>
                {/* <Divider
                sx={{
                  mx: 2,
                  border: `1px solid  ${gradiantMiddile}`,
                }}
              /> */}
                <Box sx={{ mx: 1, fontWeight: "bold" }}>
                  {contextObject.certificate?.length > 0 ? (
                    <div>
                      {(contextObject.certificate[0]?.certName?.length > 0 ||
                        contextObject.certificate[0]?.certYear?.length > 0) && (
                        <div>
                          {contextObject.certificate?.map((item, index) => (
                            <Box sx={{ width: "100%", mb: 1 }}>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  fontFamily:
                                    "'Trebuchet MS', sans-serif !important",
                                }}
                              >
                                {item.certName}
                              </Typography>
                              <Typography sx={{ fontSize: "15px" }}>
                                {item.certYear}{" "}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontFamily: 'sans-serif',
                                }}
                              >
                                {item.certificatelink}
                              </Typography>
                            </Box>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ mx: 2, fontWeight: "bold" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: gradiantMiddile,
                    fontWeight: "bold",
                    fontFamily: "'Trebuchet MS', sans-serif !important",
                    //background: gradiantMiddile,
                    width: "100px",
                    px: 1,
                    // borderRadius: "50px",
                     borderBottom: `2px solid  ${gradiantMiddile}`,
                  }}
                  // onClick={handleClickOpen}
                >
                  Summary
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: "12px",
                    // lineHeight: "1.5px",
                    color: "black",
                    fontFamily: "'Trebuchet MS', sans-serif !important",
                  }}
                >
                  {parse(contextObject.summary)}
                </Typography>
                {/* <Divider /> */}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 0.5,
                    color: gradiantMiddile,
                    width: "130px",
                    px: 1,
                    fontWeight: "bold",
                    fontFamily: "'Trebuchet MS', sans-serif !important",
                    //borderRadius: "50px",
                    borderBottom: `2px solid  ${gradiantMiddile}`,
                  }}
                  //onClick={handleClickOpen}
                >
                  Work History
                </Typography>
                {/* <Divider
                sx={{
                  mx: 2,
                  border: `1px solid  ${gradiantMiddile}`,
                }}
              /> */}
                <Box sx={{ mx: 1, fontWeight: "bold" }}>
                  {contextObject.project?.length > 0 ? (
                    <div>
                      {(contextObject.project[0]?.projectTitle?.length > 0 ||
                        contextObject.project[0]?.role != "" ||
                        contextObject.project[0]?.company != "") && (
                        <Box>
                          {contextObject.project.map((item, index) => (
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
                                  display: 'flex',
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    fontFamily:
                                      "'Trebuchet MS', sans-serif !important",
                                    color: gradiantMiddile,
                                  }}
                                >
                                  {item.role}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: "black",
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.city} {item.state && ","} {item.state}
                                </Typography>
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  fontFamily:
                                    "'Trebuchet MS', sans-serif !important",
                                  color: "black",
                                  fontWeight: 600,
                                }}
                              >
                                {item.company}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'space-between',
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '13px',
                                    color: "black",
                                    fontFamily:
                                      "'Trebuchet MS', sans-serif !important",
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.projectTitle}
                                </Typography>
                                {(item.startdate || item.enddate) && (
                                  <Typography
                                    sx={{
                                      fontSize: '13px',
                                      fontFamily: 'sans-serif',
                                      fontWeight: 600,
                                      mx: 1, // Adds margin on the x-axis (horizontal spacing)
                                    }}
                                  >
                                    |
                                  </Typography>
                                )}

                                <Typography
                                  sx={{
                                    fontSize: '12px',
                                    fontFamily: 'sans-serif',
                                    color: "black",
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.startdate} - {item.checked ? "Present" : item.enddate}
                                </Typography>
                                {item.city && item.state && (
                                  <>
                                    <Typography
                                      sx={{
                                        fontSize: '12px',
                                        fontFamily: 'sans-serif',
                                        fontWeight: 600,
                                        mx: 1, // Adds margin on the x-axis (horizontal spacing)
                                      }}
                                    >
                                      |
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "12px",
                                        color: "black",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {item.city} , {item.state}
                                    </Typography>
                                  </>
                                )}
                              </Box>
                              <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: gradiantMiddile,
                        }}
                      >
                        Description :
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        {parse(item.description?.slice(0, 400))}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: gradiantMiddile,
                        }}
                      >
                        Roles & Responsibilities :
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        {parse(item.responsibilities?.slice(0, 500))}
                      </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    );

}


export default Template3;

