import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
