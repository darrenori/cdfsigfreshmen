const salt = "j1n23s9xcx";

function registrationValues() {
    const username = document.getElementById("team_name").value.trim();
    const passwordInput = document.getElementById("password").value;
    const password = CryptoJS.MD5(CryptoJS.enc.Hex.parse(passwordInput + salt)).toString();
    return { username, passwordInput, password };
}

async function checkRegister() {
    const values = registrationValues();
    $("#username-error").hide();

    if (!values.username || !values.passwordInput) {
        $("#username-error").show();
        return;
    }

    try {
        const users = await CtfApi.get("/TPuser/" + encodeURIComponent(values.username));
        if (users.length > 0) {
            $("#username-error").show();
            return;
        }
        await goRegister(values.username, values.password);
    } catch {
        $("#username-error").show();
    }
}

async function goRegister(username, password) {
    await CtfApi.post("/TPusers", { Username: username, Password: password });
    await putToken(username, password);
}

async function putToken(username, password) {
    const token = await CtfApi.post("/LoginTPusers", { Username: username, Password: password });
    sessionStorage.setItem("token", token.result);
    window.location.href = "instructions.html";
}
