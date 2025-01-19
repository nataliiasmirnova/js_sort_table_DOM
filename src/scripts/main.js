'use strict';

// Get the table element from the document
const table = document.querySelector('table');

// Function to sort data in columns in ascending order
function sortTable(columnIndex) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.rows);

  rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[columnIndex].textContent.trim();
    const cellB = rowB.cells[columnIndex].textContent.trim();

    // Special condition for column 3 (Salary) and converting data to numbers
    if (columnIndex === 3) {
      const numA = parseFloat(cellA.replace(/[^0-9.-]+/g, ''));
      const numB = parseFloat(cellB.replace(/[^0-9.-]+/g, ''));

      return numA - numB; // Sort as numbers
    }

    // Condition to compare strings when values are not numbers
    if (!isNaN(cellA) && !isNaN(cellB)) {
      return cellA - cellB;
    } else {
      return cellA.localeCompare(cellB); // Compare strings alphabetically
    }
  });

  // Rebuild the table with sorted rows
  rows.forEach((row) => tbody.appendChild(row));
}

// Function to reset the style of table headers
function resetHeaderColors() {
  const headers = table.querySelectorAll('thead th');

  headers.forEach((header) => {
    header.style.color = ''; // Reset header color
  });
}

// Create an array of headers, including their text content and index
const columnHeaders = [
  { columnName: 'Name', index: 0 },
  { columnName: 'Position', index: 1 },
  { columnName: 'Age', index: 2 },
  { columnName: 'Salary', index: 3 },
];

// Main functionality for click event: ASC sorting and style change
const headerCells = Array.from(table.querySelectorAll('thead th'));

columnHeaders.forEach(({ columnName, index }) => {
  const headerCell = headerCells.find(
    (cell) => cell.textContent.trim() === columnName,
  );

  headerCell.addEventListener('click', () => {
    resetHeaderColors();
    headerCell.style.color = 'orange'; // Change the color of the clicked header
    sortTable(index); // Sort the table by the clicked column
  });
});
