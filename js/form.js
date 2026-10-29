document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // CONTACT FORM
    // =========================
    const form = document.getElementById("contactForm");

    if (form) {

        const responseMsg = document.getElementById("responseMsg");
        const sendBtn = form.querySelector("button");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = {
                name: form.name.value.trim(),
                phone: form.phone.value.trim(),
                email: form.email.value.trim(),
                message: form.message.value.trim()
            };

            try {

                sendBtn.disabled = true;
                sendBtn.innerText = "Sending...";

                const res = await fetch("/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();

                responseMsg.innerText = data.message;

                if (res.ok) {
                    form.reset();
                }

            } catch (err) {
                console.log("CONTACT ERROR:", err);
                responseMsg.innerText = "Server error ❌";
            } finally {
                sendBtn.disabled = false;
                sendBtn.innerText = "SEND";

                setTimeout(() => {
                    responseMsg.innerText = "";
                }, 3000);
            }
        });
    }


    // =========================
    // TRACKING FORM
    // =========================
    window.trackShipment = async function (event) {
        event.preventDefault();

        const trackingInput = document.getElementById("trackingNumber");
        const trackingResult = document.getElementById("trackingResult");

        try {

            const res = await fetch("/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    trackingNumber: trackingInput.value.trim()
                })
            });

            const data = await res.json();

            trackingResult.innerText = data.message;

            trackingInput.value = "";

            setTimeout(() => {
                trackingResult.innerText = "";
            }, 2000);

        } catch (err) {
            console.log("TRACK ERROR:", err);
            trackingResult.innerText = "Tracking failed ❌";
        }
    };

});