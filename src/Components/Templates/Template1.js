import React, { useContext, useEffect, useState } from 'react'
import ResumeContext from '../ResumeContext'
import parse from "html-react-parser";
import { Email, OpenInNew, Language, School, Phone, Work } from '@mui/icons-material';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Box, Divider, Grid, Link, Typography ,Slider,Select,MenuItem, Dialog, DialogActions, DialogContent, DialogTitle,Button } from '@mui/material';
import chroma from 'chroma-js';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from '@mui/icons-material/GitHub';
import WorkIcon from '@mui/icons-material/Work';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { SketchPicker } from 'react-color';

const Paper = (props) => {
    const contextObject = useContext(ResumeContext)
    const skills = contextObject.skillNames
    const pdfExportComponent = React.useRef(null);
    const [isStatic, setIsStatic] = useState(true);
    const [bgColor, setBgColor] = useState('#fff');
    const [showPicker, setShowPicker] = useState(false);
    const gradientStart = chroma(props.bgColor).brighten(1.5).hex();  // Lighter shade
    const gradientEnd = chroma(props.bgColor).darken(1.5).hex(); 
    const gradiantMiddile = chroma.mix(gradientStart, gradientEnd, 0.5).hex();     // Darker shade
    const gradient = `linear-gradient(45deg, ${gradientStart} 30%, ${gradientEnd} 90%)`
    const [open, setOpen] = useState(false);
    const [textColor, setTextColor] = useState('#ffffff');
    const [fontFamily, setFontFamily] = useState("'Times New Roman', serif !important");
    const [fontSize, setFontSize] = useState(14);
  
    // Open/Close popup dialog
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    // Color change handler
    const handleColorChange = (color) => setTextColor(color.hex);
  
    // Font size change handler
    const handleFontSizeChange = (event, newValue) => setFontSize(newValue);
  
    // Font family change handler
    const handleFontFamilyChange = (event) => setFontFamily(event.target.value);

    console.log(props.bgColor, "hiiii")
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsStatic(false);
      }, 10000);
      return () => clearTimeout(timer);
    }, []);
    const getLuminance = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

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

    const skillsData = [
      {
        "category": "Languages",
        "skills": ["JavaScript", "Python", "Golang"]
      },
      {
        "category": "Web Development",
        "skills": ["HTML", "CSS", "Bootstrap", "Material UI", "Tailwind CSS"]
      },
      {
        "category": "Frameworks",
        "skills": ["React", "Node.js", "REST API", "Next.js"]
      },
      {
          "category": "Developer Tools",
          "skills": ["Git", "VS Code"]
        },
        {
          "category": "Database",
          "skills": ["SQL", "MySQL", "MongoDB"]
        },
        {
          "category": "DevOps",
          "skills": [
            "Basic understanding of AWS", 
            "Basics of Jenkins",  "EC2", 
            "CI/CD pipeline", "S3",
            "Jenkins configuration",
            "Basics of Docker containers", 
          ]
        }
  ]
  const visatypes = [ 'GC', 'USC', 'OPT' ]
  const JobTypes = [ 'Hourly Employee', 'Contract - Independent' ]
  const certificationData = [
      {
        certName: "Microsoft Azure Fundamentals",
        certYear: "2022",
        //certificatelink: "https://www.example.com/microsoft-azure",
      },
      {
        certName: "AWS Certified Solutions Architect",
        certYear: "2023",
       // certificatelink: "https://www.example.com/aws-solutions-architect",
      },
      // {
      //   certName: "Google Cloud Professional Data Engineer",
      //   certYear: "2023",
      //  // certificatelink: "https://www.example.com/google-cloud-data-engineer",
      // },
    ];
    const projectData = [
      {
        projectTitle: "Project Alpha",
        role: "Frontend Developer",
        company: "Tech Innovators Inc.",
        city: "San Francisco",
        state: "CA",
        startdate: "Jan 2022",
        enddate: "Dec 2022",
        description: "<p>Developed a responsive front-end architecture utilizing React.js, Material Ui and Redux, resulting in enhanced performance efficiency and a significant ∗ API Development and Integration: Engineered robust RESTful APIs in Node.js for key functionalities, including user authentication, resume data retrieval, and job listing updates, resulting in a 40% increase in system efficiency; Utilized Swagger to meticulously define and document API endpoints, improving team collaboration and ensuring consistent API usage, which reduced integration issues by 30% .∗ Database Management:Designed and managed MySQL databases to store user profiles, resume data, and job listings, ensuring efficient data retrieval and storage.</p>",
      },
      {
        projectTitle: "Project Beta",
        role: "Full Stack Developer",
        company: "Global Solutions Ltd.",
        city: "New York",
        state: "NY",
        startdate: "Feb 2021",
        enddate: "Nov 2021",
        description: "<p>CRMSoftware Capabilities: Empowered businesses to manage customer and prospect relationships effectively through CRM software that centralizes data storage, tracking, and analysis. By providing a unified view of customer interactions and behaviors, the system facilitated a 50% improvement in customer engagement and a 30% increase in sales efficiency, streamlining access to critical information and decision-making processes.∗ CRMApplication Development:Designed, developed, and maintained a comprehensive CRM application using React for the frontend and Node.js for the backend.∗ Customer Information: Developed functionalities to fetch and display detailed customer profiles, including contact information, communication history, and associated interactions.</p>",
      },
    //   {
    //     projectTitle: "Project Gamma",
    //     role: "Backend Developer",
    //     company: "Digital Ventures LLC",
    //     city: "Austin",
    //     state: "TX",
    //     startdate: "Mar 2020",
    //     enddate: "Jan 2021",
    //     description: "<p>Developed an innovative tool that bridges job seekers and employers for job fairs, facilitating seamless communication and interaction. • API Development : Implemented RESTful API endpoints to manage job listings, user profiles, and interactions,ensuring smooth and secure data exchange.• RTK Query Integration : Integrated RTK Query for efficient and scalable state management and data fetching in the client-side application, resulting in a 40% improvement in data fetching performance and overall application responsiveness.• Real-Time Communication : Developed real-time chat functionality using WebSockets, enabling instant communication between job seekers and employers during job fairs.</p>",
    //   },
     ];
    const educationData = [
      {
        degree: "Bachelor of Science in Computer Science",
        university: "Stanford University",
        yearofpassing: "2015-2018",
      },
      {
        degree: "Master of Business Administration",
        university: "Harvard Business School",
        yearofpassing: "2017-2019",
      },
      // {
      //   degree: "PhD in Artificial Intelligence",
      //   university: "Massachusetts Institute of Technology",
      //   yearofpassing: "2019-2023",
      // },
    ];
    const address = "Phoenix, AZ"
    

    return (
      <Grid item xs={12}>
        <Box
          sx={{
            mx: 2,
            mt: 1,
            mb: 2,
            textAlign: "center",
            fontWeight: "bold",
            color: textColor ? textColor : getTextColor(bgColor),
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
                // fontFamily: "'Times New Roman', serif !important",
                fontFamily: fontFamily
                  ? fontFamily
                  : "'Times New Roman', serif !important",
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
                  fontFamily: "'Georgia', serif !important",
                }}
              >
                {" "}
                <EmailIcon
                  style={{ fill: getTextColor(bgColor), fontSize: "13px" }}
                />
                {contextObject.email}
              </Typography>
            )}
            {contextObject.phone && (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "'Georgia', serif !important",
                }}
              >
                {" "}
                <PhoneIcon
                  style={{ fill: getTextColor(bgColor), fontSize: "13px" }}
                />{" "}
                {contextObject.phone}
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
                  <LinkedInIcon
                    style={{ fill: getTextColor(bgColor), fontSize: "13px" }}
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
                    style={{ fill: getTextColor(bgColor), fontSize: "13px" }}
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
                  color: getTextColor(bgColor),
                }}
              >
                <Link
                  href={contextObject.gitHub}
                  target="_blank"
                  rel="noopener"
                  sx={{ mr: 1, color: "inherit", textDecoration: "none" }}
                >
                  <GitHubIcon
                    style={{ fill: getTextColor(bgColor), fontSize: "13px" }}
                  />{" "}
                  {contextObject.gitHub}
                </Link>
              </Typography>
            )}
          </Box>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Box sx={{ mx: 2, fontWeight: "bold" }}>
              <Typography
                variant="body1"
                sx={{
                  color: textColor ? textColor : "white",
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', serif !important",
                  background: gradiantMiddile,
                  width: "100px",
                  px: 1,
                }}
                onClick={handleClickOpen}
              >
                SUMMARY
              </Typography>
              <Divider
                sx={{
                  border: `1px solid  ${gradiantMiddile}`,
                }}
              />
              <Typography
                sx={{
                  mt: 1,
                  fontSize: "13px",
                  color: "black",
                  fontFamily: "'Trebuchet MS', sans-serif !important",
                }}
              >
                {parse(contextObject.summary)}
              </Typography>
              {/* <Divider /> */}
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  mx: 2,
                  my: 0.5,
                  color: textColor ? textColor : "white",
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', serif !important",
                  background: gradiantMiddile,
                  width: "110px",
                  px: 1,
                }}
                onClick={handleClickOpen}
              >
                {contextObject.education[0]?.degree?.length > 0 && "EDUCATION"}
              </Typography>
              <Divider
                sx={{
                  mx: 2,
                  border: `1px solid  ${gradiantMiddile}`,
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
                              fontSize: "15px",
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
                                    fontSize: "15px",
                                    fontFamily:
                                      "'Times New Roman', serif !important",
                                  }}
                                >
                                  {item.university}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "15px",
                                    fontFamily: 'sans-serif',
                                    fontFamily:
                                      "'Times New Roman', serif !important",
                                  }}
                                >
                                  {item.degree}
                                </Typography>
                              </Box>
                              <Box sx={{ mx: 2 }}>
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
                  color: textColor ? textColor : "white",
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', serif !important",
                  background: gradiantMiddile,
                  width: "150px",
                  px: 1,
                }}
                onClick={handleClickOpen}
              >
                {contextObject.certificate[0]?.certName?.length > 0 &&
                  "CERTIFICATION"}
              </Typography>
              <Divider
                sx={{
                  mx: 2,
                  border: `1px solid  ${gradiantMiddile}`,
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
                                    fontSize: "16px",
                                    fontFamily:
                                      "'Times New Roman', serif !important",
                                  }}
                                >
                                  {item.certName}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "15px",
                                    fontFamily: 'sans-serif',
                                  }}
                                >
                                  {item.certificatelink}
                                </Typography>
                              </Box>
                              <Box sx={{ mx: 2 }}>
                                <Typography sx={{ fontSize: "15px" }}>
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
          <Grid item xs={3.5}>
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body1"
                sx={{
                  mx: 2,
                  my: 0.5,
                  color: textColor ? textColor : getTextColor(bgColor),
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', serif !important",
                  background: gradiantMiddile,
                  width: "150px",
                  px: 1,
                }}
              >
                SKILLS :
              </Typography>

              <Box
                sx={{
                  mx: -1,
                  borderBottom: `5px solid ${gradiantMiddile}`,
                  borderTop: `5px solid ${gradiantMiddile}`,
                  borderLeft: `1px solid ${gradiantMiddile}`,
                  borderRight: `1px solid ${gradiantMiddile}`,
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
                          fontSize: "14px",
                          display: "inline",
                          backgroundColor: "#f0f0f0",
                          padding: "1px",
                          fontFamily: "'Times New Roman', serif !important",
                          mt: 0.4,
                          color: gradiantMiddile,
                        }}
                      >
                        {categoryData.category}:{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
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
            <Box
              sx={{
                width: "100%",
                mt: 0.5,
                mx: 0,
                borderBottom: `3px solid ${gradiantMiddile}`,
                borderTop: `3px solid ${gradiantMiddile}`,
                borderLeft: `1px solid ${gradiantMiddile}`,
                borderRight: `1px solid ${gradiantMiddile}`,
                borderRadius: "25px",
                px: 2,
              }}
            >
              {contextObject.stateLabel.name && (
              <Typography
                sx={{
                  fontSize: "13px",
                    fontFamily: "'Georgia', serif !important",
                    color: "black",
                }}
              >
                {" "}
                {/* { contextObject.address} */}
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
                  {contextObject.visaTypeLabel?.join(", ")}
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
        <Typography
          variant="body1"
          sx={{
            mx: 2,
            my: 0.5,
            color: textColor ? textColor : "white",
            background: gradiantMiddile,
            width: "150px",
            px: 1,
            fontWeight: "bold",
            fontFamily: "'Times New Roman', serif !important",
          }}
          onClick={handleClickOpen}
        >
          WORK HISTORY
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
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 600,
                          fontFamily: "'Times New Roman', serif !important",
                          color: gradiantMiddile,
                        }}
                      >
                        {item.projectTitle}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          fontFamily: "'Times New Roman', serif",
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontFamily: "'Times New Roman', serif !important",
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
                            fontFamily: "'Times New Roman', serif !important",
                            fontWeight: 600,
                          }}
                        >
                          {item.role}
                        </Typography>
                        {(item.startdate || item.enddate )&& (
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Text Style</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <SketchPicker
                color={textColor}
                onChangeComplete={handleColorChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Select
                value={fontFamily}
                onChange={handleFontFamilyChange}
                fullWidth
              >
                <MenuItem value="'Times New Roman', serif !important">
                  Times New Roman
                </MenuItem>
                <MenuItem value="'Georgia', serif !important">Arial</MenuItem>
                <MenuItem value="'Arial', sans-serif !important">
                  Georgia
                </MenuItem>
                <MenuItem value="'Courier New', monospace !important">
                  Courier New
                </MenuItem>
                {/* Add more font families as needed */}
              </Select>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>Font Size: {fontSize}px</Typography>
              <Slider
                value={fontSize}
                min={10}
                max={36}
                step={1}
                onChange={handleFontSizeChange}
                aria-labelledby="font-size-slider"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Save
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );

}


export default Paper;

