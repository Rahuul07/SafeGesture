import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const GuestNavbar = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    AOS.init({
      duration: 800,
      once: true
    });

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <motion.div
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >

      <Navbar
        expand="lg"
        fixed="top"
        className={`guest-navbar ${scrolled ? "scrolled" : ""}`}
      >

        <Container>

          {/* Logo */}

          <motion.div
            whileHover={{ scale: 1.1 }}
          >

            <Navbar.Brand className="brand-logo">
              SafeGesture
            </Navbar.Brand>

          </motion.div>

          <Navbar.Toggle />

          <Navbar.Collapse>

            <Nav className="ms-auto">

              <Nav.Link href="/home" className="nav-link-custom">
                Home
              </Nav.Link>

              <Nav.Link href="/features" className="nav-link-custom">
                Features
              </Nav.Link>

              <Nav.Link href="#how" className="nav-link-custom">
                How It Works
              </Nav.Link>

              <Nav.Link href="/contact" className="nav-link-custom">
                Contact
              </Nav.Link>

            </Nav>

          </Navbar.Collapse>

        </Container>

      </Navbar>

      {/* CSS */}

      <style>

        {`

        .guest-navbar{

          padding:15px 0;
          transition:all .3s ease;
          background:transparent;

        }

        .guest-navbar.scrolled{

          background:rgba(0,0,0,0.65);
          backdrop-filter:blur(10px);
          box-shadow:0 5px 20px rgba(0,0,0,0.3);

        }

        .brand-logo{

          color:white !important;
          font-size:26px;
          font-weight:700;
          letter-spacing:1px;

        }

        .nav-link-custom{

          color:white !important;
          margin-left:25px;
          font-weight:500;
          position:relative;

        }

        .nav-link-custom::after{

          content:"";
          position:absolute;
          width:0%;
          height:2px;
          bottom:-5px;
          left:0;
          background:#ff6a00;
          transition:0.3s;

        }

        .nav-link-custom:hover::after{

          width:100%;

        }

        .nav-link-custom:hover{

          color:#ff6a00 !important;

        }

        `}
        
      </style>

    </motion.div>

  );

};

export default GuestNavbar;