document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('month');
    const searchBox = document.getElementById('search');
    const transactionsTable = document.querySelector('#transactions-table tbody');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const totalSalesElement = document.getElementById('total-sales');
    const soldItemsElement = document.getElementById('sold-items');
    const notSoldItemsElement = document.getElementById('not-sold-items');
    const chartCanvas = document.getElementById('transactions-bar-chart');
  
    let currentPage = 1;
    let selectedMonth = '03';
  
    // Function to fetch data for the table and statistics
    const fetchData = async () => {
      const transactionsResponse = await fetch(`/api/transactions?month=${selectedMonth}&page=${currentPage}`);
      const statsResponse = await fetch(`/api/transactions/stats?month=${selectedMonth}`);
      
      const transactions = await transactionsResponse.json();
      const stats = await statsResponse.json();
  
      // Update transactions table
      transactionsTable.innerHTML = transactions.map(transaction => `
        <tr>
          <td>${transaction.title}</td>
          <td>${transaction.description}</td>
          <td>${transaction.price}</td>
          <td>${transaction.date}</td>
        </tr>
      `).join('');
  
      // Update statistics
      totalSalesElement.textContent = stats.totalSales;
      soldItemsElement.textContent = stats.soldItems;
      notSoldItemsElement.textContent = stats.notSoldItems;
  
      // Update bar chart
      const chartData = {
        labels: stats.priceRanges.map(range => `${range.minPrice} - ${range.maxPrice}`),
        datasets: [{
          label: 'Number of Items Sold',
          data: stats.priceRanges.map(range => range.itemCount),
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      };
  
      new Chart(chartCanvas, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };
  
    // Event listener for month selection change
    monthSelect.addEventListener('change', (e) => {
      selectedMonth = e.target.value;
      fetchData();
    });
  
    // Event listener for search input
    searchBox.addEventListener('input', (e) => {
      const searchText = e.target.value.toLowerCase();
      if (searchText) {
        // Filter data based on the search text (assuming API supports it)
        fetch(`/api/transactions/search?month=${selectedMonth}&query=${searchText}`)
          .then(response => response.json())
          .then(data => {
            transactionsTable.innerHTML = data.map(transaction => `
              <tr>
                <td>${transaction.title}</td>
                <td>${transaction.description}</td>
                <td>${transaction.price}</td>
                <td>${transaction.date}</td>
              </tr>
            `).join('');
          });
      } else {
        fetchData(); // Reset to default transactions
      }
    });
  
    // Pagination controls
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchData();
      }
    });
  
    nextBtn.addEventListener('click', () => {
      currentPage++;
      fetchData();
    });
  
    // Initial data fetch
    fetchData();
  });
  