//
// Program Name:        sortable-tables.js
// Date Last Modified:  08/23/2023
// Last Modified By:    Lauren Escobedo
//                      
// Program Description: JavaScript file which will sort html tables.
//                      Options are as follows:
//                      class="sortable-onload-N"     -> This will sort the table, on load, on column N
//                      class="rowstyle-alternateRow" -> This will alter the table to display alternating row colors
//

// Function to sort the table data
function sortTable(event) {
  const table = event.target.closest("table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr")); // Get all table rows

  // Get the column index to sort
  const column = Array.from(event.target.parentNode.children).indexOf(event.target);

  // Get the current sorting order of the column
  const currentSortOrder = event.target.dataset.sortOrder || "desc";
  const sortOrder = currentSortOrder === "asc" ? "desc" : "asc";
  event.target.dataset.sortOrder = sortOrder;

  // Sort the rows based on the content of the selected column
  rows.sort((a, b) => {
    const cellA = a.querySelectorAll("td")[column].textContent.trim();
    const cellB = b.querySelectorAll("td")[column].textContent.trim();
    let result;

    // Apply different sorting based on the sorting style specified in the class of the header
    if (event.target.classList.contains("sortable-date")) { // Date sort
      const dateA = new Date(cellA);
      const dateB = new Date(cellB);
      result = dateB - dateA;
    } else if (event.target.classList.contains("sortable-numeric")) { // Numeric sort
      const numberA = parseFloat(cellA);
      const numberB = parseFloat(cellB);
      result = numberA - numberB;
    } else {
      result = cellA.localeCompare(cellB, undefined, { numeric: true, sensitivity: 'base' }); // Alphanumeric sort
    }

    if (result == 0) {
      //debugger;
      
      const secondaryColumnIndex = parseInt(event.target.className.split("-").slice(-1)[0]);
      
      const allRows = a.closest("table").querySelectorAll("tr");
      
      if (secondaryColumnIndex >= 0 && secondaryColumnIndex < allRows[0].querySelectorAll("td").length) {
        const secondaryCellA = a.querySelectorAll("td")[secondaryColumnIndex].textContent.trim();
        const secondaryCellB = b.querySelectorAll("td")[secondaryColumnIndex].textContent.trim();
      
        result = secondaryCellA.localeCompare(secondaryCellB, undefined, { numeric: true, sensitivity: 'base' });
      }
    }

    return sortOrder === "asc" ? result : -result;
  });

  // Remove existing arrow
  const headers = table.querySelectorAll("th");
  headers.forEach(header => {
    header.textContent = header.textContent.replace(/\u2191|\u2193/g, '').trim();
  });

  // Add new arrow 
  const sortOrderArrow = sortOrder === "asc" ? " \u2193" : " \u2191";
  event.target.textContent = event.target.textContent.trim() + sortOrderArrow;

  // Remove and reappend rows in the table
  rows.forEach(row => tbody.removeChild(row));
  rows.forEach(row => tbody.appendChild(row));

  // Apply alternating row colors
  applyAlternatingRowColors(table);
}

// Function to apply alternating row colors
function applyAlternatingRowColors(table) {
  const rows = table.querySelectorAll("tbody tr");

  // Check if the table has the "rowstyle-alternateRow" class, if so, apply alternating colors
  if (table.classList.contains("rowstyle-alternateRow")) {
    // Apply alternating row colors
    rows.forEach((row, index) => {
      if (index % 2 === 0) {
        row.style.backgroundColor = "#F0F0F0";
      } else {
        row.style.backgroundColor = "#FFFFFF";
      }
    });
  }
}

// Find tables with class "sortable-onload-N" and sort by the specified column on load
const sortableTables = document.querySelectorAll("table[class*='sortable-onload-']");

sortableTables.forEach(table => {
  const headers = table.querySelectorAll("th");

  // Isolate the correct class, necessary for tables with multiple classes
  const classPrefix = "sortable-onload";
  const classList = table.className.split(" ");
  const sortableClass = classList.find(className => className.startsWith(classPrefix));

  if (sortableClass) {
    // Get the column index from the class name
    const classIndex = sortableClass.indexOf(classPrefix) + classPrefix.length;
    const column = Math.abs(parseInt(table.className.substring(classIndex), 10)); // Must take absolute value due to preceeding "-" in class name!

    // Add click event listener to each table header
    headers.forEach(header => {
      header.addEventListener("click", sortTable);
      if (header.textContent.trim() !== "") {
        header.style.cursor = "pointer"; 
        header.style.textDecoration = "underline";
        header.style.color = "#006699";
      }
    });
//debugger;
    // Trigger the sorting based on the column index
    const headerToSort = headers[column];
    if (headerToSort) {
      // Set the initial sorting order to "asc" for the header to be sorted on load
      headerToSort.dataset.sortOrder = table.classList.contains("descending") ? "asc" : "desc";
      sortTable({ target: headerToSort }); // Manually trigger the sorting function
    }
  }

  // Apply initial alternating row colors
  applyAlternatingRowColors(table);
});