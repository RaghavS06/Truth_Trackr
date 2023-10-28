var inputValue = "";

// script.js
async function query(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/raghavsharma06/model_v2",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json", // Set content type to JSON
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function storeInput() {
    // Get the input element by its id
    var data = document.getElementById("textInput").value;


    fetch('/process_data', {
        method: 'POST',
        body: JSON.stringify({ data: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerText = data.result;
    });

}


function displayResponse(response) {
    var responseElement = document.getElementById("response");
    // Check the structure of the response from the API
    if (Array.isArray(response) && response.length > 0) {
        var label1 = response[0][1]['score']
        console.log(label1)
        if (label1 >= 0.5) {
            responseElement.innerText = "Classification: TRUE";
        } else {
            responseElement.innerText = "Classification: FALSE";
        }
    } else {
        responseElement.innerText = "Invalid response from the API";
    }
}

function toggleFAQ(faqNumber, clickedElement) {
    const faqContent = document.getElementById(`faq-content-${faqNumber}`);

    if (faqContent.style.display === 'block') {
        // If the content is already visible, hide it
        faqContent.style.display = 'none';
        clickedElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        // Hide all other FAQ contents
        hideAllFAQContents();
        // Show the content of the clicked FAQ
        faqContent.style.display = 'block';
        clickedElement.style.boxShadow = 'none'; // Remove box shadow on click
    }
}

function hideAllFAQContents() {
    const faqContents = document.querySelectorAll('.faq-content');
    faqContents.forEach(content => {
        if (content.style.display === 'block') {
            content.style.display = 'none';
        }
    });
}

function toggleBox(boxId) {
    var box = document.getElementById(boxId);
    var content = box.querySelector('.faq-content');
    if (content.style.display === "block" || content.style.display === "") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

const sidebar = document.getElementById("sidebar");
const openButton = document.getElementById("open-sidebar");

openButton.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-minimized");
    const sidebarState = sidebar.classList.contains("sidebar-minimized") ? "minimized" : "expanded";
    document.body.classList.toggle(`body-${sidebarState}`);
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const container = document.querySelector(".container");

    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
        container.style.marginLeft = "0";
    } else {
        sidebar.style.left = "0px";
        container.style.marginLeft = "250px";
    }
}

function openSidebar() {
    document.getElementById("sidebar").style.left = "0";
    document.getElementById("mainContent").style.marginLeft = "250px";
}

// Add a function to open the sidebar when the cursor moves to the left
document.onmousemove = function (e) {
    if (e.pageX <= 200) {
        openSidebar();
    }
};