// ... existing code ...
if (dropLine) {
    // ... existing code ...
    dropLine.style.display = 'block';
    dropLine.style.left = (mouseX - (parseInt(dropLine.style.width, 10) / 2)) + 'px'; // Center the div based on its JS-set width
    dropLine.style.top = (fruitY + fruitRadius) + 'px';
    
    // Calculate height to reach the bottom of the bucket
    let lineHeight = BUCKET_HEIGHT - (fruitY + fruitRadius);
    
    // Ensure line height is not negative (e.g., if fruit is somehow below bucket floor)
    lineHeight = Math.max(0, lineHeight);
    
    dropLine.style.height = lineHeight + 'px';
    dropLine.style.width = '20px'; // TEMPORARY: Increased width for testing
}
// ... existing code ...