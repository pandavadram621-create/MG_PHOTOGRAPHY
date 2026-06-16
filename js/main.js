// Premium Custom Toast UI Engine
function showToast(title, message, type = 'info') {
    if (typeof iziToast !== 'undefined') {
        iziToast.show({
            title: title,
            message: message,
            position: 'topRight',
            theme: 'dark',
            progressBarColor: type === 'success' ? '#059669' : (type === 'error' ? '#dc2626' : '#818cf8'),
            timeout: 4000
        });
    } else {
        alert(`${title}: ${message}`);
    }
}

/* ==========================================================================
   1. DYNAMIC PRICE CALCULATION MATRIX
   ========================================================================== */
window.calculatePrice = function() {
    const packageSelect = document.getElementById('packageSelect').value;
    const priceDisplay = document.getElementById('priceDisplay');
    let estimatedPrice = 0;

    if (packageSelect === 'basic') estimatedPrice = 5000;
    else if (packageSelect === 'standard') estimatedPrice = 15000;
    else if (packageSelect === 'premium') estimatedPrice = 40000;

    priceDisplay.innerText = `ESTIMATED VALUE: ₹${estimatedPrice.toLocaleString('en-IN')}`;
    priceDisplay.style.borderLeftColor = '#059669'; 
}

/* ==========================================================================
   2. SECURE OTP VERIFICATION INTEGRATION (SIMULATION)
   ========================================================================== */
let isOtpDispatched = false;

window.requestOTP = function() {
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const date = document.getElementById('shootDate').value;
    const location = document.getElementById('shootLocation').value.trim();
    const packageVal = document.getElementById('packageSelect').value;

    if (!name || !phone || !email || !date || !location || !packageVal) {
        showToast('System Error', 'All mandatory fields must be populated.', 'error');
        return;
    }

    const otpSection = document.getElementById('otpSection');
    const actionBtn = document.getElementById('actionBtn');

    if (!isOtpDispatched) {
        otpSection.style.display = 'block';
        actionBtn.innerText = "Verify & Authorize Token Payment";
        actionBtn.style.background = '#059669'; 
        actionBtn.style.borderColor = '#059669';
        actionBtn.style.color = '#fff';
        
        showToast('Security Node', "Handshake access key '1234' routed to network node.", 'info');
        isOtpDispatched = true;
    } else {
        const otpInput = document.getElementById('otpInput').value.trim();
        
        if (otpInput === '1234') {
            showToast('Identity Verified', 'Access signature authorized.', 'success');
            triggerDummyPaymentGateway(name, date, location, packageVal);
        } else {
            showToast('Security Alert', "Verification failed. Use code '1234'.", 'error');
        }
    }
}

/* ==========================================================================
   3. PAYMENT GATEWAY RETENTION SIMULATION
   ========================================================================== */
function triggerDummyPaymentGateway(name, date, location, packageVal) {
    const paymentConfirmed = confirm("--- DUMMY PAYMENT GATEWAY PIPELINE ---\n\nSecure Node Requesting Token Retention Money: ₹1,000\n\nClick [OK] to simulate successful payment transaction via Razorpay API Webhook.");
    
    if (paymentConfirmed) {
        const generatedBookingId = 'BK-' + Math.floor(Math.random() * 90 + 10);
        
        const standardOrderData = {
            id: generatedBookingId,
            clientName: name,
            shootDate: date,
            venue: location,
            packageType: packageVal,
            status: 'Pending Approval' 
        };

        localStorage.setItem('cachedDemoBooking', JSON.stringify(standardOrderData));
        
        showToast('Transaction Success', `Booking created. Reference ID: ${generatedBookingId}`, 'success');
        setTimeout(() => { window.location.href = 'track.html'; }, 2000);
    } else {
        showToast('Transaction Voided', 'Financial retention token denied.', 'error');
    }
}

/* ==========================================================================
   4. CLIENT ORDER LEDGER SEARCH ENGINE
   ========================================================================== */
window.trackOrder = function() {
    const inputId = document.getElementById('bookingIdInput').value.trim();
    const resultBox = document.getElementById('resultBox');
    const rawData = localStorage.getItem('cachedDemoBooking');

    if (!rawData) {
        showToast('Audit Error', 'System database empty. Initiate a booking first.', 'error');
        return;
    }

    const currentBooking = JSON.parse(rawData);

    if (inputId.toUpperCase() === currentBooking.id) {
        document.getElementById('resName').innerText = currentBooking.clientName;
        document.getElementById('resDate').innerText = currentBooking.shootDate;
        document.getElementById('resLocation').innerText = currentBooking.venue;
        
        const currentStatus = currentBooking.status;
        const statusBadge = document.getElementById('resStatus');
        statusBadge.innerText = currentStatus;

        statusBadge.className = 'badge'; 
        if (currentStatus === 'Pending Approval') statusBadge.classList.add('badge-pending');
        else if (currentStatus === 'Confirmed') statusBadge.classList.add('badge-confirmed');
        else {
            statusBadge.classList.add('badge-cancelled');
            document.getElementById('cancelRequestBtn').style.display = 'none'; 
        }

        resultBox.style.display = 'block';
    } else {
        showToast('Record Not Found', `Provide matching key. (Try '${currentBooking.id}')`, 'error');
    }
}

/* ==========================================================================
   5. CLIENT-SIDE EMERGENCY REVERSAL SECURE GATEWAY
   ========================================================================== */
window.showCancelOTP = function() {
    document.getElementById('cancelOtpSection').style.display = 'block';
    showToast('Revocation Node', "Dispatched authorization handshake key '4321'.", 'info');
}

window.confirmCancellation = function() {
    const cancelCode = document.getElementById('cancelOtpInput').value.trim();
    
    if (cancelCode === '4321') {
        const rawData = localStorage.getItem('cachedDemoBooking');
        if (rawData) {
            let bookingObj = JSON.parse(rawData);
            bookingObj.status = 'Cancelled by Client'; 
            localStorage.setItem('cachedDemoBooking', JSON.stringify(bookingObj));
        }

        showToast('Execution Complete', 'Reservation revoked seamlessly.', 'success');
        setTimeout(() => { window.location.reload(); }, 2000);
    } else {
        showToast('Operation Refused', "Security key verification failed. Use '4321'.", 'error');
    }
}


