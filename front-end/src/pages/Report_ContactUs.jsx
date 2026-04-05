import { useState } from "react";
import "./Report_ContactUs.css";

function Report_ContactUs() {
  const [activeTab, setActiveTab] = useState("report");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [reportForm, setReportForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    pollutionType: "",
    severity: "",
    description: "",
    photo: null,
  });

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // TODO: We can decrease the max file size?
        alert("File size must be less than 5MB");
        return;
      }
      setReportForm((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setReportForm((prev) => ({ ...prev, photo: null }));
    setPhotoPreview(null);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // TODO: In production this would send to backend API
    console.log("Pollution report submitted:", reportForm);
    setSubmissionStatus("report");
    setReportForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      pollutionType: "",
      severity: "",
      description: "",
      photo: null,
    });
    setPhotoPreview(null);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // TODO: In production this would send to backend API
    console.log("Inquiry submitted:", inquiryForm);
    setSubmissionStatus("inquiry");
    setInquiryForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const closeThankYou = () => {
    setSubmissionStatus(null);
  };

  return (
    <div className="contact-page">
      {/* Emergency Contacts Section */}
      <section className="emergency-section">
        <div className="emergency-header">
          <h2>Emergency Contacts</h2>
        </div>
        <p className="emergency-subtitle">
          For urgent water emergencies requiring immediate assistance
        </p>
        <div className="emergency-cards">
          <div className="emergency-card">
            <h3>Water Emergency Hotline</h3>
            <a href="tel:0123-456-7890" className="emergency-number">
              0123-456-7890
            </a>
            <p>24/7 Emergency Response</p>
          </div>
          <div className="emergency-card">
            <h3>Local Water Authority</h3>
            <a href="tel:012-3456-7890" className="emergency-number">
              012-3456-7890
            </a>
            <p>Mon-Fri: 8am - 6pm</p>
          </div>
          <div className="emergency-card">
            <h3>Health Emergency</h3>
            <a href="tel:999" className="emergency-number">
              999
            </a>
            <p>Contamination Illness</p>
          </div>
        </div>
      </section>

      {/* Thank You Modal */}
      {submissionStatus && (
        <div className="thank-you-overlay" onClick={closeThankYou}>
          <div
            className="thank-you-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="thank-you-icon">✓</div>
            <h2>Thank You!</h2>
            {submissionStatus === "report" ? (
              <>
                <p>
                  Your water pollution report has been received successfully.
                </p>
                <p>
                  Our team will review your report and take appropriate action.
                  You may be contacted for additional information.
                </p>
              </>
            ) : (
              <>
                <p>Your inquiry has been submitted successfully.</p>
                <p>
                  We typically respond within 2-3 business days. Check your
                  email for our response.
                </p>
              </>
            )}
            <button className="thank-you-button" onClick={closeThankYou}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="contact-content">
        <h1>Report & Contact Us</h1>
        <p className="page-description">
          Report water pollution issues or send us a general inquiry. Your
          reports help us protect community water resources.
        </p>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "report" ? "active" : ""}`}
            onClick={() => setActiveTab("report")}
          >
            Report Pollution
          </button>
          <button
            className={`tab-button ${activeTab === "inquiry" ? "active" : ""}`}
            onClick={() => setActiveTab("inquiry")}
          >
            General Inquiry
          </button>
        </div>

        {/* Pollution Report Form */}
        {activeTab === "report" && (
          <form className="contact-form" onSubmit={handleReportSubmit}>
            <h2>Water Pollution Report</h2>
            <p className="form-description">
              Provide details about the water issue you observed. Fields marked
              with * are required.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="report-name">Full Name *</label>
                <input
                  type="text"
                  id="report-name"
                  name="name"
                  value={reportForm.name}
                  onChange={handleReportChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="report-email">Email Address *</label>
                <input
                  type="email"
                  id="report-email"
                  name="email"
                  value={reportForm.email}
                  onChange={handleReportChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="report-phone">Phone Number</label>
                <input
                  type="tel"
                  id="report-phone"
                  name="phone"
                  value={reportForm.phone}
                  onChange={handleReportChange}
                  placeholder="Optional contact number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="report-location">Location *</label>
                <input
                  type="text"
                  id="report-location"
                  name="location"
                  value={reportForm.location}
                  onChange={handleReportChange}
                  placeholder="Address or landmark near the issue"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="report-type">Pollution Type *</label>
                <select
                  id="report-type"
                  name="pollutionType"
                  value={reportForm.pollutionType}
                  onChange={handleReportChange}
                  required
                >
                  // TODO: Add more options?
                  <option value="">Select type</option>
                  <option value="contamination">Water Contamination</option>
                  <option value="broken-pump">Broken Pump</option>
                  <option value="leak">Water Leak</option>
                  <option value="sewage">Sewage Overflow</option>
                  <option value="industrial">Industrial Discharge</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="report-severity">Severity Level *</label>
                <select
                  id="report-severity"
                  name="severity"
                  value={reportForm.severity}
                  onChange={handleReportChange}
                  required
                >
                  <option value="">Select severity</option>
                  <option value="low">Low - Minor issue</option>
                  <option value="medium">Medium - Needs attention</option>
                  <option value="high">High - Urgent</option>
                  <option value="critical">Critical - Health hazard</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="report-description">Description *</label>
              <textarea
                id="report-description"
                name="description"
                value={reportForm.description}
                onChange={handleReportChange}
                placeholder="Describe the issue in detail: What did you observe? When did it start? How is it affecting the area?"
                rows="5"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Attach Photo (Optional)</label>
              <div className="photo-upload-area">
                {photoPreview ? (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="Preview" />
                    <button
                      type="button"
                      className="remove-photo"
                      onClick={removePhoto}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="upload-label">
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="file-input"
                    />
                    <span className="upload-icon">📷</span>
                    <span>Click to upload photo evidence</span>
                    <span className="upload-hint">JPG, PNG up to 5MB</span>
                  </label>
                )}
              </div>
            </div>

            <button type="submit" className="submit-button">
              Submit Report
            </button>
          </form>
        )}

        {/* General Inquiry Form */}
        {activeTab === "inquiry" && (
          <form className="contact-form" onSubmit={handleInquirySubmit}>
            <h2>General Inquiry</h2>
            <p className="form-description">
              Have a question about our service? Send us a message and we will
              get back to you.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="inquiry-name">Full Name *</label>
                <input
                  type="text"
                  id="inquiry-name"
                  name="name"
                  value={inquiryForm.name}
                  onChange={handleInquiryChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inquiry-email">Email Address *</label>
                <input
                  type="email"
                  id="inquiry-email"
                  name="email"
                  value={inquiryForm.email}
                  onChange={handleInquiryChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="inquiry-subject">Subject *</label>
              <input
                type="text"
                id="inquiry-subject"
                name="subject"
                value={inquiryForm.subject}
                onChange={handleInquiryChange}
                placeholder="What is your inquiry about?"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="inquiry-message">Message *</label>
              <textarea
                id="inquiry-message"
                name="message"
                value={inquiryForm.message}
                onChange={handleInquiryChange}
                placeholder="Type your message here..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Report_ContactUs;
