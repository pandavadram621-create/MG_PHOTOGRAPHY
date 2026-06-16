/* ==========================================================================
   1. LIVE RECEPTION PIPELINE (FEEDING CLIENT DATA TO TABLE)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
    renderIncomingBookings();
});

function renderIncomingBookings() {
    const tableBody = document.getElementById('incomingBookingsTable');
    if (!tableBody) return; // Exit if not on dashboard page

    // Fetch live structured state data from browser memory base
    const rawData = localStorage.getItem('cachedDemoBooking');

    // If database is empty, inject a premium baseline mockup record
    if (!rawData) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #6b7280; font-size: 13px; padding: 30px;">
                    <i class="fas fa-folder-open" style="margin-right: 8px;"></i> No active high-priority leases in network node database.
                </td>
            </tr>
        `;
        return;
    }

    const currentBooking = JSON.parse(rawData);

    // Map packages code tokens to aesthetic standard text formats
    let mappedPackageName = "Editorial Portrait";
    if (currentBooking.packageType === 'standard') mappedPackageName = "Cinematic Pre-Wedding";
    if (currentBooking.packageType === 'premium') mappedPackageName = "Premium Wedding Legacy";

    // Set appropriate matte signaling badge classes based on current state
    let stateBadgeClass = "badge-pending";
    if (currentBooking.status === "Confirmed") stateBadgeClass = "badge-confirmed";
    if (currentBooking.status.startsWith("Cancelled")) stateBadgeClass = "badge-cancelled";

    // Inject live row structural matrix into dashboard viewport table
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
function executeOrderAction(targetStatusState) {
    const rawData = localStorage.getItem('cachedDemoBooking');
    if (!rawData) return;

    let bookingObj = JSON.parse(rawData);
    bookingObj.status = targetStatusState; // Mutate object validation code state
    localStorage.setItem('cachedDemoBooking', JSON.stringify(bookingObj));

    // Automated Notification Micro-Signals
    if (targetStatusState === 'Confirmed') {
        alert(`PROTOCOL ACCEPTED!\n\nSystem Actions Initiated:\n1. Dispatched High-Resolution Receipt PDF to Client Email.\n2. Rerouted WhatsApp Confirmation Alert with Deployment Timeframes.\n3. Updated Financial Metric Retention Ledgers.`);
    } else {
        alert(`LEASE REJECTED!\n\nSystem Actions Initiated:\n1. Voided Contract Reference Index ID: ${bookingObj.id}.\n2. Refund API token commands initialized for standard return loop.`);
    }

    renderIncomingBookings(); // Live update the matrix grid immediately
}

/* ==========================================================================
   3. NO-CODE STUDIO REPOSITORY PUBLISHER (MOCK UPLOADER)
   ========================================================================== */
const dropzoneBox = document.getElementById('dropzoneBox');
if (dropzoneBox) {
    dropzoneBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzoneBox.style.borderColor = '#818cf8'; // Shimmer border on hover drag state
    });

    dropzoneBox.addEventListener('dragleave', () => {
        dropzoneBox.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });

    dropzoneBox.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzoneBox.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        simulateHighFidelityAssetPublish();
    });
}

function simulateHighFidelityAssetPublish() {
    // Premium dynamic stock assets sample library pool arrays
    const premiumStockPool = [
        "https://images.unsplash.com/photo-1519225495810-7512c696505a?w=600",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600",
        "https://images.unsplash.com/photo-1507504038482-7621c6784c36?w=600"
    ];
    
    // Choose a random dynamic photo asset component from array
    const selectionIndex = Math.floor(Math.random() * premiumStockPool.length);
    const chosenAssetUrl = premiumStockPool[selectionIndex];

    const controlGrid = document.getElementById('dashGalleryGrid');
    if (!controlGrid) return;

    // Create thumbnail interface structural matrix template component
    const newThumbWrapper = document.createElement('div');
    newThumbWrapper.className = 'dash-gallery-thumb-item';
    newThumbWrapper.innerHTML = `
        <img src="${chosenAssetUrl}" alt="Thumb Component">
        <button class="thumb-delete-trigger-btn" onclick="this.parentElement.remove(); alert('Asset permanently purged from public client layer.');">&times;</button>
    `;

    controlGrid.appendChild(newThumbWrapper);
    alert("Asset Intake Successful! RAW binary rendering pipelines completed.\nNew photo module published dynamically to Home Portfolio Archive Section without coding manual files.");
}


