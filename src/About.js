import React from 'react';
import './About.css';
import me from './me2.jpg'

const AboutSection = () => {
  return (
    <main className="main-content" id='About'>
      {/* About Gitcoin */}
      <section className="about-section" id="about">
        <h2>About Gitcoin</h2>
        <p>
          Gitcoin is a platform that enables funding for open-source projects through decentralized finance (DeFi). It has supported numerous blockchain initiatives, fostering innovation and building stronger communities. 
        </p>
        <p>
          In Kenya, Gitcoin has the potential to revolutionize financial management, allowing for transparent tracking of public funds, philanthropic contributions, and social impact. Through blockchain technology, Gitcoin enables verifiable and accountable financial processes, which can greatly benefit sectors such as healthcare, education, and governance.
        </p>
      </section>

      {/* Project Description */}
      <section className="project-section">
        <h2>What This Project Has Achieved</h2>
        <p>
          Using Gitcoin and blockchain technologies, this project introduces a
           transparent system for tracking public money and philanthropic donations in Kenya.
            By utilizing <strong id='graph'>The Graph</strong>, we are able to query blockchain data, showing real-time 
            transfers and approvals that contribute to the accountability of the fund allocation process.
         This project aims to bring about significant changes in how public resources are used, driving better
          governance and responsible spending.
        </p>
      </section>

      {/* Developer Section */}
      <section className="builder-section">
        <h2>About the Developer</h2>
        <div className="developer-card">
          <img src={me} alt="Ephy Muiruri Wachira" />
          <h3>Ephy Muiruri Wachira</h3>
          <p>
            As a Computer Science student and web developer, I am passionate about leveraging technology for social good. With expertise in blockchain and decentralized finance, I built this project to enhance transparency in financial management. My aim is to make a difference in Kenya by utilizing Gitcoin and The Graph to foster greater accountability.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutSection;
