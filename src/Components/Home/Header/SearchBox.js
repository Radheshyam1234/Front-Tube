import React, { useState, useEffect, useCallback } from "react";

export const SearchBox = () => {
  return (
    <>
      <div className="search-form">
        <label htmlFor="search-box" className="fas fa-search"></label>
        <input
          autoComplete="off"
          type="search"
          id="search-box"
          placeholder="Search videos "
        />
      </div>
    </>
  );
};
