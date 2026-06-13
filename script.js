// TODO: Apne Firebase Project ki Realtime Database Configuration yahan dalein
const firebaseConfig = {
    apiKey: "AIzaSyAF2J7RXEq_179Iw_vAuqwDr0GJnlcIR3o",
  authDomain: "mgphotography-8c77a.firebaseapp.com",
  databaseURL: "https://mgphotography-8c77a-default-rtdb.firebaseio.com",
  projectId: "mgphotography-8c77a",
  storageBucket: "mgphotography-8c77a.firebasestorage.app",
  messagingSenderId: "819496748884",
  appId: "1:819496748884:web:9ad4fb94c0f97ec10beac1",
  measurementId: "G-WK54G01H3S"
};

// Firebase ko initialize karein
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Form Submit Event (User details database me save karne ke liye)
document.getElementById('clientForm').addEventListener('submit', function(e) {
    e.preventDefault(); // page reload hone se rokne ke liye

    // Form se data nikalna
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const service = document.getElementById('serviceType').value;
    const timestamp = new Date().toLocaleString();

    // Firebase Realtime Database me data 'visitors' nam ke folder me save hoga
    database.ref('visitors/').push({
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        requestedService: service,
        visitTime: timestamp
    })
    .then(() => {
        alert('Thank you! Aapki details register ho gayi hain.');
        document.getElementById('clientForm').reset(); // Form clear karne ke liye
    })
    .catch((error) => {
        console.error("Data save nahi hua: ", error);
        alert('Kuch gadbad hui, firse try karein.');
    });
});


/**
 * FUTURE PROOF FEATURE: Dynamic Photo Adder
 * Agar aapko website me bina code chede nayi image add karni hai, 
 * toh aap console ya is function ka use karke gallery me image push kar sakte ho.
 */
function addNewPhotoToGallery(imageUrl, altText = "MG Photography Shoot") {
    const galleryGrid = document.getElementById('galleryGrid');
    
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText;
    
    itemDiv.appendChild(img);
    galleryGrid.appendChild(itemDiv);
}

// Example usage: Is line ko uncomment karke aap check kar sakte hain dynamic photo kaise aati hai
// addNewPhotoToGallery('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500', 'New Camera Shoot');


