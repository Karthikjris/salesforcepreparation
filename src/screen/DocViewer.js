import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { styled } from "@mui/material/styles";

// Import Swiper for Image Animation
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

// Import images for animation
import img1 from "../assets/Image4.jpg";
import img3 from "../assets/img.webp";
import img4 from "../assets/img2.jpg";
import img5 from "../assets/img4.jpg";
import img6 from "../assets/Salesforce.jpg";

const images = [img1, img6, img3, img4, img5];

const PdfViewer = () => {
  // List of PDF files
  const pdfFiles = [
    { name: "Apex Best Practices", file: "Apex_Best_Practices.pdf" },
    { name: "Approval Process", file: "Approval_Process.pdf" },
    { name: "Assignment Rule", file: "Assignment_Rule.pdf" },
    { name: "Auto Response Rule", file: "Auto_Response_Rule.pdf" },
    { name: "Call LWC from Screen Flow", file: "Call_LWC_from_Screen_Flow.pdf" },
    { name: "Design Pattern", file: "Design_Pattern.pdf" },
    { name: "Email Templates in Salesforce", file: "Email_Templates_in_Salesforce.pdf" },
    { name: "Escalation Rule", file: "Escaltion_Rule.pdf" },
    { name: "Exceptions 1", file: "Exceptions_1.pdf" },
    { name: "Integration Answers", file: "Integration_Answers.pdf" },
    { name: "Integration Question With Answer", file: "Integration_Question_With_Answer.pdf" },
    { name: "Multi Factor Authenticator", file: "Multi_Factor_Authenticator.pdf" },
    { name: "Order of Execution in Salesforce", file: "Order_of_Execution_in_Salesforce.pdf" },
    { name: "Outbound Message", file: "Outbound_Message.pdf" },
    { name: "Permission Set", file: "Permission_Set.pdf" },
    { name: "Profile", file: "Profile.pdf" },
    { name: "Reports & Dashboard", file: "Reports _ Dashboard.pdf" },
    { name: "Salesforce Data Security", file: "Salesforce_Data-Security.pdf" },
    { name: "Salesforce Flow", file: "Salesforce_Flow.pdf" },
    { name: "Salesforce Limitations", file: "Salesforce_Limitations.pdf" },
    { name: "SSO in Salesforce", file: "SSO_in_Salesforce.pdf" },
    { name: "Trigger Framework", file: "Trigger_Framework.pdf" },
    { name: "Trigger Questions And Answer", file: "Trigger_Questions_And_Answer.pdf" }
  ];
  
  

  // State for selected PDF and sidebar visibility
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = (open) => {
    setSidebarOpen(open);
  };

  // Styled List Item for Hover Effect
  const StyledListItem = styled(ListItem)({
    transition: "background-color 0.3s ease, transform 0.2s",
    "&:hover": {
      backgroundColor: "rgba(8, 171, 237, 0.2)",
      color: "rgb(8, 171, 237)",
      transform: "scale(1.05)",
    },
  });

  return (
    <div className="pdf-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header with MUI AppBar */}
      <AppBar position="static" sx={{ background: "linear-gradient(135deg, rgb(8, 171, 237), rgb(255, 255, 255))" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleSidebar(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PDF Viewer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* MUI Drawer for Sidebar (Opens below the Header with Full Height) */}
      <Drawer
        anchor="top"
        open={sidebarOpen}
        onClose={() => toggleSidebar(false)}
        PaperProps={{
          style: {
            top: "64px", // Start below the header
            height: "calc(100vh - 64px)", // Takes full height below header
            width: "250px",
            left: 0,
            position: "absolute",
            overflowY: "auto",
            backgroundColor: "#e9edf5"
          }
        }}
      >
        <List>
          {pdfFiles.map((pdf, index) => (
            <StyledListItem
              button
              key={index}
              onClick={() => { setSelectedPdf(pdf.file); toggleSidebar(false); }}
              style={{ cursor: "pointer" }} // Hand cursor on hover
            >
              <ListItemIcon>
                <PictureAsPdfIcon style={{ color: "rgb(8, 171, 237)" }} />
              </ListItemIcon>
              <ListItemText primary={pdf.name} />
            </StyledListItem>
          ))}
        </List>
      </Drawer>


      {/* PDF Viewer or Smooth Image Animation */}
      <div style={{
        flex: 1,
        padding: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}>
        {selectedPdf ? (
          <iframe
          src={`${process.env.PUBLIC_URL}/docs/${selectedPdf}`}
          width="100%"
          height="100%"
          title="PDF Document Viewer"
          style={{ border: "none" }}
      ></iframe>
        ) : (
          // Smooth Image Slider with Ken Burns Effect
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={2500} // Even slower transition for smoothness
            loop={true}
            style={{ width: "100%", height: "100%" }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: `url(${image}) center/cover no-repeat`,
                  animation: "smooth-zoom 8s ease-in-out infinite"
                }} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style>
        {`
@keyframes smooth-zoom {
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(1.1); opacity: 1; }
}
`}
      </style>

    </div>
  );
};

export default PdfViewer;