// Dashboard Premium Toast Interface Function
function showAdminToast(title, message, type = 'info') {
    if (typeof iziToast !== 'undefined') {
        iziToast.show({
            title: title,
            message: message,
            position: 'topRight',
            theme: 'dark',
            progressBarColor: type === 'success' ? '#059669' : '#818cf8',
            timeout: 4000
        });
    } else {
        alert(`${title}: ${message}`);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    window.renderIncomingBookings();
});

/* ==========================================================================
   1. LIVE RECEPTION PIPELINE (FEEDING CLIENT DATA TO TABLE)
   ========================================================================== */
window.renderIncomingBookings = function() {
    const tableBody = document.getElementById('incomingBookingsTable');
    if (!tableBody) return; 

    const rawData = localStorage.getItem('cachedDemoBooking');

    if (!rawData) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #6b7280; font-size: 13px; padding: 30px;">
                    <i class="fas fa-folder-open" style="margin-right: 8px;"></i> No active contracts found.
                </td>
            </tr>
        `;
        return;
    }

    const currentBooking = JSON.parse(rawData);

    let mappedPackageName = "Editorial Portrait";
    if (currentBooking.packageType === 'standard') mappedPackageName = "Cinematic Pre-Wedding";
    if (currentBooking.packageType === 'premium') mappedPackageName = "Premium Wedding Legacy Portfolio";

    let stateBadgeClass = "badge-pending";
    if (currentBooking.status === "Confirmed") stateBadgeClass = "badge-confirmed";
    if (currentBooking.status.startsWith("Cancelled")) stateBadgeClass = "badge-cancelled";

    tableBody.innerHTML = `
        <tr>
            <td><strong>${currentBooking.clientName}</strong></td>
            <td>${currentBooking.venue}</td>
            <td>${currentBooking.shootDate}</td>
            <td>${mappedPackageName}</td>
            <td><span class="badge ${stateBadgeClass}">${currentBooking.status}</span></td>
            <td class="action-btn-hub">
                ${currentBooking.status === 'Pending Approval' ? `
                    <button class="btn-accept" onclick="executeOrderAction('Confirmed')">Accept</button>
                    <button class="btn-reject" onclick="executeOrderAction('Rejected by Management')">Reject</button>
                ` : `<span style="color:#6b7280; font-size:12px; font-weight:500;">Protocols Locked</span>`}
            </td>
        </tr>
    `;
}

/* ==========================================================================
   2. SYSTEMIC ACTION OVERLAYS (ACCEPT / REJECT ROUTING)
   ========================================================================== */
window.executeOrderAction = function(targetStatusState) {
    const rawData = localStorage.getItem('cachedDemoBooking');
    if (!rawData) return;

    let bookingObj = JSON.parse(rawData);
    bookingObj.status = targetStatusState; 
    localStorage.setItem('cachedDemoBooking', JSON.stringify(bookingObj));

    if (targetStatusState === 'Confirmed') {
        showAdminToast('Protocol Accepted', 'High-Res PDF & WhatsApp confirmation alerts dispatched.', 'success');
    } else {
        showAdminToast('Lease Rejected', 'Contract voided. Refund tokens initialized.', 'info');
    }

    window.renderIncomingBookings(); 
}


