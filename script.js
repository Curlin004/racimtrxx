document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('responsibility-matrix');
    const addColumnBtn = document.getElementById('add-column');
    const addRowBtn = document.getElementById('add-row');
    const deleteColumnBtn = document.getElementById('delete-column');
    const deleteRowBtn = document.getElementById('delete-row');
    const colorPicker = document.getElementById('color-picker');
    let selectedCell = null;

    // Add new column
    addColumnBtn.addEventListener('click', () => {
        const headerRow = table.querySelector('thead tr');
        const newHeader = document.createElement('th');
        newHeader.contentEditable = "true";
        newHeader.textContent = "New Column";
        headerRow.appendChild(newHeader);

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const newCell = document.createElement('td');
            newCell.contentEditable = "true";
            newCell.textContent = "";
            row.appendChild(newCell);
        });
    });

    // Add new row
    addRowBtn.addEventListener('click', () => {
        const tbody = table.querySelector('tbody');
        const rowCount = tbody.rows[tbody.rows.length - 1].cells.length;
        const newRow = document.createElement('tr');

        for (let i = 0; i < rowCount; i++) {
            const newCell = document.createElement('td');
            newCell.contentEditable = "true";
            if (i === 0) {
                newCell.textContent = "New Task";
            } else {
                newCell.textContent = "";
            }
            newRow.appendChild(newCell);
        }
        tbody.appendChild(newRow);
    });

    // Delete selected column
    deleteColumnBtn.addEventListener('click', () => {
        if (!selectedCell) return;
        const colIndex = selectedCell.cellIndex;

        // Remove header column
        table.querySelectorAll('tr').forEach(row => {
            if (row.cells[colIndex]) row.deleteCell(colIndex);
        });
    });

    // Delete selected row
    deleteRowBtn.addEventListener('click', () => {
        if (!selectedCell) return;
        const row = selectedCell.parentElement;
        row.remove();
    });

    // Highlight selected cell
    table.addEventListener('click', (event) => {
        const cell = event.target;
        if (cell.tagName === 'TD' || cell.tagName === 'TH') {
            selectedCell = cell;
            colorPicker.style.display = "block";
            colorPicker.value = getComputedStyle(cell).backgroundColor;
        }
    });

    // Change cell background color
    colorPicker.addEventListener('input', (event) => {
        if (selectedCell) {
            selectedCell.style.backgroundColor = event.target.value;
        }
    });
});
