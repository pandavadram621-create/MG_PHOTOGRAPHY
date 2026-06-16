/* ==========================================================================
   1. DYNAMIC PRICE CALCULATION MATRIX
   ========================================================================== */
function calculatePrice() {
    const packageSelect = document.getElementById('packageSelect').value;
    const priceDisplay = document.getElementById('priceDisplay');
    let estimatedPrice = 0;

    // Strict Package Pricing Mapping
    if (packageSelect === 'basic') {
        estimatedPrice = 5000;
    } else if (packageSelect === 'standard') {
        estimatedPrice = 15000;
    } else if (packageSelect === 'premium') {
        estimatedPrice = 40000;
    }

    // Smoothly update premium border highlight and text indicator
    priceDisplay.innerText = `ESTIMATED VALUE: ₹${estimatedPrice.toLocaleString('en-IN')}`;
    priceDisplay.style.borderLeftColor = '#059669'; // Changes to emerald green when package is selected
}

/* ==========================================================================
   2. SECURE OTP VERIFICATION INTEGRATION (SIMULATION)
   ========================================================================== */
let isOtpDispatched = false;

function requestOTP() {
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const date = document.getElementById('shootDate').value;
    const location = document.getElementById('shootLocation').value.trim();
    const packageVal = document.getElementById('packageSelect').value;

    // Core validation barrier before verification gate opens
    if (!name || !phone || !email || !date || !location || !packageVal) {
        alert("Operation Aborted! All mandatory cryptographic profile fields must be populated.");
        return;
    }

    const otpSection = document.getElementById('otpSection');
    const actionBtn = document.getElementById('actionBtn');

    if (!isOtpDispatched) {
        // Step 1: Open verification gate UI smoothly
        otpSection.style.display = 'block';
        actionBtn.innerText = "Verify & Authorize Token Payment";
        actionBtn.style.background = '#059669'; // Turns action button to emerald green state
        actionBtn.style.borderColor = '#059669';
        actionBtn.style.color = '#fff';
        
        alert("Security Token Dispatched! Simulated access key '1234' routed to network node.");
        isOtpDispatched = true;
    } else {
        // Step 2: Validate the code entered by client
        const otpInput = document.getElementById('otpInput').value.trim();
        
        if (otpInput === '1234') {
            alert("Identity Authenticated! Access code authorized.");
            triggerDummyPaymentGateway(name, date, location, packageVal);
        } else {
            alert("Verification Failed! Access signature invalid. Use demo credential '1234'.");
        }
    }
}

/* ==========================================================================
   3. RAZORPAY / PAYTM TOKEN PAYMENT GATEWAY SIMULATION
   ========================================================================== */
function triggerDummyPaymentGateway(name, date, location, packageVal) {
    alert("Initializing Security Gateway Integration Hub...\nConnecting via Secure Token API Pipeline...");
    
    // Simulating user choosing to pay token money
    const paymentConfirmed = confirm("--- DUMMY PAYMENT GATEWAY PIPELINE ---\n\nSecure Node Requesting Token Retention Money: ₹1,000\n\nClick [OK] to simulate successful payment transaction via Razorpay API Webhook.");
    
    if (paymentConfirmed) {
        // Generate static unique random tracking index hash
        const generatedBookingId = 'BK-' + Math.floor(Math.random() * 90 + 10);
        
        // Structure the contract ledger configuration object
        const standardOrderData = {
            id: generatedBookingId,
            clientName: name,
            shootDate: date,
            venue: location,
            packageType: packageVal,
            status: 'Pending Approval' // Initial database entry state
        };

        // Cache structured entry schema globally inside browser memory sandbox
        localStorage.setItem('cachedDemoBooking', JSON.stringify(standardOrderData));
        
        alert(`Transaction Success! Token verified.\n\nYour Unique Booking Security ID is: ${generatedBookingId}\n\nRedirecting to Track Ledger Node.`);
        window.location.href = 'track.html';
    } else {
        alert("Transaction Cancelled! Financial retention token denied. Reservation aborted.");
    }
}

/* ==========================================================================
   4. CLIENT ORDER LEDGER SEARCH ENGINE
   ========================================================================== */
function trackOrder() {
    const inputId = document.getElementById('bookingIdInput').value.trim();
    const resultBox = document.getElementById('resultBox');
    
    // Fetch state from mock system database environment
    const rawData = localStorage.getItem('cachedDemoBooking');

    if (!rawData) {
        alert("Audit Error! System ledger database empty. Initiate a booking session first.");
        return;
    }

    const currentBooking = JSON.parse(rawData);

    if (inputId.toUpperCase() === currentBooking.id) {
        // Populate tracking elements smoothly via DOM values
        document.getElementById('resName').innerText = currentBooking.clientName;
        document.getElementById('resDate').innerText = currentBooking.shootDate;
        document.getElementById('resLocation').innerText = currentBooking.venue;
        
        // Capitalize status type mappings
        const currentStatus = currentBooking.status;
        const statusBadge = document.getElementById('resStatus');
        statusBadge.innerText = currentStatus;

        // Apply clean systematic color communication strategies
        statusBadge.className = 'badge'; // Reset classes
        if (currentStatus === 'Pending Approval') {
            statusBadge.classList.add('badge-pending');
        } else if (currentStatus === 'Confirmed') {
            statusBadge.classList.add('badge-confirmed');
        } else {
            statusBadge.classList.add('badge-cancelled');
            document.getElementById('cancelRequestBtn').style.display = 'none'; // Hide cancellation button if already revoked
        }

        // Reveal dashboard item container UI
        resultBox.style.display = 'block';
    } else {
        alert(`Record Not Found! Provide matching transaction index key. (Hint: Try '${currentBooking.id}')`);
    }
}

/* ==========================================================================
   5. CLIENT-SIDE EMERGENCY REVERAL SECURE GATEWAY
   ========================================================================== */
function showCancelOTP() {
    document.getElementById('cancelOtpSection').style.display = 'block';
    alert("Revocation Flag Triggered! Dispatched 4-Digit authorization handshake key '4321'.");
}

function confirmCancellation() {
    const cancelCode = document.getElementById('cancelOtpInput').value.trim();
    
    if (cancelCode === '4321') {
        const rawData = localStorage.getItem('cachedDemoBooking');
        if (rawData) {
            let bookingObj = JSON.parse(rawData);
            bookingObj.status = 'Cancelled by Client'; // Hard mutate state tracking model
            localStorage.setItem('cachedDemoBooking', JSON.stringify(bookingObj));
        }

        alert("System Execution Complete! Reservation revoked. Retention assets flagged for refund cycles.");
        window.location.reload(); // Hard reload viewport state
    } else {
        alert("Operation Refused! Security key verification failed. Target key code is '4321'.");
    }
}


