import logo from './logo.svg';
import './App.css';
import ResumeTemplates from './Components/ResumeTemplates';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResumeEdit from './Components/ResumeEdit';
import ResumeContext from './Components/ResumeContext';
import { useState } from 'react';

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeImage, setResumeImage] = useState("");
  const [resumeImageObject, setResumeImageObject] = useState("");
  const [summary, setSummary] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [degree, setDegree] = useState("");
  const [stream, setStream] = useState("");
  const [userId, setUserId] = useState("");
  const [institute, setInstitute] = useState("");
  const [year, setYear] = useState("");
  const [projecttitle, setProjecttitle] = useState("");
  const [role, setRole] = useState("");
  const [client, setClient] = useState("");
  const [country, setCountry] = useState("");
  const [countryLabel, setCountryLabel] = useState("United States");
  const [city, setCity] = useState("");
  const [visaType, setVisaType] = useState("");
  const [visaTypeLabel, setVisaTypeLabel] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTypeLabel, setjobTypeLabel] = useState("");
  const [cityLabel, setCityLabel] = useState("");
  const [state, setState] = useState("");
  const [stateLabel, setStateLabel] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [website, setWebsite] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [skillsToHighlight, setSkillsToHighlight] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [hackerRank, setHackerRank] = useState("");
  const [leetCode, setLeetCode] = useState("");

  const [searchResumeTitle, setSearchResumeTitle] = useState("");
  const [resumetemplate, setResumeTemplate] = useState("0");
  const [skills, setSkills] = useState([
    {
      category: "",
      skills: [],
    },
  ]);
  const [certificate, setCertificate] = useState([
    { certName: "", certYear: "" },
  ]);
  const [education, setEducation] = useState([
    { university: "", yearofpassing: "", degree: "" },
  ]);
  const [project, setProject] = useState([
    {
      projectTitle: "",
      country: "",
      country_id: "",
      state: "",
      state_id: "",
      city: "",
      city_id: "",
      responsibilities: "",
      date_start: "",
      organization: "",
      date_end: "",
      jobtitle: "",
      description: "",
    },
  ]);
  const [experience, setExperience] = useState([]);
  const [skillNames, setSkillNames] = useState([]);
  const [finish, setFinish] = useState(false);
  const [finishOne, setFinishOne] = useState(false);
  const [selectedFromSuggestions, setSelectedFromSuggestions] = useState(false);
  const [jobsCount, setJobsCount] = useState(0);
  const [certificateLogo, setCertificateLogo] = useState("");
  return (
    <div className="App">
      <ResumeContext.Provider 
        value={{
          jobTitle,
          updateJobTitle: (value) => setJobTitle(value),
          website,
          updateWebsite: (value) => setWebsite(value),
          linkedIn,
          updateLinkedIn: (value) => setLinkedIn(value),
          gitHub,
          updateGitHub: (value) => setGitHub(value),
          leetCode,
          updateLeetCode: (value) => setLeetCode(value),
          hackerRank,
          updateHackerRank: (value) => setHackerRank(value),
          portfolio,
          updatePortfolio: (value) => setPortfolio(value),
          name,
          updateName: (value) => setName(value),
          email,
          updateEmail: (value) => setEmail(value),
          phone,
          updatePhone: (value) => setPhone(value),
          summary,
          updateSummary: (value) => setSummary(value),
          degree,
          updateDegree: (value) => setDegree(value),
          resumeImage,
          updateResumeImage: (value) => setResumeImage(value),
          resumeImageObject,
          updateResumeImageObject: (value) => setResumeImageObject(value),
          institute,
          updateInstitute: (value) => setInstitute(value),
          stream,
          updateStream: (value) => setStream(value),
          year,
          updateYear: (value) => setYear(value),
          skills,
          updateSkills: (value) => setSkills(value),
          userId,
          updateUserId: (value) => setUserId(value),
          password,
          updatePassword: (value) => setPassword(value),
          confirmPassword,
          updateConfirmPassword: (value) => setConfirmPassword(value),
          projecttitle,
          updateProjecttitle: (value) => setProjecttitle(value),
          client,
          updateClient: (value) => setClient(value),
          role,
          updateRole: (value) => setRole(value),
          country,
          updateCountry: (value) => setCountry(value),
          countryLabel,
          updateCountryLabel: (value) => setCountryLabel(value),
          state,
          updateState: (value) => setState(value),
          stateLabel,
          updateStateLabel: (value) => setStateLabel(value),
          city,
          updateCity: (value) => setCity(value),
          visaType,
          updateVisaType: (value) => setVisaType(value),
          visaTypeLabel,
          updateVisaTypeLabel: (value) => setVisaTypeLabel(value),
          jobType,
          updateJobType: (value) => setJobType(value),
          jobTypeLabel,
          updateJobTypeLabel: (value) => setjobTypeLabel(value),
          cityLabel,
          updateCityLabel: (value) => setCityLabel(value),
          startdate,
          updateStartdate: (value) => setStartdate(value),
          enddate,
          updateEnddate: (value) => setEnddate(value),
          certificate,
          updateCertificate: (value) => setCertificate(value),
          education,
          updateEducation: (value) => setEducation(value),
          project,
          updateProject: (value) => setProject(value),
          experience,
          updateExperience: (value) => setExperience(value),
          skillNames,
          updateSkillNames: (value) => setSkillNames(value),
          resumetemplate,
          updateResumetemplate: (value) => setResumeTemplate(value),
          finish,
          updateFinish: (value) => setFinish(value),
          finishOne,
          updateFinishOne: (value) => setFinishOne(value),
          certificateLogo,
          updateCertificateLogo: (value) => setCertificateLogo(value),
         
        }}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResumeTemplates />} />
        <Route path="/createResume" element={<ResumeEdit />} />
      </Routes>
      </BrowserRouter>
      </ResumeContext.Provider>
    </div>
  );
}

export default App;
