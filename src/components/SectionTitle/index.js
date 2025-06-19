import React from "react";
import "./sectiontitle.css";

export default function SectionTitle({ children }) {
  return (
    <div className="section-title-wrapper">
      <div className="section-title-bar"/>
      <h1>{children}</h1>
    </div>
  );
}