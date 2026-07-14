import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Import initial data
import { projects as initialProjects } from '../data/projects';
import { blogPosts as initialBlogPosts } from '../data/blog';
import { skillCategories as initialSkillCategories } from '../data/skills';
import { experience as initialExperience, education as initialEducation, certifications as initialCertifications } from '../data/experience';
import { profileData as initialProfileData } from '../data/about';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // State initialization with imported initial data
  const [projects, setProjects] = useState(initialProjects);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [skillCategories, setSkillCategories] = useState(initialSkillCategories);
  const [experience, setExperience] = useState(initialExperience);
  const [education, setEducation] = useState(initialEducation);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [profileData, setProfileData] = useState(initialProfileData);

  // Helper function to save the entire portfolio to Firestore without reading stale React state
  const savePortfolio = async (updatedPortfolio) => {
    const {
      projects,
      blogPosts,
      skillCategories,
      experience,
      education,
      certifications,
      profileData
    } = updatedPortfolio;

    await setDoc(doc(db, "portfolio", "website"), {
      projects,
      blogPosts,
      skillCategories,
      experience,
      education,
      certifications,
      profileData
    });
  };

  // Replace current initialization with Firestore loading when DataProvider mounts
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const snap = await getDoc(doc(db, "portfolio", "website"));
        if (snap.exists()) {
          const data = snap.data();
          if (data.projects) setProjects(data.projects);
          if (data.blogPosts) setBlogPosts(data.blogPosts);
          if (data.skillCategories) setSkillCategories(data.skillCategories);
          if (data.experience) setExperience(data.experience);
          if (data.education) setEducation(data.education);
          if (data.certifications) setCertifications(data.certifications);
          if (data.profileData) setProfileData(data.profileData);
        } else {
          // Initialize Firestore using the existing imported initial data and immediately create the document
          await setDoc(doc(db, "portfolio", "website"), {
            projects: initialProjects,
            blogPosts: initialBlogPosts,
            skillCategories: initialSkillCategories,
            experience: initialExperience,
            education: initialEducation,
            certifications: initialCertifications,
            profileData: initialProfileData
          });
        }
      } catch (error) {
        console.error("Error loading portfolio from Firestore:", error);
      }
    };
    loadPortfolioData();
  }, []);

  // Save wrappers that build the updated portfolio object and update state + Firestore
  const saveProjects = (data) => {
    const updatedPortfolio = {
      projects: data,
      blogPosts,
      skillCategories,
      experience,
      education,
      certifications,
      profileData
    };
    setProjects(data);
    savePortfolio(updatedPortfolio);
  };

  const saveProfileData = (data) => {
    const updatedPortfolio = {
      projects,
      blogPosts,
      skillCategories,
      experience,
      education,
      certifications,
      profileData: data
    };
    setProfileData(data);
    savePortfolio(updatedPortfolio);
  };

  const saveBlogPosts = (data) => {
    const updatedPortfolio = {
      projects,
      blogPosts: data,
      skillCategories,
      experience,
      education,
      certifications,
      profileData
    };
    setBlogPosts(data);
    savePortfolio(updatedPortfolio);
  };

  const saveSkillCategories = (data) => {
    const updatedPortfolio = {
      projects,
      blogPosts,
      skillCategories: data,
      experience,
      education,
      certifications,
      profileData
    };
    setSkillCategories(data);
    savePortfolio(updatedPortfolio);
  };

  const saveExperience = (data) => {
    const updatedPortfolio = {
      projects,
      blogPosts,
      skillCategories,
      experience: data,
      education,
      certifications,
      profileData
    };
    setExperience(data);
    savePortfolio(updatedPortfolio);
  };

  const saveEducation = (data) => {
    const updatedPortfolio = {
      projects,
      blogPosts,
      skillCategories,
      experience,
      education: data,
      certifications,
      profileData
    };
    setEducation(data);
    savePortfolio(updatedPortfolio);
  };

  const saveCertifications = (data) => {
    const updatedPortfolio = {
      projects,
      blogPosts,
      skillCategories,
      experience,
      education,
      certifications: data,
      profileData
    };
    setCertifications(data);
    savePortfolio(updatedPortfolio);
  };

  // Reset all data to original static data files, updating Firestore
  const resetAllData = () => {
    const updatedPortfolio = {
      projects: initialProjects,
      blogPosts: initialBlogPosts,
      skillCategories: initialSkillCategories,
      experience: initialExperience,
      education: initialEducation,
      certifications: initialCertifications,
      profileData: initialProfileData
    };
    setProjects(initialProjects);
    setBlogPosts(initialBlogPosts);
    setSkillCategories(initialSkillCategories);
    setExperience(initialExperience);
    setEducation(initialEducation);
    setCertifications(initialCertifications);
    setProfileData(initialProfileData);
    savePortfolio(updatedPortfolio);
  };

  // Export functions to generate JavaScript code strings
  const getProjectsExportCode = () => {
    return `export const projects = ${JSON.stringify(projects, null, 2)};\n`;
  };

  const getBlogExportCode = () => {
    return `export const blogPosts = ${JSON.stringify(blogPosts, null, 2)};\n`;
  };

  const getSkillsExportCode = () => {
    return `export const skillCategories = ${JSON.stringify(skillCategories, null, 2)};\n`;
  };

  const getExperienceExportCode = () => {
    return `export const education = ${JSON.stringify(education, null, 2)};\n\n` +
           `export const experience = ${JSON.stringify(experience, null, 2)};\n\n` +
           `export const certifications = ${JSON.stringify(certifications, null, 2)};\n`;
  };

  const getAboutExportCode = () => {
    return `export const profileData = ${JSON.stringify(profileData, null, 2)};\n`;
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        blogPosts,
        skillCategories,
        experience,
        education,
        certifications,
        profileData,
        saveProjects,
        saveBlogPosts,
        saveSkillCategories,
        saveExperience,
        saveEducation,
        saveCertifications,
        saveProfileData,
        resetAllData,
        getProjectsExportCode,
        getBlogExportCode,
        getSkillsExportCode,
        getExperienceExportCode,
        getAboutExportCode
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
