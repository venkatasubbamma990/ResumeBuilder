import React, { useContext, useRef, useState } from 'react'
import ResumeContext from '../ResumeContext'
import parse from "html-react-parser";
import { Box, Divider, Grid, Link, Typography  } from '@mui/material';
import chroma from 'chroma-js';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from '@mui/icons-material/GitHub';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from "@mui/icons-material/Home";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';




const Template9 = (props) => {
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

    

console.log(props.bgColor)
    return (
      <Grid item xs={12}>
        <Box
          sx={{
            mx: 2,
            mt: 1,
            mb: 1,
            textAlign: "center",
            fontWeight: "bold",
            // color: getTextColor(bgColor),
            // background: gradient,
            color: "black",
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
                  color: "black",
                  fontFamily: "'Georgia', serif !important",
                }}
              >
                {" "}
                <EmailIcon style={{ fill: "black", fontSize: "13px" }} />{" "}
                {contextObject.email}
              </Typography>
            )}
            {contextObject.phone && (
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "black",
                  fontFamily: "'Georgia', serif !important",
                }}
              >
                {" "}
                <PhoneIcon style={{ fill: "black", fontSize: "13px" }} />{" "}
                {contextObject.phone}
              </Typography>
            )}
            {contextObject.address && (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "'Georgia', serif !important",
                  color: "black",
                }}
              >
                {" "}
                {/* { contextObject.address} */}
                <HomeIcon style={{ fill: "black", fontSize: "13px" }} />{" "}
                {"Phoenix, AZ"}
              </Typography>
            )}
            {contextObject.linkedIn && (
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "black",
                  fontFamily: "'Georgia', serif !important",
                }}
              >
                <Link
                  href={contextObject.linkedIn}
                  target="_blank"
                  rel="noopener"
                  sx={{ mr: 1, color: "inherit", textDecoration: "none" }}
                >
                  <LinkedInIcon style={{ fill: "black", fontSize: "13px" }} />{" "}
                  {contextObject.linkedIn}
                </Link>
              </Typography>
            )}
            {contextObject.gitHub && (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "'Georgia', serif !important",
                  color: "black",
                }}
              >
                <Link
                  href={contextObject.gitHub}
                  target="_blank"
                  rel="noopener"
                  sx={{ mr: 1, color: "inherit", textDecoration: "none" }}
                >
                  <GitHubIcon style={{ fill: " black", fontSize: "13px" }} />{" "}
                  {contextObject.gitHub}
                </Link>
              </Typography>
            )}
            {contextObject.portfolio && (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "'Georgia', serif !important",
                  color: "black",
                }}
              >
                <Link
                  href={contextObject.portfolio}
                  target="_blank"
                  rel="noopener"
                  sx={{ mr: 1, color: "inherit", textDecoration: "none" }}
                >
                  <LanguageIcon style={{ fill: "black", fontSize: "13px" }} />
                  {contextObject.portfolio}
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
       
            <Box
              sx={{
                mx: 2,

                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontFamily: "'Times New Roman', serif !important",
                  fontSize: "18px",
                  fontWeight: "bold",
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
                  // lineHeight: isStatic ? "14.5px" : "1.5px",
                }}
              >
                {parse(contextObject.summary)}
              </Typography>
              {/* <Divider /> */}
            </Box>
         

        <Typography
          sx={{
            mx: 2,
            color: "black",
            fontFamily: "'Times New Roman', serif !important",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >       
          Work History :
        </Typography>
        <Divider
          sx={{
            mx: 2,
            border: `1px solid  ${gradiantMiddile}`,
          }}
        />
        <Box sx={{ mx: 2, fontWeight: "bold" }}>
          {contextObject.project?.length > 0 ? (
            <div>
              {(contextObject.project[0]?.projectTitle?.length > 0 ||
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

                          display: "flex",
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "black",
                              fontFamily: "'Times New Roman', serif !important",
                            }}
                          >
                            {item.projectTitle}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '13px',
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
                                fontSize: '13px',
                                color: "black",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                                fontWeight: 600,
                              }}
                            >
                              {item.role}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mx: 2 }}>
                          <Typography sx={{ fontSize: "12px" }}>
                            {item.startdate} - {item.checked ? "Present" : item.enddate}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            {item.city} , {item.state}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "bold", 
                            color: "black",
                            fontFamily: "'Times New Roman', serif !important",
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
                            color: "black",
                            fontFamily: "'Times New Roman', serif !important",
                          }}
                        >
                          Roles & Responsibilities :
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {parse(item.responsibilities?.slice(0, 500))}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
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
                  color: "black",
                  fontFamily: "'Times New Roman', serif !important",
                  fontSize: "18px",
                  fontWeight: "bold",
                  width: "110px",
                  px: 1,
                }}
              >
                Skills :
              </Typography>

              <Box
                sx={{
                  mx: 2,
                  py: 1,
                }}
              >
                {contextObject.skills?.length > 0 &&
                  contextObject.skills.map((categoryData, categoryIndex) => (
                    <Box
                      key={categoryIndex}
                      sx={{
                        //ml: 1,
                        mt: -1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "12px",
                          backgroundColor: "#f0f0f0",
                          display: "inline" , 
                          mb : 1
                        }}
                      >
                        {categoryData.category}:{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "black",
                          mb : 1
                         
                        }}
                      >
                        {categoryData.skills?.join(", ")}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  mx: 2,
                  my: 0.5,
                  color: "black",
                  fontFamily: "'Times New Roman', serif !important",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {contextObject.education[0].degree?.length > 0 && "Education :"}
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
                    {(contextObject.education[0].degree?.length > 0 ||
                      contextObject.education[0].university?.length > 0 ||
                      contextObject.education[0].yearofpassing?.length > 0) && (
                      <div>
                        {contextObject.education.map((item, index) => (
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
                                  {item.university}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    fontFamily:
                                      "'Times New Roman', serif !important",
                                  }}
                                >
                                  {item.degree}
                                </Typography>
                              </Box>
                              <Box sx={{ mx: 2 }}>
                                <Typography sx={{ fontSize: "12px" }}>
                                  {item.yearofpassing}{" "}
                                </Typography>
                              </Box>
                            </Box>
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
            <Box>
              <Typography
                variant="body1"
                sx={{
                  mx: 2,
                  my: 0.5,
                  color: "black",
                  fontFamily: "'Times New Roman', serif !important",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {contextObject.certificate[0].certName.length > 0 &&
                  "Certification :"}
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
                    {(contextObject.certificate[0].certName.length > 0 ||
                      contextObject.certificate[0].certYear.length > 0) && (
                      <div>
                        {contextObject.certificate.map((item, index) => (
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
                                  {item.certName}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    fontFamily: 'sans-serif',
                                    //fontStyle: 'italic',
                                  }}
                                >
                                  {item.certificatelink}
                                </Typography>
                              </Box>
                              <Box sx={{ mx: 2 }}>
                                <Typography sx={{ fontSize: "12px" }}>
                                  {item.certYear}{" "}
                                </Typography>
                              </Box>
                            </Box>
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
        </Grid>
      </Grid>
    );

}


export default Template9;

