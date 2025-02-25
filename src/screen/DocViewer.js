import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography, ListItemIcon, Select, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";

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
    { name: "Apex Best Practices", file: "Apex_Best_Practices.pdf", type: "pdf" },
    { name: "Approval Process", file: "Approval_Process.pdf", type: "pdf" },
    { name: "Assignment Rule", file: "Assignment_Rule.pdf", type: "pdf" },
    { name: "Auto Response Rule", file: "Auto_Response_Rule.pdf", type: "pdf" },
    { name: "Call LWC from Screen Flow", file: "Call_LWC_from_Screen_Flow.pdf", type: "pdf" },
    { name: "Design Pattern", file: "Design_Pattern.pdf", type: "pdf" },
    { name: "Email Templates in Salesforce", file: "Email_Templates_in_Salesforce.pdf", type: "pdf" },
    { name: "Escalation Rule", file: "Escaltion_Rule.pdf", type: "pdf" },
    { name: "Salesforce Exceptions", file: "Exceptions_1.xlsx", type: "excel" },
    { name: "Integration Answers", file: "Integration_Answers.pdf", type: "pdf" },
    { name: "Integration Question With Answer", file: "Integration_Question_With_Answer.pdf", type: "pdf" },
    { name: "Multi Factor Authenticator", file: "Multi_Factor_Authenticator.pdf", type: "pdf" },
    { name: "Order of Execution in Salesforce", file: "Order_of_Execution_in_Salesforce.pdf", type: "pdf" },
    { name: "Outbound Message", file: "Outbound_Message.pdf", type: "pdf" },
    { name: "Permission Set", file: "Permission_Set.pdf", type: "pdf" },
    { name: "Profile", file: "Profile.pdf", type: "pdf" },
    { name: "Reports & Dashboard", file: "Reports _ Dashboard.pdf", type: "pdf" },
    { name: "Salesforce Data Security", file: "Salesforce_Data-Security.pdf", type: "pdf" },
    { name: "Salesforce Flow", file: "Salesforce_Flow.pdf", type: "pdf" },
    { name: "Salesforce Limitations", file: "Salesforce_Limitations.pdf", type: "pdf" },
    { name: "SSO in Salesforce", file: "SSO_in_Salesforce.pdf", type: "pdf" },
    { name: "Trigger Framework", file: "Trigger_Framework.pdf", type: "pdf" },
    { name: "Trigger Questions And Answer", file: "Trigger_Questions_And_Answer.pdf", type: "pdf" }
  ];

  // States
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [excelData, setExcelData] = useState({});
  const [excelHeaders, setExcelHeaders] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");

  // Toggle Sidebar
  const toggleSidebar = (open) => setSidebarOpen(open);

  // Styled List Item for Hover Effect
  const StyledListItem = styled(ListItem)({
    transition: "background-color 0.3s ease, transform 0.2s",
    "&:hover": {
      backgroundColor: "rgba(8, 171, 237, 0.2)",
      color: "rgb(8, 171, 237)",
      transform: "scale(1.05)",
    },
  });

  // Handle File Selection
  const handleFileSelection = (file, type) => {
    setSelectedFile(file);
    setSelectedFileType(type);
    setSidebarOpen(false);

    if (type === "excel") {
      loadExcelFile(file);
    }
  };

  // Load and Parse Excel File
  const loadExcelFile = async (file) => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/docs/${file}`);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Store all sheets data
        const allSheetsData = {};
        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          allSheetsData[sheetName] = XLSX.utils.sheet_to_json(worksheet);
        });

        // Set states
        setSheetNames(workbook.SheetNames);
        setExcelData(allSheetsData);
        setSelectedSheet(workbook.SheetNames[0]);

        if (allSheetsData[workbook.SheetNames[0]].length > 0) {
          setExcelHeaders(Object.keys(allSheetsData[workbook.SheetNames[0]][0]));
        }
      };

      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error("Error loading Excel file:", error);
    }
  };

  // Handle Sheet Change
  const handleSheetChange = (event) => {
    const sheetName = event.target.value;
    setSelectedSheet(sheetName);

    if (excelData[sheetName].length > 0) {
      setExcelHeaders(Object.keys(excelData[sheetName][0]));
    }
  };

  return (
    <div className="pdf-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
       {/* Header with MUI AppBar */}
      <AppBar
  position="static"
  sx={{
    background: "linear-gradient(135deg, rgb(8, 171, 237), rgb(255, 255, 255))",
  }}
>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleSidebar(true)}>
      <MenuIcon />
    </IconButton>

    {/* Centered Text */}
    <Typography
      variant="h6"
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        fontWeight: "bold",
      }}
    >
      Salesforce Interview Preparation
    </Typography>

    {/* Left-aligned Text */}
    <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2 }}>
      Select Topics
    </Typography>
  </Toolbar>
</AppBar>


      {/* Sidebar for PDF & Excel Files */}
      <Drawer
        anchor="top"
        open={sidebarOpen}
        onClose={() => toggleSidebar(false)}
        PaperProps={{
          style: {
            top: "64px",
            height: "calc(100vh - 64px)",
            width: "250px",
            left: 0,
            position: "absolute",
            overflowY: "auto"
          }
        }}
      >
        <List>
          {pdfFiles.map((file, index) => (
            <StyledListItem
              component="div"
              key={index}
              onClick={() => handleFileSelection(file.file, file.type)}
              style={{ cursor: "pointer" }}
            >
              <ListItemIcon>
                {file.type === "pdf" ? (
                  <PictureAsPdfIcon style={{ color: "rgb(8, 171, 237)" }} />
                ) : (
                  <InsertDriveFileIcon style={{ color: "green" }} /> // Excel File Icon
                )}
              </ListItemIcon>
              <ListItemText primary={file.name} />
            </StyledListItem>
          ))}
        </List>
      </Drawer>

      {/* File Viewer Section */}
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
        {selectedFile ? (
          selectedFileType === "pdf" ? (
            <iframe
              src={`${process.env.PUBLIC_URL}/docs/${selectedFile}`}
              width="100%"
              height="100%"
              title="PDF Document Viewer"
              style={{ border: "none" }}
            ></iframe>
          ) : (
            <div style={{ padding: "20px", width: "95%", maxHeight: "80vh", overflow: "auto", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
              {/* Sheet Selector */}
              {sheetNames.length > 0 && (
                <Select value={selectedSheet} onChange={handleSheetChange} style={{ marginBottom: "10px" }}>
                  {sheetNames.map((sheet, index) => (
                    <MenuItem key={index} value={sheet}>{sheet}</MenuItem>
                  ))}
                </Select>
              )}
              {/* Excel Table */}
              <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{
                    background: "linear-gradient(135deg, rgb(8, 171, 237), rgb(255, 255, 255))",
                    color: "black",
                    textAlign: "left"
                  }}>
                    {excelHeaders.map((header, index) => (
                      <th key={index} style={{ padding: "10px" }}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData[selectedSheet]?.map((row, rowIndex) => (
                    <tr key={rowIndex} style={{ background: rowIndex % 2 === 0 ? "#f1f1f1" : "#ffffff" }}>
                      {excelHeaders.map((header, cellIndex) => (
                        <td key={cellIndex} style={{ padding: "10px", textAlign: "left" }}>{row[header] || "-"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={2500}
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
    </div>
  );
};

export default PdfViewer;
