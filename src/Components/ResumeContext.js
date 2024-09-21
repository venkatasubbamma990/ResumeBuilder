import React from "react"

const ResumeContext = React.createContext({
    jobTitle: "",
    updateJobTitle: () => { },
    name: "",
    updateName: () => { },
    email: "",
    updateEmail: () => { },
    phone: "",
    updatePhone: () => { },
    resumeImage: "",
    updateResumeImage: () => {},
    resumeImageObject: {},
    updateResumeImageObject: () => {},
    skillNames: [],
    updateSkillNames: () => { },
    degree: "",
    updateDegree: () => { },
    stream: "",
    updateStream: () => { },
    institute: "",
    updateInstitute: () => { },
    year: "",
    updateYear: () => { },
    password: "",
    updatePassword: () => { },
    confirmPassword: "",
    updateConfirmPassword: () => { },

    projecttitle: "",
    updateProjecttitle: () => { },

    client: "",
    updateClient: () => { },

    role: "",
    updateRole: () => { },

    experience: "",
    updateExperience: () => { },
    country: "",
    updateCountry: () => { },
    countryLabel: "United States",
    updateCountryLabel: () => { },
    state: "",
    updateState: () => { },
    RegionName:"",
    updateRegionName: () => { },
    stateLabel: {name:"",shortRegion:""},
    updateStateLabel: () => { },
    visaType: "",
    updateVisaType: () => { },
    visaTypeLabel: "",
    updateVisaTypeLabel: () => { },
    jobType: [],
    updateJobType: () => { },
    jobTypeLabel: [],
    updateJobTypeLabel: () => { },
    city: "",
    updateCity: () => { },
    cityLabel: "",
    updateCityLabel: () => { },


    start: "",
    updateStartdate: () => { },

    enddate: "",
    updateEnddate: () => { },

    description: "",
    updateDescription: () => { },


    certificate: [{ certName: "", certYear: "" }],
    updateCertificate: () => { },
    education: [{ university: "", yearofpassing: "", degree: "" }],
    updateEducation: () => { },

    project: [{
        projectTitle: "", country: "", country_id: "", state: "", state_id: "", city: "",city_id: "",
        responsibilities: "", description: "", startdate: "", company: "", enddate: "", role: ""
    }],
    updateProject: () => { },
    summary: "",
    updateSummary: () => { },
    skills: [{ categoryName: "", 
        skillArray: [{
            skillName: "",
            skillId: "",
        }],
       
 }],
    updateSkills: () => { },
    
    website: "",
    updateWebsite: () => { },

    linkedIn: "",
    updateLinkedIn: () => { },

    gitHub : "",
    updateGitHub: () => { },

    hackerRank : "",
    updateHackerRank: () => { },

    leetCode : "",
    updateLeetCode: () => { },

    portfolio: "",
    updatePortfolio: () => { },

    resumetemplate: "0",
    updateResumetemplate: () => { },

    // templateData:{},
    // updateTemplateData: () => {},

    userId: "",
    updateUserId: () => { },

    finish: false,
    updateFinish: () => { },
    finishOne: false,
    updateFinishOne: () => { },
    stepperValue: 0,
    updateStepperValue: () => { },
    certificateLogo: "",
    updateCertificateLogo: () => {},
    affiliations:"",
    updateAffiliations : () => {},
    statesList: [],
    getStates: () => { },
}

)
export default ResumeContext;