import React, { useContext, useState } from 'react';
import { Box, Button, Grid, IconButton, InputBase, Paper } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code'; // Example for HackerRank
import BugReportIcon from '@mui/icons-material/BugReport'; 
import WebIcon from '@mui/icons-material/Web';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ResumeContext from '../ResumeContext';

const SocialLinks = () => {
  const contextObject = useContext(ResumeContext);
  const [showLinks, setShowLinks] = useState(false);

  const handleButtonClick = () => {
    setShowLinks(!showLinks);
  };
  const inputstyles = {
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: 1,
    px: 1,
  };


const handleInputChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  switch (name) {
    case 'linkedin':
      contextObject.updateLinkedIn(value);
      break;
    case 'github':
      contextObject.updateGitHub(value);
      break;
    case 'hackerrank':
      contextObject.updateHackerRank(value);
      break;
    case 'leetcode':
      contextObject.updateLeetCode(value);
      break;
    case 'portfolio':
      contextObject.updatePortfolio(value);
      break;
    default:
      break;
  }
};

  return (
    <Box sx={{ my: 1  }}>
      <Box sx={{width : "70%" ,display : "flex" ,justifyContent : "space-between" ,alignItems : "center"}}>
      <Button 
       variant="contained" 
        size="small"
       onClick={handleButtonClick}
       sx={{
        textTransform: "capitalize",
        fontWeight: "bold",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#406882",
          color: "#fff",
        },
        backgroundColor: "#406882",
        borderRadius: 2,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontSize: 12,
        cursor: "pointer",
        width: 250,
        height : 28,
        margin: "0 auto",
        transition: "background-color 0.3s ease",
       }}
       >
        Website and Social Media Links
      </Button>
      <Box sx={{width : "20%"}}>
      {/* <IconButton sx={{color : "#406882"}}>
      <DeleteIcon  />
      </IconButton> */}
      <IconButton sx={{color : "#406882"}} onClick={handleButtonClick}>
      <HighlightOffIcon />
      </IconButton>
      </Box>
      </Box>
     

      {showLinks && (
        <Box
          sx={{
            width: "100%",
            border: "1px solid #e6e1e1",
            borderRadius: "10px",
            borderTop: "3px solid #406682",
            boxShadow: "0 0 2px grey",
            mx: 1,
            my: 2,
            p: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinkedInIcon sx={{ mr: 1 }} color='primary' />
                <InputBase
                  placeholder="LinkedIn URL"
                  name='linkedin'
                  value={contextObject.linkedIn}
                  onChange={(e) => handleInputChange(e )}
                  sx={{
                    ...inputstyles
                  }}
                />
                 {/* <input
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  //placeholder="Full Name"
                  autoComplete="off"
                  className={`form-control `}
                  onChange={(e) => handleInputChange(e)}
                
                  value={contextObject.linkedIn}
                /> */}
               
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GitHubIcon sx={{ mr: 1 }} />
                <InputBase
                  placeholder="GitHub URL"
                  name='github'
                  value={contextObject.gitHub}
                  onChange={(e) => handleInputChange(e )}
                  sx={{
                    ...inputstyles
                  }}
                />
              </Box>
            </Grid>

            {/* <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CodeIcon sx={{ mr: 1 }} />
                <InputBase
                  placeholder="HackerRank URL"
                  name='hackerrank'
                  value={contextObject.hackerRank}
                  onChange={(e) => handleInputChange(e )}
                  sx={{
                    ...inputstyles
                  }}
                />
              </Box>
            </Grid> */}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center'  }}>
                <WebIcon sx={{ mr: 1 }} color='secondary' />
                <InputBase
                  placeholder="PortFolio URL"
                  name='portfolio'
                  value={contextObject.portfolio}
                  onChange={(e) => handleInputChange(e )}
                  sx={{
                    ...inputstyles
                  }}
                />
              </Box>
            </Grid>

            {/* <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BugReportIcon sx={{ mr: 1 }} />
                <InputBase
                  placeholder="LeetCode URL"
                  name='leetcode'
                  value={contextObject.leetCode}
                  onChange={(e) => handleInputChange(e )}
                  sx={{
                    ...inputstyles
                  }}
                />
              </Box>
            </Grid> */}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SocialLinks;
