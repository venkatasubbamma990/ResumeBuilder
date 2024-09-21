import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import BuilderHeader from './BuilderHeader';
import BuilderSkills from './BuilderSkills';
import BuilderExperience from './BuilderExperience';
import BuilderEducation from './BuilderEducation';
import BuilderCertification from './BuilderCertification';
import Others from './Others';
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerStyle = {
  ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
    background: "#f2f6fd !important",
    // width: 'calc(54px + 1px)'
  },
};
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // width: drawerWidth,

  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const BasicTabs = ({ children, getProfileData, getCredentials }) => {
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const [sideNavItemIndex, setSideNavItemIndex] = useState(0);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = (value) => {
    if (value >= 0 && value < 7) {
      // alert("back",value)
      setValue(value);
      setActiveStep(value);
      navItemOnClickHandler(value);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleDrawerToggle = () => {
    setOpenMobile((prevState) => !prevState);
  };

  const navItemOnClickHandler = (step) => {
    console.log(step);
    setSideNavItemIndex(step);
    setActiveStep(step);
  };
  const createUser = (userName, password, profileData) => {
    setValue(1);
    console.log(userName, password);
    getCredentials(userName, password);
    getProfileData(profileData);
  };
  useEffect(() => {
    return () => {
      console.log(value);
      let newValue = value + 1;
      if (value + 1 === newValue) {
        handleNext();
        navItemOnClickHandler(value + 1);
      }
    };
  }, [value]);

  useEffect(() => {
    return () => {
      setActiveStep(value);
    };
  }, [activeStep]);

  //   const steps = [
  //     '📝Header',
  //     '💼Skills',
  //     '📁Projects',
  //     '🎓Education',
  //     '📜Certification',
  //     '📜Certification',
  //   ];
  const steps = [
    {
      title: "📝Header",
      step: 0,
    },
    {
      title: "💼Skills",
      step: 1,
    },
    {
      title: "📁Projects",
      step: 2,
    },
    {
      title: "🎓Education",
      step: 3,
    },
    {
      title: "📜Certification",
      step: 4,
    },
    {
      title: "📜Others",
      step: 5,
    },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ py: 1, bgcolor: '#406882' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src="https://jobsnprofiles.com/static/media/jobsnProfiles.54d22dc53e022b59b8b7.png"
            width={120}
          />
        </Link>
      </Typography>
      <Divider />
      <List>
        {steps.map((step, index) => (
          <ListItem key={index} disablePadding>
            <Link
              to="#"
              style={{ textDecoration: 'none' }}
              onClick={() => navItemOnClickHandler(step.step)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {sideNavItemIndex === index ? step.icon1 : step.icon2}
                </ListItemIcon>
                <ListItemText
                  primary={step.title}
                  sx={{ color: "rgba(0, 0, 0, 0.7)" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: "#FFF",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 2px 4px -1px, rgba(0, 0, 0, 0.07) 0px 4px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 10px 0px",
        }}
      ></AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          ...DrawerStyle,
          display: { xs: "none", md: "block" },
          width: open ? "240px" : "125px",
          "& .MuiDrawer-paper": {
            width: open ? "240px" : "125px",
          },
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {/* <img
              src={LogoBlack}
              alt="logo"
              style={{
                cursor: "pointer",
                width: "110px",
                height: "50px",
                paddingTop: "10px",
                paddingLeft: "5px",
              }}
            /> */}
        </Box>

        <List sx={{ pt: "70px" }}>
          {steps.map((step, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Tooltip title={step.title} placement="right">
                <Link
                  to="#"
                  style={{ textDecoration: 'none' }}
                  // onClick={() => navItemOnClickHandler(step.step)}
                >
                  <ListItemButton
                    selected={sideNavItemIndex === index}
                    sx={{
                      minHeight: 48,
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "10px",
                      color: "#9e9e9e",
                      borderLeft:
                        sideNavItemIndex === index
                          ? "5px solid #406882"
                          : "none",
                      marginLeft: "5px",
                      padding: "5px",
                      textDecoration: 'none',
                    }}
                  >
                    {/* <ListItemIcon>
                      {sideNavItemIndex === index ? step.icon1 : step.icon2}
                    </ListItemIcon> */}
                    <ListItemText
                      primary={step.title}
                      sx={{
                        color:
                          sideNavItemIndex === index ? "#406882" : "#7a7676",
                        fontWeight:
                          sideNavItemIndex === index ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
      <MuiDrawer
        // anchor={anchor}
        open={openMobile}
        onClose={handleDrawerToggle}
        sx={{ zIndex: 1301 }}
      >
        {drawer}
      </MuiDrawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* <DrawerHeader /> */}
        <React.Fragment>
          {activeStep === 0 && (
            <BuilderHeader
              handleNext={handleNext}
              createUser={createUser}
              value={value}
              setValue={setValue}
            />
          )}
          {activeStep === 1 && (
            <BuilderSkills
              handleNext={handleNext}
              handleBack={handleBack}
              createUser={createUser}
              value={value}
              setValue={setValue}
            />
          )}
          {activeStep === 2 && (
            <BuilderExperience
              handleNext={handleNext}
              handleBack={handleBack}
              createUser={createUser}
              value={value}
              setValue={setValue}
            />
          )}
          {activeStep === 3 && (
            <BuilderEducation
              handleNext={handleNext}
              handleBack={handleBack}
              createUser={createUser}
              value={value}
              setValue={setValue}
            />
          )}
          {activeStep === 4 && (
            <BuilderCertification
              handleNext={handleNext}
              handleBack={handleBack}
              createUser={createUser}
              value={value}
              setValue={setValue}
            />
          )}
          {activeStep === 5 && (
            <Others
              handleNext={handleNext}
              handleBack={handleBack}
              createUser={createUser}
              value={value}
              setValue={setValue}
            />
          )}
        </React.Fragment>
        {children}
      </Box>
    </Box>
  );
};

export default BasicTabs;
