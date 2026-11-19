# Basta Piles Clinic

Official web application for Basta Piles Clinic in Basta, Odisha—providing consultation slot requests, clinic hours and location details, a confidential 3-step symptom and diet guide, an interactive clinic assistant, and WhatsApp booking support.

🌐 Live Site: https://bastapilesclinic.github.io/Basta-PilesClinic/

Key Features

Interactive Consultation Slot Request: 7-day date picker with 30-minute request windows across Morning (8:00 AM – 2:00 PM) and Evening (4:00 PM – 8:00 PM) sessions, with the afternoon break (2:00 PM – 4:00 PM) closed daily.

Direct WhatsApp Dispatch: Pre-fills patient details (Name, Phone, Condition, Requested Date & Time, and a unique #BPC-XXXXXXXX reference ID) into WhatsApp (+91 90931 33416) for owner confirmation.

Privacy-First Local Request History: Stores only non-sensitive request references and slot times in localStorage under My Requests—never saving patient names, phone numbers, or medical details in browser storage.

Clinic Slot Assistant: Built-in chat widget answering common questions about clinic timings, address, booking windows, fees, and when to seek urgent medical care.

3-Step Symptom & Diet Guide: Confidential self-check providing general Ayurvedic dietary guidance and medical red-flag reminders.

1-Tap Home Screen Install: Includes a Web App Manifest (manifest.webmanifest) and Service Worker (sw.js) so visitors on Android and iOS can install the web app directly onto their home screen.

Clinic Details

Practitioner: Mr. S. Biswal (Ayurvedic Proctology Care, 15 Years of Practice)

Address: 19, Hospital Road, Sadanandapur, Basta, Odisha 756029

Hours (Mon – Sun): 8:00 AM – 2:00 PM & 4:00 PM – 8:00 PM (Closed 2:00 PM – 4:00 PM)

WhatsApp / Phone: +91 90931 33416

Repository Structure

├── index.html              # Complete single-page application (UI, styles, and client-side logic)
├── manifest.webmanifest    # Web App Manifest for 1-Tap Home Screen installation
├── sw.js                   # Service Worker for offline/caching support
├── icon-192.png            # App icon (192x192)
├── icon-512.png            # App icon (512x512)
└── README.md               # Repository documentation


Deployment (GitHub Pages)

Upload index.html, manifest.webmanifest, sw.js, icon-192.png, and icon-512.png to the root directory of the repository.

Go to Settings → Pages in your GitHub repository.

Under Build and deployment, select Deploy from a branch, choose your main branch and / (root) folder, and click Save.

Wait ~60 seconds for GitHub Pages to build and serve the site over https://.

License

© Basta Piles Clinic. All rights reserved.
