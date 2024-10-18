import React, { useContext, useState, useRef, useEffect } from 'react'
import ResumeContext from '../ResumeContext'
import parse from "html-react-parser";
import { Box, Divider, Grid, Link,Chip, Typography } from '@mui/material';
import chroma from 'chroma-js';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from '@mui/icons-material/GitHub';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from "@mui/icons-material/Home";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';



const Template2 = (props) => {
    const contextObject = useContext(ResumeContext)
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

      console.log(contextObject.skills)

  

    return (
      <Grid item xs={12}>
        <Box
          sx={{
            mx: 2,
            mt: 1,
            mb: 1,
            textAlign: "center",
            fontWeight: "bold",
            color: getTextColor(bgColor),
            background: gradient,
            pb: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mx: 2 }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "'Times New Roman', serif !important",
              }}
            >
              {" "}
              {contextObject.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "'Georgia', serif !important",
              }}
            >
              {" "}
              {contextObject.jobTitle}
            </Typography>
          </Box>
          <Box sx={{ mx: 2, textAlign: "left" }}>
            {contextObject.email && (
              <Typography
                sx={{
                  fontSize: "12px",
                  color: getTextColor(bgColor),
                  fontFamily: "'Georgia', serif !important",
                }}
              >
                {" "}
                <EmailIcon  style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }} />
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
                <PhoneIcon  style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }} /> {contextObject.phone}
              </Typography>
            )}
            {contextObject.address && (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "'Georgia', serif !important",
                  color: getTextColor(bgColor),
                }}
              >
                {" "}
                {/* { contextObject.address} */}
                <HomeIcon  style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }} /> {"Phoenix, AZ"}
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
                  sx={{ mr: 1, color: "inherit", textDecoration: "none" }}
                >
                  <LinkedInIcon style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }} />{" "}
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
                  <LanguageIcon  style={{ fill: getTextColor(bgColor) ,fontSize: "13px" }} />
                  {contextObject.portfolio}
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ mx: 2, fontWeight: "bold" }}>
          <Typography
            variant="body1"
            sx={{
              color: gradiantMiddile,
              fontWeight: "bold",
              fontFamily: "'Times New Roman', serif !important",
              //background: gradiantMiddile,
              width: "100px",
              px: 1,
              borderRadius : "50px",
             borderBottom  : `2px solid  ${gradiantMiddile}`,
            }}
            // onClick={handleClickOpen}
          >
            Summary :
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

        <Grid container >
          <Grid item xs={3.5}>
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body1"
                sx={{
                  mx: 2,
                  my: 0.5,
                  color: gradiantMiddile,
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', serif !important",
                  // background: gradiantMiddile,
                  width: "110px",
                  px: 1,
                  borderRadius : "50px",
                  borderBottom  : `2px solid  ${gradiantMiddile}`,
                }}
              >
                {contextObject.education[0].degree?.length > 0 && "Education :"}
              </Typography>
              <Box sx={{ mx: 1, fontWeight: "bold" }}>
                {contextObject.education?.length > 0 ? (
                  <div>
                    {(contextObject.education[0].degree?.length > 0 ||
                      contextObject.education[0].university?.length > 0 ||
                      contextObject.education[0].yearofpassing?.length > 0) && (
                      <div>
                        {contextObject.education.map((item, index) => (
                          <Box
                            sx={{
                              width: "100%",
                              // mx: 2,
                              fontSize: "15px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                              }}
                            >
                              {item.degree}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                              }}
                            >
                              {item.university}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: "15px",
                                fontFamily:
                                  "'Times New Roman', serif !important",
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
              <Typography
                variant="body1"
                sx={{
                  mx: 2,
                  my: 0.5,
                  color: gradiantMiddile,
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', serif !important",
                  // background: gradiantMiddile,
                  borderRadius : "50px",
                  borderBottom  : `2px solid  ${gradiantMiddile}`,
                  width: "110px",
                  px: 1,
                }}
              >
                Skills :
              </Typography>
              {contextObject.skills?.length > 0 && contextObject.skills.map((categoryData, categoryIndex) => (
                <Box key={categoryIndex} sx={{ mb: 1, mx: 1 }}>
                  <Typography
                    sx={{ fontWeight: "bold", mb: 0.5 ,fontSize:"13px" }}
                  >
                    {categoryData.category}
                  </Typography>
                  <Box
                    sx={{ display: "inline-flex", flexWrap: "wrap", gap: 1 }}
                  >
                    {categoryData.skills?.length > 0 && categoryData.skills?.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        label={skill}
                        variant="outlined"
                       // color="primary"
                        sx={{
                           // width: "100px",  // Set the desired width
                            height: "19px", 
                            color : "black",
                            fontSize : "11px",
                            fontWeight:500,
                            borderBottom : `2px solid ${gradiantMiddile}`
                           
                          }}
                      />
                    ))}
                  </Box>
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
                  fontFamily: "'Times New Roman', serif !important",
                  width: "150px",
                  px: 1,
                  borderRadius : "50px",
                  borderBottom  : `2px solid  ${gradiantMiddile}`,
                }}
                // onClick={handleClickOpen}
              >
                {contextObject.certificate[0].certName.length > 0 &&
                  "Certification :"}
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
                    {(contextObject.certificate[0].certName.length > 0 ||
                      contextObject.certificate[0].certYear.length > 0) && (
                      <div>
                        {contextObject.certificate.map((item, index) => (
                          <Box sx={{ width: "100%", mb: 2 }}>
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
          <Grid item xs={8.5}>
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body1"
                sx={{
                  mx: 2,
                  my: 0.5,
                  color: gradiantMiddile,
                  width: "150px",
                  px: 1,
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', serif !important",
                  borderRadius : "50px",
                  borderBottom  : `2px solid  ${gradiantMiddile}`,
                }}
                //onClick={handleClickOpen}
              >
                Work History :
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
                    {(contextObject.project[0].projectTitle.length > 0 ||
                      contextObject.project[0].role != "" ||
                      contextObject.project[0].company != "") && (
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
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  fontFamily:
                                    "'Times New Roman', serif !important",
                                }}
                              >
                                {item.projectTitle}
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
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  fontFamily:
                                    "'Times New Roman', serif !important",
                                  color: "black",
                                  fontWeight: 600,
                                }}
                              >
                                {item.company}
                              </Typography>
                              {item.role && (
                                <Typography
                                  sx={{
                                    fontSize: '14px',
                                    mx: 1, // Adds margin on the x-axis (horizontal spacing)
                                  }}
                                >
                                  |
                                </Typography>
                              )}

                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  color: "black",
                                  fontFamily:
                                    "'Times New Roman', serif !important",
                                  fontWeight: 600,
                                }}
                              >
                                {item.role}
                              </Typography>
                              {(item.startdate || item.enddate) && (
                                <Typography
                                  sx={{
                                    fontSize: '14px',
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
                             
                            </Box>
                            <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: gradiantMiddile,
                        }}
                      >
                        Description
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
            {
                (contextObject.visaTypeLabel || contextObject.jobTypeLabel ) && (
                    <Box
                    sx={{
                      width: "100%",
                      mt: 0.5,
                      mx: -1,
                      borderBottom: `2px solid ${gradiantMiddile}`,
                      borderTop: `2px solid ${gradiantMiddile}`,
                      borderLeft: `1px solid ${gradiantMiddile}`,
                      borderRight: `1px solid ${gradiantMiddile}`,
                      borderRadius: "25px",
                      px:2
                    }}
                  >
                    {(contextObject.stateLabel.name || contextObject.cityLabel) && (
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
                )
            }
           
          </Grid>
        </Grid>
      </Grid>
    );

}


export default Template2;

