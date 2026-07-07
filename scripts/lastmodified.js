const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById("current-year");
    const modifiedElement = document.getElementById("lastModified");

    if (yearElement) {
  yearElement.textContent = currentYear;
}

    if (modifiedElement) {
        modifiedElement.textContent = "Last Modified: " + document.lastModified;
}