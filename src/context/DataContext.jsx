import React, { createContext, useContext, useState } from 'react';
import { ADMIN_CONFIG } from '../config/admin';

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
  const { storageKeys } = ADMIN_CONFIG;

  // Helper to load data from localStorage or fallback
  const getStoredData = (key, fallback) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(fallback) && !Array.isArray(parsed)) {
          return fallback;
        }
        if (typeof fallback === 'object' && fallback !== null && (typeof parsed !== 'object' || parsed === null)) {
          return fallback;
        }
        return parsed;
      }
      return fallback;
    } catch (e) {
      console.error(`Error loading data for key ${key}:`, e);
      return fallback;
    }
  };

  // State initialization
  const [projects, setProjects] = useState(() => getStoredData(storageKeys.projects, initialProjects));
  const [blogPosts, setBlogPosts] = useState(() => getStoredData(storageKeys.blog, initialBlogPosts));
  const [skillCategories, setSkillCategories] = useState(() => getStoredData(storageKeys.skills, initialSkillCategories));
  const [experience, setExperience] = useState(() => getStoredData(storageKeys.experience, initialExperience));
  const [education, setEducation] = useState(() => getStoredData(storageKeys.education, initialEducation));
  const [certifications, setCertifications] = useState(() => getStoredData(storageKeys.certifications, initialCertifications));
  const [profileData, setProfileData] = useState(() => getStoredData(storageKeys.profile, initialProfileData));

  // Save wrappers
  const saveProjects = (data) => {
    setProjects(data);
    localStorage.setItem(storageKeys.projects, JSON.stringify(data));
  };

  const saveProfileData = (data) => {
    setProfileData(data);
    localStorage.setItem(storageKeys.profile, JSON.stringify(data));
  };

  const saveBlogPosts = (data) => {
    setBlogPosts(data);
    localStorage.setItem(storageKeys.blog, JSON.stringify(data));
  };

  const saveSkillCategories = (data) => {
    setSkillCategories(data);
    localStorage.setItem(storageKeys.skills, JSON.stringify(data));
  };

  const saveExperience = (data) => {
    setExperience(data);
    localStorage.setItem(storageKeys.experience, JSON.stringify(data));
  };

  const saveEducation = (data) => {
    setEducation(data);
    localStorage.setItem(storageKeys.education, JSON.stringify(data));
  };

  const saveCertifications = (data) => {
    setCertifications(data);
    localStorage.setItem(storageKeys.certifications, JSON.stringify(data));
  };

  // Reset to original static data files
  const resetAllData = () => {
    saveProjects(initialProjects);
    saveBlogPosts(initialBlogPosts);
    saveSkillCategories(initialSkillCategories);
    saveExperience(initialExperience);
    saveEducation(initialEducation);
    saveCertifications(initialCertifications);
    saveProfileData(initialProfileData);
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
