(function initializeApi(global) {
    "use strict";

    var location = global.location;
    var configuredUrl = global.CDFSIG_API_URL;
    var meta = global.document.querySelector('meta[name="api-base-url"]');
    var protocol = location.protocol === "https:" ? "https:" : "http:";
    var defaultUrl = location.port === "8081"
        ? location.origin
        : protocol + "//" + (location.hostname || "127.0.0.1") + ":8081";
    var baseUrl = String(configuredUrl || (meta && meta.content) || defaultUrl).replace(/\/$/, "");

    function url(path) {
        return baseUrl + "/" + String(path).replace(/^\//, "");
    }

    async function request(path, options) {
        var requestOptions = Object.assign({}, options);
        var timeoutMs = requestOptions.timeoutMs || 10000;
        var controller = new global.AbortController();
        var timeout = global.setTimeout(function abortRequest() {
            controller.abort();
        }, timeoutMs);

        delete requestOptions.timeoutMs;
        requestOptions.signal = controller.signal;
        requestOptions.headers = Object.assign({ Accept: "application/json" }, requestOptions.headers);

        try {
            var response = await global.fetch(url(path), requestOptions);
            var contentType = response.headers.get("content-type") || "";
            var body = contentType.includes("application/json")
                ? await response.json()
                : await response.text();

            if (!response.ok) {
                var message = body && body.error && body.error.message
                    ? body.error.message
                    : "Request failed with status " + response.status;
                var error = new Error(message);
                error.status = response.status;
                error.body = body;
                throw error;
            }

            return body;
        } catch (error) {
            if (error.name === "AbortError") {
                throw new Error("The server took too long to respond");
            }
            throw error;
        } finally {
            global.clearTimeout(timeout);
        }
    }

    function get(path) {
        return request(path, { method: "GET" });
    }

    function post(path, body) {
        return request(path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body || {}),
        });
    }

    global.CtfApi = Object.freeze({ baseUrl: baseUrl, get: get, post: post, request: request, url: url });
})(window);
