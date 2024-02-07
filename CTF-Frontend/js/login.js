const salt = "j1n23s9xcx";

async function goLogin() {
    const username = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value;

    if (!username || !passwordInput) {
        $("#error-text").show();
        return;
    }

    const password = CryptoJS.MD5(CryptoJS.enc.Hex.parse(passwordInput + salt)).toString();

    try {
        const token = await CtfApi.post("/LoginTPusers", { Username: username, Password: password });
        sessionStorage.setItem("token", token.result);
        window.location.href = "quests.html";
    } catch {
        $("#error-text").show();
    }
}
