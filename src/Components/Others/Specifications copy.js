import { Autocomplete, Box, Button, Grid, IconButton, useTheme, TextField ,Chip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ResumeContext from '../ResumeContext';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
//import Key from '../../clientVariables.json'
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";

function Specifications() {
    const contextObject = useContext(ResumeContext);
    const theme = useTheme(); 
    const [show, setShow] = useState(false);
    const [visaTypeList, setVisaTypeList] = useState([]);
    const [visaTypeId, setVisatypeId] = useState([]);
    const [jobTypeList, setJobTypeList] = useState([]);
    const [jobTypeId, setJobTypeId] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [stateid, setStateId] = useState("");
    const [cityid, setCityId] = useState("");
    const [countryId, setCountryId] = useState("");
    const [shortRegion,setShortRegion]=useState([])
    const [totalStates,setTotalStates]=useState()

    const handleButtonClick = () => {
      setShow(!show);
    };
    const inputstyles = {
      width: '100%',
      //border: '1px solid #ccc',
      borderRadius: 1,
      px: 1,
    };
  return (
    <Box sx={{ my: 1 }}>
      <Box
        sx={{
          width: "70%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            width: 202,
            height: 28,
            margin: "0 auto",
            transition: "background-color 0.3s ease",
          }}
        >
          Specifications
        </Button>
        <Box sx={{ width: "20%" }}>
          {/* <IconButton sx={{ color: "#406882" }}>
            <DeleteIcon color="#406882" />
          </IconButton> */}
          <IconButton sx={{ color: "#406882" }} onClick={handleButtonClick}>
            <HighlightOffIcon />
          </IconButton>
        </Box>
      </Box>
      {show && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label htmlFor={`State`}>
                State <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="State"
                name="state"
                value={contextObject.stateLabel.name}
                onChange={(e) => {
                  // handleInputChange( e);
                }}
                className={`form-control `}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor={`cities`}>
                City <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="cities"
                name="cities"
                value={contextObject.cityLabel}
                onChange={(e) => {
                  //handleInputChange(index, e);
                }}
                className={`form-control`}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Specifications