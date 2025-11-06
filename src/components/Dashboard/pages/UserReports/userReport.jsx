
// // import { jsPDF } from 'jspdf';
// // import 'jspdf-autotable';

// // // Helper function to extract array from API response
// // const extractDataArray = (apiResponse) => {
// //   console.log('API Response:', apiResponse); // Debug log
  
// //   // Handle different possible response structures
// //   if (Array.isArray(apiResponse)) {
// //     return apiResponse;
// //   }
  
// //   if (apiResponse?.data && Array.isArray(apiResponse.data)) {
// //     return apiResponse.data;
// //   }
  
// //   if (apiResponse?.result && Array.isArray(apiResponse.result)) {
// //     return apiResponse.result;
// //   }
  
// //   if (apiResponse?.records && Array.isArray(apiResponse.records)) {
// //     return apiResponse.records;
// //   }
  
// //   // If it's an object with array values, try to find the array
// //   if (typeof apiResponse === 'object' && apiResponse !== null) {
// //     const values = Object.values(apiResponse);
// //     const arrayValue = values.find(val => Array.isArray(val));
// //     if (arrayValue) {
// //       return arrayValue;
// //     }
// //   }
  
// //   console.warn('Could not extract array from response:', apiResponse);
// //   return [];
// // };
// // const generateWalletReportPDF = (apiResponse) => {
// //   const data = extractDataArray(apiResponse);
  
// //   const doc = new jsPDF();
  
// //   // Professional color palette
// //   const colors = {
// //     primary: [44, 62, 80],      // Dark blue-gray
// //     secondary: [52, 73, 94],     // Medium blue-gray
// //     accent: [149, 165, 166],     // Light gray
// //     success: [39, 174, 96],      // Professional green
// //     danger: [192, 57, 43],       // Professional red
// //     background: [253, 254, 254], // Off-white
// //     border: [189, 195, 199],     // Light border
// //     text: [44, 62, 80]          // Dark text
// //   };
  
// //   const userName = data[0]?.name || 'Account Holder';
  
// //   // Company header section
// //   doc.setFillColor(255, 255, 255);
// //   doc.rect(0, 0, 210, 297, 'F');
  
// //   // Header border
// //   doc.setDrawColor(...colors.primary);
// //   doc.setLineWidth(3);
// //   doc.line(0, 35, 210, 35);
  
// //   // Company/Report title
// //   doc.setFontSize(20);
// //   doc.setTextColor(...colors.primary);
// //   doc.setFont('helvetica', 'bold');
// //   doc.text('FINANCIAL WALLET REPORT', 20, 25);

  
// //   // Account information section
// //   doc.setDrawColor(...colors.border);
// //   doc.setLineWidth(0.5);
// //   doc.rect(20, 65, 170, 35, 'S');
  
// //   doc.setFontSize(12);
// //   doc.setTextColor(...colors.primary);
// //   doc.setFont('helvetica', 'bold');
// //   doc.text('ACCOUNT INFORMATION', 25, 76);
  
// //   doc.setFontSize(10);
// //   doc.setFont('helvetica', 'normal');
// //   doc.setTextColor(...colors.text);
// //   doc.text(`Account Holder: ${userName}`, 25, 86);
// //   doc.text(`Total Transactions: ${data.length}`, 25, 93);
  
// //   // Calculate financial metrics
// //   const totalCredits = data.reduce((sum, item) => {
// //     if (item.transactionType === 'Credit') {
// //       return sum + (parseFloat(item.transactionAmount) || 0);
// //     }
// //     return sum;
// //   }, 0);
  
// //   const totalDebits = data.reduce((sum, item) => {
// //     if (item.transactionType === 'Debit') {
// //       return sum + (parseFloat(item.transactionAmount) || 0);
// //     }
// //     return sum;
// //   }, 0);
  
// //   const netBalance = totalCredits - totalDebits;
  
// //   // Financial summary section
// //   doc.setFontSize(12);
// //   doc.setTextColor(...colors.primary);
// //   doc.setFont('helvetica', 'bold');
// //   doc.text('FINANCIAL SUMMARY', 25, 115);
  
// //   // Summary table
// //   const summaryY = 125;
// //   const summaryData = [
// //     ['Total Credits', `${totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
// //     ['Net Balance', `${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]
// //   ];
  
// //   summaryData.forEach((row, index) => {
// //     const y = summaryY + (index * 8);
    
// //     doc.setFontSize(10);
// //     doc.setFont('helvetica', 'normal');
// //     doc.setTextColor(...colors.text);
// //     doc.text(row[0], 25, y);
    
// //     // Color code amounts
// //     if (row[0] === 'Total Credits') {
// //       doc.setTextColor(...colors.success);
// //     } else if (row[0] === 'Total Debits') {
// //       doc.setTextColor(...colors.danger);
// //     } else {
// //       doc.setTextColor(netBalance >= 0 ? colors.success[0] : colors.danger[0], 
// //                       netBalance >= 0 ? colors.success[1] : colors.danger[1], 
// //                       netBalance >= 0 ? colors.success[2] : colors.danger[2]);
// //     }
    
// //     doc.setFont('helvetica', 'bold');
// //     doc.text(row[1], 120, y);
// //   });
  
// //   // Transaction details section
// //   doc.setFontSize(12);
// //   doc.setTextColor(...colors.primary);
// //   doc.setFont('helvetica', 'bold');
// //   doc.text('TRANSACTION DETAILS', 20, 165);
  
// //   // Table setup
// //   const tableStartY = 175;
// //   const columnWidths = [30, 50, 25, 35, 40];
// //   const tableHeaders = ['Date', 'Transaction ID', 'Type', 'Amount', 'Payment Method'];
// //   let currentY = tableStartY;
  
// //   // Table header
// //   doc.setFillColor(...colors.primary);
// //   doc.rect(20, currentY, 180, 8, 'F');
  
// //   let currentX = 20;
// //   doc.setFontSize(9);
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFont('helvetica', 'bold');
  
// //   tableHeaders.forEach((header, i) => {
// //     doc.text(header, currentX + 2, currentY + 5.5);
// //     currentX += columnWidths[i];
// //   });
  
// //   currentY += 8;
  
// //   // Table rows
// //   doc.setFont('helvetica', 'normal');
// //   doc.setFontSize(8);
  
// //   data.forEach((item, rowIndex) => {
// //     // Page break logic
// //     if (currentY > 270) {
// //       doc.addPage();
// //       currentY = 30;
      
// //       // Redraw header on new page
// //       doc.setFillColor(...colors.primary);
// //       doc.rect(20, currentY, 180, 8, 'F');
      
// //       currentX = 20;
// //       doc.setFontSize(9);
// //       doc.setTextColor(255, 255, 255);
// //       doc.setFont('helvetica', 'bold');
      
// //       tableHeaders.forEach((header, i) => {
// //         doc.text(header, currentX + 2, currentY + 5.5);
// //         currentX += columnWidths[i];
// //       });
      
// //       currentY += 8;
// //       doc.setFont('helvetica', 'normal');
// //       doc.setFontSize(8);
// //     }
    
// //     // Row background
// //     if (rowIndex % 2 === 0) {
// //       doc.setFillColor(248, 249, 250);
// //     } else {
// //       doc.setFillColor(255, 255, 255);
// //     }
// //     doc.rect(20, currentY, 180, 7, 'F');
    
// //     // Row border
// //     doc.setDrawColor(...colors.border);
// //     doc.setLineWidth(0.1);
// //     doc.rect(20, currentY, 180, 7, 'S');
    
// //     // Format data
// //     const date = item.transactionDate 
// //       ? new Date(item.transactionDate).toLocaleDateString('en-US', { 
// //           month: '2-digit', 
// //           day: '2-digit', 
// //           year: '2-digit' 
// //         })
// //       : 'N/A';
    
// //     const transactionId = item.transactionId 
// //       ? `${item.transactionId}` 
// //       : 'N/A';
    
// //     const transactionType = item.transactionType || 'N/A';
// //     const amount = parseFloat(item.transactionAmount) || 0;
// //     const formattedAmount = `${amount.toLocaleString('en-US', { 
// //       minimumFractionDigits: 2, 
// //       maximumFractionDigits: 2 
// //     })}`;
    
// //     const paymentMode = item.paymentMode || item.payment_mode || item.paymentMethod || 'N/A';
    
// //     const rowData = [date, transactionId, transactionType, formattedAmount, paymentMode];
    
// //     // Draw row data
// //     currentX = 20;
// //     rowData.forEach((cell, cellIndex) => {
// //       // Set text color based on content
// //       if (cellIndex === 2) { // Transaction type
// //         if (transactionType === 'Credit') {
// //           doc.setTextColor(...colors.success);
// //         } else if (transactionType === 'Debit') {
// //           doc.setTextColor(...colors.danger);
// //         } else {
// //           doc.setTextColor(...colors.text);
// //         }
// //       } else if (cellIndex === 3) { // Amount
// //         if (transactionType === 'Credit') {
// //           doc.setTextColor(...colors.success);
// //         } else if (transactionType === 'Debit') {
// //           doc.setTextColor(...colors.danger);
// //         } else {
// //           doc.setTextColor(...colors.text);
// //         }
// //       } else {
// //         doc.setTextColor(...colors.text);
// //       }
      
// //       // Truncate text if too long
// //       let displayText = String(cell);
// //       const maxWidth = columnWidths[cellIndex] - 4;
      
// //       if (doc.getTextWidth(displayText) > maxWidth) {
// //         while (doc.getTextWidth(displayText + '...') > maxWidth && displayText.length > 0) {
// //           displayText = displayText.substring(0, displayText.length - 1);
// //         }
// //         displayText += '...';
// //       }
      
// //       doc.text(displayText, currentX + 2, currentY + 4.5);
// //       currentX += columnWidths[cellIndex];
// //     });
    
// //     currentY += 7;
// //   });
  
// //   // Footer section
// //   const pageCount = doc.internal.getNumberOfPages();
// //   for (let i = 1; i <= pageCount; i++) {
// //     doc.setPage(i);
    
// //     // Footer line
// //     doc.setDrawColor(...colors.border);
// //     doc.setLineWidth(0.5);
// //     doc.line(20, 285, 190, 285);
    

// //   }
  
// //   // Save the PDF
// //   const timestamp = new Date().toISOString().split('T')[0];
// //   doc.save(`wallet-financial-report-${timestamp}.pdf`);
// // };
// // // const generateWalletReportPDF = (apiResponse) => {
// // //   const data = extractDataArray(apiResponse);
  
// // //   const doc = new jsPDF();
  
// // //   // Get user name from first transaction record
// // //   const userName = data[0]?.name || 'N/A';
  
// // //   // Add header
// // //   doc.setFontSize(22);
// // //   doc.setTextColor(40, 40, 40);
// // //   doc.text('Wallet Report', 14, 25);
  
// // //   // Add user name
// // //   doc.setFontSize(14);
// // //   doc.setTextColor(60, 60, 60);
// // //   doc.text(`Name: ${userName}`, 14, 33);
  
// // //   // Add metadata
// // //   doc.setFontSize(12);
// // //   doc.setTextColor(100, 100, 100);
// // //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 41);
// // //   doc.text(`Total Records: ${data.length}`, 14, 48);
  
// // //   // Calculate total credits
// // //   const totalCredits = data.reduce((sum, item) => {
// // //     if (item.transactionType === 'Credit') {
// // //       return sum + (parseFloat(item.transactionAmount) || 0);
// // //     }
// // //     return sum;
// // //   }, 0);
  
// // //   const totalDebits = data.reduce((sum, item) => {
// // //     if (item.transactionType === 'Debit') {
// // //       return sum + (parseFloat(item.transactionAmount) || 0);
// // //     }
// // //     return sum;
// // //   }, 0);
  
// // //   doc.text(`Total Credits: ${totalCredits.toFixed(2)}`, 14, 55);
  
// // //   // Add separator line
// // //   doc.setDrawColor(200, 200, 200);
// // //   doc.line(14, 60, 196, 60);
  
// // //   // Define table structure - removed UTR/Ref column
// // //   const startY = 67;
// // //   const cellPadding = 5;
// // //   const columnWidths = [40, 60, 30, 40, 40]; // Removed last column, increased widths
// // //   let currentY = startY;
  
// // //   // Table headers - removed UTR/Ref
// // //   let currentX = 14;
// // //   const headers = ["Date", "Transaction ID", "Type", "Amount", "Payment Mode"];
  
// // //   // Draw header background
// // //   doc.setFillColor(41, 128, 185); // Blue for wallet
// // //   headers.forEach((header, i) => {
// // //     doc.rect(currentX, currentY, columnWidths[i], 10, 'F');
// // //     currentX += columnWidths[i];
// // //   });
  
// // //   // Draw header text
// // //   currentX = 14;
// // //   doc.setTextColor(255, 255, 255);
// // //   doc.setFontSize(10);
// // //   doc.setFont(undefined, 'bold');
// // //   headers.forEach((header, i) => {
// // //     doc.text(header, currentX + cellPadding, currentY + 7);
// // //     currentX += columnWidths[i];
// // //   });
  
// // //   currentY += 10;
  
// // //   // Table rows
// // //   doc.setFont(undefined, 'normal');
// // //   doc.setFontSize(9);
  
// // //   // Create table rows from data
// // //   data.forEach((item, rowIndex) => {
// // //     if (currentY > 270) { // Add new page if needed
// // //       doc.addPage();
// // //       currentY = 20;
      
// // //       // Redraw headers on new page
// // //       currentX = 14;
// // //       doc.setFillColor(41, 128, 185);
// // //       headers.forEach((header, i) => {
// // //         doc.rect(currentX, currentY, columnWidths[i], 10, 'F');
// // //         currentX += columnWidths[i];
// // //       });
      
// // //       currentX = 14;
// // //       doc.setTextColor(255, 255, 255);
// // //       doc.setFont(undefined, 'bold');
// // //       headers.forEach((header, i) => {
// // //         doc.text(header, currentX + cellPadding, currentY + 7);
// // //         currentX += columnWidths[i];
// // //       });
      
// // //       currentY += 10;
// // //       doc.setFont(undefined, 'normal');
// // //     }
    
// // //     // Draw row background
// // //     currentX = 14;
// // //     if (rowIndex % 2 === 0) {
// // //       doc.setFillColor(245, 245, 245);
// // //     } else {
// // //       doc.setFillColor(255, 255, 255);
// // //     }
    
// // //     // Draw all cell backgrounds
// // //     columnWidths.forEach((width) => {
// // //       doc.rect(currentX, currentY, width, 10, 'F');
// // //       currentX += width;
// // //     });
    
// // //     // Draw borders
// // //     currentX = 14;
// // //     doc.setDrawColor(200, 200, 200);
// // //     columnWidths.forEach((width) => {
// // //       doc.rect(currentX, currentY, width, 10, 'S');
// // //       currentX += width;
// // //     });
    
// // //     // Format data
// // //     const date = item.transactionDate 
// // //       ? new Date(item.transactionDate).toLocaleDateString() 
// // //       : 'N/A';
    
// // //     const transactionId = item.transactionId || 'N/A';
// // //     const transactionType = item.transactionType || 'N/A';
    
// // //     // Simple amount display without formatting
// // //     const amount = item.transactionAmount || '0';
    
// // //     // Get payment mode - check various possible field names
// // //     const paymentMode = item.paymentMode || item.payment_mode || item.paymentMethod || 'N/A';
    
// // //     const cells = [
// // //       date,
// // //       transactionId,
// // //       transactionType,
// // //       amount.toString(),
// // //       paymentMode
// // //     ];
    
// // //     // Draw text
// // //     currentX = 14;
// // //     cells.forEach((cell, i) => {
// // //       // Set color for amount based on transaction type
// // //       if (i === 3) { // Amount column
// // //         if (item.transactionType === 'Credit') {
// // //           doc.setTextColor(46, 204, 113); // Green for credits
// // //         } else if (item.transactionType === 'Debit') {
// // //           doc.setTextColor(231, 76, 60); // Red for debits
// // //         } else {
// // //           doc.setTextColor(50, 50, 50);
// // //         }
// // //       } else {
// // //         doc.setTextColor(50, 50, 50);
// // //       }
      
// // //       let text = String(cell);
      
// // //       // Skip truncation for transaction ID (index 1)
// // //       if (i !== 1) {
// // //         const maxWidth = columnWidths[i] - (cellPadding * 2);
// // //         if (doc.getTextWidth(text) > maxWidth) {
// // //           while (doc.getTextWidth(text + '...') > maxWidth && text.length > 0) {
// // //             text = text.substring(0, text.length - 1);
// // //           }
// // //           text += '...';
// // //         }
// // //       }
      
// // //       doc.text(text, currentX + cellPadding, currentY + 7);
// // //       currentX += columnWidths[i];
// // //     });
    
// // //     currentY += 10;
// // //   });
  
// // //   // Add summary section at the end
// // //   if (currentY + 40 > 270) {
// // //     doc.addPage();
// // //     currentY = 20;
// // //   }
  
// // //   currentY += 15;
// // //   doc.setDrawColor(200, 200, 200);
// // //   doc.line(14, currentY, 196, currentY);
// // //   currentY += 10;
  
// // //   // Summary statistics
// // //   doc.setFontSize(11);
// // //   doc.setFont(undefined, 'bold');
// // //   doc.setTextColor(40, 40, 40);
// // //   doc.text('Summary', 14, currentY);
// // //   currentY += 8;
  
// // //   doc.setFont(undefined, 'normal');
// // //   doc.setFontSize(10);
// // //   doc.setTextColor(50, 50, 50);
  
// // //   doc.text(`Total Transactions: ${data.length}`, 14, currentY);
// // //   currentY += 6;
  
// // //   doc.setTextColor(46, 204, 113); // Green
// // //   doc.text(`Total Credits: ${totalCredits}`, 14, currentY);
// // //   currentY += 6;
  
// // //   doc.setTextColor(41, 128, 185); // Blue
// // //   doc.setFont(undefined, 'bold');
// // //   doc.text(`Net Balance: ${totalCredits - totalDebits}`, 14, currentY);
  
// // //   // Add payment mode breakdown
// // //   const paymentModeCounts = data.reduce((acc, item) => {
// // //     const mode = item.paymentMode || item.payment_mode || item.paymentMethod || 'Unknown';
// // //     acc[mode] = (acc[mode] || 0) + 1;
// // //     return acc;
// // //   }, {});
  
// // //   if (Object.keys(paymentModeCounts).length > 0) {
// // //     currentY -= 18; // Go back up to align with summary
// // //     doc.setFont(undefined, 'normal');
// // //     doc.setTextColor(50, 50, 50);
// // //     doc.text('Payment Methods:', 100, currentY);
// // //     currentY += 6;
    
// // //     Object.entries(paymentModeCounts).forEach(([mode, count]) => {
// // //       doc.text(`${mode}: ${count}`, 100, currentY);
// // //       currentY += 6;
// // //     });
// // //   }
  
// // //   // Add footer with page numbers
// // //   const pageCount = doc.internal.getNumberOfPages();
// // //   for (let i = 1; i <= pageCount; i++) {
// // //     doc.setPage(i);
// // //     doc.setFontSize(10);
// // //     doc.setTextColor(150, 150, 150);
// // //     doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
// // //   }
  
// // //   // Save the PDF
// // //   doc.save(`wallet-report-${new Date().toISOString().split('T')[0]}.pdf`);
// // // };
// // const generateWithdrawalReportPDF = (apiResponse, reportType = 'withdrawal') => {
// //   // Extract data from the API response
// //   const data = apiResponse?.data || [];
  
// //   // Determine report title and headers based on type
// //   const isPurchase = reportType === 'purchase';
// //   const reportTitle = isPurchase ? 'Purchase History Report' : 'Withdrawal History Report';
  
// //   // Create new PDF document
// //   const doc = new jsPDF();
  
// //   // Set up document header
// //   doc.setFontSize(22);
// //   doc.setTextColor(40, 40, 40);
// //   doc.text(reportTitle, 14, 25);
  
// //   // Add metadata
// //   doc.setFontSize(12);
// //   doc.setTextColor(100, 100, 100);
// //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 35);
// //   doc.text(`Total ${isPurchase ? 'Purchases' : 'Withdrawals'}: ${data.length}`, 14, 42);
  
// //   // Calculate total amount - handling MongoDB Decimal128 format
// //   const totalAmount = data.reduce((sum, item) => {
// //     const amount =  item.amount || 0;
// //     return sum + parseFloat(amount);
// //   }, 0);
  
// //   doc.text(`Total Amount: ${totalAmount.toFixed(2)} ${data[0]?.currency || 'INR'}`, 14, 49);
  
// //   // Add separator line
// //   doc.setDrawColor(200, 200, 200);
// //   doc.line(14, 55, 196, 55);
  
// //   // Define table structure
// //   const startY = 62;
// //   const cellPadding = 5;
// //   const columnWidths = isPurchase 
// //     ? [40, 30, 30, 30, 40] 
// //     : [40, 35, 35, 30, 30];
// //   let currentY = startY;
  
// //   // Table headers based on type
// //   let currentX = 14;
// //   const headers = isPurchase 
// //     ? ["Date", "Tokens", "Price (INR)", "Amount (INR)", "Fee (INR)"]
// //     : ["Date", "UTR Number", "Amount", "Fee", "Status"];
  
// //   // Draw header background
// //   doc.setFillColor(isPurchase ? 46 : 231, isPurchase ? 204 : 76, isPurchase ? 113 : 60);
// //   headers.forEach((header, i) => {
// //     doc.rect(currentX, currentY, columnWidths[i], 10, 'F');
// //     currentX += columnWidths[i];
// //   });
  
// //   // Draw header text
// //   currentX = 14;
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(10);
// //   doc.setFont(undefined, 'bold');
// //   headers.forEach((header, i) => {
// //     doc.text(header, currentX + cellPadding, currentY + 7);
// //     currentX += columnWidths[i];
// //   });
  
// //   currentY += 10;
  
// //   // Table rows
// //   doc.setFont(undefined, 'normal');
// //   doc.setFontSize(9);
  
// //   // Create table rows from data
// //   data.forEach((item, rowIndex) => {
// //     if (currentY > 270) { // Add new page if needed
// //       doc.addPage();
// //       currentY = 20;
      
// //       // Redraw headers on new page
// //       currentX = 14;
// //       doc.setFillColor(isPurchase ? 46 : 231, isPurchase ? 204 : 76, isPurchase ? 113 : 60);
// //       headers.forEach((header, i) => {
// //         doc.rect(currentX, currentY, columnWidths[i], 10, 'F');
// //         currentX += columnWidths[i];
// //       });
      
// //       currentX = 14;
// //       doc.setTextColor(255, 255, 255);
// //       doc.setFont(undefined, 'bold');
// //       headers.forEach((header, i) => {
// //         doc.text(header, currentX + cellPadding, currentY + 7);
// //         currentX += columnWidths[i];
// //       });
      
// //       currentY += 10;
// //       doc.setFont(undefined, 'normal');
// //     }
    
// //     // Draw row background
// //     currentX = 14;
// //     if (rowIndex % 2 === 0) {
// //       doc.setFillColor(245, 245, 245);
// //     } else {
// //       doc.setFillColor(255, 255, 255);
// //     }
    
// //     // Draw all cell backgrounds
// //     columnWidths.forEach((width) => {
// //       doc.rect(currentX, currentY, width, 10, 'F');
// //       currentX += width;
// //     });
    
// //     // Draw borders
// //     currentX = 14;
// //     doc.setDrawColor(200, 200, 200);
// //     columnWidths.forEach((width) => {
// //       doc.rect(currentX, currentY, width, 10, 'S');
// //       currentX += width;
// //     });
    
// //     // Format data - Fixed to match actual API response structure
// //     const date = item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A';
    
// //     // Extract values handling MongoDB Decimal128 format
// //     const amount = item.amount?.$numberDecimal || item.amount || '0';
// //     const adminCharges = item.admin_inr_charges?.$numberDecimal || item.admin_inr_charges || '0';
// //     const jaimaxAmount = item.amount_in_jaimax?.$numberDecimal || item.amount_in_jaimax || '0';
// //     const inrPrice = item.inr_price?.$numberDecimal || item.inr_price || '0';
    
// //     // Format status
// //     const statusMap = {
// //       0: 'Pending',
// //       1: 'Approved',
// //       2: 'Rejected',
// //       3: 'Processing'
// //     };
// //     const status = statusMap[item.status] || 'Unknown';
    
// //     // Create cells array based on transaction type
// //     let cells;
// //     if (isPurchase) {
// //       cells = [
// //         date,
// //         parseFloat(jaimaxAmount).toLocaleString(),
// //         parseFloat(inrPrice).toFixed(2),
// //         parseFloat(amount).toFixed(2),
// //         parseFloat(adminCharges).toFixed(2)
// //       ];
// //     } else { // withdrawal
// //       cells = [
// //         date,
// //         item.utr_number || 'N/A',
// //         `${item.currency} ${parseFloat(amount).toFixed(2)}`,
// //         parseFloat(adminCharges).toFixed(2),
// //         status
// //       ];
// //     }
    
// //     // Draw text
// //     currentX = 14;
// //     doc.setTextColor(50, 50, 50);
// //     cells.forEach((cell, i) => {
// //       // Truncate text if too long for cell
// //       const maxWidth = columnWidths[i] - (cellPadding * 2);
// //       let text = String(cell);
// //       if (doc.getTextWidth(text) > maxWidth) {
// //         while (doc.getTextWidth(text + '...') > maxWidth && text.length > 0) {
// //           text = text.substring(0, text.length - 1);
// //         }
// //         text += '...';
// //       }
// //       doc.text(text, currentX + cellPadding, currentY + 7);
// //       currentX += columnWidths[i];
// //     });
    
// //     currentY += 10;
// //   });
  
// //   // Add summary section at the end
// //   if (currentY + 30 > 270) {
// //     doc.addPage();
// //     currentY = 20;
// //   }
  
// //   currentY += 15;
// //   doc.setDrawColor(200, 200, 200);
// //   doc.line(14, currentY, 196, currentY);
// //   currentY += 10;
  
// //   // Summary statistics
// //   doc.setFontSize(11);
// //   doc.setFont(undefined, 'bold');
// //   doc.text('Summary', 14, currentY);
// //   currentY += 8;
  
// //   doc.setFont(undefined, 'normal');
// //   doc.setFontSize(10);
  
// //   const totalFees = data.reduce((sum, item) => {
// //     const fee = item.admin_inr_charges?.$numberDecimal || item.admin_inr_charges || 0;
// //     return sum + parseFloat(fee);
// //   }, 0);
  
// //   doc.text(`Total ${isPurchase ? 'Purchases' : 'Withdrawals'}: ${data.length}`, 14, currentY);
// //   currentY += 6;
// //   doc.text(`Total Amount: ${totalAmount.toFixed(2)} ${data[0]?.currency || 'INR'}`, 14, currentY);
// //   currentY += 6;
// //   doc.text(`Total Fees: ${totalFees.toFixed(2)} INR`, 14, currentY);
  
// //   // Add footer with page numbers
// //   const pageCount = doc.internal.getNumberOfPages();
// //   for (let i = 1; i <= pageCount; i++) {
// //     doc.setPage(i);
// //     doc.setFontSize(10);
// //     doc.setTextColor(150, 150, 150);
// //     doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
// //   }
  
// //   // Save the PDF with appropriate filename
// //   const filename = isPurchase 
// //     ? `purchase-history-${new Date().toISOString().split('T')[0]}.pdf`
// //     : `withdrawal-history-${new Date().toISOString().split('T')[0]}.pdf`;
// //   doc.save(filename);
// // };

// // const generateBuyHistoryReportPDF = (apiResponse) => {
// //   // Extract data from the API response
// //   const data = apiResponse?.data || [];
  
// //   // Create new PDF document
// //   const doc = new jsPDF();
  
// //   // Set up document header
// //   doc.setFontSize(22);
// //   doc.setTextColor(40, 40, 40);
// //   doc.text('Bu History Report', 14, 25);
  
// //   // Add metadata
// //   doc.setFontSize(12);
// //   doc.setTextColor(100, 100, 100);
// //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 35);
// //   doc.text(`Total Purchases: ${data.length}`, 14, 42);
  
// //   // Calculate total amount
// //   const totalAmount = data.reduce((sum, item) => {
// //     return sum + (parseFloat(item.amount) || 0);
// //   }, 0);
  
// //   doc.text(`Total Amount: ${totalAmount.toFixed(2)} INR`, 14, 49);
  
// //   // Add separator line
// //   doc.setDrawColor(200, 200, 200);
// //   doc.line(14, 55, 196, 55);
  
// //   // Define table structure
// //   const startY = 62;
// //   const cellPadding = 5;
// //   const columnWidths = [40, 30, 30, 30, 40];
// //   let currentY = startY;
  
// //   // Table header
// //   let currentX = 14;
// //   const headers = ["Date", "Tokens", "Price (INR)", "Amount (INR)", "Fee (INR)"];
  
// //   // Draw header background FIRST
// //   doc.setFillColor(46, 204, 113);
// //   headers.forEach((header, i) => {
// //     doc.rect(currentX, currentY, columnWidths[i], 10, 'F');
// //     currentX += columnWidths[i];
// //   });
  
// //   // Draw header text AFTER background
// //   currentX = 14;
// //   doc.setTextColor(255, 255, 255);
// //   doc.setFontSize(10);
// //   doc.setFont(undefined, 'bold');
// //   headers.forEach((header, i) => {
// //     doc.text(header, currentX + cellPadding, currentY + 7);
// //     currentX += columnWidths[i];
// //   });
  
// //   currentY += 10;
  
// //   // Table rows
// //   doc.setFont(undefined, 'normal');
// //   doc.setFontSize(9);
  
// //   // Create table rows from data
// //   data.forEach((item, rowIndex) => {
// //     if (currentY > 270) { // Add new page if needed
// //       doc.addPage();
// //       currentY = 20;
      
// //       // Redraw headers on new page
// //       currentX = 14;
      
// //       // Draw header background
// //       doc.setFillColor(46, 204, 113);
// //       headers.forEach((header, i) => {
// //         doc.rect(currentX, currentY, columnWidths[i], 10, 'F');
// //         currentX += columnWidths[i];
// //       });
      
// //       // Draw header text
// //       currentX = 14;
// //       doc.setTextColor(255, 255, 255);
// //       doc.setFont(undefined, 'bold');
// //       headers.forEach((header, i) => {
// //         doc.text(header, currentX + cellPadding, currentY + 7);
// //         currentX += columnWidths[i];
// //       });
      
// //       currentY += 10;
// //       doc.setFont(undefined, 'normal');
// //     }
    
// //     // Draw row background FIRST
// //     currentX = 14;
// //     if (rowIndex % 2 === 0) {
// //       doc.setFillColor(245, 245, 245);
// //     } else {
// //       doc.setFillColor(255, 255, 255);
// //     }
    
// //     // Draw all cell backgrounds
// //     columnWidths.forEach((width) => {
// //       doc.rect(currentX, currentY, width, 10, 'F');
// //       currentX += width;
// //     });
    
// //     // Draw borders
// //     currentX = 14;
// //     doc.setDrawColor(200, 200, 200);
// //     columnWidths.forEach((width) => {
// //       doc.rect(currentX, currentY, width, 10, 'S'); // 'S' for stroke (border only)
// //       currentX += width;
// //     });
    
// //     // Format data
// //     const date = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A';
    
// //     // Format fee - adjust field name based on your API response structure
// //     const fee = item.fee ? parseFloat(item.fee).toFixed(2) : 
// //                 item.charges ? parseFloat(item.charges).toFixed(2) : 
// //                 item.transactionFee ? parseFloat(item.transactionFee).toFixed(2) : '0.00';
    
// //     const cells = [
// //       date,
// //       item.jaimax ? item.jaimax.toLocaleString() : 'N/A',
// //       item.atPriceInr ? parseFloat(item.atPriceInr).toFixed(2) : 'N/A',
// //       item.amount ? parseFloat(item.amount).toFixed(2) : 'N/A',
// //       fee
// //     ];
    
// //     // Draw text AFTER backgrounds
// //     currentX = 14;
// //     doc.setTextColor(50, 50, 50); // Dark gray text
// //     cells.forEach((cell, i) => {
// //       doc.text(String(cell), currentX + cellPadding, currentY + 7);
// //       currentX += columnWidths[i];
// //     });
    
// //     currentY += 10;
// //   });
  
// //   // Add footer with page numbers
// //   const pageCount = doc.internal.getNumberOfPages();
// //   for (let i = 1; i <= pageCount; i++) {
// //     doc.setPage(i);
// //     doc.setFontSize(10);
// //     doc.setTextColor(150, 150, 150);
// //     doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
// //   }
  
// //   // Save the PDF
// //   doc.save(`purchase-history-${new Date().toISOString().split('T')[0]}.pdf`);
// // };
// // import React, { useState } from 'react';
// // import {
// //   useGetWalletReportQuery,
// //   useGetWithdrawalReportQuery,
// //   useGetBuyhistoryReportQuery,
// // } from '../../pages/dashBoard/DashboardApliSlice';


// // const ReportsComponent = () => {
// //   const [isGenerating, setIsGenerating] = useState({
// //     wallet: false,
// //     withdrawal: false,
// //     buyhistory: false,
// //   });

// //   const { data: walletData, isLoading: walletLoading, refetch: walletRefetch } = useGetWalletReportQuery();
// //   const { data: withdrawalData, isLoading: withdrawalLoading, refetch: withdrawalRefetch } = useGetWithdrawalReportQuery();
// //   const { data: buyhistoryData, isLoading: buyhistoryLoading, refetch: buyhistoryRefetch } = useGetBuyhistoryReportQuery();

// //   const handleGenerateWalletPDF = async () => {
// //     setIsGenerating(prev => ({ ...prev, wallet: true }));
// //     try {
// //       const { data: freshWalletData } = await walletRefetch();
// //       const dataToUse = freshWalletData || walletData;
      
// //       console.log('Wallet data for PDF:', dataToUse); // Debug log
      
// //       if (!dataToUse) {
// //         alert('No wallet data available to generate PDF.');
// //         return;
// //       }
      
// //       await new Promise(resolve => setTimeout(resolve, 500)); 
// //       generateWalletReportPDF(dataToUse);
// //     } catch (error) {
// //       console.error('Error generating wallet PDF:', error);
// //       alert('Failed to generate PDF. Please try again.');
// //     } finally {
// //       setIsGenerating(prev => ({ ...prev, wallet: false }));
// //     }
// //   };

// //   const handleGenerateWithdrawalPDF = async () => {
// //     setIsGenerating(prev => ({ ...prev, withdrawal: true }));
// //     try {
// //       const { data: freshWithdrawalData } = await withdrawalRefetch();
// //       const dataToUse = freshWithdrawalData || withdrawalData;
      
// //       console.log('Withdrawal data for PDF:', dataToUse); // Debug log
      
// //       if (!dataToUse) {
// //         alert('No withdrawal data available to generate PDF.');
// //         return;
// //       }
      
// //       await new Promise(resolve => setTimeout(resolve, 500));
// //       generateWithdrawalReportPDF(dataToUse);
// //     } catch (error) {
// //       console.error('Error generating withdrawal PDF:', error);
// //       alert('Failed to generate PDF. Please try again.');
// //     } finally {
// //       setIsGenerating(prev => ({ ...prev, withdrawal: false }));
// //     }
// //   };

// //   const handleGenerateBuyhistoryPDF = async () => {
// //     setIsGenerating(prev => ({ ...prev, buyhistory: true }));
// //     try {
// //       const { data: freshBuyhistoryData } = await buyhistoryRefetch();
// //       const dataToUse = freshBuyhistoryData || buyhistoryData;
      
// //       console.log('Buyhistory data for PDF:', dataToUse); // Debug log
      
// //       if (!dataToUse) {
// //         alert('No purchase history data available to generate PDF.');
// //         return;
// //       }
      
// //       await new Promise(resolve => setTimeout(resolve, 500));
// //       generateBuyHistoryReportPDF(dataToUse);
// //     } catch (error) {
// //       console.error('Error generating buyhistory PDF:', error);
// //       alert('Failed to generate PDF. Please try again.');
// //     } finally {
// //       setIsGenerating(prev => ({ ...prev, buyhistory: false }));
// //     }
// //   };

// //   const handleRefreshData = async () => {
// //     try {
// //       await Promise.all([
// //         walletRefetch(),
// //         withdrawalRefetch(), 
// //         buyhistoryRefetch()
// //       ]);
// //       alert('Data refreshed successfully!');
// //     } catch (error) {
// //       console.error('Error refreshing data:', error);
// //       alert('Failed to refresh data. Please try again.');
// //     }
// //   };

// //   // Helper function to get data length safely
// //   const getDataLength = (data) => {
// //     if (Array.isArray(data)) return data.length;
// //     if (data?.data && Array.isArray(data.data)) return data.data.length;
// //     if (data?.result && Array.isArray(data.result)) return data.result.length;
// //     return 0;
// //   };

// //   return (
// //     <div className="reports-container" style={{ padding: '20px' }}>
// //       <h2>Generate Reports</h2>
      
// //       <div style={{ marginBottom: '15px' }}>
// //         <button
// //           onClick={handleRefreshData}
// //           style={{
// //             padding: '8px 16px',
// //             backgroundColor: '#9b59b6',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '4px',
// //             cursor: 'pointer',
// //             fontSize: '12px',
// //             fontWeight: '500'
// //           }}
// //         >
// //           🔄 Refresh All Data
// //         </button>
// //       </div>
      
// //       <div className="report-buttons" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
// //         <button
// //           onClick={handleGenerateWalletPDF}
// //           disabled={walletLoading || isGenerating.wallet}
// //           style={{
// //             padding: '12px 24px',
// //             backgroundColor: walletLoading || isGenerating.wallet ? '#ccc' : '#3498db',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '6px',
// //             cursor: walletLoading || isGenerating.wallet ? 'not-allowed' : 'pointer',
// //             fontSize: '14px',
// //             fontWeight: '500'
// //           }}
// //         >
// //           {walletLoading ? 'Loading...' : 
// //            isGenerating.wallet ? 'Generating PDF...' : 
// //            '📄 Download Wallet Report PDF'}
// //         </button>

// //         <button
// //           onClick={handleGenerateWithdrawalPDF}
// //           disabled={withdrawalLoading || isGenerating.withdrawal}
// //           style={{
// //             padding: '12px 24px',
// //             backgroundColor: withdrawalLoading || isGenerating.withdrawal ? '#ccc' : '#e74c3c',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '6px',
// //             cursor: withdrawalLoading || isGenerating.withdrawal ? 'not-allowed' : 'pointer',
// //             fontSize: '14px',
// //             fontWeight: '500'
// //           }}
// //         >
// //           {withdrawalLoading ? 'Loading...' : 
// //            isGenerating.withdrawal ? 'Generating PDF...' : 
// //            '📄 Download Withdrawal Report PDF'}
// //         </button>

// //         <button
// //           onClick={handleGenerateBuyhistoryPDF}
// //           disabled={buyhistoryLoading || isGenerating.buyhistory}
// //           style={{
// //             padding: '12px 24px',
// //             backgroundColor: buyhistoryLoading || isGenerating.buyhistory ? '#ccc' : '#2ecc71',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '6px',
// //             cursor: buyhistoryLoading || isGenerating.buyhistory ? 'not-allowed' : 'pointer',
// //             fontSize: '14px',
// //             fontWeight: '500'
// //           }}
// //         >
// //           {buyhistoryLoading ? 'Loading...' : 
// //            isGenerating.buyhistory ? 'Generating PDF...' : 
// //            '📄 Download Purchase History PDF'}
// //         </button>
// //       </div>

// //       <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
// //         <p>Wallet Data: {walletData ? `${getDataLength(walletData)} records` : 'No data available'}</p>
// //         <p>Withdrawal Data: {withdrawalData ? `${getDataLength(withdrawalData)} records` : 'No data available'}</p>
// //         <p>Purchase History: {buyhistoryData ? `${getDataLength(buyhistoryData)} records` : 'No data available'}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReportsComponent;



// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// // Unified data extraction function
// const extractDataArray = (apiResponse) => {
//   console.log('API Response:', apiResponse);
  
//   if (Array.isArray(apiResponse)) return apiResponse;
//   if (apiResponse?.data && Array.isArray(apiResponse.data)) return apiResponse.data;
//   if (apiResponse?.result && Array.isArray(apiResponse.result)) return apiResponse.result;
//   if (apiResponse?.records && Array.isArray(apiResponse.records)) return apiResponse.records;
  
//   if (typeof apiResponse === 'object' && apiResponse !== null) {
//     const arrayValue = Object.values(apiResponse).find(val => Array.isArray(val));
//     if (arrayValue) return arrayValue;
//   }
  
//   console.warn('Could not extract array from response:', apiResponse);
//   return [];
// };

// // Universal PDF generation function
// const generateFinancialReportPDF = (apiResponse, reportType = 'wallet') => {
//   try {
//     const data = extractDataArray(apiResponse);
    
//     // Create new PDF document
//     const doc = new jsPDF();
    
//     // Professional color palette
//     const colors = {
//       wallet: {
//         primary: [44, 62, 80],    // Dark blue-gray
//         secondary: [39, 174, 96],  // Green
//         accent: [41, 128, 185]     // Blue
//       },
//       withdrawal: {
//         primary: [44, 62, 80],    // Dark blue-gray
//         secondary: [192, 57, 43],  // Red
//         accent: [41, 128, 185]     // Blue
//       },
//       purchase: {
//         primary: [44, 62, 80],    // Dark blue-gray
//         secondary: [39, 174, 96],  // Green
//         accent: [243, 156, 18]     // Orange
//       },
//       text: [44, 62, 80],         // Dark text
//       success: [39, 174, 96],     // Green
//       danger: [192, 57, 43],      // Red
//       border: [189, 195, 199]     // Light border
//     };
    
//     // Set report title and color theme based on type
//     const reportInfo = {
//       wallet: {
//         title: 'FINANCIAL WALLET REPORT',
//         colors: colors.wallet
//       },
//       withdrawal: {
//         title: 'WITHDRAWAL HISTORY REPORT',
//         colors: colors.withdrawal
//       },
//       purchase: {
//         title: 'PURCHASE HISTORY REPORT',
//         colors: colors.purchase
//       }
//     };
    
//     const { title, colors: themeColors } = reportInfo[reportType];
    
//     // Get user name if available
//     const userName = data[0]?.name || 'Account Holder';
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric', month: 'long', day: 'numeric'
//     });
    
//     // Calculate financial metrics based on report type
//     let totalAmount = 0;
//     let totalCredits = 0;
//     let totalDebits = 0;
//     let netBalance = 0;
//     let totalFees = 0;
    
//     if (reportType === 'wallet') {
//       totalCredits = data.reduce((sum, item) => {
//         if (item.transactionType === 'Credit') {
//           return sum + (parseFloat(item.transactionAmount) || 0);
//         }
//         return sum;
//       }, 0);
      
//       totalDebits = data.reduce((sum, item) => {
//         if (item.transactionType === 'Debit') {
//           return sum + (parseFloat(item.transactionAmount) || 0);
//         }
//         return sum;
//       }, 0);
      
//       netBalance = totalCredits - totalDebits;
//       totalAmount = totalCredits;
//     } else {
//       // For withdrawal and purchase
//       totalAmount = data.reduce((sum, item) => {
//         const amount = item.amount?.$numberDecimal || item.amount || 0;
//         return sum + parseFloat(amount);
//       }, 0);
      
//       totalFees = data.reduce((sum, item) => {
//         const fee = item.admin_inr_charges?.$numberDecimal || 
//                    item.admin_inr_charges || 
//                    item.fee || 
//                    item.charges || 
//                    item.transactionFee || 0;
//         return sum + parseFloat(fee);
//       }, 0);
//     }
    
//     // Clear background
//     doc.setFillColor(255, 255, 255);
//     doc.rect(0, 0, 210, 297, 'F');
    
//     // Header section with gradient
//     doc.setFillColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//     doc.rect(0, 0, 210, 40, 'F');
    
//     // Report title
//     doc.setFontSize(22);
//     doc.setTextColor(255, 255, 255);
//     doc.setFont('helvetica', 'bold');
//     doc.text(title, 105, 20, null, null, 'center');
    
//     // Report date
//     doc.setFontSize(11);
//     doc.setFont('helvetica', 'normal');
//     doc.text(`Generated on: ${currentDate}`, 105, 30, null, null, 'center');
    
//     // Decorative line
//     doc.setDrawColor(255, 255, 255);
//     doc.setLineWidth(0.5);
//     doc.line(35, 35, 175, 35);
    
//     // Account/Summary information section
//     doc.setFillColor(248, 249, 250);
//     doc.rect(20, 50, 170, 40, 'F');
//     doc.setDrawColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//     doc.setLineWidth(0.5);
//     doc.rect(20, 50, 170, 40, 'S');
    
//     // Left-side colored bar
//     doc.setFillColor(themeColors.secondary[0], themeColors.secondary[1], themeColors.secondary[2]);
//     doc.rect(20, 50, 5, 40, 'F');
    
//     // Section title
//     doc.setFontSize(14);
//     doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//     doc.setFont('helvetica', 'bold');
    
//     if (reportType === 'wallet') {
//       doc.text('ACCOUNT INFORMATION', 30, 62);
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//       doc.text(`Account Holder: ${userName}`, 30, 72);
//       doc.text(`Total Transactions: ${data.length}`, 30, 82);
//     } else {
//       doc.text('SUMMARY INFORMATION', 30, 62);
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//       doc.text(`Total ${reportType === 'purchase' ? 'Purchases' : 'Withdrawals'}: ${data.length}`, 30, 72);
//       doc.text(`Total Amount: ${totalAmount.toFixed(2)} ${data[0]?.currency || 'INR'}`, 30, 82);
//     }
    
//     // Financial summary section - for wallet type only
//     if (reportType === 'wallet') {
//       doc.setFillColor(248, 249, 250);
//       doc.rect(20, 100, 170, 60, 'F');
//       doc.setDrawColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//       doc.setLineWidth(0.5);
//       doc.rect(20, 100, 170, 60, 'S');
      
//       // Left-side colored bar
//       doc.setFillColor(themeColors.secondary[0], themeColors.secondary[1], themeColors.secondary[2]);
//       doc.rect(20, 100, 5, 60, 'F');
      
//       doc.setFontSize(14);
//       doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//       doc.setFont('helvetica', 'bold');
//       doc.text('FINANCIAL SUMMARY', 30, 112);
      
//       // Credits indicator
//       doc.setFillColor(colors.success[0], colors.success[1], colors.success[2]);
//       doc.rect(33, 122, 6, 6, 'F');
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//       doc.text('Total Credits', 45, 127);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
//       doc.text(`$${totalCredits.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       })}`, 45, 137);
      
//       // Debits indicator
//       doc.setFillColor(colors.danger[0], colors.danger[1], colors.danger[2]);
//       doc.rect(113, 122, 6, 6, 'F');
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//       doc.text('Total Debits', 125, 127);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(colors.danger[0], colors.danger[1], colors.danger[2]);
//       doc.text(`$${totalDebits.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       })}`, 125, 137);
      
//       // Separator line
//       doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
//       doc.setLineWidth(0.5);
//       doc.line(30, 145, 180, 145);
      
//       // Net balance
//       const balanceColor = netBalance >= 0 ? colors.success : colors.danger;
//       doc.setFillColor(balanceColor[0], balanceColor[1], balanceColor[2]);
//       doc.rect(33, 152, 6, 6, 'F');
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//       doc.text('NET BALANCE', 45, 157);
//       doc.setFontSize(14);
//       doc.setTextColor(balanceColor[0], balanceColor[1], balanceColor[2]);
//       doc.text(`$${netBalance.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       })}`, 120, 157);
//     }
    
//     // Table headers and columns based on report type
//     let headers, startY;
    
//     if (reportType === 'wallet') {
//       headers = ['Date', 'Transaction ID', 'Type', 'Amount', 'Payment Method'];
//       startY = 170;
//     } else if (reportType === 'withdrawal') {
//       headers = ['Date', 'UTR Number', 'Amount', 'Fee', 'Status'];
//       startY = 100;
//     } else { // purchase
//       headers = ['Date', 'Tokens', 'Price (INR)', 'Amount (INR)', 'Fee (INR)'];
//       startY = 100;
//     }
    
//     // Transaction details section
//     doc.setFontSize(14);
//     doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//     doc.setFont('helvetica', 'bold');
//     doc.text('TRANSACTION DETAILS', 20, startY);
    
//     // Table setup
//     const tableStartY = startY + 10;
//     const columnWidths = Array(headers.length).fill(180 / headers.length);
//     let currentY = tableStartY;
    
//     // Table header
//     doc.setFillColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//     doc.rect(20, currentY, 180, 8, 'F');
    
//     let currentX = 20;
//     doc.setFontSize(9);
//     doc.setTextColor(255, 255, 255);
//     doc.setFont('helvetica', 'bold');
    
//     headers.forEach((header, i) => {
//       doc.text(header, currentX + 2, currentY + 5.5);
//       currentX += columnWidths[i];
//     });
    
//     currentY += 8;
    
//     // Table rows
//     doc.setFont('helvetica', 'normal');
//     doc.setFontSize(8);
    
//     data.forEach((item, rowIndex) => {
//       // Page break logic
//       if (currentY > 270) {
//         doc.addPage();
//         currentY = 20;
        
//         // Redraw header on new page
//         doc.setFillColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//         doc.rect(20, currentY, 180, 8, 'F');
        
//         currentX = 20;
//         doc.setFontSize(9);
//         doc.setTextColor(255, 255, 255);
//         doc.setFont('helvetica', 'bold');
        
//         headers.forEach((header, i) => {
//           doc.text(header, currentX + 2, currentY + 5.5);
//           currentX += columnWidths[i];
//         });
        
//         currentY += 8;
//         doc.setFont('helvetica', 'normal');
//         doc.setFontSize(8);
//       }
      
//       // Row background
//       if (rowIndex % 2 === 0) {
//         doc.setFillColor(248, 249, 250);
//       } else {
//         doc.setFillColor(255, 255, 255);
//       }
//       doc.rect(20, currentY, 180, 7, 'F');
      
//       // Row border
//       doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
//       doc.setLineWidth(0.1);
//       doc.rect(20, currentY, 180, 7, 'S');
      
//       // Format data based on report type
//       let rowData = [];
      
//       if (reportType === 'wallet') {
//         const date = item.transactionDate 
//           ? new Date(item.transactionDate).toLocaleDateString('en-US', { 
//               month: '2-digit', day: '2-digit', year: '2-digit' 
//             })
//           : 'N/A';
        
//         const transactionId = item.transactionId ? `${item.transactionId}` : 'N/A';
//         const transactionType = item.transactionType || 'N/A';
//         const amount = parseFloat(item.transactionAmount) || 0;
//         const formattedAmount = `${amount.toLocaleString('en-US', { 
//           minimumFractionDigits: 2, maximumFractionDigits: 2 
//         })}`;
        
//         const paymentMode = item.paymentMode || item.payment_mode || item.paymentMethod || 'N/A';
        
//         rowData = [date, transactionId, transactionType, formattedAmount, paymentMode];
//       } else if (reportType === 'withdrawal') {
//         const date = item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A';
//         const amount = item.amount?.$numberDecimal || item.amount || '0';
//         const adminCharges = item.admin_inr_charges?.$numberDecimal || item.admin_inr_charges || '0';
        
//         const statusMap = { 0: 'Pending', 1: 'Approved', 2: 'Rejected', 3: 'Processing' };
//         const status = statusMap[item.status] || 'Unknown';
        
//         rowData = [
//           date,
//           item.utr_number || 'N/A',
//           `${item.currency || 'INR'} ${parseFloat(amount).toFixed(2)}`,
//           parseFloat(adminCharges).toFixed(2),
//           status
//         ];
//       } else { // purchase
//         const date = item.created_at || item.createdAt ? 
//           new Date(item.created_at || item.createdAt).toLocaleDateString() : 'N/A';
        
//         const amount = item.amount?.$numberDecimal || item.amount || '0';
//         const jaimaxAmount = item.amount_in_jaimax?.$numberDecimal || 
//                             item.amount_in_jaimax || 
//                             item.jaimax || '0';
//         const inrPrice = item.inr_price?.$numberDecimal || 
//                         item.inr_price || 
//                         item.atPriceInr || '0';
//         const adminCharges = item.admin_inr_charges?.$numberDecimal || 
//                             item.admin_inr_charges || 
//                             item.fee ||
//                             item.charges || 
//                             item.transactionFee || '0';
        
//         rowData = [
//           date,
//           parseFloat(jaimaxAmount).toLocaleString(),
//           parseFloat(inrPrice).toFixed(2),
//           parseFloat(amount).toFixed(2),
//           parseFloat(adminCharges).toFixed(2)
//         ];
//       }
      
//       // Draw row data
//       currentX = 20;
//       rowData.forEach((cell, cellIndex) => {
//         // Set text color based on content and report type
//         if (reportType === 'wallet') {
//           const transactionType = item.transactionType || '';
          
//           if (cellIndex === 2) { // Type column
//             if (transactionType === 'Credit') {
//               doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
//             } else if (transactionType === 'Debit') {
//               doc.setTextColor(colors.danger[0], colors.danger[1], colors.danger[2]);
//             } else {
//               doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//             }
//           } else if (cellIndex === 3) { // Amount column
//             if (transactionType === 'Credit') {
//               doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
//             } else if (transactionType === 'Debit') {
//               doc.setTextColor(colors.danger[0], colors.danger[1], colors.danger[2]);
//             } else {
//               doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//             }
//           } else {
//             doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//           }
//         } else {
//           // For other report types, just use standard text color
//           doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
//         }
        
//         // Truncate text if too long
//         let displayText = String(cell);
//         const maxWidth = columnWidths[cellIndex] - 4;
        
//         if (doc.getTextWidth(displayText) > maxWidth) {
//           while (doc.getTextWidth(displayText + '...') > maxWidth && displayText.length > 0) {
//             displayText = displayText.substring(0, displayText.length - 1);
//           }
//           displayText += '...';
//         }
        
//         doc.text(displayText, currentX + 2, currentY + 4.5);
//         currentX += columnWidths[cellIndex];
//       });
      
//       currentY += 7;
//     });
    
//     // Footer
//     const pageCount = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pageCount; i++) {
//       doc.setPage(i);
      
//       // Footer with gradient
//       doc.setFillColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
//       doc.rect(0, 280, 210, 17, 'F');
      
//       doc.setFontSize(9);
//       doc.setTextColor(255, 255, 255);
//       doc.text(`${title} | Page ${i} of ${pageCount}`, 105, 290, null, null, 'center');
//     }
    
//     // Save the PDF
//     const timestamp = new Date().toISOString().split('T')[0];
//     const filename = `${reportType}-report-${timestamp}.pdf`;
//     doc.save(filename);
    
//     return true;
//   } catch (error) {
//     console.error(`Error generating ${reportType} report:`, error);
//     return false;
//   }
// };

// // React component for generating reports
// import React, { useState } from 'react';  
// import {
//   useGetWalletReportQuery,
//   useGetWithdrawalReportQuery,
//   useGetBuyhistoryReportQuery,
// } from '../../pages/dashBoard/DashboardApliSlice';

// const ReportsComponent = () => {
//   const [isGenerating, setIsGenerating] = useState({
//     wallet: false,
//     withdrawal: false,
//     purchase: false,
//   });

//   const { data: walletData, isLoading: walletLoading, refetch: walletRefetch } = useGetWalletReportQuery();
//   const { data: withdrawalData, isLoading: withdrawalLoading, refetch: withdrawalRefetch } = useGetWithdrawalReportQuery();
//   const { data: buyhistoryData, isLoading: buyhistoryLoading, refetch: buyhistoryRefetch } = useGetBuyhistoryReportQuery();

//   const handleGenerateReport = async (type) => {
//     setIsGenerating(prev => ({ ...prev, [type]: true }));
    
//     try {
//       let dataToUse, refetchFunction;
      
//       switch (type) {
//         case 'wallet':
//           refetchFunction = walletRefetch;
//           dataToUse = walletData;
//           break;
//         case 'withdrawal':
//           refetchFunction = withdrawalRefetch;
//           dataToUse = withdrawalData;
//           break;
//         case 'purchase':
//           refetchFunction = buyhistoryRefetch;
//           dataToUse = buyhistoryData;
//           break;
//         default:
//           throw new Error('Invalid report type');
//       }
      
//       // Try to get fresh data
//       const { data: freshData } = await refetchFunction();
//       dataToUse = freshData || dataToUse;
      
//       console.log(`${type} data for PDF:`, dataToUse);
      
//       if (!dataToUse) {
//         alert(`No ${type} data available to generate PDF.`);
//         return;
//       }
      
//       // Brief delay for UI responsiveness
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       // Generate the PDF using our unified function
//       const success = generateFinancialReportPDF(dataToUse, type);
      
//       if (!success) {
//         alert(`Failed to generate ${type} report. Please try again.`);
//       }
//     } catch (error) {
//       console.error(`Error generating ${type} PDF:`, error);
//       alert('Failed to generate PDF. Please try again.');
//     } finally {
//       setIsGenerating(prev => ({ ...prev, [type]: false }));
//     }
//   };

//   const handleRefreshData = async () => {
//     try {
//       await Promise.all([
//         walletRefetch(),
//         withdrawalRefetch(), 
//         buyhistoryRefetch()
//       ]);
//       alert('Data refreshed successfully!');
//     } catch (error) {
//       console.error('Error refreshing data:', error);
//       alert('Failed to refresh data. Please try again.');
//     }
//   };

//   // Helper function to get data length safely
//   const getDataLength = (data) => {
//     if (Array.isArray(data)) return data.length;
//     if (data?.data && Array.isArray(data.data)) return data.data.length;
//     if (data?.result && Array.isArray(data.result)) return data.result.length;
//     return 0;
//   };

//   return (
//     <div className="reports-container" style={{ padding: '20px' }}>
//       <h2>Generate Reports</h2>
      
//       <div style={{ marginBottom: '15px' }}>
//         <button
//           onClick={handleRefreshData}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#9b59b6',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontSize: '12px',
//             fontWeight: '500'
//           }}
//         >
//           🔄 Refresh All Data
//         </button>
//       </div>
      
//       <div className="report-buttons" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//         <button
//           onClick={() => handleGenerateReport('wallet')}
//           disabled={walletLoading || isGenerating.wallet}
//           style={{
//             padding: '12px 24px',
//             backgroundColor: walletLoading || isGenerating.wallet ? '#ccc' : '#3498db',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: walletLoading || isGenerating.wallet ? 'not-allowed' : 'pointer',
//             fontSize: '14px',
//             fontWeight: '500'
//           }}
//         >
//           {walletLoading ? 'Loading...' : 
//            isGenerating.wallet ? 'Generating PDF...' : 
//            '📄 Download Wallet Report PDF'}
//         </button>

//         <button
//           onClick={() => handleGenerateReport('withdrawal')}
//           disabled={withdrawalLoading || isGenerating.withdrawal}
//           style={{
//             padding: '12px 24px',
//             backgroundColor: withdrawalLoading || isGenerating.withdrawal ? '#ccc' : '#e74c3c',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: withdrawalLoading || isGenerating.withdrawal ? 'not-allowed' : 'pointer',
//             fontSize: '14px',
//             fontWeight: '500'
//           }}
//         >
//           {withdrawalLoading ? 'Loading...' : 
//            isGenerating.withdrawal ? 'Generating PDF...' : 
//            '📄 Download Withdrawal Report PDF'}
//         </button>

//         <button
//           onClick={() => handleGenerateReport('purchase')}
//           disabled={buyhistoryLoading || isGenerating.purchase}
//           style={{
//             padding: '12px 24px',
//             backgroundColor: buyhistoryLoading || isGenerating.purchase ? '#ccc' : '#2ecc71',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: buyhistoryLoading || isGenerating.purchase ? 'not-allowed' : 'pointer',
//             fontSize: '14px',
//             fontWeight: '500'
//           }}
//         >
//           {buyhistoryLoading ? 'Loading...' : 
//            isGenerating.purchase ? 'Generating PDF...' : 
//            '📄 Download Purchase History PDF'}
//         </button>
//       </div>

//       <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
//         <p>Wallet Data: {walletData ? `${getDataLength(walletData)} records` : 'No data available'}</p>
//         <p>Withdrawal Data: {withdrawalData ? `${getDataLength(withdrawalData)} records` : 'No data available'}</p>
//         <p>Purchase History: {buyhistoryData ? `${getDataLength(buyhistoryData)} records` : 'No data available'}</p>
//       </div>
//     </div>
//   );
// };

// export default ReportsComponent;