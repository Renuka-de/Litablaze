const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwf04wXUqYDF05q6OFZME8Mrui5qa5MlixQLQ5vMoeuSFA792iFc7Av5k9-j46-cjH1/exec";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("Please enter name and email");
    return;
  }

  let registrations = {};

  // Try fetch directly; if blocked by CORS, fall back to JSONP.
  async function fetchFromGoogleScript(email) {
    const url = `${SCRIPT_URL}?email=${encodeURIComponent(email)}`;
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      // JSONP fallback
      return new Promise((resolve, reject) => {
        const cbName = `login_cb_${Date.now()}`;
        window[cbName] = (data) => { delete window[cbName]; resolve(data); };
        const s = document.createElement('script');
        s.src = `${url}&callback=${cbName}`;
        s.onerror = () => { delete window[cbName]; reject(new Error('JSONP failed')); };
        document.head.appendChild(s);
      });
    }
  }

  try {
    const raw = await fetchFromGoogleScript(email);
    // try to extract registrations by email if possible
    const regs = (typeof raw === 'object' && !Array.isArray(raw)) ? raw : raw;
    registrations = regs || {};
  } catch (err) {
    console.error(err);
    registrations = {};
  }

  localStorage.setItem(
    "litablaze_profile",
    JSON.stringify({ name, email })
  );

  localStorage.setItem(
    "litablaze_sheet_regs",
    JSON.stringify(registrations)
  );

  window.location.href = "index.html";
});
