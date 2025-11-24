import React from "react";
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function Footer() {
 const day = new Date();

 let Year = day.getFullYear();
  return (
    <div className="footer">
      
          <div className="one">
            <p >©  &nbsp;{Year} Kannan</p>
          </div>
          <div className="two">
            <div className="footer-connect">
            <ul className="footer-icons">
            <li className="social-icons">
             
              <a
                href="https://github.com/Kans2"
                
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaGithub style={{fontSize:"1.5rem"}} />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/kannan-404-s"
              
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedin style={{fontSize:"1.5rem"}} />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/dream_is_big_life/"
               
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaFacebook  style={{fontSize:"1.5rem"}}/>
              </a>
            </li>
         
          </ul>
            </div>
          </div>
    </div>
  );
}