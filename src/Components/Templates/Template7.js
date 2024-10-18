import React, { useContext, useRef, useState } from 'react'
import ResumeContext from '../ResumeContext';
import parse from "html-react-parser";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Box, Chip, Grid, Link, Typography } from '@mui/material';
import chroma from 'chroma-js';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import WorkIcon from '@mui/icons-material/Work';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import GitHubIcon from '@mui/icons-material/GitHub';





const Template7 = (props) => {
    const contextObject = useContext(ResumeContext)
    const pdfExportComponent = useRef(null);
    const [bgColor, setBgColor] = useState(props.bgColor);
    const gradientStart = chroma(props.bgColor).brighten(1.5).hex();  
    const gradientEnd = chroma(props.bgColor).darken(1.5).hex(); 
    const gradiantMiddile = chroma.mix(gradientStart, gradientEnd, 0.5).hex();
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

   


    return (
      <Grid item xs={12}>
        <Box
          sx={{
            boxShadow: "0 0 5px 2px grey",
            background:
              "radial-gradient(circle, #fff, #d4e4f2 ,#fff,#d4e4f2,#fff)",
          }}
        >
          <Grid container spacing={0} sx={{}}>
            <Grid
              container
              sx={{
                background: gradiantMiddile,
                mx: 1,
                borderRadius: " 50px",
                p: 2,
              }}
            >
              <Grid item xs={8.5}>
                <Box
                  sx={{
                    width: "100%",
                    px: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {contextObject.email && (
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: getTextColor(bgColor),
                          fontWeight: "bold",
                          fontFamily: "'Georgia', serif !important",
                        }}
                      >
                        {" "}
                        <EmailIcon
                          style={{
                            fill: getTextColor(bgColor),
                            fontSize: "13px",
                          }}
                        />
                        {contextObject.email}
                      </Typography>
                    )}
                    {contextObject.phone && (
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: getTextColor(bgColor),
                          fontWeight: "bold",
                          fontFamily: "'Georgia', serif !important",
                        }}
                      >
                        {" "}
                        <PhoneIcon
                          style={{
                            fill: getTextColor(bgColor),
                            fontSize: "13px",
                          }}
                        />{" "}
                        {contextObject.phone}
                      </Typography>
                    )}
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {contextObject.visaTypeLabel && (
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontFamily: "'Georgia', serif !important",
                          color: getTextColor(bgColor),
                        }}
                      >
                        {" "}
                        <AirplanemodeActiveIcon
                          style={{
                            fill: getTextColor(bgColor),
                            fontSize: "13px",
                          }}
                        />{" "}
                        {contextObject.visaTypeLabel?.join(", ")}
                      </Typography>
                    )}
                    {contextObject.cityLabel ||
                      (contextObject.stateLabel.name && (
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontFamily: "'Georgia', serif !important",
                            color: getTextColor(bgColor),
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          <HomeIcon
                            style={{
                              fill: getTextColor(bgColor),
                              fontSize: "13px",
                            }}
                          />{" "}
                          {contextObject.cityLabel} ,{" "}
                          {contextObject.stateLabel.name}
                        </Typography>
                      ))}
                  </Box>
                  {contextObject.jobTypeLabel && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontFamily: "'Georgia', serif !important",
                        color: getTextColor(bgColor),
                      }}
                    >
                      {" "}
                      <WorkIcon
                        style={{
                          fill: getTextColor(bgColor),
                          fontSize: "13px",
                        }}
                      />{" "}
                      {contextObject.jobTypeLabel.join(", ")}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={3.5}>
                <Box
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    // p: 1,
                    width: "100%",
                    color: getTextColor(bgColor),
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "'Times New Roman', serif !important",
                    }}
                  >
                    {" "}
                    {contextObject.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      fontFamily: "'Times New Roman', serif !important",
                    }}
                  >
                    {" "}
                    {contextObject.jobTitle}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={8.5}>
              <Box sx={{ mx: 1, fontWeight: "bold" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: gradientEnd,
                    fontWeight: "bold",
                    fontFamily: "'Times New Roman', serif !important",
                    //background: gradientStart,
                    px: 2,
                    borderRadius: "0px 50px 50px 0px",
                    fontSize: "18px",
                  }}
                  // onClick={handleClickOpen}
                >
                  Summary
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: "13px",
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
                    color: gradientEnd,
                    px: 2,
                    fontWeight: "bold",
                    fontSize: "18px",
                    fontFamily: "'Times New Roman', serif !important",
                    borderRadius: "0px 50px 50px 0px",
                  }}
                  //onClick={handleClickOpen}
                >
                  Work History
                </Typography>

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
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    fontFamily:
                                      "'Times New Roman', serif !important",
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
                                  fontSize: '15px',
                                  fontFamily:
                                    "'Times New Roman', serif !important",
                                  color: gradientEnd,
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
                              </Box>
                              <Box sx={{ width: "100%",}}>
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
              <Box sx={{ width: "100%", mt: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 0.5,
                    color: gradientEnd,
                    px: 2,
                    fontWeight: "bold",
                    fontFamily: "'Times New Roman', serif !important",
                    borderRadius: "0px 50px 50px 0px",
                    fontSize: "14px",
                  }}
                  //onClick={handleClickOpen}
                >
                  SocialMedia Links
                </Typography>
                <Box sx={{ mx: 1, width: "100%" }}>
                  {contextObject.linkedIn && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                      }}
                    >
                      <Link
                        href={contextObject.linkedIn}
                        target="_blank"
                        rel="noopener"
                        sx={{ color: "inherit", textDecoration: "none" }}
                      >
                        <LinkedInIcon
                          sx={{ fontSize: "16px", color: "black" }}
                        />{" "}
                        {contextObject.linkedIn}
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
                        <LanguageIcon
                          sx={{ fontSize: "14px", color: "black" }}
                        />{" "}
                        {contextObject.portfolio}
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
                        <GitHubIcon sx={{ fontSize: "13px", color: "black" }} />{" "}
                        {contextObject.gitHub}
                      </Link>
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3.5}>
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    //  mt: 1,
                    color: gradientEnd,
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "'Times New Roman', serif !important",
                    borderRadius: "0px 50px 50px 0px",
                    px: 2,
                  }}
                >
                  Skills :
                </Typography>

                <Box
                  sx={{
                    mx: 2,
                    borderBottom: `5px solid ${gradientEnd}`,
                    borderTop: `5px solid ${gradientEnd}`,
                    borderLeft: `1px solid ${gradientEnd}`,
                    borderRight: `1px solid ${gradientEnd}`,
                    borderRadius: "25px",
                    py: 1,
                  }}
                >
                  {contextObject.skills?.length > 0 &&
                    contextObject.skills.map((categoryData, categoryIndex) => (
                      <Box
                        key={categoryIndex}
                        sx={{
                          ml: 1,
                          mt: -1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "13px",
                            display: "inline",
                            backgroundColor: "#f0f0f0",
                            padding: "1px",
                            fontFamily: "'Times New Roman', serif !important",
                            mt: 0.4,
                          }}
                        >
                          {categoryData.category}:{" "}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "black",
                            mb: 0.4,
                          }}
                        >
                          {categoryData.skills?.join(", ")}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 0.5,
                    fontWeight: "bold",
                    fontFamily: "'Times New Roman', serif !important",
                    color: gradientEnd,
                    px: 2,
                    borderRadius: "0px 50px 50px 0px",
                    fontSize: "18px",
                  }}
                >
                  {contextObject.education[0]?.degree?.length > 0 &&
                    "Education :"}
                </Typography>
                <Box
                  sx={{
                    mx: 1,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {contextObject.education?.length > 0 ? (
                    <ul
                      style={{
                        listStyleType: "disc",
                        paddingInlineStart: "20px",
                        margin: 0,
                      }}
                    >
                      {(contextObject.education[0]?.degree?.length > 0 ||
                        contextObject.education[0]?.university?.length > 0 ||
                        contextObject.education[0]?.yearofpassing?.length >
                          0) &&
                        contextObject.education.map((item, index) => (
                          <li key={index} style={{ marginBottom: "4px" }}>
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
                                fontSize: "13px",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                              }}
                            >
                              {item.university}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                              }}
                            >
                              {item.yearofpassing}
                            </Typography>
                          </li>
                        ))}
                    </ul>
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
                    color: gradientEnd,
                    fontWeight: "bold",
                    fontSize: "18px",
                    fontFamily: "'Times New Roman', serif !important",
                    px: 2,
                    borderRadius: "0px 50px 50px 0px",
                  }}
                  // onClick={handleClickOpen}
                >
                  {contextObject.certificate[0].certName.length > 0 &&
                    "Certification :"}
                </Typography>
                <Box
                  sx={{
                    mx: 1,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {contextObject.certificate?.length > 0 ? (
                    <ul
                      style={{
                        listStyleType: "disc",
                        paddingInlineStart: "20px",
                        margin: 0,
                      }}
                    >
                      {(contextObject.certificate[0]?.certName?.length > 0 ||
                        contextObject.certificate[0]?.certYear?.length > 0) &&
                        contextObject.certificate.map((item, index) => (
                          <li key={index} style={{ marginBottom: "4px" }}>
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                fontSize: "13px",
                                fontFamily:
                                  "'Times New Roman', serif !important",
                              }}
                            >
                              {item.certName}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {item.certYear}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontFamily: 'sans-serif',
                              }}
                            >
                              {item.certificatelink}
                            </Typography>
                          </li>
                        ))}
                    </ul>
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



export default Template7;

