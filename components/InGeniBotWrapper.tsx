'use client';

import { useState } from 'react';
import InGeniBot from './InGeniBot';
import styles from './InGeniBot.module.css';

export default function InGeniBotWrapper() {
  const [showBot, setShowBot] = useState(false);

  return (
    <div className={styles.fullPage}>
      {!showBot ? (
        <div className={styles.welcomeContainer}>
          <img src="/ingenibot.svg" alt="InGeniBot Logo" className={styles.logo} />
          <h1 className={styles.title}>Welcome to InGeniBot</h1>

          <div className={styles.description}>
            <p><strong>🤖 What It Does</strong><br />
              InGeniBot helps you ask questions and get instant, intelligent responses. It supports you in conversations, guidance, or just friendly talk — anytime.
            </p>

            <p><strong>👨‍💻 Who Made It</strong><br />
              Created by <strong>Darshan Akshay Upadhye</strong>, a passionate full-stack developer and generative AI enthusiast.
            </p>

            <div className={styles.socialLinks}>
              <a
                href="https://github.com/Darshan-Upadhye"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img src="/github.svg" alt="GitHub" className={styles.icon} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/darshan-upadhye-02a9a5287?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bb%2FVR2H1QQauLs78yeoX15A%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img src="/linkedin.svg" alt="LinkedIn" className={styles.icon} /> LinkedIn
              </a>
            </div>

            <p><strong>🔧 How It Was Built</strong><br />
              - Frontend: <em>Next.js + React</em><br />
              - Backend: <em>OpenRouter API with DeepSeek R1</em><br />
              - Design: Inspired by Messenger, including avatars, typing animations, and a clean UI
            </p>

            <p><strong>🎯 Why It Was Made</strong><br />
              To demonstrate the power of Generative AI in real-world apps and offer an engaging, simple chatbot experience for learning or productivity.
            </p>
          </div>

          <button className={styles.tryButton} onClick={() => setShowBot(true)}>
            🚀 Try InGeniBot
          </button>
        </div>
      ) : (
        <div className={styles.popupContainer}>
          <button className={styles.closeButton} onClick={() => setShowBot(false)}>✖</button>
          <InGeniBot startBot />
        </div>
      )}
    </div>
  );
}