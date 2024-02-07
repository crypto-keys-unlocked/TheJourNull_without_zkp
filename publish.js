document.addEventListener('DOMContentLoaded', function() {
    const publishForm = document.getElementById('publishForm');
    const paperTitleInput = document.getElementById('paperTitle');
    const paperDomainInput = document.getElementById('paperDomain');
    const fileUploadInput = document.getElementById('fileUpload');
    const reviewersSelect = document.getElementById('reviewers');
    const additionalDaysSelect = document.getElementById('additionalDays');
    const minReviewTimeParagraph = document.getElementById('minReviewTime');
    const uploadStatusDiv = document.getElementById('uploadStatus');
    const resultsBox = document.getElementById('resultsBox');
    const paperDetailsParagraph = document.getElementById('paperDetails');
    const ipfsLinkSpan = document.getElementById('ipfsUrl');
    const copyIpfsLinkButton = document.getElementById('copyIpfsLink');

    populateReviewersAndDaysOptions();
    updateMinReviewTime(); // Call this function initially to set the default minimum review time

    publishForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', fileUploadInput.files[0]);
        uploadStatusDiv.textContent = 'Uploading...';
        uploadStatusDiv.style.color = 'black'; // Reset to default color before uploading

        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${data.cid}`;
            uploadStatusDiv.textContent = 'Upload successful!';
            uploadStatusDiv.style.color = 'green'; // Change color to green upon success
            displayResults(data.cid, calculateCost(reviewersSelect.value, additionalDaysSelect.value));

            copyIpfsLinkButton.onclick = function() {
                navigator.clipboard.writeText(ipfsUrl).then(() => {
                    alert('IPFS link copied to clipboard!');
                }, (err) => {
                    console.error('Could not copy text: ', err);
                });
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            uploadStatusDiv.textContent = 'Upload failed. Please try again.';
            uploadStatusDiv.style.color = 'red'; // Optionally change color to red upon failure
        }
    });

    function populateReviewersAndDaysOptions() {
        for (let i = 1; i <= 10; i++) {
            let option = new Option(i, i);
            reviewersSelect.add(option);
        }

        for (let i = 0; i <= 30; i += 5) {
            let option = new Option(`${i} days`, i);
            additionalDaysSelect.add(option);
        }
    }

    function calculateCost(reviewers, additionalDays) {
        return (reviewers * 100 + 500) - (additionalDays * 10);
    }

    function displayResults(cid, cost) {
        paperDetailsParagraph.innerHTML = `Paper Title: ${paperTitleInput.value}<br>
                                           Domain: ${paperDomainInput.value}<br>
                                           File: ${fileUploadInput.files[0].name}<br>
                                           Reviewers: ${reviewersSelect.value}<br>
                                           Additional Days: ${additionalDaysSelect.value}<br>
                                           Cost: <span class="highlight-cost">${cost} tokens</span>`;
        ipfsLinkSpan.innerHTML = `<a href="https://ipfs.io/ipfs/${cid}" target="_blank">${cid}</a>`;
        resultsBox.style.display = 'block';
    }
    reviewersSelect.addEventListener('change', updateMinReviewTime);
    additionalDaysSelect.addEventListener('change', updateMinReviewTime);

    function updateMinReviewTime() {
        const numberOfReviewers = parseInt(reviewersSelect.value, 10);
        const additionalDays = parseInt(additionalDaysSelect.value, 10);
        const minReviewTime = calculateMinReviewTime(numberOfReviewers, additionalDays);
        minReviewTimeParagraph.textContent = `Minimum Review Time: ${minReviewTime} days.`;
    }

    function calculateMinReviewTime(reviewers, additionalDays) {
        return 14 + reviewers * 2 + additionalDays;
    }
});
