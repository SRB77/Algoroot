import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserX,
  Briefcase,
} from "lucide-react";
import profiles from "../mockData.json";
import "./Details.css";
import { useNavigate } from "react-router-dom";

function Details() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/"); // Redirect to home if not signed in
    }
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const itemsPerPage = 6;
  const countries = [...new Set(profiles.map((profile) => profile.country))];

  // Filter and sort profiles
  const filteredProfiles = profiles
    .filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCountry ? profile.country === selectedCountry : true)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price_per_hour - b.price_per_hour;
      if (sortOrder === "desc") return b.price_per_hour - a.price_per_hour;
      return 0;
    });

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const currentProfiles = filteredProfiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="nav">
        <div className="container nav-container">
          <div className="nav-brand">
            <Briefcase className="" color="#4f46e5" />
            <span>Algoroot</span>
          </div>

          <div className="nav-search">
            <Search />
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="profile-dropdown">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="profile-button"
            >
              <div className="profile-avatar">
                <span>JD</span>
              </div>
              <ChevronDown className="" />
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("currentUser");
                    navigate("/");
                  }}
                >
                  <LogOut />
                  Logout
                </button>
                <button
                  className="dropdown-item danger"
                  onClick={() => {
                    const userId = localStorage.getItem("currentUser");
                    if (userId) {
                      localStorage.removeItem(userId); // Delete user data
                    }
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("currentUser");
                    navigate("/"); // Redirect to home page
                  }}
                >
                  <UserX className="" />
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container content-layout">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Filters</h3>

              <div className="filter-section">
                <label className="filter-label">Sort by Price</label>
                <select
                  className="filter-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>

              <div className="filter-section">
                <label className="filter-label">Country</label>
                <select
                  className="filter-select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="card-container">
            <div className="profile-grid">
              {currentProfiles.map((profile) => (
                <div key={profile.id} className="profile-card">
                  <img
                    src={profile.flag}
                    alt={profile.name}
                    className="profile-image"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <div className="profile-info">
                    <h3 className="profile-name">{profile.name}</h3>
                    <p className="profile-role">{profile.domain}</p>
                    <div className="profile-details">
                      <span className="profile-country">{profile.country}</span>
                      <span className="profile-price">
                        ${profile.price_per_hour}/hr
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                <ChevronLeft className="" />
              </button>

              <span className="pagination-text">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                <ChevronRight className="" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Details;
